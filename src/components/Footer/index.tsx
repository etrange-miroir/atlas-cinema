import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import { useChangeLocale, useCurrentLocale } from '~/utils/locales';

const Footer = () => {
  const { t } = useTranslation();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  const handleEn = useCallback(() => {
    changeLocale('en');
  }, [changeLocale]);

  const handleFr = useCallback(() => {
    changeLocale('fr');
  }, [changeLocale]);

  return (
    <footer className="fixed w-screen bottom-0 h-16 flex justify-between items-center px-12">
      <div className="text-lg text-white">
        <button
          className={currentLocale === 'fr' ? 'underline' : 'no-underline'}
          onClick={handleFr}
        >
          FR
        </button>
        <span className="mx-3">/</span>
        <button
          className={currentLocale === 'en' ? 'underline' : 'no-underline'}
          onClick={handleEn}
        >
          EN
        </button>
      </div>
      <span className="text-lg text-white">{t('common:caption').toUpperCase()}</span>
    </footer>
  );
};

export default Footer;
