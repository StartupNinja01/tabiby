import { Link } from 'react-router-dom';
import {
  Calendar, Star, Users, TrendingUp, Shield, BarChart3, Smartphone,
  CheckCircle, ArrowRight, Stethoscope, Globe, Clock
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Calendar,
    title: 'Smart Online Scheduling',
    desc: 'Let patients book, reschedule, and cancel 24/7. Reduce no-shows with automated reminders and fill your calendar efficiently.',
  },
  {
    icon: Users,
    title: 'Reach New Patients',
    desc: 'Get discovered by the thousands of patients searching Tabiby daily. Build your reputation with verified patient reviews.',
  },
  {
    icon: Shield,
    title: 'Insurance Verification',
    desc: 'Easily display which insurance plans you accept. Patients know upfront, reducing billing disputes and administrative overhead.',
  },
  {
    icon: BarChart3,
    title: 'Practice Analytics',
    desc: 'Track appointment trends, patient demographics, and booking patterns with a clean dashboard built for clinicians.',
  },
  {
    icon: Globe,
    title: 'Multilingual Reach',
    desc: 'Your profile is served in Arabic, English, and Hindi — reaching all communities across Qatar.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Management',
    desc: 'Manage your availability, view upcoming appointments, and communicate with patients from any device.',
  },
];

const PLANS = [
  {
    name: 'Basic',
    price: 'Free',
    period: '',
    desc: 'Perfect for getting started',
    features: [
      'Doctor profile listing',
      'Up to 20 appointments/month',
      'Patient reviews',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Professional',
    price: 'QAR 299',
    period: '/month',
    desc: 'For growing practices',
    features: [
      'Everything in Basic',
      'Unlimited appointments',
      'Video consultation tools',
      'Advanced analytics dashboard',
      'Priority search placement',
      'Dedicated account manager',
      'Custom availability rules',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Clinic',
    price: 'QAR 799',
    period: '/month',
    desc: 'For multi-doctor clinics',
    features: [
      'Everything in Professional',
      'Up to 10 doctor profiles',
      'Clinic branding & landing page',
      'Team scheduling calendar',
      'EHR integration support',
      'API access',
      'Priority 24/7 support',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    quote: 'Since joining Tabiby, my appointment book has been consistently full. The platform handles all the scheduling headaches so I can focus on patient care.',
    name: 'Dr. Khalid Al-Kuwari',
    title: 'Cardiologist, Hamad Heart Hospital',
    initials: 'KK',
    bg: 'bg-blue-100 text-blue-800',
  },
  {
    quote: 'My practice went from 60% to 95% capacity within two months of listing on Tabiby. The patient reviews have been invaluable for building trust.',
    name: 'Dr. Layla Hassan',
    title: 'Dermatologist, Sidra Medicine',
    initials: 'LH',
    bg: 'bg-teal-100 text-teal-800',
  },
];

export default function ForProvidersPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(183,100%,25%)_0%,_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Stethoscope className="w-4 h-4" /> For Healthcare Providers
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Grow Your Practice with Tabiby
            </h1>
            <p className="text-primary-foreground/80 text-xl leading-relaxed mb-8 max-w-2xl">
              Join 500+ doctors and clinics already using Tabiby to fill their calendars, build their reputation, and deliver better patient experiences in Qatar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors shadow-sm text-lg"
              >
                Join Tabiby Free <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-colors border border-white/30 text-lg"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-y border-border/40 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '500+', label: 'Verified Doctors' },
              { num: '10,000+', label: 'Monthly Bookings' },
              { num: '98%', label: 'Patient Satisfaction' },
              { num: '24/7', label: 'Online Booking' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-primary mb-1">{s.num}</div>
                <div className="text-muted-foreground text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Everything You Need to Thrive</h2>
            <p className="text-foreground/70 text-lg">Powerful tools designed specifically for Qatar's healthcare providers.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Getting Started is Simple</h2>
            <p className="text-foreground/70 text-lg">Be live on Tabiby in under 30 minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Add your photo, specialty, clinic location, accepted insurance, and available hours.' },
              { step: '02', title: 'Get Verified', desc: 'Submit your Qatar medical license. Our team reviews and verifies your credentials within 48 hours.' },
              { step: '03', title: 'Start Receiving Bookings', desc: 'Go live on Tabiby. Patients can discover and book you instantly — you get notified immediately.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-6xl font-serif font-bold text-primary/20 mb-4">{s.step}</div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Doctors Love Tabiby</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-8 border border-border/40 shadow-sm">
                <div className="text-primary/20 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L16.439 16.09C16.852 15.228 17.069 14.28 17.069 13.25V9H11.069V3H21.069V13.25C21.069 15.352 20.397 17.382 19.167 19.144L16.321 23H14.017V21ZM5.017 21L7.439 16.09C7.852 15.228 8.069 14.28 8.069 13.25V9H2.069V3H12.069V13.25C12.069 15.352 11.397 17.382 10.167 19.144L7.321 23H5.017V21Z" />
                  </svg>
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${t.bg}`}>{t.initials}</div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-foreground/70 text-lg">Start for free. Upgrade when you're ready to grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border shadow-sm flex flex-col ${
                  plan.highlight
                    ? 'bg-primary text-primary-foreground border-primary ring-4 ring-primary/20 scale-105'
                    : 'bg-card border-border/40'
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs font-bold tracking-widest uppercase mb-3 text-primary-foreground/70">Most Popular</div>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-serif font-bold ${plan.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>{plan.price}</span>
                  {plan.period && <span className={plan.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-primary-foreground' : 'text-teal-500'}`} />
                      <span className={plan.highlight ? 'text-primary-foreground/90' : 'text-foreground/80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`w-full text-center font-bold py-3 rounded-xl transition-colors ${
                    plan.highlight
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to grow your practice?</h2>
          <p className="text-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Join Tabiby today and connect with thousands of patients searching for doctors in Qatar.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-10 py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-sm text-lg"
          >
            Join Tabiby Free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-muted-foreground text-sm mt-4">No credit card required. Free forever plan available.</p>
        </div>
      </section>
    </div>
  );
}
