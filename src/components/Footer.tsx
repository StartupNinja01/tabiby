import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-primary tracking-tight">Tabiby</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.patients')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/search" className="hover:text-primary transition-colors">{t('footer.searchDoctors')}</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">{t('footer.specialties')}</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">{t('footer.insuranceInfo')}</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">{t('footer.readReviews')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.clinics')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/for-providers" className="hover:text-primary transition-colors">{t('footer.listPractice')}</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">{t('footer.providerLogin')}</Link></li>
              <li><Link to="/for-providers" className="hover:text-primary transition-colors">{t('footer.successStories')}</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">{t('footer.helpCenter')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Tabiby</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('footer.careers')}</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">{t('footer.contact')}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t('footer.press')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t('footer.copy')}</p>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link>
            <Link to="/security" className="hover:text-primary transition-colors">{t('footer.security')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
