import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
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
      <Hero
        image="/hero/services.svg"
        align="left"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('formats.title')}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {formats.map((item) => (
              <article key={item.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('commitments.title')}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {commitments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('boundaries.title')}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {boundaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('practicalities.title')}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {practicalities.map((item) => (
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

ServicesPage.layoutProps = {
  title: 'Services | SustainSage',
  desc: 'ICF-aligned, client-led coaching formats.',
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
