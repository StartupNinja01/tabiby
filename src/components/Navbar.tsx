import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Menu, X, Globe, LogOut, LayoutDashboard, ChevronDown, User } from 'lucide-react';
import { useI18n, Language } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';

// ─── User avatar dropdown ─────────────────────────────────────────────────────

function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0) || ''}`.toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 px-3 py-2 transition-colors"
      >
        {/* Avatar circle */}
        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
          {initials || <User className="w-3.5 h-3.5" />}
        </div>
        <span className="text-sm font-semibold text-foreground max-w-[100px] truncate">
          {user.firstName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute end-0 mt-2 w-52 bg-background border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/60">
            <p className="font-bold text-sm text-foreground truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <span className="inline-block mt-1 text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">
              {user.role}
            </span>
          </div>
          {/* Links */}
          <div className="py-1">
            <button
              onClick={() => { navigate('/dashboard'); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-primary" />
              My Appointments
            </button>
            <div className="h-px bg-border/60 my-1 mx-3" />
            <button
              onClick={() => { logout(); setOpen(false); navigate('/'); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عربي' },
    { code: 'hi', label: 'हिंदी' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">Tabiby</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <button onClick={() => navigate('/search')} className="text-foreground/80 hover:text-primary transition-colors">
            {t('nav.findDoctor')}
          </button>
          <button onClick={() => navigate('/search')} className="text-foreground/80 hover:text-primary transition-colors">
            {t('nav.specialties')}
          </button>
          <button onClick={() => navigate('/for-providers')} className="text-foreground/80 hover:text-primary transition-colors">
            {t('nav.forClinics')}
          </button>
          <button onClick={() => navigate('/help')} className="text-foreground/80 hover:text-primary transition-colors">
            {t('nav.help')}
          </button>
        </nav>

        {/* Desktop right section */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
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

          {/* Auth — logged in vs logged out */}
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg z-50">
          <button onClick={() => { navigate('/search'); setMobileOpen(false); }} className="font-medium p-2 hover:bg-accent rounded-lg text-start">
            {t('nav.findDoctor')}
          </button>
          <button onClick={() => { navigate('/search'); setMobileOpen(false); }} className="font-medium p-2 hover:bg-accent rounded-lg text-start">
            {t('nav.specialties')}
          </button>
          <button onClick={() => { navigate('/for-providers'); setMobileOpen(false); }} className="font-medium p-2 hover:bg-accent rounded-lg text-start">
            {t('nav.forClinics')}
          </button>
          <button onClick={() => { navigate('/help'); setMobileOpen(false); }} className="font-medium p-2 hover:bg-accent rounded-lg text-start">
            {t('nav.help')}
          </button>
          <div className="h-px bg-border" />

          {/* Language switcher */}
          <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden w-fit">
            <Globe className="w-4 h-4 text-muted-foreground ml-2" />
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l.code ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Auth mobile */}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                className="w-full flex items-center justify-center gap-2 border-2 border-primary/20 text-primary hover:bg-primary/5 rounded-xl h-11 font-medium text-sm"
              >
                <LayoutDashboard className="w-4 h-4" /> My Appointments
              </button>
              <button
                onClick={() => { logout(); setMobileOpen(false); navigate('/'); }}
                className="w-full flex items-center justify-center gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-11 font-medium text-sm"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </header>
  );
}
