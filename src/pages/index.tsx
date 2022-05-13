import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Logo from '~/../public/images/logo.svg';
import About from '~/components/About';
import Carte from '~/components/Carte';
import Footer from '~/components/Footer';
import { AboutRecord, CarteRecord, EtapeRecord, SiteLocale } from '~/generated/sdk';
import { getApi } from '~/utils/api';
import { AvailableLocale } from '~/utils/locales';
import { serverSideTranslationProps } from '~/utils/serverSideTranslationProps';

const Home: NextPage<{
  etapes: EtapeRecord[];
  carte: CarteRecord;
  about: AboutRecord;
}> = ({ etapes, carte, about }) => {
  return (
    <div className="h-screen relative overflow-hidden m-0 p-0">
      <Head>
        <title>Atlas Cinema</title>
        <meta name="description" content="Atlas Cinema" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Logo className="fixed z-50 h-10 md:h-24 top-6 md:top-12 left-6 md:left-12" />
        <About about={about} />
        <Carte carte={carte} etapes={etapes} />
        <Footer />
      </main>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: { locale: AvailableLocale }) => {
  const translationProps = await serverSideTranslationProps(locale);
  const api = getApi();
  const [data, about, carte] = await Promise.all([
    api.getEtapes({ locale: SiteLocale[locale] }),
    api.getAbout({ locale: SiteLocale[locale] }),
    api.getCarte(),
  ]);
  return {
    props: { ...data, ...about, ...carte, ...translationProps },
  };
};

export default Home;
