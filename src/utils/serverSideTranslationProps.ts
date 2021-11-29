import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

export const serverSideTranslationProps = async (
  locale: GetStaticPropsContext['locale'] | GetServerSidePropsContext['locale']
) => {
  if (locale === undefined) throw new Error('locale should not be undefined');
  // reload translations while doing developer things (e.g. introducing bugs)
  if (process.env.NODE_ENV !== 'production') {
    await i18n?.reloadResources();
  }
  return serverSideTranslations(locale, ['common'], nextI18NextConfig);
};
