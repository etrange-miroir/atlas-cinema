import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Carte from '~/components/Carte';
import Footer from '~/components/Footer';
import Nav from '~/components/Nav';
import { CarteRecord, EtapeRecord, SiteLocale } from '~/generated/sdk';
import { getApi } from '~/utils/api';
import { AvailableLocale } from '~/utils/locales';
import { serverSideTranslationProps } from '~/utils/serverSideTranslationProps';

const Home: NextPage<{
  etapes: EtapeRecord[];
  carte: CarteRecord;
}> = ({ etapes, carte }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Head>
        <title>Atlas Cinema</title>
        <meta name="description" content="Atlas Cinema" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <Carte carte={carte} etapes={etapes} />
        <Footer />
      </main>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: { locale: AvailableLocale }) => {
  const translationProps = await serverSideTranslationProps(locale);
  const api = getApi();
  const [data, carte] = await Promise.all([
    api.getEtapes({ locale: SiteLocale[locale] }),
    api.getCarte(),
  ]);
  return {
    props: { ...data, ...carte, ...translationProps },
  };
};

export default Home;
