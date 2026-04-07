import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Shield, Users, Globe, Award, ArrowRight } from 'lucide-react';

const TEAM = [
  {
    name: 'Abdullah Al-Mansoori',
    title: 'CEO & Co-Founder',
    initials: 'AM',
    bg: 'bg-teal-100 text-teal-800',
    bio: 'Former healthcare technology executive with 15 years experience scaling digital health platforms across the GCC.',
  },
  {
    name: 'Dr. Sara Al-Thani',
    title: 'Chief Medical Officer',
    initials: 'ST',
    bg: 'bg-blue-100 text-blue-800',
    bio: 'Board-certified physician and health systems innovator who has treated thousands of patients at Hamad Medical Corporation.',
  },
  {
    name: 'Khalid Hassan',
    title: 'CTO & Co-Founder',
    initials: 'KH',
    bg: 'bg-violet-100 text-violet-800',
    bio: 'Software engineer and systems architect who previously built infrastructure at regional fintech and healthtech startups.',
  },
  {
    name: 'Nour Al-Kuwari',
    title: 'Head of Product',
    initials: 'NK',
    bg: 'bg-amber-100 text-amber-800',
    bio: 'Patient experience designer focused on reducing friction in Qatar\'s healthcare booking journey.',
  },
];

const VALUES = [
  {
    icon: Heart,
    title: 'Patient-First',
    desc: 'Every decision we make starts with the patient. We build features that genuinely improve health outcomes and reduce stress.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    desc: 'Every doctor on Tabiby is verified, licensed, and reviewed. We take data privacy seriously under Qatar\'s data protection framework.',
  },
  {
    icon: Globe,
    title: 'Culturally Grounded',
    desc: 'We built Tabiby for Qatar — with support for Arabic, English, and Hindi, and sensitivity to local healthcare norms and values.',
  },
  {
    icon: Award,
    title: 'Clinical Excellence',
    desc: 'We partner only with qualified, experienced providers and surface patient reviews transparently so you can choose with confidence.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(183,100%,25%)_0%,_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Stethoscope className="w-4 h-4" /> About Tabiby
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-3xl mx-auto">
            Qatar's Doctor Discovery Platform
          </h1>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto leading-relaxed">
            We're building the infrastructure for modern healthcare access in Qatar — connecting patients with the right doctors, faster and more transparently.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                Tabiby was founded in Doha with a single purpose: to make finding and booking a trusted doctor in Qatar as simple as possible.
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                Qatar's healthcare system is world-class, but navigating it — finding the right specialist, checking insurance coverage, and booking in your language — has always been harder than it should be. We're changing that.
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed">
                By combining verified doctor profiles, real-time availability, insurance filtering, and multilingual support, Tabiby gives every patient in Qatar the clarity and confidence to take charge of their health.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '10,000+', label: 'Patients Served' },
                { num: '500+', label: 'Verified Doctors' },
                { num: '30+', label: 'Specialties' },
                { num: '98%', label: 'Satisfaction Rate' },
              ].map((stat) => (
                <div key={stat.label} className="bg-secondary/50 rounded-2xl p-6 text-center border border-border/40">
                  <div className="text-3xl font-serif font-bold text-primary mb-1">{stat.num}</div>
                  <div className="text-foreground/60 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-foreground/70 text-lg">Our values guide every feature we build and every decision we make.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-card rounded-2xl p-6 border border-border/40 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">The Team</h2>
            <p className="text-foreground/70 text-lg">Built by people who care deeply about healthcare in Qatar.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-card rounded-2xl p-6 border border-border/40 shadow-sm text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ${member.bg}`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qatar Focus */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Built for Qatar</h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              Tabiby is proud to be a Qatar-based company supporting Qatar's National Vision 2030 for a world-class healthcare system. We comply with all Qatar National Health Authority (QNHA) regulations, the National Health Insurance (Seha) framework, and the Qatar Data Protection law.
            </p>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Our platform supports Arabic, English, and Hindi — reflecting the rich, multilingual communities that make up Qatar. We are committed to making healthcare accessible for Qatari nationals, expatriates, and visitors alike.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Join us in transforming healthcare in Qatar
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Whether you're a patient, a doctor, or a clinic — we'd love to have you on Tabiby.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors shadow-sm"
            >
              Find a Doctor <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/for-providers"
              className="inline-flex items-center gap-2 bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/30 transition-colors border border-white/30"
            >
              Join as a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
