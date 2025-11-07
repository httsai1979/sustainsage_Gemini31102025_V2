import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function ServiceBlock({ service, labels }) {
  if (!service) return null;

  const { title, summary, for: audience = [], focus = [], format = [], languages, boundaries } = service;

  return (
    <article className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-base leading-7 text-slate-600">{summary}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{labels.for}</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{labels.focus}</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{labels.format}</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {format.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm leading-6 text-slate-600">
          {languages && (
            <p>
              <span className="font-semibold text-slate-900">{labels.languages}:</span> {languages}
            </p>
          )}
          {boundaries && (
            <p>
              <span className="font-semibold text-slate-900">{labels.boundaries}:</span> {boundaries}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function ServicesPage() {
  const { t } = useTranslation('services');
  const labels = t('labels', { returnObjects: true });
  const services = ['oneToOne', 'clinics', 'organisations']
    .map((key) => ({ key, data: t(`${key}`, { returnObjects: true }) }))
    .filter((entry) => entry.data && Object.keys(entry.data).length > 0);
  const howSteps = t('howWeWork.steps', { returnObjects: true });
  const pricingNotes = t('pricing.notes', { returnObjects: true });

  return (
    <>
      <Hero image="/hero/services.svg" align="left" title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <Link href="/contact" className="btn-primary">
          {t('hero.primaryCta')}
        </Link>
        <Link href="/resources" className="btn-secondary">
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-12">
            {services.map(({ key, data }) => (
              <ServiceBlock key={key} service={data} labels={labels} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('howWeWork.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('howWeWork.intro')}</p>
          <ol className="mt-8 space-y-4 text-sm leading-6 text-slate-700">
            {howSteps.map((step) => (
              <li key={step} className="rounded-2xl border border-emerald-100 bg-white p-4">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('pricing.intro')}</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {pricingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-900 py-16 text-emerald-50">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('cta.body')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
              {t('cta.primaryCta')}
            </Link>
            <Link href="/contact" className="btn-secondary inline-flex items-center justify-center">
              {t('cta.secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

ServicesPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
