import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search, MapPin, Star, Filter, List, CheckCircle2,
  Video, Globe, Shield, UserPlus, ChevronDown
} from 'lucide-react';
import { DOCTORS, Doctor } from '@/data/doctors';

const SPECIALTIES = [
  'General Practice', 'Cardiology', 'Dermatology', 'Pediatrics',
  'Orthopedics', 'Psychiatry', 'OB/GYN', 'Dentistry',
];

const CITIES = [
  'Doha', 'Al Wakrah', 'Al Khor', 'Al Rayyan', 'Lusail', 'Mesaieed',
];

const INSURANCE_OPTIONS = ['QLM', 'Al Koot', 'Cigna', 'Nextcare', 'MetLife', 'GIG Gulf', 'Bupa'];

type SortOption = 'recommended' | 'availability' | 'rating' | 'distance';

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

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState<SortOption>('recommended');
  const [availableToday, setAvailableToday] = useState(false);
  const [newPatientsOnly, setNewPatientsOnly] = useState(false);
  const [videoOnly, setVideoOnly] = useState(false);
  const [gender, setGender] = useState('any');
  const [searchSpecialty, setSearchSpecialty] = useState(searchParams.get('specialty') || '');
  const [searchLocation, setSearchLocation] = useState(searchParams.get('city') || '');
  const [searchInsurance, setSearchInsurance] = useState('');
  const [langArabic, setLangArabic] = useState(false);
  const [langEnglish, setLangEnglish] = useState(false);
  const [availWeek, setAvailWeek] = useState(false);

  useEffect(() => {
    setSearchSpecialty(searchParams.get('specialty') || '');
    setSearchLocation(searchParams.get('city') || '');
  }, [searchParams]);

  const filteredDoctors: Doctor[] = DOCTORS.filter((doc) => {
    if (searchSpecialty && doc.specialty !== searchSpecialty) return false;
    if (searchLocation && doc.city !== searchLocation && doc.district !== searchLocation) return false;
    if (searchInsurance && !doc.acceptedInsurance.includes(searchInsurance)) return false;
    if (videoOnly && !doc.videoVisits) return false;
    if (newPatientsOnly && !doc.newPatients) return false;
    if (availableToday && !doc.availableSlots.some((s) => s.startsWith('Today'))) return false;
    if (gender !== 'any' && doc.gender !== gender) return false;
    if (langArabic && !doc.languages.includes('Arabic')) return false;
    if (langEnglish && !doc.languages.includes('English')) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'recommended', label: 'Best Match' },
    { value: 'availability', label: 'Availability' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Distance' },
  ];

  const NAVBAR_HEIGHT = 80;

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-900 pb-16">

      {/* Sticky Search Bar */}
      <div
        className="bg-white border-b border-slate-200 shadow-sm sticky z-40"
        style={{ top: NAVBAR_HEIGHT }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex-1 w-full flex items-center bg-white border border-slate-300 rounded-full shadow-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
            {/* Specialty dropdown */}
            <div className="flex-1 flex items-center border-r border-slate-200 px-3">
              <Search className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
                className="border-0 bg-transparent outline-none px-0 h-8 font-medium text-slate-900 w-full appearance-none cursor-pointer"
              >
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            {/* City dropdown */}
            <div className="flex-1 flex items-center border-r border-slate-200 px-3 hidden sm:flex">
              <MapPin className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="border-0 bg-transparent outline-none px-0 h-8 font-medium text-slate-900 w-full appearance-none cursor-pointer"
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {/* Insurance dropdown */}
            <div className="flex-1 flex items-center px-3 hidden md:flex">
              <Shield className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={searchInsurance}
                onChange={(e) => setSearchInsurance(e.target.value)}
                className="border-0 bg-transparent outline-none px-0 h-8 font-medium text-slate-900 w-full appearance-none cursor-pointer"
              >
                <option value="">All Insurance</option>
                {INSURANCE_OPTIONS.map((ins) => (
                  <option key={ins} value={ins}>{ins}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {}}
              className="rounded-full bg-teal-600 hover:bg-teal-700 h-10 w-10 flex-shrink-0 flex items-center justify-center transition-colors"
            >
              <Search className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 overflow-x-auto pb-1">
            {([
              { key: 'availableToday', val: availableToday, set: setAvailableToday, label: 'Available Today' },
              { key: 'newPatients', val: newPatientsOnly, set: setNewPatientsOnly, label: 'New Patients' },
              { key: 'videoOnly', val: videoOnly, set: setVideoOnly, label: 'Video Visits' },
            ] as const).map((item) => (
              <label key={item.key} className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                <button
                  role="switch"
                  aria-checked={item.val}
                  onClick={() => item.set(!item.val)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${item.val ? 'bg-teal-600' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.val ? 'left-5' : 'left-1'}`} />
                </button>
                <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {searchSpecialty
                ? `${searchSpecialty} Doctors in ${searchLocation || 'Qatar'}`
                : `Doctors in ${searchLocation || 'Qatar'}`}
            </h1>
            <p className="text-slate-500 mt-1">{filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} available</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 md:flex-initial">
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Sort by</span>
              <div className="relative w-full md:w-[180px]">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full appearance-none bg-white border border-slate-200 font-medium shadow-sm rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 hidden md:block">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky" style={{ top: NAVBAR_HEIGHT + 140 }}>
              <div className="flex items-center gap-2 mb-6 text-slate-900 font-semibold">
                <Filter className="h-4 w-4" />
                <h2>Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Availability */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Availability</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'today', label: 'Today', val: availableToday, set: setAvailableToday },
                      { key: 'week', label: 'This Week', val: availWeek, set: setAvailWeek },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.val}
                          onChange={() => item.set(!item.val)}
                          className="rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Gender */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Gender</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'any', label: 'Any' },
                      { value: 'female', label: 'Female' },
                      { value: 'male', label: 'Male' },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={item.value}
                          checked={gender === item.value}
                          onChange={() => setGender(item.value)}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Language */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Language</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'lang-ar', label: 'Arabic', val: langArabic, set: setLangArabic },
                      { id: 'lang-en', label: 'English', val: langEnglish, set: setLangEnglish },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.val}
                          onChange={() => item.set(!item.val)}
                          className="rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* New Patients */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPatientsOnly}
                      onChange={() => setNewPatientsOnly(!newPatientsOnly)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm font-semibold text-slate-900">New Patients Only</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1 space-y-5">
            {filteredDoctors.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <p className="text-slate-500 text-lg mb-2">No doctors found</p>
                <p className="text-slate-400 text-sm">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setSearchSpecialty('');
                    setSearchLocation('');
                    setSearchInsurance('');
                    setVideoOnly(false);
                    setNewPatientsOnly(false);
                    setAvailableToday(false);
                    setGender('any');
                  }}
                  className="mt-4 text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center sm:items-start gap-3">
                    <Link to={`/doctor/${doc.id}`} className="relative block">
                      <div className={`h-28 w-28 rounded-full border-4 border-slate-50 shadow-sm overflow-hidden flex items-center justify-center text-2xl font-bold ${doc.avatarBg}`}>
                        {doc.img ? (
                          <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                        ) : (
                          doc.initials
                        )}
                      </div>
                      {doc.badge && (
                        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap border-2 border-white px-2 py-0.5 rounded-full font-semibold ${doc.badgeColor}`}>
                          {doc.badge}
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Link to={`/doctor/${doc.id}`} className="text-xl font-bold text-slate-900 leading-tight hover:text-teal-700 transition-colors">
                            {doc.name}
                          </Link>
                          {doc.verified && <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-50 flex-shrink-0" />}
                        </div>
                        <p className="text-slate-600 font-medium">{doc.title}</p>
                      </div>
                      {doc.newPatients && (
                        <span className="bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
                          <UserPlus className="h-3.5 w-3.5" />
                          New Patients Welcome
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <StarRating rating={doc.rating} />
                      <span className="text-sm font-bold text-slate-700">{doc.rating}</span>
                      <Link to={`/doctor/${doc.id}`} className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-teal-600">
                        ({doc.reviews} reviews)
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4 mt-auto">
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-900">{doc.clinic}</p>
                          <p>{doc.address} • <span className="text-teal-700 font-medium">{doc.distance} km away</span></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Shield className={`h-4 w-4 mt-0.5 flex-shrink-0 ${doc.insuranceStatus === 'in' ? 'text-green-500' : 'text-slate-400'}`} />
                        <div>
                          {doc.insuranceStatus === 'in' ? (
                            <p className="text-green-700 font-medium bg-green-50 px-1.5 py-0.5 rounded -ml-1.5 inline-block">In-Network</p>
                          ) : (
                            <p className="text-slate-700 font-medium bg-slate-100 px-1.5 py-0.5 rounded -ml-1.5 inline-block">Out-of-Network</p>
                          )}
                          <p>Accepts {doc.acceptedInsurance.slice(0, 2).join(', ')}{doc.acceptedInsurance.length > 2 ? ` +${doc.acceptedInsurance.length - 2}` : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Globe className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <p>{doc.languages.join(', ')}</p>
                      </div>
                      {doc.videoVisits && (
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Video className="h-4 w-4 text-purple-500 flex-shrink-0" />
                          <p className="text-purple-700 font-medium">Video Visits Available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Appointment Slots */}
                  <div className="w-full sm:w-64 bg-slate-50 rounded-lg border border-slate-200 p-4 flex flex-col justify-center relative overflow-hidden">
                    {doc.badge === 'Highly Rated' && <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>}
                    <h3 className="text-sm font-bold text-slate-900 text-center mb-3">Next Available</h3>

                    <div className="space-y-2 mb-4">
                      {doc.availableSlots.slice(0, 2).map((slot, i) => (
                        <button
                          key={i}
                          onClick={() => navigate(`/book/${doc.id}`)}
                          className="w-full justify-center py-3 px-4 rounded-md border text-sm font-medium transition-colors bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-teal-200"
                        >
                          {slot}
                        </button>
                      ))}
                      <button
                        onClick={() => navigate(`/doctor/${doc.id}`)}
                        className="w-full text-teal-700 hover:text-teal-800 text-sm font-medium h-8"
                      >
                        More times →
                      </button>
                    </div>

                    <button
                      onClick={() => navigate(`/book/${doc.id}`)}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md shadow-sm transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
