import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { Reveal } from '@/components/ui/Motion';
import { SITE_URL } from '@/lib/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function AboutPage() {
  const { t } = useTranslation('about');
  const commitments = t('commitments.items', { returnObjects: true });

  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} align="left" />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="text-lg leading-8 text-slate-700">{t('intro')}</p>
          </Reveal>
          <Reveal className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900">{t('commitments.title')}</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-700">
              {commitments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="px-6">
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
