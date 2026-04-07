import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, User, ArrowLeft, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type Role = 'patient' | 'provider' | null;

const MEDICAL_SPECIALTIES = [
  'General Practice', 'Cardiology', 'Dermatology', 'Pediatrics',
  'Orthopedics', 'Psychiatry', 'Ophthalmology', 'Dentistry',
  'Neurology', 'Gynecology', 'Urology', 'ENT', 'Radiology', 'Oncology',
];

export default function SignupPage() {
  const { t, dir } = useI18n();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    specialty: '', licenseNumber: '', clinicName: '',
  });

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const inputClass =
    'w-full h-11 rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all';

  return (
    <div dir={dir} className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.7)_0%,_hsl(183,100%,12%)_70%)]" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-xl">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-white tracking-tight">Tabiby</span>
          </Link>
        </div>
        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase">Join today</p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Qatar's trusted<br />healthcare platform
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Connect with top-rated specialists, book instantly, and manage your health — all in one place.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Verified Doctors' },
              { value: '30+', label: 'Specialties' },
              { value: '98%', label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-white/60 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/40 text-xs">© 2026 Tabiby Health Inc.</div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
      </div>

      {/* Right form area */}
      <div className="flex-1 flex flex-col min-h-screen bg-background overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 p-6 border-b border-border/40">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold text-primary tracking-tight">Tabiby</span>
          </Link>
        </div>

        <div className="flex-1 flex items-start justify-center p-6 md:p-10 py-10">
          <div className="w-full max-w-md">

            {/* Role picker */}
            {!role && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">{t('auth.signupTitle')}</h1>
                  <p className="text-muted-foreground">{t('auth.chooseRoleSignup')}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Patient card */}
                  <button
                    onClick={() => setRole('patient')}
                    className="group flex items-center gap-5 p-5 rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-start"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-base">{t('auth.patient')}</div>
                      <div className="text-muted-foreground text-sm mt-0.5">{t('auth.patientDesc')}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>

                  {/* Provider card */}
                  <button
                    onClick={() => setRole('provider')}
                    className="group flex items-center gap-5 p-5 rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-start"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Stethoscope className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-base">{t('auth.provider')}</div>
                      <div className="text-muted-foreground text-sm mt-0.5">{t('auth.providerDesc')}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {t('auth.hasAccount')}{' '}
                  <Link to="/login" className="text-primary font-semibold hover:underline">
                    {t('auth.loginLink')}
                  </Link>
                </p>
              </div>
            )}

            {/* Signup form */}
            {role && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRole(null)}
                    className="p-2 rounded-xl hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {role === 'patient' ? t('auth.patientSignup') : t('auth.providerSignup')}
                    </h1>
                    <p className="text-muted-foreground text-sm">{t('auth.signupTitle')}</p>
                  </div>
                </div>

                {/* Role badge */}
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/8 rounded-xl w-fit">
                  {role === 'patient'
                    ? <User className="w-4 h-4 text-primary" />
                    : <Stethoscope className="w-4 h-4 text-primary" />
                  }
                  <span className="text-primary text-sm font-semibold">
                    {role === 'patient' ? t('auth.patient') : t('auth.provider')}
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{t('auth.firstName')}</label>
                      <input
                        type="text" required value={form.firstName} onChange={set('firstName')}
                        placeholder="Ahmed" className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">{t('auth.lastName')}</label>
                      <input
                        type="text" required value={form.lastName} onChange={set('lastName')}
                        placeholder="Al-Fayed" className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t('auth.email')}</label>
                    <input
                      type="email" required value={form.email} onChange={set('email')}
                      placeholder="you@example.com" className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t('auth.phone')}</label>
                    <input
                      type="tel" value={form.phone} onChange={set('phone')}
                      placeholder="+974 3XXX XXXX" className={inputClass}
                    />
                  </div>

                  {/* Provider-only fields */}
                  {role === 'provider' && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-foreground">{t('auth.specialty')}</label>
                        <select
                          required value={form.specialty} onChange={set('specialty')}
                          className={inputClass + ' cursor-pointer'}
                        >
                          <option value="" disabled>Select specialty...</option>
                          {MEDICAL_SPECIALTIES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-foreground">{t('auth.licenseNumber')}</label>
                          <input
                            type="text" required value={form.licenseNumber} onChange={set('licenseNumber')}
                            placeholder="QH-12345" className={inputClass}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-foreground">{t('auth.clinicName')}</label>
                          <input
                            type="text" value={form.clinicName} onChange={set('clinicName')}
                            placeholder="Al Ahli Hospital" className={inputClass}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t('auth.password')}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'} required
                        value={form.password} onChange={set('password')}
                        placeholder="••••••••"
                        className={inputClass + ' pr-11'}
                      />
                      <button
                        type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 end-0 px-3.5 flex items-center text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t('auth.confirmPassword')}</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'} required
                        value={form.confirmPassword} onChange={set('confirmPassword')}
                        placeholder="••••••••"
                        className={inputClass + ' pr-11'}
                      />
                      <button
                        type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute inset-y-0 end-0 px-3.5 flex items-center text-muted-foreground hover:text-foreground"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <p className="text-xs text-muted-foreground leading-relaxed">{t('auth.agreeTerms')}</p>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    {t('auth.createAccountBtn')}
                  </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  {t('auth.hasAccount')}{' '}
                  <Link to="/login" className="text-primary font-semibold hover:underline">
                    {t('auth.loginLink')}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
