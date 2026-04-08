/**
 * SpecialtyLandingPage — SEO-optimised landing page for queries like
 * "dermatologist in doha", "pediatrician west bay", etc.
 *
 * Routes (added to App.tsx):
 *   /dermatologist-doha
 *   /cardiologist-doha
 *   /pediatrician-doha
 *   /orthopedic-surgeon-doha
 *   /psychiatrist-doha
 *   /dentist-doha
 *   /obgyn-doha
 *   /general-practitioner-doha
 */

import { lazy, Suspense } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Star, MapPin, Clock, CheckCircle2, Video, ChevronRight,
  Stethoscope, UserPlus, ArrowRight,
} from 'lucide-react';
import { DOCTORS } from '@/data/doctors';
import PageMeta from '@/components/PageMeta';
import { Helmet } from 'react-helmet-async';

// ─── Config: slug → specialty metadata ────────────────────────────────────────

interface SpecialtyConfig {
  specialty: string;          // matches Doctor.specialty exactly
  slug: string;               // URL slug
  h1: string;                 // page heading
  metaTitle: string;
  metaDescription: string;
  intro: string;              // paragraph under the H1
  faqs: Array<{ q: string; a: string }>;
}

export const SPECIALTY_CONFIGS: SpecialtyConfig[] = [
  {
    specialty: 'Dermatology',
    slug: 'dermatologist-doha',
    h1: 'Best Dermatologists in Doha, Qatar',
    metaTitle: 'Top Dermatologists in Doha — Book Online | Tabiby',
    metaDescription: 'Find and book the best dermatologists in Doha, Qatar. Compare ratings, insurance acceptance, and availability. Instant online booking via Tabiby.',
    intro: 'Doha\'s leading dermatologists specialise in acne, eczema, cosmetic procedures, and skin cancer screening. Whether you need a routine skin check or advanced laser treatment, Tabiby connects you with QCHP-verified consultants across Education City, West Bay, and Al Sadd — with same-day availability.',
    faqs: [
      { q: 'How much does a dermatologist cost in Qatar?', a: 'Consultation fees typically range from QAR 300–500 depending on the specialist level and clinic. Many doctors in Doha accept QLM, Cigna, and Bupa insurance.' },
      { q: 'Can I book a video dermatology consultation?', a: 'Yes — several Tabiby-listed dermatologists offer video visits for follow-ups, prescription renewals, and minor skin concerns.' },
      { q: 'What skin conditions do dermatologists in Doha treat?', a: 'Acne, eczema, psoriasis, skin infections, moles, hair loss (alopecia), rosacea, cosmetic procedures, and skin cancer screenings.' },
    ],
  },
  {
    specialty: 'Cardiology',
    slug: 'cardiologist-doha',
    h1: 'Top Cardiologists in Doha, Qatar',
    metaTitle: 'Top Cardiologists in Doha — Book Online | Tabiby',
    metaDescription: 'Book appointments with the best cardiologists in Doha. Compare heart specialists by insurance, language, and availability. Same-day slots available on Tabiby.',
    intro: 'Qatar\'s leading cardiologists offer expert diagnosis and treatment for heart disease, hypertension, arrhythmia, and heart failure. Tabiby connects you with interventional cardiologists and cardiac imaging specialists at Hamad Heart Hospital, Qatar Cardiovascular Center, and top private clinics — all bookable online.',
    faqs: [
      { q: 'What does a cardiologist consultation cost in Qatar?', a: 'Cardiologist fees in Doha range from QAR 400–600 per visit. Most accept major insurers including QLM, Al Koot, MetLife, and Nextcare.' },
      { q: 'When should I see a cardiologist?', a: 'Seek a cardiologist if you experience chest pain, shortness of breath, palpitations, high blood pressure, or have a family history of heart disease.' },
      { q: 'Do cardiologists in Qatar offer second opinions?', a: 'Yes. All doctors on Tabiby accept second-opinion consultations. Simply mention this reason when booking.' },
    ],
  },
  {
    specialty: 'Pediatrics',
    slug: 'pediatrician-doha',
    h1: 'Best Paediatricians in Doha, Qatar',
    metaTitle: 'Top Paediatricians in Doha — Book Online | Tabiby',
    metaDescription: 'Find trusted paediatricians in Doha for your child\'s checkups, vaccinations, and specialist care. Book instantly on Tabiby with real-time availability.',
    intro: 'Tabiby lists Doha\'s most trusted paediatricians for newborn care, childhood vaccinations, developmental assessments, and specialist referrals. Our doctors are QCHP-verified and practise at Sidra Children\'s Hospital, Al Ahli Hospital, and leading private clinics across Al Sadd, Education City, and Lusail.',
    faqs: [
      { q: 'What is the paediatrician consultation fee in Qatar?', a: 'Paediatric consultations in Doha typically cost QAR 300–500. Most accept QLM, Bupa, Cigna, and GIG Gulf insurance.' },
      { q: 'Can I book a video visit for my child?', a: 'Yes — several of our paediatricians offer video consultations for non-urgent concerns, follow-ups, and general advice.' },
      { q: 'At what age does a child move from a paediatrician to an adult doctor?', a: 'Most paediatricians in Qatar see children up to 18 years of age. Some also treat young adults up to 21.' },
    ],
  },
  {
    specialty: 'Orthopedics',
    slug: 'orthopedic-surgeon-doha',
    h1: 'Best Orthopaedic Surgeons in Doha, Qatar',
    metaTitle: 'Top Orthopaedic Surgeons in Doha — Book Online | Tabiby',
    metaDescription: 'Book orthopaedic surgeons and sports medicine specialists in Doha. Knee, spine, shoulder, and sports injuries. QCHP-verified, real-time availability on Tabiby.',
    intro: 'Whether you need treatment for a sports injury, chronic joint pain, or spinal condition, Tabiby connects you with Doha\'s best orthopaedic surgeons. Our specialists at Aspetar, HMC National Orthopaedic Centre, and private clinics bring world-class expertise in arthroscopy, ACL reconstruction, and minimally invasive spine surgery.',
    faqs: [
      { q: 'How much does an orthopaedic consultation cost in Qatar?', a: 'Orthopaedic specialist consultations typically range from QAR 450–550. Most listed doctors accept QLM, MetLife, GIG Gulf, and Nextcare.' },
      { q: 'What is the difference between an orthopaedic surgeon and a sports medicine doctor?', a: 'Orthopaedic surgeons treat bone and joint conditions that may or may not require surgery. Sports medicine specialists focus specifically on injuries and performance in athletes.' },
      { q: 'How long is the waiting list for orthopaedic surgery in Qatar?', a: 'Private orthopaedic surgeons on Tabiby typically offer consultation appointments within 1–3 days. Surgical wait times vary by procedure and urgency.' },
    ],
  },
  {
    specialty: 'Psychiatry',
    slug: 'psychiatrist-doha',
    h1: 'Top Psychiatrists in Doha, Qatar',
    metaTitle: 'Top Psychiatrists in Doha — Book Online | Tabiby',
    metaDescription: 'Find psychiatrists and mental health specialists in Doha. Anxiety, depression, ADHD, and PTSD treatment. Confidential, culturally sensitive care on Tabiby.',
    intro: 'Mental health care is as important as physical health. Tabiby connects you with Qatar\'s most compassionate psychiatrists specialising in anxiety, depression, PTSD, ADHD, and mood disorders. All consultations are confidential. Video visits are available for added convenience and privacy.',
    faqs: [
      { q: 'Is mental health care confidential in Qatar?', a: 'Yes. All medical consultations in Qatar, including psychiatry, are confidential by law. Tabiby-listed psychiatrists adhere to QCHP ethical guidelines.' },
      { q: 'Can I book a psychiatrist video consultation in Doha?', a: 'Yes. Several of our psychiatrists offer secure video consultations — ideal for patients who prefer privacy or have mobility constraints.' },
      { q: 'What is the difference between a psychiatrist and a psychologist?', a: 'Psychiatrists are medical doctors who can prescribe medication. Psychologists are trained in therapy and counselling but cannot prescribe. Many patients benefit from seeing both.' },
    ],
  },
  {
    specialty: 'Dentistry',
    slug: 'dentist-doha',
    h1: 'Best Dentists & Orthodontists in Doha, Qatar',
    metaTitle: 'Top Dentists in Doha — Book Online | Tabiby',
    metaDescription: 'Book dentists, orthodontists, and dental specialists in Doha, Qatar. Invisalign, braces, cleaning, and cosmetic dentistry. Instant online booking on Tabiby.',
    intro: 'From routine cleanings and fillings to Invisalign and cosmetic smile makeovers, Tabiby\'s dental specialists cover every dental need in Doha. Our listed dentists and orthodontists practice at premium clinics in The Pearl, West Bay, and Al Sadd, with insurance acceptance across all major Qatar health plans.',
    faqs: [
      { q: 'How much does a dental consultation cost in Qatar?', a: 'Initial consultations range from QAR 200–400. Cleaning, fillings, and treatment costs vary. Most Tabiby-listed dentists accept QLM, Cigna, MetLife, and Bupa.' },
      { q: 'How long does Invisalign treatment take in Qatar?', a: 'Invisalign treatment typically takes 12–18 months depending on case complexity. Our listed orthodontists offer free initial assessments.' },
      { q: 'Are dental procedures covered by insurance in Qatar?', a: 'Basic preventive care (cleanings, X-rays) is covered by most Qatar health plans. Cosmetic procedures are generally not covered. Check with your insurer.' },
    ],
  },
  {
    specialty: 'OB/GYN',
    slug: 'obgyn-doha',
    h1: 'Best OB/GYN Doctors in Doha, Qatar',
    metaTitle: 'Top OB/GYN Specialists in Doha — Book Online | Tabiby',
    metaDescription: 'Book OB/GYN consultations in Doha for pregnancy care, gynaecological issues, and women\'s health. QCHP-verified specialists on Tabiby.',
    intro: 'Tabiby connects women across Qatar with leading obstetricians and gynaecologists for prenatal care, high-risk pregnancy management, routine gynaecological exams, and minimally invasive surgery. Our specialists at Sidra Medicine Women\'s Health and top private clinics offer compassionate, culturally sensitive care.',
    faqs: [
      { q: 'How much does an OB/GYN consultation cost in Qatar?', a: 'Fees range from QAR 400–600. Prenatal packages vary by clinic. Most accept QLM, Cigna, MetLife, and Bupa.' },
      { q: 'When should I book my first prenatal appointment?', a: 'Ideally within the first 8–10 weeks of pregnancy. Early care is important for monitoring and establishing your birth plan.' },
      { q: 'Can I choose a female OB/GYN doctor in Qatar?', a: 'Yes. All doctors listed on Tabiby\'s OB/GYN page are female specialists who provide culturally respectful care.' },
    ],
  },
  {
    specialty: 'General Practice',
    slug: 'general-practitioner-doha',
    h1: 'General Practitioners & Family Doctors in Doha, Qatar',
    metaTitle: 'General Practitioners in Doha — Book Online | Tabiby',
    metaDescription: 'Book a GP or family doctor in Doha for checkups, chronic disease management, vaccinations, and referrals. Same-day appointments on Tabiby.',
    intro: 'A great GP is the cornerstone of good health. Tabiby\'s general practitioners in Doha offer comprehensive primary care for all ages — from routine checkups and travel vaccinations to chronic disease management and sick visits. Many offer same-day and video appointments.',
    faqs: [
      { q: 'What is the GP consultation fee in Qatar?', a: 'GP fees in Doha typically range from QAR 150–250 — among the most affordable specialists on Tabiby. Most accept all major insurers.' },
      { q: 'Can a GP provide sick leave certificates in Qatar?', a: 'Yes. Licensed GPs in Qatar can issue official sick leave certificates accepted by employers and government bodies.' },
      { q: 'Can I get a referral to a specialist from a GP on Tabiby?', a: 'Yes. Your GP can provide specialist referral letters directly. Many insurers require a GP referral before covering specialist visits.' },
    ],
  },
];

export function getSpecialtyConfig(slug: string): SpecialtyConfig | undefined {
  return SPECIALTY_CONFIGS.find((c) => c.slug === slug);
}

// ─── Doctor mini-card ────────────────────────────────────────────────────────

function DoctorCard({ doc }: { doc: (typeof DOCTORS)[0] }) {
  const navigate = useNavigate();
  const nextSlot = doc.availableSlots[0];
  const isToday = nextSlot?.startsWith('Today');

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-teal-200 transition-all flex flex-col overflow-hidden group">
      <div className={`h-1.5 ${isToday ? 'bg-gradient-to-r from-green-400 to-teal-500' : 'bg-gradient-to-r from-slate-200 to-slate-300'}`} />
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className={`h-16 w-16 rounded-xl overflow-hidden flex items-center justify-center font-bold text-xl flex-shrink-0 ${doc.avatarBg}`}>
            {doc.img ? <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" /> : doc.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              <h3 className="font-bold text-slate-900 text-sm leading-tight">{doc.name}</h3>
              {doc.verified && <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />}
            </div>
            <p className="text-teal-700 text-xs font-semibold">{doc.title}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800">{doc.rating}</span>
              <span className="text-xs text-slate-400">({doc.reviews})</span>
            </div>
          </div>
        </div>

        {/* Location & language */}
        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{doc.clinic} · {doc.district}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          {doc.videoVisits && (
            <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-100">
              <Video className="h-2.5 w-2.5" /> Video
            </span>
          )}
          {doc.newPatients && (
            <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-100">
              <UserPlus className="h-2.5 w-2.5" /> New Patients
            </span>
          )}
        </div>

        {/* Next slot */}
        {nextSlot && (
          <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold ${isToday ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
            <Clock className="h-3 w-3 flex-shrink-0" />
            {isToday ? 'Available Today' : nextSlot}
          </div>
        )}

        {/* Fee */}
        <p className="text-xs text-slate-400">QAR {doc.fee} · {doc.insuranceStatus === 'in' ? '✓ In-Network' : 'Out-of-Network'}</p>

        {/* CTAs */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => navigate(`/doctor/${doc.id}`)}
            className="flex-1 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-700 text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={() => navigate(`/book/${doc.id}`)}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SpecialtyLandingPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, ''); // strip leading slash
  const navigate = useNavigate();

  const config = slug ? getSpecialtyConfig(slug) : undefined;

  // Fallback to search if slug not recognised
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Stethoscope className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-slate-800 mb-2">Specialty not found</h1>
          <Link to="/search" className="text-teal-600 hover:underline">Browse all doctors →</Link>
        </div>
      </div>
    );
  }

  const doctors = DOCTORS.filter((d) => d.specialty === config.specialty);

  // JSON-LD: BreadcrumbList
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tabiby.co/' },
      { '@type': 'ListItem', position: 2, name: 'Find a Doctor', item: 'https://tabiby.co/search' },
      { '@type': 'ListItem', position: 3, name: config.h1, item: `https://tabiby.co/${config.slug}` },
    ],
  };

  // JSON-LD: MedicalWebPage
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: config.metaTitle,
    description: config.metaDescription,
    url: `https://tabiby.co/${config.slug}`,
    about: { '@type': 'MedicalSpecialty', name: config.specialty },
    audience: { '@type': 'Patient' },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageMeta
        title={config.metaTitle}
        description={config.metaDescription}
        canonical={`https://tabiby.co/${config.slug}`}
        jsonLd={[breadcrumbLd, webPageLd]}
      />

      {/* Structured breadcrumb — also rendered as HTML for UX */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/search" className="hover:text-teal-600 transition-colors">Find a Doctor</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 font-medium">{config.specialty}</span>
          </nav>
        </div>
      </div>

      {/* Hero band */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {config.h1}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-6">
            {config.intro}
          </p>
          <div className="flex items-center gap-4 flex-wrap text-sm text-slate-500">
            <span className="flex items-center gap-1.5 font-semibold text-teal-700">
              <CheckCircle2 className="h-4 w-4" /> {doctors.length} doctors available
            </span>
            <span>·</span>
            <span>QCHP-verified specialists</span>
            <span>·</span>
            <span>Instant online booking</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Doctor grid — 2/3 width */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {doctors.length} {config.specialty} Specialist{doctors.length !== 1 ? 's' : ''} in Doha
              </h2>
              <button
                onClick={() => navigate(`/search?specialty=${encodeURIComponent(config.specialty)}`)}
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {doctors.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Stethoscope className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No doctors currently listed for this specialty.</p>
                <Link to="/search" className="mt-4 inline-block text-teal-600 font-semibold hover:underline text-sm">
                  Browse all doctors →
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {doctors.map((d) => <DoctorCard key={d.id} doc={d} />)}
              </div>
            )}
          </div>

          {/* Sidebar — 1/3 width */}
          <div className="space-y-6">
            {/* Quick search CTA */}
            <div className="bg-teal-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Not sure who to see?</h3>
              <p className="text-teal-100 text-sm mb-4">
                Use our smart filters to find the right specialist by insurance, language, and location.
              </p>
              <button
                onClick={() => navigate(`/search?specialty=${encodeURIComponent(config.specialty)}`)}
                className="w-full bg-white text-teal-700 font-bold py-3 rounded-xl hover:bg-teal-50 transition-colors text-sm"
              >
                Search with filters →
              </button>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {config.faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="font-semibold text-slate-800 text-sm mb-1">{faq.q}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    {i < config.faqs.length - 1 && <div className="mt-4 border-t border-slate-100" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              {[
                { icon: '🏥', text: 'All doctors QCHP-verified' },
                { icon: '⭐', text: 'Real patient reviews' },
                { icon: '🔒', text: 'Secure, private booking' },
                { icon: '📅', text: 'Free cancellation up to 24h' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <span className="text-base">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
