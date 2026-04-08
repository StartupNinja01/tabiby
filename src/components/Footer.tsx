import { Link } from 'react-router-dom';
import { Stethoscope, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const SPECIALTIES = [
  { label: 'General Practice',  slug: 'general-practitioner-doha' },
  { label: 'Dermatology',       slug: 'dermatologist-doha' },
  { label: 'Pediatrics',        slug: 'pediatrician-doha' },
  { label: 'Neurology',         slug: 'neurologist-doha' },
  { label: 'Ophthalmology',     slug: 'ophthalmologist-doha' },
  { label: 'Orthopedics',       slug: 'orthopedic-surgeon-doha' },
  { label: 'Gynecology',        slug: 'gynecologist-doha' },
  { label: 'Internal Medicine', slug: 'internal-medicine-doha' },
];

const SOCIALS = [
  { icon: Twitter,   href: 'https://twitter.com/tabibyhealth',   label: 'Twitter' },
  { icon: Linkedin,  href: 'https://linkedin.com/company/tabiby', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/tabibyhealth',  label: 'Instagram' },
  { icon: Facebook,  href: 'https://facebook.com/tabibyhealth',   label: 'Facebook' },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-primary tracking-tight">Tabiby</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">{t('footer.tagline')}</p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Browse by Specialty */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="font-bold mb-4 text-sm">Browse by Specialty</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-muted-foreground">
              {SPECIALTIES.map(({ label, slug }) => (
                <li key={slug}>
                  <Link to={`/${slug}`} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patients */}
          <div>
            <h4 className="font-bold mb-4 text-sm">{t('footer.patients')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/search"    className="hover:text-primary transition-colors">{t('footer.searchDoctors')}</Link></li>
              <li><Link to="/search"    className="hover:text-primary transition-colors">{t('footer.insuranceInfo')}</Link></li>
              <li><Link to="/search"    className="hover:text-primary transition-colors">{t('footer.readReviews')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">My Appointments</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about"         className="hover:text-primary transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/for-providers" className="hover:text-primary transition-colors">{t('footer.listPractice')}</Link></li>
              <li><Link to="/help"          className="hover:text-primary transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to="/help"          className="hover:text-primary transition-colors">{t('footer.helpCenter')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t('footer.copy')}</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/terms"    className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
            <Link to="/privacy"  className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
            <Link to="/security" className="hover:text-primary transition-colors">{t('footer.security')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
