import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { SITE_URL } from '@/lib/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function ServicesPage() {
  const { t } = useTranslation('services');
  const formats = t('formats.items', { returnObjects: true });
  const commitments = t('commitments.items', { returnObjects: true });
  const boundaries = t('boundaries.items', { returnObjects: true });
  const practicalities = t('practicalities.items', { returnObjects: true });

  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} align="left" />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('formats.title')}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {formats.map((item) => (
              <HoverLift key={item.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('commitments.title')}
            </h2>
          </Reveal>
          <ul className="mt-6 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-700">
            {commitments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('boundaries.title')}
            </h2>
          </Reveal>
          <ul className="mt-6 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-700">
            {boundaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('practicalities.title')}
            </h2>
          </Reveal>
          <ul className="mt-6 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-700">
            {practicalities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="px-6">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

ServicesPage.getLayout = function getLayout(page) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'ICF-aligned coaching',
    provider: {
      '@type': 'Organization',
      name: 'SustainSage Group Ltd.',
      url: SITE_URL,
    },
    areaServed: 'United Kingdom',
    availableChannel: 'Online',
  };

  return (
    <MainLayout title="Services | SustainSage" desc="ICF-aligned, client-led coaching formats." jsonLd={jsonLd}>
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
