import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import { AnimatePresence, motion, useCycle } from 'framer-motion';

import EtapeSVG from '~/../public/images/etape.svg';
import OffSVG from '~/../public/images/off.svg';
import { useChangeLocale, useCurrentLocale } from '~/utils/locales';

const Footer = () => {
  const { t } = useTranslation();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  const [captionVisible, setCaptionVisible] = useCycle(false, true);

  const handleEn = useCallback(() => {
    changeLocale('en');
  }, [changeLocale]);

  const handleFr = useCallback(() => {
    changeLocale('fr');
  }, [changeLocale]);

  const handleCaptionClick = useCallback(() => {
    setCaptionVisible();
  }, [setCaptionVisible]);

  return (
    <footer className="fixed z-50 w-screen bottom-0 h-16 flex justify-between items-center px-6 md:px-12">
      <div className="text-lg text-white">
        <button
          className={`font-plex ${currentLocale === 'fr' ? 'underline' : 'no-underline'}`}
          onClick={handleFr}
        >
          FR
        </button>
        <span className="mx-3">/</span>
        <button
          className={`font-plex ${currentLocale === 'en' ? 'underline' : 'no-underline'}`}
          onClick={handleEn}
        >
          EN
        </button>
      </div>
      <button className="text-lg text-white font-plex" onClick={handleCaptionClick}>
        {t('common:caption.title')}
      </button>
      <AnimatePresence>
        {captionVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 md:bottom-12 right-0 md:right-12 flex flex-col md:flex-row p-8 bg-black text-white"
            style={{
              boxShadow: `4px 2px 4px rgba(64, 64, 64, 0.1)`,
            }}
          >
            <div className="flex flex-row mb-8 md:mb-0 mr-0 md:mr-8 shrink">
              <EtapeSVG className="w-20 fill-white mr-4" />
              <div className="flex flex-col">
                <span className="text-2xl font-plex font-bold mb-2">
                  {t('common:caption.etape.title')}
                </span>
                <span className="text-md font-plex max-w-[250px]">
                  {t('common:caption.etape.subtitle')}
                </span>
              </div>
            </div>
            <div className="flex flex-row">
              <OffSVG className="w-20 fill-white mr-4" />
              <div className="flex flex-col">
                <span className="text-2xl font-plex font-bold mb-2">
                  {t('common:caption.off.title')}
                </span>
                <span className="text-md font-plex max-w-[300px]">
                  {t('common:caption.off.subtitle')}
                </span>
              </div>
            </div>
            <button
              className="text-2xl font-plex absolute top-2 right-4"
              onClick={() => setCaptionVisible()}
            >
              X
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
