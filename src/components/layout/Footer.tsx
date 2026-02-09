'use client';

import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Velora" className="h-10 w-auto" />
            <div>
              <h3 className="text-xl font-bold">Velora ID</h3>
              <p className="text-gray-400 text-sm">{t('tagline')}</p>
            </div>
          </div>

          <div className="text-gray-400 text-sm">
            © {currentYear} {t('copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
