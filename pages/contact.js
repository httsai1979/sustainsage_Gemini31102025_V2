import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import ContactForm from '@/components/Sections/ContactForm';
import { SITE_URL } from '@/lib/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function ContactPage() {
  const { t } = useTranslation('contact');

  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} align="left" />
      <div className="pb-12">
        <ContactForm />
      </div>
      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

ContactPage.getLayout = function getLayout(page) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SITE_URL}/contact`,
    about: {
      '@type': 'Organization',
      name: 'SustainSage Group Ltd.',
    },
  };

  return (
    <MainLayout title="Contact | SustainSage" desc="Get in touch—consent-led and clear." jsonLd={jsonLd}>
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'contact'], nextI18NextConfig)),
    },
  };
}

export default ContactPage;
