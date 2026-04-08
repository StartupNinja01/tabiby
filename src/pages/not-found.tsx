import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope, Home, Search, ArrowRight,
  HeartPulse, Baby, Brain, Eye, Bone, ShieldCheck, User, Thermometer,
} from 'lucide-react';

const QUICK_SPECIALTIES = [
  { label: 'General Practice', icon: HeartPulse, slug: 'general-practitioner-doha' },
  { label: 'Dermatology',      icon: ShieldCheck, slug: 'dermatologist-doha' },
  { label: 'Pediatrics',       icon: Baby,        slug: 'pediatrician-doha' },
  { label: 'Neurology',        icon: Brain,       slug: 'neurologist-doha' },
  { label: 'Ophthalmology',    icon: Eye,         slug: 'ophthalmologist-doha' },
  { label: 'Orthopedics',      icon: Bone,        slug: 'orthopedic-surgeon-doha' },
  { label: 'Gynecology',       icon: User,        slug: 'gynecologist-doha' },
  { label: 'Internal Medicine', icon: Thermometer, slug: 'internal-medicine-doha' },
];

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-background">

      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center">
          <Stethoscope className="w-14 h-14 text-primary" />
        </div>
        <span className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
          404
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-center">
        Page not found
      </h1>
      <p className="text-muted-foreground text-center max-w-sm mb-10 text-lg leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      {/* Primary CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-16">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
        <button
          onClick={() => navigate('/search')}
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border-2 border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
        >
          <Search className="w-4 h-4" />
          Find a Doctor
        </button>
      </div>

      {/* Specialty quick links */}
      <div className="w-full max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center mb-5">
          Browse by Specialty
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_SPECIALTIES.map(({ label, icon: Icon, slug }) => (
            <Link
              key={slug}
              to={`/${slug}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">{label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View all doctors in Doha <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
