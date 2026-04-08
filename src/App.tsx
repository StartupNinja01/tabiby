import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import InstallBanner from '@/components/InstallBanner';
import { SPECIALTY_CONFIGS } from '@/pages/SpecialtyLandingPage';

// ─── Lazy-loaded pages (each becomes its own async JS chunk) ─────────────────
const HomePage            = lazy(() => import('@/pages/HomePage'));
const SearchPage          = lazy(() => import('@/pages/SearchPage'));
const DoctorProfilePage   = lazy(() => import('@/pages/DoctorProfilePage'));
const BookingPage         = lazy(() => import('@/pages/BookingPage'));
const ConfirmationPage    = lazy(() => import('@/pages/ConfirmationPage'));
const AboutPage           = lazy(() => import('@/pages/AboutPage'));
const ForProvidersPage    = lazy(() => import('@/pages/ForProvidersPage'));
const HelpPage            = lazy(() => import('@/pages/HelpPage'));
const TermsPage           = lazy(() => import('@/pages/TermsPage'));
const PrivacyPage         = lazy(() => import('@/pages/PrivacyPage'));
const SecurityPage        = lazy(() => import('@/pages/SecurityPage'));
const LoginPage           = lazy(() => import('@/pages/LoginPage'));
const SignupPage          = lazy(() => import('@/pages/SignupPage'));
const DashboardPage       = lazy(() => import('@/pages/DashboardPage'));
const SpecialtyLandingPage = lazy(() => import('@/pages/SpecialtyLandingPage'));
const NotFound            = lazy(() => import('@/pages/not-found'));

// ─── Page skeleton — shown while a chunk is loading ──────────────────────────
function PageSkeleton() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
      <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      <p className="text-sm font-medium">Loading…</p>
    </div>
  );
}

const queryClient = new QueryClient();

function Layout() {
  const { dir } = useI18n();
  return (
    <div dir={dir} className="min-h-screen flex flex-col">
      <Routes>
        {/* Auth pages — no Navbar/Footer */}
        <Route path="/login"    element={<Suspense fallback={<PageSkeleton />}><LoginPage /></Suspense>} />
        <Route path="/signup"   element={<Suspense fallback={<PageSkeleton />}><SignupPage /></Suspense>} />

        {/* Legal pages */}
        <Route path="/terms"    element={<Suspense fallback={<PageSkeleton />}><TermsPage /></Suspense>} />
        <Route path="/privacy"  element={<Suspense fallback={<PageSkeleton />}><PrivacyPage /></Suspense>} />
        <Route path="/security" element={<Suspense fallback={<PageSkeleton />}><SecurityPage /></Suspense>} />

        {/* Main app — Navbar + Footer */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col flex-1">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<PageSkeleton />}>
                  <Routes>
                    <Route path="/"             element={<HomePage />} />
                    <Route path="/search"       element={<SearchPage />} />
                    <Route path="/doctors"      element={<SearchPage />} />
                    <Route path="/doctor/:id"   element={<DoctorProfilePage />} />
                    <Route path="/book/:id"     element={<BookingPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="/about"        element={<AboutPage />} />
                    <Route path="/for-providers" element={<ForProvidersPage />} />
                    <Route path="/help"         element={<HelpPage />} />
                    <Route path="/dashboard"    element={<DashboardPage />} />
                    {SPECIALTY_CONFIGS.map((c) => (
                      <Route key={c.slug} path={`/${c.slug}`} element={<SpecialtyLandingPage />} />
                    ))}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <I18nProvider>
            <BrowserRouter basename={base}>
              <Layout />
            </BrowserRouter>
          </I18nProvider>
        </AuthProvider>
        <Toaster />
        <InstallBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
