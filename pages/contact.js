import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import ContactForm from '@/components/Sections/ContactForm';
import { SITE_URL } from '@/lib/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CONTACT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${SITE_URL}/contact`,
  about: {
    '@type': 'Organization',
    name: 'SustainSage Group Ltd.',
  },
};

function ContactPage() {
  const { t } = useTranslation('contact');
  const expectations = t('expectations.items', { returnObjects: true });

  return (
    <>
      <Hero
        image="/hero/contact.svg"
        align="left"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />
      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('expectations.title')}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-emerald-900">
            {expectations.map((item) => (
              <li key={item} className="rounded-2xl border border-emerald-200 bg-white/70 p-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

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
  return (
    <MainLayout jsonLd={CONTACT_JSON_LD}>
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
