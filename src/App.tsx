import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProvider, useI18n } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import DoctorsPage from '@/pages/DoctorsPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Layout() {
  const { dir } = useI18n();
  return (
    <div dir={dir} className="min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
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
