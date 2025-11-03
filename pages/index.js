import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HomeHero from '../components/Sections/HomeHero';
import HomeForWhom from '../components/Sections/HomeForWhom';
import HomeServiceIntro from '../components/Sections/HomeServiceIntro';
import HomeFounderIntro from '../components/Sections/HomeFounderIntro';

export default function HomePage() {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <HomeHero />
      <HomeForWhom />
      <HomeServiceIntro />
      <HomeFounderIntro />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
}
