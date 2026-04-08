import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, User, ArrowLeft, Eye, EyeOff, ChevronRight, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useAuth, type UserRole } from '@/lib/auth';

type Role = UserRole | null;

export default function LoginPage() {
  const { t, dir } = useI18n();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setLoading(true);
    setError('');
    try {
      await login(email, password, role);
      navigate(role === 'provider' ? '/for-providers' : '/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <div>
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3">Trusted by</p>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-bold text-white">1M+</span>
              <span className="text-white/80 text-lg mb-2">patients across MENA</span>
            </div>
          </div>
          <blockquote className="border-l-2 border-white/30 pl-5">
            <p className="text-white/90 text-lg leading-relaxed italic">
              "Tabiby made finding a specialist so easy. I booked my appointment in less than two minutes."
            </p>
            <footer className="mt-3 text-white/60 font-medium">— Noor A., Doha</footer>
          </blockquote>
          <div className="flex gap-6">
            {[
              { value: '500+', label: 'Verified Doctors' },
              { value: '30+', label: 'Specialties' },
              { value: '98%', label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white/40 text-xs">© 2026 Tabiby Health Inc.</div>
        {/* decorative circles */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
      </div>

      {/* Right form area */}
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 p-6 border-b border-border/40">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold text-primary tracking-tight">Tabiby</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">

            {/* Role picker */}
            {!role && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">{t('auth.loginTitle')}</h1>
                  <p className="text-muted-foreground">{t('auth.chooseRoleLogin')}</p>
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
                  {t('auth.noAccount')}{' '}
                  <Link to="/signup" className="text-primary font-semibold hover:underline">
                    {t('auth.signupLink')}
                  </Link>
                </p>
              </div>
            )}

            {/* Login form */}
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
                      {role === 'patient' ? t('auth.patientLogin') : t('auth.providerLogin')}
                    </h1>
                    <p className="text-muted-foreground text-sm">{t('auth.loginTitle')}</p>
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
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">{t('auth.email')}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-11 rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">{t('auth.password')}</label>
                      <button type="button" className="text-xs text-primary hover:underline font-medium">
                        {t('auth.forgotPassword')}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 rounded-xl border border-border bg-background px-4 pr-11 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 end-0 px-3.5 flex items-center text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {t('auth.loginBtn')}
                  </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  {t('auth.noAccount')}{' '}
                  <Link to="/signup" className="text-primary font-semibold hover:underline">
                    {t('auth.signupLink')}
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
