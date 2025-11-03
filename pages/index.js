import MainLayout from '../components/layout/MainLayout';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import HomeHero from '../components/Sections/HomeHero';
import HomeServiceIntro from '../components/Sections/HomeServiceIntro';
import HomeForWhom from '../components/Sections/HomeForWhom';
import HomeFounderIntro from '../components/Sections/HomeFounderIntro';
import ContactForm from '../components/Sections/ContactForm';

export default function HomePage() {
  const { t } = useTranslation('home');

  return (
    <MainLayout>
      <NextSeo title={t('pageTitle')} description={t('pageDescription')} />

      <HomeHero />
      <HomeServiceIntro />
      <HomeForWhom />
      <HomeFounderIntro />

      <section className="section-padding bg-white">
        <div className="content-container">
          <ContactForm />
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await serverSideTranslations(locale, ['common', 'home']);

  return {
    props: {
      ...translations,
    },
  };
}
