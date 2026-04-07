import { useState } from 'react';
import {
  Search, MapPin, Star, Filter, List, Map, CheckCircle2,
  Video, Globe, Shield, UserPlus, ChevronDown
} from 'lucide-react';
import { useI18n, I18nKey } from '@/lib/i18n';

type SortOption = 'recommended' | 'availability' | 'rating' | 'distance';

interface Doctor {
  id: number;
  nameKey: I18nKey;
  initials: string;
  titleKey: I18nKey;
  img: string;
  rating: number;
  reviews: number;
  badgeKey: I18nKey | null;
  badgeColor: string;
  verified: boolean;
  newPatients: boolean;
  clinicKey: I18nKey;
  addrKey: I18nKey;
  distanceNum: string;
  insuranceStatus: 'in' | 'out';
  insurance: string;
  langKey: I18nKey;
  videoVisits: boolean;
  slotKeys: [I18nKey, I18nKey];
  avatarBg: string;
  firstCardHighlight: boolean;
}

const DOCTORS: Doctor[] = [
  {
    id: 1,
    nameKey: 'doctor.layla.name',
    initials: 'LH',
    titleKey: 'search.consultantDerm',
    img: '/images/dr1.png',
    rating: 4.9,
    reviews: 128,
    badgeKey: 'search.highlyRated',
    badgeColor: 'bg-amber-500 text-white',
    verified: true,
    newPatients: true,
    clinicKey: 'search.zamalekClinic',
    addrKey: 'search.zamalekAddr',
    distanceNum: '3.2',
    insuranceStatus: 'in',
    insurance: 'QLM',
    langKey: 'search.langArabicEnglishHindi',
    videoVisits: true,
    slotKeys: ['search.slot.todayPM', 'search.slot.tomorrowAM'],
    avatarBg: 'bg-teal-100 text-teal-800',
    firstCardHighlight: true,
  },
  {
    id: 2,
    nameKey: 'doctor.karim.name',
    initials: 'KM',
    titleKey: 'search.dermCosmeticSurgeon',
    img: '/images/dr2.png',
    rating: 4.2,
    reviews: 84,
    badgeKey: null,
    badgeColor: '',
    verified: true,
    newPatients: false,
    clinicKey: 'search.maadiCenter',
    addrKey: 'search.maadiAddr',
    distanceNum: '8.5',
    insuranceStatus: 'in',
    insurance: 'Al Koot',
    langKey: 'search.langArabicEnglish',
    videoVisits: false,
    slotKeys: ['search.slot.tomorrowPM', 'search.slot.thuAM'],
    avatarBg: 'bg-slate-100 text-slate-800',
    firstCardHighlight: false,
  },
  {
    id: 3,
    nameKey: 'doctor.yasmine.name',
    initials: 'YE',
    titleKey: 'search.specialistDerm',
    img: '/images/dr3.png',
    rating: 4.8,
    reviews: 215,
    badgeKey: null,
    badgeColor: '',
    verified: true,
    newPatients: true,
    clinicKey: 'search.newCairoHosp',
    addrKey: 'search.newCairoAddr',
    distanceNum: '12.1',
    insuranceStatus: 'out',
    insurance: 'Cigna',
    langKey: 'search.langArabicEnglishHindi',
    videoVisits: true,
    slotKeys: ['search.slot.friAM', 'search.slot.satPM'],
    avatarBg: 'bg-pink-100 text-pink-800',
    firstCardHighlight: false,
  },
  {
    id: 4,
    nameKey: 'doctor.omar.name',
    initials: 'OA',
    titleKey: 'search.dermatologist',
    img: '',
    rating: 4.0,
    reviews: 42,
    badgeKey: null,
    badgeColor: '',
    verified: false,
    newPatients: false,
    clinicKey: 'search.dokkiHub',
    addrKey: 'search.dokkiAddr',
    distanceNum: '1.5',
    insuranceStatus: 'in',
    insurance: 'Bupa',
    langKey: 'search.langArabic',
    videoVisits: false,
    slotKeys: ['search.slot.todayEveningPM', 'search.slot.tomorrowLunchPM'],
    avatarBg: 'bg-blue-100 text-blue-800',
    firstCardHighlight: false,
  },
];

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

export default function DoctorsPage() {
  const { t } = useI18n();
  const doctors = DOCTORS;
  const [view, setView] = useState<'list' | 'map'>('list');
  const [sort, setSort] = useState<SortOption>('recommended');
  const [availableToday, setAvailableToday] = useState(false);
  const [newPatients, setNewPatients] = useState(true);
  const [videoOnly, setVideoOnly] = useState(false);
  const [distance, setDistance] = useState('5');
  const [gender, setGender] = useState('any');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchInsurance, setSearchInsurance] = useState('');

  const sortOptions: { value: SortOption; labelKey: I18nKey }[] = [
    { value: 'recommended', labelKey: 'search.bestMatch' },
    { value: 'availability', labelKey: 'search.availabilitySort' },
    { value: 'rating', labelKey: 'search.rating' },
    { value: 'distance', labelKey: 'search.distanceSort' },
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
                <option value="">{t('search.allSpecialties')}</option>
                <option value="primaryCare">{t('specialties.primaryCare')}</option>
                <option value="ophthalmology">{t('specialties.ophthalmology')}</option>
                <option value="cardiology">{t('specialties.cardiology')}</option>
                <option value="pediatrics">{t('specialties.pediatrics')}</option>
                <option value="dermatology">{t('specialties.dermatology')}</option>
                <option value="psychiatry">{t('specialties.psychiatry')}</option>
                <option value="orthopedics">{t('specialties.orthopedics')}</option>
                <option value="dentistry">{t('specialties.dentistry')}</option>
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
                <option value="">{t('search.allCities')}</option>
                <option value="doha">{t('city.doha')}, Qatar</option>
                <option value="westBay">{t('city.westBay')}</option>
                <option value="alSadd">{t('city.alSadd')}</option>
                <option value="msheireb">{t('city.msheireb')}</option>
                <option value="alHilal">{t('city.alHilal')}</option>
                <option value="oldAirport">{t('city.oldAirport')}</option>
                <option value="alGharrafa">{t('city.alGharrafa')}</option>
                <option value="pearl">{t('city.pearl')}</option>
                <option value="lusail">{t('city.lusail')}</option>
                <option value="alRayyan">{t('city.alRayyan')}</option>
                <option value="alWakrah">{t('city.alWakrah')}</option>
                <option value="alKhor">{t('city.alKhor')}</option>
                <option value="muaither">{t('city.muaither')}</option>
                <option value="umSalal">{t('city.umSalal')}</option>
                <option value="alShahaniya">{t('city.alShahaniya')}</option>
                <option value="mesaieed">{t('city.mesaieed')}</option>
                <option value="dukhan">{t('city.dukhan')}</option>
                <option value="abuSamra">{t('city.abuSamra')}</option>
                <option value="madinat">{t('city.madinat')}</option>
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
                <option value="">{t('search.allInsurance')}</option>
                <option value="qlm">QLM</option>
                <option value="alkoot">Al Koot</option>
                <option value="cigna">Cigna</option>
                <option value="nextcare">Nextcare</option>
                <option value="metlife">MetLife</option>
                <option value="gig">GIG Gulf</option>
                <option value="bupa">Bupa</option>
              </select>
            </div>
            <button className="rounded-full bg-teal-600 hover:bg-teal-700 h-10 w-10 flex-shrink-0 flex items-center justify-center transition-colors">
              <Search className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 overflow-x-auto pb-1">
            {([
              { stateKey: 'availableToday', val: availableToday, set: setAvailableToday, labelKey: 'search.availableToday' as I18nKey },
              { stateKey: 'newPatients', val: newPatients, set: setNewPatients, labelKey: 'search.newPatients' as I18nKey },
              { stateKey: 'videoOnly', val: videoOnly, set: setVideoOnly, labelKey: 'search.videoOnly' as I18nKey },
            ] as const).map((item) => (
              <label key={item.stateKey} className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                <button
                  role="switch"
                  aria-checked={item.val}
                  onClick={() => item.set(!item.val)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${item.val ? 'bg-teal-600' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.val ? 'left-5' : 'left-1'}`} />
                </button>
                <span className="font-medium text-sm whitespace-nowrap">{t(item.labelKey)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('search.title')}</h1>
            <p className="text-slate-500 mt-1">{t('search.sub')}</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 md:flex-initial">
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{t('search.sortBy')}</span>
              <div className="relative w-full md:w-[180px]">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full appearance-none bg-white border border-slate-200 font-medium shadow-sm rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{t(o.labelKey)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="hidden sm:flex border border-slate-200 rounded-lg overflow-hidden bg-slate-100 p-1 gap-1">
              {(['list', 'map'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === v ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {v === 'list' ? <List className="h-4 w-4" /> : <Map className="h-4 w-4" />}
                  {v === 'list' ? t('search.list') : t('search.map')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 hidden md:block">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky" style={{ top: NAVBAR_HEIGHT + 130 }}>
              <div className="flex items-center gap-2 mb-6 text-slate-900 font-semibold">
                <Filter className="h-4 w-4" />
                <h2>{t('search.filters')}</h2>
              </div>

              <div className="space-y-6">
                {/* Distance */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">{t('search.distance')}</h3>
                  <div className="space-y-2">
                    {(['5', '10', '25'] as const).map((d) => (
                      <label key={d} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="distance"
                          value={d}
                          checked={distance === d}
                          onChange={() => setDistance(d)}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600">{t(`search.within${d}` as I18nKey)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Availability */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">{t('search.availability')}</h3>
                  <div className="space-y-2">
                    {([
                      { key: 'today', labelKey: 'search.today', defaultChecked: false },
                      { key: 'tomorrow', labelKey: 'search.tomorrow', defaultChecked: false },
                      { key: 'week', labelKey: 'search.thisWeek', defaultChecked: true },
                    ] as const).map((item) => (
                      <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          className="rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600">{t(item.labelKey as I18nKey)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Gender */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">{t('search.gender')}</h3>
                  <div className="space-y-2">
                    {([
                      { value: 'any', labelKey: 'search.any' },
                      { value: 'female', labelKey: 'search.female' },
                      { value: 'male', labelKey: 'search.male' },
                    ] as const).map((item) => (
                      <label key={item.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={item.value}
                          checked={gender === item.value}
                          onChange={() => setGender(item.value)}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600">{t(item.labelKey as I18nKey)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Language */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">{t('search.languages')}</h3>
                  <div className="space-y-2">
                    {([
                      { id: 'lang-ar', labelKey: 'search.langArabic', defaultChecked: true },
                      { id: 'lang-en', labelKey: 'search.langEnglish', defaultChecked: true },
                      { id: 'lang-hi', labelKey: 'search.langHindi', defaultChecked: false },
                    ] as const).map((item) => (
                      <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          className="rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-slate-600">{t(item.labelKey as I18nKey)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1 space-y-5">
            {doctors.map((doc) => (
              <div key={doc.id} className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center sm:items-start gap-3">
                    <div className="relative">
                      <div className={`h-28 w-28 rounded-full border-4 border-slate-50 shadow-sm overflow-hidden flex items-center justify-center text-2xl font-bold ${doc.avatarBg}`}>
                        {doc.img ? (
                          <img src={doc.img} alt={t(doc.nameKey)} className="w-full h-full object-cover" />
                        ) : (
                          doc.initials
                        )}
                      </div>
                      {doc.badgeKey && (
                        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap border-2 border-white px-2 py-0.5 rounded-full font-semibold ${doc.badgeColor}`}>
                          {t(doc.badgeKey)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold text-slate-900 leading-tight">{t(doc.nameKey)}</h2>
                          {doc.verified && <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-50" />}
                        </div>
                        <p className="text-slate-600 font-medium">{t(doc.titleKey)}</p>
                      </div>
                      {doc.newPatients && (
                        <span className="bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap">
                          <UserPlus className="h-3.5 w-3.5" />
                          {t('search.newPatientsLabel')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <StarRating rating={doc.rating} />
                      <span className="text-sm font-bold text-slate-700">{doc.rating}</span>
                      <span className="text-sm text-slate-500 underline decoration-slate-300 underline-offset-2 cursor-pointer">
                        ({doc.reviews} {t('search.reviews')})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4 mt-auto">
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-900">{t(doc.clinicKey)}</p>
                          <p>{t(doc.addrKey)} • <span className="text-teal-700 font-medium">{doc.distanceNum} {t('search.distanceUnit')}</span></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Shield className={`h-4 w-4 mt-0.5 flex-shrink-0 ${doc.insuranceStatus === 'in' ? 'text-green-500' : 'text-slate-400'}`} />
                        <div>
                          {doc.insuranceStatus === 'in' ? (
                            <p className="text-green-700 font-medium bg-green-50 px-1.5 py-0.5 rounded -ml-1.5 inline-block">{t('search.inNetwork')}</p>
                          ) : (
                            <p className="text-slate-700 font-medium bg-slate-100 px-1.5 py-0.5 rounded -ml-1.5 inline-block">{t('search.outNetwork')}</p>
                          )}
                          <p>
                            {doc.insuranceStatus === 'in' ? t('search.accepts') : t('search.doesNotAccept')} {doc.insurance}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Globe className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <p>{t(doc.langKey)}</p>
                      </div>
                      {doc.videoVisits && (
                        <div className="flex items-center gap-2.5 text-sm text-slate-600">
                          <Video className="h-4 w-4 text-purple-500 flex-shrink-0" />
                          <p className="text-purple-700 font-medium">{t('search.videoVisits')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Appointment Slots */}
                  <div className="w-full sm:w-64 bg-slate-50 rounded-lg border border-slate-200 p-4 flex flex-col justify-center relative overflow-hidden">
                    {doc.firstCardHighlight && <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>}
                    <h3 className="text-sm font-bold text-slate-900 text-center mb-3">{t('search.nextAvailable')}</h3>

                    <div className="space-y-2 mb-4">
                      {doc.slotKeys.map((slotKey, i) => (
                        <button
                          key={i}
                          className={`w-full justify-center py-3 px-4 rounded-md border text-sm font-medium transition-colors ${
                            i === 0 && doc.firstCardHighlight
                              ? 'bg-white border-teal-200 text-teal-800 hover:bg-teal-50'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {t(slotKey)}
                        </button>
                      ))}
                      <button className="w-full text-teal-700 hover:text-teal-800 text-sm font-medium h-8">
                        {t('search.moreTimes')}
                      </button>
                    </div>

                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md shadow-sm transition-colors">
                      {t('search.bookAppointment')}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More */}
            <div className="flex justify-center py-8">
              <button className="border border-teal-200 text-teal-700 font-semibold px-8 py-4 rounded-full hover:bg-teal-50 transition-colors">
                {t('search.loadMore')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
