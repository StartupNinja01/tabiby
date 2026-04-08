import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Star,
  Filter,
  CheckCircle2,
  Video,
  Globe,
  Shield,
  UserPlus,
  ChevronDown,
  LayoutList,
  Map,
  LayoutPanelLeft,
  Award,
  Clock,
  X,
  SlidersHorizontal,
  Navigation,
  Loader2,
} from 'lucide-react';
import { DOCTORS, Doctor } from '@/data/doctors';

// ─── Haversine distance (km) between two lat/lng pairs ───────────────────────
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const MapView = lazy(() => import('@/components/MapView'));

// ─── Constants ────────────────────────────────────────────────────────────────

const SPECIALTIES = [
  'General Practice',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Psychiatry',
  'OB/GYN',
  'Dentistry',
];

const CITIES = ['Doha', 'Al Wakrah', 'Al Khor', 'Al Rayyan', 'Lusail', 'Mesaieed'];

const INSURANCE_OPTIONS = ['QLM', 'Al Koot', 'Cigna', 'Nextcare', 'MetLife', 'GIG Gulf', 'Bupa'];

type SortOption = 'recommended' | 'availability' | 'rating' | 'distance' | 'price_asc';
type ViewMode = 'list' | 'map' | 'split';

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  const full = Math.floor(rating);
  const partial = rating % 1 > 0;
  return (
    <div className="flex">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < full
              ? 'text-amber-400 fill-amber-400'
              : partial && i === full
              ? 'text-amber-400 fill-amber-200'
              : 'text-slate-200 fill-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Quick Filter Chip ────────────────────────────────────────────────────────

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, icon, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold border transition-all select-none ${
        active
          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
          : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700'
      }`}
    >
      {icon}
      {label}
      {active && <X className="h-3.5 w-3.5 ml-0.5 opacity-70" />}
    </button>
  );
}

// ─── Doctor Card ──────────────────────────────────────────────────────────────

interface DoctorCardProps {
  doc: Doctor;
  highlighted: boolean;
  onHighlight: (id: number) => void;
  compact?: boolean;
}

function DoctorCard({ doc, highlighted, onHighlight, compact = false }: DoctorCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const nextSlot = doc.availableSlots[0] ?? null;
  const hasToday = nextSlot?.startsWith('Today');

  // Scroll into view when highlighted from map
  useEffect(() => {
    if (highlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [highlighted]);

  return (
    <div
      ref={cardRef}
      onClick={() => onHighlight(doc.id)}
      className={`bg-white border rounded-xl transition-all cursor-pointer ${
        highlighted
          ? 'border-teal-400 shadow-lg ring-2 ring-teal-100'
          : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      <div className={`flex flex-col sm:flex-row gap-5 ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
        {/* Avatar */}
        <div className="flex flex-col items-center sm:items-start gap-3 flex-shrink-0">
          <Link
            to={`/doctor/${doc.id}`}
            onClick={(e) => e.stopPropagation()}
            className="relative block"
          >
            <div
              className={`rounded-full border-4 border-slate-50 shadow-sm overflow-hidden flex items-center justify-center font-bold ${doc.avatarBg} ${compact ? 'h-20 w-20 text-xl' : 'h-28 w-28 text-2xl'}`}
            >
              {doc.img ? (
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
              ) : (
                doc.initials
              )}
            </div>
            {doc.badge && (
              <span
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap border-2 border-white px-2 py-0.5 rounded-full font-semibold ${doc.badgeColor}`}
              >
                {doc.badge}
              </span>
            )}
          </Link>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Name row */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2 mb-1.5">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <Link
                  to={`/doctor/${doc.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className={`font-bold text-slate-900 leading-tight hover:text-teal-700 transition-colors ${compact ? 'text-base' : 'text-xl'}`}
                >
                  {doc.name}
                </Link>
                {/* QCHP Verified Badge */}
                {doc.verified && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2 py-0.5 text-xs font-semibold flex-shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 fill-blue-100" />
                    QCHP Verified
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-sm font-medium truncate">{doc.title}</p>
            </div>
            {doc.newPatients && (
              <span className="bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap flex-shrink-0">
                <UserPlus className="h-3.5 w-3.5" />
                New Patients
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={doc.rating} />
            <span className="text-sm font-bold text-slate-700">{doc.rating}</span>
            <Link
              to={`/doctor/${doc.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-slate-400 hover:text-teal-600 underline decoration-slate-200 underline-offset-2"
            >
              ({doc.reviews} reviews)
            </Link>
          </div>

          {/* Details grid */}
          {!compact && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-auto">
              <div className="flex items-start gap-2.5 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-900 leading-tight">{doc.clinic}</p>
                  <p className="text-slate-500">
                    {doc.address} ·{' '}
                    <span className="text-teal-700 font-medium">{doc.distance} km</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-slate-600">
                <Shield
                  className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                    doc.insuranceStatus === 'in' ? 'text-green-500' : 'text-slate-400'
                  }`}
                />
                <div>
                  {doc.insuranceStatus === 'in' ? (
                    <p className="text-green-700 font-semibold">In-Network</p>
                  ) : (
                    <p className="text-slate-600 font-semibold">Out-of-Network</p>
                  )}
                  <p className="text-slate-500">
                    {doc.acceptedInsurance.slice(0, 2).join(', ')}
                    {doc.acceptedInsurance.length > 2
                      ? ` +${doc.acceptedInsurance.length - 2} more`
                      : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <Globe className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <p>{doc.languages.join(' · ')}</p>
              </div>

              {doc.videoVisits && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Video className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <p className="text-purple-700 font-semibold">Video Visits Available</p>
                </div>
              )}
            </div>
          )}

          {compact && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {doc.district} · {doc.distance} km
              </span>
              {doc.videoVisits && (
                <span className="flex items-center gap-1 text-purple-600 font-medium">
                  <Video className="h-3.5 w-3.5" />
                  Video
                </span>
              )}
              <span className="flex items-center gap-1">
                <Shield className={`h-3.5 w-3.5 ${doc.insuranceStatus === 'in' ? 'text-green-500' : 'text-slate-400'}`} />
                {doc.insuranceStatus === 'in' ? 'In-Network' : 'Out-of-Network'}
              </span>
            </div>
          )}
        </div>

        {/* Booking panel */}
        <div
          className={`bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between relative overflow-hidden flex-shrink-0 ${compact ? 'w-full sm:w-48 p-3' : 'w-full sm:w-60 p-4'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {doc.badge === 'Highly Rated' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600" />
          )}

          {/* Next available highlight */}
          {nextSlot && (
            <div
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 mb-3 ${
                hasToday
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-blue-50 border border-blue-100'
              }`}
            >
              <Clock
                className={`h-3.5 w-3.5 flex-shrink-0 ${hasToday ? 'text-green-600' : 'text-blue-500'}`}
              />
              <span
                className={`text-xs font-semibold ${hasToday ? 'text-green-700' : 'text-blue-700'}`}
              >
                {hasToday ? 'Available Today' : 'Next: ' + nextSlot}
              </span>
            </div>
          )}

          <h3 className={`font-bold text-slate-900 text-center mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
            Select a Time
          </h3>

          <div className="space-y-1.5 mb-3">
            {doc.availableSlots.slice(0, compact ? 1 : 2).map((slot, i) => (
              <button
                key={i}
                onClick={() => navigate(`/book/${doc.id}`)}
                className={`w-full justify-center rounded-md border text-sm font-medium transition-colors bg-white border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-800 ${compact ? 'py-2 px-3 text-xs' : 'py-3 px-4'}`}
              >
                {slot}
              </button>
            ))}
            <button
              onClick={() => navigate(`/doctor/${doc.id}`)}
              className={`w-full text-teal-700 hover:text-teal-800 font-medium ${compact ? 'text-xs h-6' : 'text-sm h-8'}`}
            >
              More times →
            </button>
          </div>

          <button
            onClick={() => navigate(`/book/${doc.id}`)}
            className={`w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-lg shadow-sm transition-colors ${compact ? 'py-2 text-sm' : 'py-3'}`}
          >
            Book Appointment
          </button>

          {!compact && (
            <p className="text-center text-xs text-slate-400 mt-2 font-medium">
              QAR {doc.fee} consultation fee
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  // Filters
  const [sort, setSort] = useState<SortOption>('recommended');
  const [availableToday, setAvailableToday] = useState(false);
  const [newPatientsOnly, setNewPatientsOnly] = useState(false);
  const [videoOnly, setVideoOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [gender, setGender] = useState('any');
  const [searchSpecialty, setSearchSpecialty] = useState(searchParams.get('specialty') || '');
  const [searchLocation, setSearchLocation] = useState(searchParams.get('city') || '');
  const [searchInsurance, setSearchInsurance] = useState('');
  const [langArabic, setLangArabic] = useState(false);
  const [langEnglish, setLangEnglish] = useState(false);
  const [availWeek, setAvailWeek] = useState(false);

  // Near Me geolocation
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSort('distance');
        setGeoLoading(false);
      },
      () => {
        setGeoError('Unable to access your location. Please allow location access and try again.');
        setGeoLoading(false);
      },
      { timeout: 8000 },
    );
  };

  // View & selection
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchSpecialty(searchParams.get('specialty') || '');
    setSearchLocation(searchParams.get('city') || '');
  }, [searchParams]);

  // Filtered + sorted doctors
  const filteredDoctors: Doctor[] = DOCTORS.filter((doc) => {
    if (searchSpecialty && doc.specialty !== searchSpecialty) return false;
    if (searchLocation && doc.city !== searchLocation && doc.district !== searchLocation)
      return false;
    if (searchInsurance && !doc.acceptedInsurance.includes(searchInsurance)) return false;
    if (videoOnly && !doc.videoVisits) return false;
    if (newPatientsOnly && !doc.newPatients) return false;
    if (availableToday && !doc.availableSlots.some((s) => s.startsWith('Today'))) return false;
    if (availWeek) {
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today', 'Tomorrow'];
      if (!doc.availableSlots.some((s) => weekDays.some((d) => s.startsWith(d)))) return false;
    }
    if (gender !== 'any' && doc.gender !== gender) return false;
    if (langArabic && !doc.languages.includes('Arabic')) return false;
    if (langEnglish && !doc.languages.includes('English')) return false;
    if (topRatedOnly && doc.rating < 4.8) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'distance') {
      if (userCoords) {
        return (
          haversineKm(userCoords.lat, userCoords.lng, a.lat, a.lng) -
          haversineKm(userCoords.lat, userCoords.lng, b.lat, b.lng)
        );
      }
      return parseFloat(a.distance) - parseFloat(b.distance);
    }
    if (sort === 'price_asc') return a.fee - b.fee;
    if (sort === 'availability') {
      const aToday = a.availableSlots.some((s) => s.startsWith('Today')) ? 0 : 1;
      const bToday = b.availableSlots.some((s) => s.startsWith('Today')) ? 0 : 1;
      return aToday - bToday;
    }
    return 0;
  });

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'recommended', label: 'Best Match' },
    { value: 'availability', label: 'Soonest Available' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
  ];

  // Count active sidebar filters for badge
  const activeSidebarFilters = [
    availableToday,
    availWeek,
    newPatientsOnly,
    langArabic,
    langEnglish,
    gender !== 'any',
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchSpecialty('');
    setSearchLocation('');
    setSearchInsurance('');
    setVideoOnly(false);
    setNewPatientsOnly(false);
    setAvailableToday(false);
    setTopRatedOnly(false);
    setGender('any');
    setLangArabic(false);
    setLangEnglish(false);
    setAvailWeek(false);
    setSort('recommended');
  };

  const NAVBAR_HEIGHT = 80;

  // ── Sidebar filters panel (shared between desktop aside and mobile sheet) ──
  const SidebarFilters = () => (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <Filter className="h-4 w-4" />
          <h2>Filters</h2>
        </div>
        {activeSidebarFilters > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-teal-600 hover:text-teal-700 font-semibold"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Availability */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Availability
          </h3>
          <div className="space-y-2">
            {[
              { key: 'today', label: 'Today', val: availableToday, set: setAvailableToday },
              { key: 'week', label: 'This Week', val: availWeek, set: setAvailWeek },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={item.val}
                  onChange={() => item.set(!item.val)}
                  className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Gender */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Doctor Gender
          </h3>
          <div className="space-y-2">
            {[
              { value: 'any', label: 'Any' },
              { value: 'female', label: 'Female Doctor' },
              { value: 'male', label: 'Male Doctor' },
            ].map((item) => (
              <label key={item.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  value={item.value}
                  checked={gender === item.value}
                  onChange={() => setGender(item.value)}
                  className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Language */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Language Spoken
          </h3>
          <div className="space-y-2">
            {[
              { id: 'lang-ar', label: 'Arabic', val: langArabic, set: setLangArabic },
              { id: 'lang-en', label: 'English', val: langEnglish, set: setLangEnglish },
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={item.val}
                  onChange={() => item.set(!item.val)}
                  className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Patient type */}
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={newPatientsOnly}
              onChange={() => setNewPatientsOnly(!newPatientsOnly)}
              className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
            />
            <span className="text-sm text-slate-600 font-semibold group-hover:text-slate-900">
              New Patients Welcome
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900 pb-16">
      {/* ── Sticky search + filter bar ── */}
      <div
        className="bg-white border-b border-slate-200 shadow-sm sticky z-40"
        style={{ top: NAVBAR_HEIGHT }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search bar */}
          <div className="flex items-center bg-white border border-slate-300 rounded-full shadow-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
            <div className="flex-1 flex items-center border-r border-slate-200 px-3">
              <Search className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
                className="border-0 bg-transparent outline-none px-0 h-8 font-medium text-slate-900 w-full appearance-none cursor-pointer"
              >
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex items-center border-r border-slate-200 px-3 hidden sm:flex">
              <MapPin className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="border-0 bg-transparent outline-none px-0 h-8 font-medium text-slate-900 w-full appearance-none cursor-pointer"
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex items-center px-3 hidden md:flex">
              <Shield className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={searchInsurance}
                onChange={(e) => setSearchInsurance(e.target.value)}
                className="border-0 bg-transparent outline-none px-0 h-8 font-medium text-slate-900 w-full appearance-none cursor-pointer"
              >
                <option value="">All Insurance</option>
                {INSURANCE_OPTIONS.map((ins) => (
                  <option key={ins} value={ins}>
                    {ins}
                  </option>
                ))}
              </select>
            </div>

            <button className="rounded-full bg-teal-600 hover:bg-teal-700 h-10 w-10 flex-shrink-0 flex items-center justify-center transition-colors">
              <Search className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Quick-filter pill row */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            <FilterChip
              label="Available Today"
              icon={<Clock className="h-3.5 w-3.5" />}
              active={availableToday}
              onClick={() => setAvailableToday(!availableToday)}
            />
            <FilterChip
              label="Video Visit"
              icon={<Video className="h-3.5 w-3.5" />}
              active={videoOnly}
              onClick={() => setVideoOnly(!videoOnly)}
            />
            <FilterChip
              label="New Patients"
              icon={<UserPlus className="h-3.5 w-3.5" />}
              active={newPatientsOnly}
              onClick={() => setNewPatientsOnly(!newPatientsOnly)}
            />
            <FilterChip
              label="Top Rated"
              icon={<Award className="h-3.5 w-3.5" />}
              active={topRatedOnly}
              onClick={() => setTopRatedOnly(!topRatedOnly)}
            />
            <FilterChip
              label="Arabic Speaking"
              icon={<Globe className="h-3.5 w-3.5" />}
              active={langArabic}
              onClick={() => setLangArabic(!langArabic)}
            />

            {/* Spacer + view toggle */}
            <div className="ml-auto flex items-center gap-1 flex-shrink-0">
              {(
                [
                  { mode: 'list' as ViewMode, icon: <LayoutList className="h-4 w-4" />, label: 'List' },
                  { mode: 'split' as ViewMode, icon: <LayoutPanelLeft className="h-4 w-4" />, label: 'Split' },
                  { mode: 'map' as ViewMode, icon: <Map className="h-4 w-4" />, label: 'Map' },
                ] as const
              ).map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  title={label}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg border transition-all ${
                    viewMode === mode
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-teal-300 hover:text-teal-700'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {searchSpecialty
                ? `${searchSpecialty} Doctors in ${searchLocation || 'Qatar'}`
                : `Doctors in ${searchLocation || 'Qatar'}`}
            </h1>
            <p className="text-slate-500 mt-0.5 text-sm">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} available
              {(availableToday || topRatedOnly || videoOnly || newPatientsOnly) && (
                <span className="text-teal-600 font-medium"> · filtered</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 shadow-sm relative"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeSidebarFilters > 0 && (
                <span className="bg-teal-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {activeSidebarFilters}
                </span>
              )}
            </button>

            {/* Near Me button */}
            <button
              onClick={handleNearMe}
              disabled={geoLoading}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold transition-colors flex-shrink-0 ${
                userCoords
                  ? 'bg-teal-50 border-teal-300 text-teal-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700'
              } disabled:opacity-60`}
              title="Sort by your current location"
            >
              {geoLoading
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <Navigation className="h-4 w-4" />}
              <span className="hidden sm:inline">{userCoords ? 'Near Me ✓' : 'Near Me'}</span>
            </button>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap hidden sm:block">
                Sort
              </span>
              <div className="relative w-full sm:w-[200px]">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full appearance-none bg-white border border-slate-200 font-medium shadow-sm rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Geolocation error toast */}
            {geoError && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-3 py-2 rounded-lg z-10">
                {geoError}
              </div>
            )}
          </div>
        </div>

        {/* Mobile filter sheet */}
        {mobileFiltersOpen && (
          <div className="md:hidden mb-5">
            <SidebarFilters />
          </div>
        )}

        {/* Layout: list / split / map */}
        <div
          className={`flex gap-6 ${viewMode === 'split' ? 'lg:flex-row' : ''}`}
        >
          {/* Sidebar (list + split modes, desktop only) */}
          {viewMode !== 'map' && (
            <aside className="w-full lg:w-64 flex-shrink-0 hidden md:block">
              <div className="sticky" style={{ top: NAVBAR_HEIGHT + 148 }}>
                <SidebarFilters />
              </div>
            </aside>
          )}

          {/* Doctor list */}
          {viewMode !== 'map' && (
            <div className={`flex-1 space-y-4 min-w-0 ${viewMode === 'split' ? 'lg:max-w-[440px] xl:max-w-[520px]' : ''}`}>
              {filteredDoctors.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                  <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-700 font-semibold text-lg mb-1">No doctors found</p>
                  <p className="text-slate-400 text-sm mb-5">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-teal-600 hover:text-teal-700 font-semibold text-sm border border-teal-200 rounded-lg px-4 py-2 hover:bg-teal-50 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                filteredDoctors.map((doc) => (
                  <DoctorCard
                    key={doc.id}
                    doc={doc}
                    highlighted={selectedDocId === doc.id}
                    onHighlight={setSelectedDocId}
                    compact={viewMode === 'split'}
                  />
                ))
              )}
            </div>
          )}

          {/* Map panel */}
          {(viewMode === 'map' || viewMode === 'split') && (
            <div
              className={`${
                viewMode === 'map'
                  ? 'w-full'
                  : 'hidden lg:block flex-1'
              } sticky`}
              style={{ top: NAVBAR_HEIGHT + 148, height: 'calc(100vh - 260px)', minHeight: 480 }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center">
                    <div className="text-slate-400 text-sm flex flex-col items-center gap-2">
                      <Map className="h-8 w-8 animate-pulse" />
                      Loading map…
                    </div>
                  </div>
                }
              >
                <MapView
                  doctors={filteredDoctors}
                  selectedId={selectedDocId}
                  onSelect={setSelectedDocId}
                />
              </Suspense>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
