import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle, Calendar, Clock, MapPin, Video, ArrowRight,
  Stethoscope, MessageCircle, LayoutDashboard,
} from 'lucide-react';

// ─── iCal helpers ─────────────────────────────────────────────────────────────

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

/**
 * Build an RFC 5545-compliant .ics file string.
 * The date string from BookingPage is something like
 * "Wednesday, 9 April 2026" — we parse it with the Date constructor
 * and combine with the time string like "10:00 AM".
 */
function buildIcs(params: {
  doctorName: string;
  specialty: string;
  clinic: string;
  address: string;
  city: string;
  date: string;
  time: string;
  type: string;
  patientName: string;
}) {
  const { doctorName, specialty, clinic, address, city, date, time, type, patientName } = params;

  // Parse date + time into a Date object (Qatar time, UTC+3)
  let dtStart: Date;
  try {
    dtStart = new Date(`${date} ${time}`);
  } catch {
    dtStart = new Date();
  }
  if (isNaN(dtStart.getTime())) {
    dtStart = new Date();
  }

  const dtEnd = new Date(dtStart.getTime() + 30 * 60 * 1000); // +30 min

  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

  const uid = `tabiby-${Date.now()}@tabiby.co`;
  const location = type === 'video' ? 'Online Video Consultation' : `${clinic}, ${address}, ${city}, Qatar`;
  const summary = `Appointment with ${doctorName} (${specialty})`;
  const description = `Patient: ${patientName}\\nDoctor: ${doctorName}\\nSpecialty: ${specialty}\\nType: ${type === 'video' ? 'Video Visit' : 'In-Person'}\\nLocation: ${location}\\n\\nBooked via Tabiby — tabiby.co`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tabiby//Appointment//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(dtStart)}`,
    `DTEND:${fmt(dtEnd)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadIcs(icsContent: string, filename: string) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── WhatsApp helper ─────────────────────────────────────────────────────────

function buildWhatsAppUrl(params: {
  doctorName: string;
  specialty: string;
  clinic: string;
  city: string;
  date: string;
  time: string;
  type: string;
}) {
  const { doctorName, specialty, clinic, city, date, time, type } = params;
  const apptType = type === 'video' ? 'Video Visit' : 'In-Person';
  const location = type === 'video' ? 'Online (Video Visit)' : `${clinic}, ${city}, Qatar`;

  const message = [
    '🏥 *Tabiby Appointment Confirmed*',
    '',
    `👨‍⚕️ *Doctor:* ${doctorName}`,
    `🩺 *Specialty:* ${specialty}`,
    `📅 *Date:* ${date}`,
    `🕐 *Time:* ${time}`,
    `📋 *Type:* ${apptType}`,
    `📍 *Location:* ${location}`,
    '',
    '_Booked via Tabiby — tabiby.co_',
  ].join('\n');

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConfirmationPage() {
  const { state } = useLocation() as {
    state: {
      doctor: {
        id: number;
        name: string;
        specialty: string;
        clinic: string;
        address: string;
        city: string;
        img: string;
        initials: string;
        avatarBg: string;
      };
      date: string;
      time: string;
      type: string;
      patient: { firstName: string; lastName: string; email: string; phone: string };
    } | null;
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Stethoscope className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">No Booking Found</h1>
          <p className="text-slate-500 mb-6">
            It looks like you came here directly. Let's find you a doctor.
          </p>
          <Link
            to="/search"
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
          >
            Find a Doctor
          </Link>
        </div>
      </div>
    );
  }

  const { doctor, date, time, type, patient } = state;
  const patientName = `${patient.firstName} ${patient.lastName}`.trim();

  const handleAddToCalendar = () => {
    const ics = buildIcs({
      doctorName: doctor.name,
      specialty: doctor.specialty,
      clinic: doctor.clinic,
      address: doctor.address,
      city: doctor.city,
      date,
      time,
      type,
      patientName,
    });
    downloadIcs(ics, `tabiby-appointment-${doctor.name.replace(/\s+/g, '-')}.ics`);
  };

  const whatsappUrl = buildWhatsAppUrl({
    doctorName: doctor.name,
    specialty: doctor.specialty,
    clinic: doctor.clinic,
    city: doctor.city,
    date,
    time,
    type,
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle className="h-10 w-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-slate-500 text-lg">
            A confirmation has been sent to{' '}
            <span className="font-semibold text-slate-700">{patient.email}</span>
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-400" />
          <div className="p-6 sm:p-8">

            {/* Doctor */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <div
                className={`h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center text-xl font-bold flex-shrink-0 ${doctor.avatarBg}`}
              >
                {doctor.img ? (
                  <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  doctor.initials
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">{doctor.name}</p>
                <p className="text-teal-700 font-medium">{doctor.specialty}</p>
                <p className="text-slate-500 text-sm">{doctor.clinic}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <h2 className="font-bold text-slate-900 mb-4">Appointment Details</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Date</p>
                  <p className="text-slate-800 font-semibold">{date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Time</p>
                  <p className="text-slate-800 font-semibold">{time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {type === 'video' ? (
                    <Video className="h-5 w-5 text-purple-600" />
                  ) : (
                    <MapPin className="h-5 w-5 text-teal-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Type</p>
                  <p className="text-slate-800 font-semibold capitalize">
                    {type === 'video' ? 'Video Visit' : 'In-Person Appointment'}
                  </p>
                  {type === 'in-person' && (
                    <p className="text-slate-500 text-sm">
                      {doctor.clinic}, {doctor.address}, {doctor.city}, Qatar
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Patient */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2 text-sm">Patient</h3>
              <p className="text-slate-700 font-medium">{patientName}</p>
              <p className="text-slate-500 text-sm">{patient.email} · {patient.phone}</p>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {/* Add to Calendar — real .ics download */}
          <button
            onClick={handleAddToCalendar}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-700 font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
          >
            <Calendar className="h-4 w-4 flex-shrink-0" />
            Add to Calendar
          </button>

          {/* Share via WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
          >
            {/* WhatsApp logo SVG */}
            <svg className="h-4 w-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Share via WhatsApp
          </a>

          {/* View Doctor Profile */}
          <Link
            to={`/doctor/${doctor.id}`}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
          >
            Doctor Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-slate-900 mb-4">What to expect</h2>
          <div className="space-y-4">
            {[
              {
                icon: '📧',
                title: 'Confirmation Email',
                desc: `A booking confirmation has been sent to ${patient.email}`,
              },
              {
                icon: '📱',
                title: 'Reminder',
                desc: 'You will receive an SMS reminder 24 hours before your appointment',
              },
              {
                icon: '🏥',
                title: 'Arrive Early',
                desc: `Please arrive 10 minutes early for your first visit to ${doctor.clinic}`,
              },
              {
                icon: '🔄',
                title: 'Cancellation',
                desc: 'You can cancel or reschedule for free up to 24 hours before your appointment',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard CTA */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="font-semibold text-teal-900 text-sm">Track your appointment</p>
              <p className="text-teal-700 text-xs">View, reschedule, or cancel from your dashboard</p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm"
          >
            My Dashboard <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Footer link */}
        <div className="text-center">
          <Link
            to="/search"
            className="text-teal-600 hover:text-teal-700 font-medium text-sm hover:underline"
          >
            Book another appointment →
          </Link>
        </div>
      </div>
    </div>
  );
}
