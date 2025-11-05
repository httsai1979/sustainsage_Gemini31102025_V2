import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { SITE_URL } from '@/lib/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function AboutPage() {
  const { t } = useTranslation('about');
  const commitments = t('commitments.items', { returnObjects: true });

  return (
    <>
      <Hero
        image="/hero/about.svg"
        align="left"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-lg leading-8 text-slate-700">{t('intro')}</p>
          <h2 className="mt-8 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('commitments.title')}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            {commitments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

AboutPage.getLayout = function getLayout(page) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SustainSage Group Ltd.',
    url: SITE_URL,
  };

  return (
    <MainLayout title="About | SustainSage" desc="ICF-aligned practice. Calm, practical, client-led." jsonLd={jsonLd}>
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'], nextI18NextConfig)),
    },
  };
}

export default AboutPage;
