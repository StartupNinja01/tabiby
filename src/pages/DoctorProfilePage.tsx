import { lazy, Suspense } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star, MapPin, CheckCircle2, Video, Globe, Shield, Clock,
  ChevronLeft, Stethoscope, GraduationCap, Award, Calendar,
  Navigation, UserPlus, ExternalLink,
} from 'lucide-react';
import { getDoctorById, DOCTORS, Doctor } from '@/data/doctors';
import PageMeta, { doctorJsonLd } from '@/components/PageMeta';

const MapView = lazy(() => import('@/components/MapView'));

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Similar Doctor Card ─────────────────────────────────────────────────────

function SimilarDoctorCard({ doc }: { doc: Doctor }) {
  const navigate = useNavigate();
  const nextSlot = doc.availableSlots[0] ?? null;
  const hasToday = nextSlot?.startsWith('Today');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col gap-3 min-w-[220px] max-w-[260px] flex-shrink-0">
      {/* Avatar + badge */}
      <div className="flex items-center gap-3">
        <div
          className={`h-14 w-14 rounded-xl overflow-hidden flex items-center justify-center font-bold text-lg border-2 border-slate-50 shadow-sm flex-shrink-0 ${doc.avatarBg}`}
        >
          {doc.img ? (
            <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
          ) : (
            doc.initials
          )}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-slate-900 text-sm leading-tight truncate">{doc.name}</p>
          <p className="text-teal-700 text-xs font-medium truncate">{doc.specialty}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
            <span className="text-xs text-slate-400">({doc.reviews})</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-1.5 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
        <span className="truncate">{doc.district} · {doc.distance} km</span>
      </div>

      {/* Next slot */}
      {nextSlot && (
        <div
          className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold ${
            hasToday
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-blue-50 text-blue-700 border border-blue-100'
          }`}
        >
          <Clock className="h-3 w-3 flex-shrink-0" />
          {hasToday ? 'Available Today' : nextSlot}
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-1">
        {doc.verified && (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-100">
            <CheckCircle2 className="h-3 w-3" /> QCHP
          </span>
        )}
        {doc.videoVisits && (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-purple-100">
            <Video className="h-3 w-3" /> Video
          </span>
        )}
        {doc.newPatients && (
          <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-teal-100">
            <UserPlus className="h-3 w-3" /> New Patients
          </span>
        )}
      </div>

      <button
        onClick={() => navigate(`/book/${doc.id}`)}
        className="w-full mt-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
      >
        Book
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DoctorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = getDoctorById(Number(id));

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Stethoscope className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Doctor Not Found</h1>
          <p className="text-slate-500 mb-6">We couldn't find that doctor's profile.</p>
          <Link
            to="/search"
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
          >
            Search Doctors
          </Link>
        </div>
      </div>
    );
  }

  // Similar doctors: same specialty, exclude current doctor, max 4
  const similarDoctors = DOCTORS.filter(
    (d) => d.specialty === doctor.specialty && d.id !== doctor.id,
  ).slice(0, 4);

  // Google Maps directions URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${doctor.clinic}, ${doctor.address}, Doha, Qatar`,
  )}`;

  // Waze URL
  const wazeUrl = `https://waze.com/ul?ll=${doctor.lat},${doctor.lng}&navigate=yes`;

  return (
    <div className="min-h-screen bg-slate-50">
      <PageMeta
        title={`${doctor.name} — ${doctor.specialty} in ${doctor.city} | Tabiby`}
        description={`Book an appointment with ${doctor.name}, ${doctor.title} at ${doctor.clinic}, ${doctor.city}. Rated ${doctor.rating}/5 by ${doctor.reviews} patients. ${doctor.acceptedInsurance.join(', ')} accepted.`}
        canonical={`https://tabiby.co/doctor/${doctor.id}`}
        jsonLd={doctorJsonLd(doctor)}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Search
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Main Profile Column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400" />
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`h-32 w-32 rounded-2xl overflow-hidden flex items-center justify-center text-4xl font-bold shadow-sm border-4 border-slate-50 ${doctor.avatarBg}`}
                    >
                      {doctor.img ? (
                        <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                      ) : (
                        doctor.initials
                      )}
                    </div>
                    {doctor.badge && (
                      <span
                        className={`absolute -bottom-2 -right-2 text-xs px-2.5 py-1 rounded-full font-semibold border-2 border-white ${doctor.badgeColor}`}
                      >
                        {doctor.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h1 className="text-2xl font-bold text-slate-900">{doctor.name}</h1>
                          {doctor.verified && (
                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200 flex-shrink-0">
                              <CheckCircle2 className="h-3.5 w-3.5 fill-blue-100" />
                              QCHP Verified
                            </span>
                          )}
                        </div>
                        <p className="text-teal-700 font-semibold text-lg">{doctor.title}</p>
                        <p className="text-slate-500 mt-0.5">
                          {doctor.specialty} · {doctor.experience} years experience
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-4">
                      <StarRating rating={doctor.rating} />
                      <span className="font-bold text-slate-800">{doctor.rating}</span>
                      <span className="text-slate-500 text-sm">({doctor.reviews} patient reviews)</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {doctor.newPatients && (
                        <span className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <UserPlus className="h-3 w-3" /> Accepting New Patients
                        </span>
                      )}
                      {doctor.videoVisits && (
                        <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Video className="h-3 w-3" /> Video Visits
                        </span>
                      )}
                      <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                        QAR {doctor.fee} consultation
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location / Language / Insurance row */}
                <div className="mt-6 pt-6 border-t border-slate-100 grid sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{doctor.clinic}</p>
                      <p className="text-slate-500 text-sm">{doctor.address}</p>
                      <p className="text-teal-600 text-sm font-medium">{doctor.distance} km away</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Languages</p>
                      <p className="text-slate-500 text-sm">{doctor.languages.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Insurance</p>
                      <p className="text-slate-500 text-sm">{doctor.acceptedInsurance.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-teal-500" /> About {doctor.name}
              </h2>
              <p className="text-slate-600 leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-teal-500" /> Education & Training
              </h2>
              <ul className="space-y-3">
                {doctor.education.map((edu, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-600">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Location: Real Leaflet Map ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-500" /> Location
                </h2>
                <div className="flex items-center gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 border border-teal-200 rounded-lg px-3 py-1.5 hover:bg-teal-50 transition-colors"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    Google Maps
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors"
                  >
                    Waze
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-slate-200" style={{ height: 280 }}>
                <Suspense
                  fallback={
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <div className="text-center text-slate-400">
                        <MapPin className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                        <p className="text-sm">Loading map…</p>
                      </div>
                    </div>
                  }
                >
                  <MapView
                    doctors={[doctor]}
                    selectedId={doctor.id}
                    onSelect={() => {}}
                  />
                </Suspense>
              </div>

              <p className="text-slate-500 text-sm mt-3 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                {doctor.address}, {doctor.city}, Qatar · {doctor.distance} km from city centre
              </p>
            </div>

            {/* ── Similar Doctors ── */}
            {similarDoctors.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    Other {doctor.specialty} Specialists
                  </h2>
                  <Link
                    to={`/search?specialty=${encodeURIComponent(doctor.specialty)}`}
                    className="text-sm font-semibold text-teal-600 hover:text-teal-700"
                  >
                    See all →
                  </Link>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
                  {similarDoctors.map((d) => (
                    <SimilarDoctorCard key={d.id} doc={d} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Booking Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
              <div className="h-1.5 bg-teal-500" />
              <div className="p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-500" /> Book Appointment
                </h2>

                {/* Next available badge */}
                {doctor.availableSlots[0] && (
                  <div
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 mb-4 mt-2 text-sm font-semibold ${
                      doctor.availableSlots[0].startsWith('Today')
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}
                  >
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    {doctor.availableSlots[0].startsWith('Today')
                      ? `Available Today · ${doctor.availableSlots[0].replace('Today, ', '')}`
                      : `Next: ${doctor.availableSlots[0]}`}
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  {doctor.availableSlots.slice(0, 4).map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(`/book/${doctor.id}`)}
                      className="w-full py-3 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium hover:bg-teal-50 hover:border-teal-300 hover:text-teal-800 transition-colors flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      {slot}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/book/${doctor.id}`)}
                  className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-colors text-base"
                >
                  Book Appointment
                </button>

                <p className="text-center text-xs text-slate-400 mt-3">
                  Free cancellation up to 24h before
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Consultation fee</span>
                    <span className="font-bold text-slate-900">QAR {doctor.fee}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Insurance</span>
                    <span
                      className={`font-semibold ${
                        doctor.insuranceStatus === 'in' ? 'text-green-600' : 'text-slate-600'
                      }`}
                    >
                      {doctor.insuranceStatus === 'in' ? '✓ In-Network' : 'Out-of-Network'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Video available</span>
                    <span className={`font-semibold ${doctor.videoVisits ? 'text-purple-600' : 'text-slate-400'}`}>
                      {doctor.videoVisits ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recognition card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-amber-500" /> Recognition
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                  <span>Rated {doctor.rating}/5 by {doctor.reviews} patients</span>
                </div>
                {doctor.verified && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>QCHP Verified Provider</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="h-4 w-4 text-teal-500 flex-shrink-0" />
                  <span>{doctor.experience}+ years of experience</span>
                </div>
                {doctor.newPatients && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <UserPlus className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span>Accepting new patients</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
