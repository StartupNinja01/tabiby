import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import DoctorProfilePage from '@/pages/DoctorProfilePage';
import BookingPage from '@/pages/BookingPage';
import ConfirmationPage from '@/pages/ConfirmationPage';
import AboutPage from '@/pages/AboutPage';
import ForProvidersPage from '@/pages/ForProvidersPage';
import HelpPage from '@/pages/HelpPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import SecurityPage from '@/pages/SecurityPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Layout() {
  const { dir } = useI18n();
  return (
    <div dir={dir} className="min-h-screen flex flex-col">
      <Routes>
        {/* Auth pages — no Navbar/Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Legal/Policy pages — standalone with own header */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/security" element={<SecurityPage />} />

        {/* Main app — Navbar + Footer */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col flex-1">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/doctors" element={<SearchPage />} />
                  <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                  <Route path="/book/:id" element={<BookingPage />} />
                  <Route path="/confirmation" element={<ConfirmationPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/for-providers" element={<ForProvidersPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
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
        <I18nProvider>
          <BrowserRouter basename={base}>
            <Layout />
          </BrowserRouter>
        </I18nProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
