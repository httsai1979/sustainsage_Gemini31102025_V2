import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function ServicesPage() {
  const { t } = useTranslation('services');
  const toArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);
  const plans = toArray(t('plans.items', { returnObjects: true }));
  const partnershipItems = toArray(t('partnership.items', { returnObjects: true }));
  const partnershipNotes = toArray(t('partnership.notes', { returnObjects: true }));
  const boundaries = toArray(t('boundaries.items', { returnObjects: true }));
  const logistics = toArray(t('logistics.items', { returnObjects: true }));

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
            {t('plans.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('plans.intro')}</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {plans.map((item) => (
              <article key={item.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <dl className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <div>
                    <dt className="font-semibold text-slate-900">{t('plans.fields.audience')}</dt>
                    <dd className="mt-1">{item.audience}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">{t('plans.fields.format')}</dt>
                    <dd className="mt-1">{item.format}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">{t('plans.fields.process')}</dt>
                    <dd className="mt-1">{item.process}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">{t('plans.fields.outcomes')}</dt>
                    <dd className="mt-1">{item.outcomes}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('partnership.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('partnership.lead')}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {partnershipItems.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-emerald-100 bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
          {partnershipNotes.length > 0 && (
            <ul className="mt-8 space-y-3 text-sm leading-6 text-slate-700">
              {partnershipNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          )}
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
            {t('logistics.title')}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {logistics.map((item) => (
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
  desc: 'Bilingual coaching plans for UK transitions, returners, and mid-career experiments.',
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
