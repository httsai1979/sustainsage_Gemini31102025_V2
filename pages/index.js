import MainLayout from '@/components/layout/MainLayout';
import ICFNotice from '@/components/legal/ICFNotice';
import StickyCTA from '@/components/StickyCTA';
import HomeFounderIntro from '@/components/Sections/HomeFounderIntro';
import HomeForWhom from '@/components/Sections/HomeForWhom';
import HomeHero from '@/components/Sections/HomeHero';
import HomeServiceIntro from '@/components/Sections/HomeServiceIntro';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SITE_URL } from '@/lib/seo';
import nextI18NextConfig from '../next-i18next.config.js';

const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: 'SustainSage Coaching',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SustainSage Group Ltd.',
    url: SITE_URL,
  },
];

function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeForWhom />
      <HomeServiceIntro />
      <HomeFounderIntro />
      <div className="px-6">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
      <StickyCTA />
    </>
  );
}

HomePage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      title="SustainSage | Coaching"
      desc="Calm, bilingual coaching for UK transitions, aligned with ICF ethics."
      jsonLd={HOME_JSON_LD}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'], nextI18NextConfig)),
    },
  };
}

export default HomePage;
