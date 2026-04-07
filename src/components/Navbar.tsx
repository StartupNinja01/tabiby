import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Menu, X, Globe } from 'lucide-react';
import { useI18n, Language } from '@/lib/i18n';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عربي' },
    { code: 'hi', label: 'हिंदी' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">Tabiby</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <button onClick={() => navigate('/doctors')} className="text-foreground/80 hover:text-primary transition-colors">
            {t('nav.findDoctor')}
          </button>
          <a href="#specialties" className="text-foreground/80 hover:text-primary transition-colors">{t('nav.specialties')}</a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">{t('nav.forClinics')}</a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">{t('nav.help')}</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
            <Globe className="w-4 h-4 text-muted-foreground ml-2" />
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l.code
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center rounded-xl font-medium text-sm h-10 px-4 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {t('nav.login')}
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center justify-center rounded-xl font-medium text-sm h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
          >
            {t('nav.signup')}
          </button>
        </div>

        <button className="md:hidden p-2 text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg z-50">
          <button onClick={() => { navigate('/doctors'); setMobileOpen(false); }} className="font-medium p-2 hover:bg-accent rounded-lg text-start">
            {t('nav.findDoctor')}
          </button>
          <a href="#specialties" className="font-medium p-2 hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>{t('nav.specialties')}</a>
          <a href="#" className="font-medium p-2 hover:bg-accent rounded-lg" onClick={() => setMobileOpen(false)}>{t('nav.forClinics')}</a>
          <div className="h-px bg-border" />
          <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden w-fit">
            <Globe className="w-4 h-4 text-muted-foreground ml-2" />
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l.code
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => { navigate('/login'); setMobileOpen(false); }}
            className="w-full justify-center border-2 border-primary/20 text-primary hover:bg-primary/5 rounded-xl h-11 font-medium text-sm"
          >
            {t('nav.login')}
          </button>
          <button
            onClick={() => { navigate('/signup'); setMobileOpen(false); }}
            className="w-full justify-center bg-primary text-primary-foreground rounded-xl h-11 font-medium text-sm hover:bg-primary/90"
          >
            {t('nav.signup')}
          </button>
        </div>
      )}
    </header>
  );
}
