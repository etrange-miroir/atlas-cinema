import React, { useCallback } from 'react';
import { useTranslation } from 'next-i18next';

import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { Image, ResponsiveImageType } from 'react-datocms';
import SimpleBar from 'simplebar-react';

import { DispositifMobileRecord } from '~/generated/sdk';

import 'simplebar/dist/simplebar.min.css';

const DispositifMobile = ({ dispositifMobile }: { dispositifMobile: DispositifMobileRecord }) => {
  const { t } = useTranslation();
  const [aboutVisible, setAboutVisible] = useCycle(false, true);

  const handleAboutVisible = useCallback(() => {
    setAboutVisible();
  }, [setAboutVisible]);

  return (
    <div className="fixed z-50 top-12 md:top-24 right-6 md:right-12">
      <button className="text-lg text-white font-plex" onClick={handleAboutVisible}>
        {t('common:dispositive.title')}
      </button>
      <AnimatePresence>
        {aboutVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 inset-6 bottom-12 md:inset-12 px-6 md:px-8 pb-8 pt-12 md:pt-8 flex flex-col items-center bg-white text-black"
            style={{
              boxShadow: `4px 2px 4px rgba(255, 255, 255, 0.4)`,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-2xl font-plex absolute top-2 right-4"
              onClick={() => setAboutVisible()}
            >
              X
            </motion.button>
            <SimpleBar className="w-full overflow-x-hidden flex">
              <div className="flex flex-col flex-1">
                <h2 className="text-3xl md:text-5xl font-ouroboros mb-12 trunctate self-center">
                  {t('common:dispositive.title')}
                </h2>
                <div className="flex flex-col md:flex-row md:justify-center flex-1">
                  <div className="md:flex-1 max-w-screen-md mb-4 md:mb-0">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image
                      className="relative"
                      data={dispositifMobile.image.responsiveImage as ResponsiveImageType}
                    />
                  </div>
                  <div className="md:flex-1 md:ml-12 md:max-w-prose">
                    <p
                      className="text-xl font-plex mb-12 paragraph-desc"
                      dangerouslySetInnerHTML={{ __html: dispositifMobile.description }}
                    />
                    <a href={dispositifMobile.brochure.url} target="_blank" rel="noreferrer">
                      {t('common:dispositive.cta')}
                    </a>
                  </div>
                </div>
              </div>
            </SimpleBar>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DispositifMobile;
