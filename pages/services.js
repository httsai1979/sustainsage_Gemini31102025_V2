import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import FAQSection from '@/components/Sections/FAQSection';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function PackageCard({ pkg }) {
  return (
    <Link
      href={`/services/${pkg.slug}`}
      className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/90 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">{pkg.title}</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-700">{pkg.for}</p>
        </div>
        <p className="text-sm leading-6 text-slate-600">{pkg.focus}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{pkg.format}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        {pkg.cta}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

function ServicesPage() {
  const { t } = useTranslation('services');
  const overviewBullets = t('overview.bullets', { returnObjects: true });
  const packages = t('packages.cards', { returnObjects: true });
  const processBullets = t('process.bullets', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Illustration of service pathways' })}
      >
        <Link
          href="/contact"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          aria-label={t('cta.primaryAria', { defaultValue: 'Book a 20-minute intro call' })}
        >
          {t('cta.primaryCta')}
        </Link>
        <Link
          href="/contact"
          className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
          aria-label={t('cta.secondaryAria', { defaultValue: 'Contact SustainSage' })}
        >
          {t('cta.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('overview.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t('overview.description')}</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {overviewBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('packages.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('packages.description')}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('process.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t('process.description')}</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {processBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSection categories={['services', 'general']} />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('cta.body')}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
              aria-label={t('cta.primaryAria')}
            >
              {t('cta.primaryCta')}
            </Link>
            <Link
              href="/contact"
              className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
              aria-label={t('cta.secondaryAria')}
            >
              {t('cta.secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services', 'faq'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
