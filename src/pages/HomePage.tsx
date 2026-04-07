import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Calendar, Star, ChevronRight, Stethoscope,
  HeartPulse, Baby, Brain, Eye, Bone, ShieldCheck, Clock,
  Smartphone, User, ChevronDown
} from 'lucide-react';
import { useI18n, I18nKey } from '@/lib/i18n';

const ROTATING_KEYS: I18nKey[] = [
  'hero.specialty.doctors',
  'hero.specialty.dentists',
  'hero.specialty.psychiatrists',
  'hero.specialty.pediatricians',
  'hero.specialty.opticians',
];

const CONDITION_KEYS: I18nKey[] = [
  'condition.generalCheckup',
  'condition.backPain',
  'condition.skinRash',
  'condition.anxiety',
  'condition.diabetes',
  'condition.bloodPressure',
  'condition.allergies',
  'condition.eyeExam',
  'condition.vaccination',
  'condition.teethCleaning',
  'condition.jointPain',
  'condition.headache',
  'condition.thyroid',
  'condition.heartPalpitations',
  'condition.weightManagement',
  'condition.pregnancy',
  'condition.ent',
  'condition.digestive',
  'condition.kidney',
  'condition.sleep',
];

const CITY_KEYS: I18nKey[] = [
  'city.doha',
  'city.alWakrah',
  'city.alKhor',
  'city.alRayyan',
  'city.alShahaniya',
  'city.lusail',
  'city.madinat',
  'city.mesaieed',
  'city.dukhan',
  'city.abuSamra',
  'city.alWukair',
  'city.umSalal',
  'city.muaither',
  'city.pearl',
  'city.westBay',
  'city.oldAirport',
  'city.alGharrafa',
  'city.alHilal',
  'city.alSadd',
  'city.msheireb',
];

const FEATURED_DOCTORS: Array<{
  id: number;
  name: string;
  spec: string;
  img: string;
  rating: number;
  reviews: number;
  location: string;
  avail: string;
  availColor: string;
}> = [
  {
    id: 2,
    name: 'Dr. Khalid Al-Kuwari',
    spec: 'Senior Cardiologist',
    img: '/images/doctor-1.png',
    rating: 4.8,
    reviews: 214,
    location: 'Hamad Heart Hospital, Al Rayyan',
    avail: 'Available Tomorrow',
    availColor: 'text-blue-600 bg-blue-50',
  },
  {
    id: 3,
    name: 'Dr. Mariam Al-Thani',
    spec: 'Consultant Pediatrician',
    img: '/images/doctor-2.png',
    rating: 5.0,
    reviews: 342,
    location: 'Al Ahli Hospital, Al Sadd',
    avail: 'Available Today',
    availColor: 'text-green-600 bg-green-50',
  },
  {
    id: 9,
    name: 'Dr. Hassan Al-Ansari',
    spec: 'Sports Medicine & Orthopaedic Surgeon',
    img: '/images/doctor-3.png',
    rating: 4.7,
    reviews: 112,
    location: 'Aspetar Hospital, Aspire Zone',
    avail: 'Available Tomorrow',
    availColor: 'text-blue-600 bg-blue-50',
  },
];

const STATS: Array<{ num: string; labelKey: I18nKey }> = [
  { num: '10K+', labelKey: 'stats.patients' },
  { num: '500+', labelKey: 'stats.doctors' },
  { num: '30+', labelKey: 'stats.specialties' },
  { num: '24/7', labelKey: 'stats.booking' },
];

const TESTIMONIALS: Array<{ textKey: I18nKey; authorKey: I18nKey; cityKey: I18nKey }> = [
  { textKey: 'testimonials.1.text', authorKey: 'testimonials.1.author', cityKey: 'testimonials.1.city' },
  { textKey: 'testimonials.2.text', authorKey: 'testimonials.2.author', cityKey: 'testimonials.2.city' },
  { textKey: 'testimonials.3.text', authorKey: 'testimonials.3.author', cityKey: 'testimonials.3.city' },
];

const SPECIALTIES: Array<{ icon: React.ElementType; key: I18nKey }> = [
  { icon: Stethoscope, key: 'specialties.primaryCare' },
  { icon: Eye, key: 'specialties.ophthalmology' },
  { icon: HeartPulse, key: 'specialties.cardiology' },
  { icon: Baby, key: 'specialties.pediatrics' },
  { icon: User, key: 'specialties.dermatology' },
  { icon: Brain, key: 'specialties.psychiatry' },
  { icon: Bone, key: 'specialties.orthopedics' },
  { icon: ShieldCheck, key: 'specialties.dentistry' },
];

const INSURANCE_LOGOS: Array<{ nameKey: I18nKey; src: string }> = [
  {
    nameKey: 'insurance.qlm',
    src: 'https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/676961aac032e077108dbe35_QLM.webp',
  },
  {
    nameKey: 'insurance.alkoot',
    src: 'https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/67696183a44a3f0c8a2babfb_AlKoot.webp',
  },
  {
    nameKey: 'insurance.cigna',
    src: 'https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/676961aafa73164d491f4851_cigna.webp',
  },
  {
    nameKey: 'insurance.nextcare',
    src: 'https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/676961aaf1014ea382e21720_nextcare.webp',
  },
  {
    nameKey: 'insurance.metlife',
    src: 'https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/676961aacad44a997320a9b4_MetLife.webp',
  },
  {
    nameKey: 'insurance.gig',
    src: 'https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/68c7c6b27dfcb52d24d40705_aee539d92376d7f88265ebb952e92410_gig-gulf.avif',
  },
  {
    nameKey: 'insurance.bupa',
    src: 'https://cdn.prod.website-files.com/673c89b10bb03cfb1860bed1/676961aafd46d5e054004de2_Bupa.webp',
  },
];

export default function HomePage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [condition, setCondition] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setSpecialtyIndex((prev) => (prev + 1) % ROTATING_KEYS.length);
        setAnimating(false);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (condition) params.set('specialty', condition);
    if (city) params.set('city', city);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <div className="flex flex-col gap-8 max-w-2xl">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary border-0">
                  {t('hero.badge')}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] tracking-tight">
                  {t('hero.headlineStart')}{' '}
                  <span
                    className="text-primary inline-block transition-all duration-300"
                    style={{
                      opacity: animating ? 0 : 1,
                      transform: animating ? 'translateY(-8px)' : 'translateY(0)',
                    }}
                  >
                    {t(ROTATING_KEYS[specialtyIndex])}
                  </span>
                  <br />
                  {t('hero.headlineEnd')}
                </h1>
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-lg">
                  {t('hero.sub')}
                </p>
              </div>

              {/* Search Box */}
              <div className="bg-card p-2 md:p-3 rounded-2xl shadow-xl shadow-primary/5 border border-border/50 max-w-xl flex flex-col sm:flex-row gap-2">
                {/* Condition dropdown */}
                <div className="relative flex-1 flex items-center bg-muted/50 rounded-xl px-4 py-3">
                  <Search className="w-5 h-5 text-primary/50 mr-3 flex-shrink-0" />
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-foreground font-medium appearance-none cursor-pointer"
                  >
                    <option value="" disabled>{t('hero.conditionPlaceholder')}</option>
                    {CONDITION_KEYS.map((key) => (
                      <option key={key} value={key}>{t(key)}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-primary/40 ml-1 flex-shrink-0 pointer-events-none" />
                </div>
                {/* City dropdown */}
                <div className="relative flex-1 flex items-center bg-muted/50 rounded-xl px-4 py-3">
                  <MapPin className="w-5 h-5 text-primary/50 mr-3 flex-shrink-0" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-foreground font-medium appearance-none cursor-pointer"
                  >
                    <option value="" disabled>{t('hero.locationPlaceholder')}</option>
                    {CITY_KEYS.map((key) => (
                      <option key={key} value={key}>{t(key)}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-primary/40 ml-1 flex-shrink-0 pointer-events-none" />
                </div>
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-xl font-medium h-auto py-3 px-8 sm:w-auto w-full text-base transition-colors"
                >
                  {t('hero.search')}
                </button>
              </div>

              {/* Quick Filters */}
              <div className="flex items-center gap-3 text-sm font-medium text-foreground/60 flex-wrap">
                <span>{t('hero.popular')}</span>
                {(['specialties.dermatology', 'specialties.pediatrics', 'specialties.dentistry'] as I18nKey[]).map((k) => (
                  <button key={k} onClick={handleSearch} className="hover:text-primary underline decoration-primary/30 underline-offset-4">
                    {t(k)}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:ml-auto w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-primary/5 rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-6"></div>
              <div className="absolute inset-0 bg-secondary rounded-[3rem] transform -rotate-3 scale-105 transition-transform duration-500 hover:-rotate-6"></div>
              <img
                src="/images/hero-consultation.png"
                alt="Doctor consulting with patient"
                className="relative rounded-[3rem] object-cover w-full aspect-[4/5] shadow-2xl z-10 border-4 border-background"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-border/50">
                <div className="bg-green-100 text-green-700 p-3 rounded-full">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">{t('hero.confirmed')}</p>
                  <p className="text-xs text-muted-foreground">{t('hero.confirmedTime')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Insurance Section */}
      <section className="border-y border-border/40 bg-secondary/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-bold text-primary tracking-widest uppercase mb-8">{t('insurance.title')}</p>
          <div className="overflow-hidden relative">
            <div
              className="flex items-center gap-12 md:gap-16"
              style={{
                animation: 'marquee-ltr 22s linear infinite',
                width: 'max-content',
              }}
            >
              {[...INSURANCE_LOGOS, ...INSURANCE_LOGOS].map((ins, i) => (
                <div key={`${ins.nameKey}-${i}`} className="flex flex-col items-center gap-2 flex-shrink-0">
                  <img
                    src={ins.src}
                    alt={t(ins.nameKey)}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                  <span className="text-xs font-semibold text-foreground/60 tracking-wide whitespace-nowrap">{t(ins.nameKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t('how.title')}</h2>
            <p className="text-foreground/70 text-lg">{t('how.sub')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 z-0"></div>
            {([
              { icon: Search, titleKey: 'how.step1.title', descKey: 'how.step1.desc' },
              { icon: User, titleKey: 'how.step2.title', descKey: 'how.step2.desc' },
              { icon: Calendar, titleKey: 'how.step3.title', descKey: 'how.step3.desc' },
            ] as const).map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-background group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t(step.titleKey as I18nKey)}</h3>
                <p className="text-muted-foreground">{t(step.descKey as I18nKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Specialties */}
      <section id="specialties" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t('specialties.title')}</h2>
              <p className="text-foreground/70 text-lg">{t('specialties.sub')}</p>
            </div>
            <button
              onClick={handleSearch}
              className="hidden md:flex items-center font-bold text-primary hover:text-primary/80 transition-colors text-sm"
            >
              {t('specialties.seeAll')} <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {SPECIALTIES.map((spec, i) => (
              <button
                key={i}
                onClick={handleSearch}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border/40 hover:border-primary/30 hover:shadow-md transition-all group flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <spec.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground">{t(spec.key)}</h3>
              </button>
            ))}
          </div>

          <button
            onClick={handleSearch}
            className="w-full mt-8 md:hidden border-2 border-primary/20 text-primary hover:bg-primary/5 rounded-xl h-11 font-medium text-sm"
          >
            {t('specialties.seeAll')}
          </button>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t('doctors.title')}</h2>
            <p className="text-foreground/70 text-lg">{t('doctors.sub')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_DOCTORS.map((doc) => (
              <div key={doc.id} className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border/60 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="p-6 flex gap-4 border-b border-border/40">
                  <img src={doc.img} alt={doc.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-background shadow-sm" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight">{doc.name}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{doc.spec}</p>
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {doc.rating}{' '}
                      <span className="text-muted-foreground font-normal">({doc.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-secondary/10 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-foreground/80">
                      <MapPin className="w-4 h-4 text-primary/60" />
                      {doc.location}
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <Clock className="w-4 h-4 text-primary/60" />
                      <span className={`font-medium px-2 py-0.5 rounded-md ${doc.availColor}`}>
                        {doc.avail}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/book/${doc.id}`)}
                    className="w-full mt-4 inline-flex items-center justify-center rounded-xl font-medium h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
                  >
                    {t('doctors.book')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-serif font-bold mb-2">{stat.num}</span>
                <span className="text-primary-foreground/80 font-medium">{t(stat.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t('testimonials.title')}</h2>
            <p className="text-foreground/70 text-lg">{t('testimonials.sub')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review, i) => (
              <div key={i} className="bg-card p-8 rounded-3xl shadow-sm border border-border/40 relative">
                <div className="text-primary/20 mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.439 16.09C16.852 15.228 17.069 14.28 17.069 13.25V9H11.069V3H21.069V13.25C21.069 15.352 20.397 17.382 19.167 19.144L16.321 23H14.017V21ZM5.01697 21L7.43897 16.09C7.85197 15.228 8.06897 14.28 8.06897 13.25V9H2.06897V3H12.069V13.25C12.069 15.352 11.397 17.382 10.167 19.144L7.32097 23H5.01697V21Z" />
                  </svg>
                </div>
                <p className="text-foreground/80 font-medium leading-relaxed mb-6">"{t(review.textKey)}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {t(review.authorKey).charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t(review.authorKey)}</p>
                    <p className="text-xs text-muted-foreground">{t(review.cityKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight whitespace-pre-line">
                {t('cta.title')}
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto md:mx-0">
                {t('cta.sub')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-black/80 transition-colors w-full sm:w-auto justify-center">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] leading-none text-white/70">{t('cta.appStoreLabel')}</p>
                    <p className="font-semibold leading-tight">{t('cta.appStore')}</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-black/80 transition-colors w-full sm:w-auto justify-center">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.161-.154-.26-.37-.26-.613V2.427c0-.242.099-.459.259-.613zm10.74 10.732l2.36 2.36-12.28 7.094 9.92-9.454zm.555-1.1L3.924.992l12.28 7.094-1.3-1.3zm1.644.54l3.197 1.846c.552.32.552.839 0 1.159l-3.197 1.846-2.122-2.122 2.122-2.729z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] leading-none text-white/70">{t('cta.googlePlayLabel')}</p>
                    <p className="font-semibold leading-tight">{t('cta.googlePlay')}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative z-10 md:w-1/3 flex justify-center">
              <div className="w-64 h-[500px] bg-background rounded-[3rem] border-[8px] border-primary-foreground/20 shadow-2xl relative overflow-hidden -my-24 md:-my-32 hidden md:block">
                <div className="absolute top-0 inset-x-0 h-6 bg-primary-foreground/20 rounded-b-3xl mx-16 z-20"></div>
                <div className="p-4 bg-background h-full flex flex-col">
                  <div className="h-20 bg-secondary rounded-2xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-12 bg-muted rounded-xl"></div>
                    <div className="h-12 bg-muted rounded-xl"></div>
                    <div className="h-12 bg-muted rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
