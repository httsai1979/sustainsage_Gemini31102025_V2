import Image from 'next/image';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import Head from 'next/head';
import FAQSection from '@/components/Sections/FAQSection';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function PackageCard({ pkg, ctaLabel }) {
  const detailBullets = [pkg.for, pkg.focus].filter(Boolean);

  return (
    <Link
      href={`/services/${pkg.slug}`}
      className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white/95 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-4">
        {pkg.icon && (
          <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-emerald-50">
            <Image src={pkg.icon} alt="" fill sizes="56px" className="object-contain p-3" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">{pkg.title}</h3>
          {pkg.summary && <p className="mt-2 text-sm leading-6 text-slate-600">{pkg.summary}</p>}
        </div>
        {detailBullets.length > 0 && (
          <ul className="space-y-2 text-sm leading-6 text-slate-700">
            {detailBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {pkg.format && (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{pkg.format}</p>
        )}
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        {pkg.cta || ctaLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

function LearnMoreCard({ learn }) {
  if (!learn?.href) {
    return null;
  }

  return (
    <Link
      href={learn.href}
      className="flex h-full flex-col justify-between rounded-3xl border border-dashed border-emerald-200 bg-white/70 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-400 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <div className="space-y-4">
        {learn.icon && (
          <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-emerald-100">
            <Image src={learn.icon} alt="" fill sizes="56px" className="object-contain p-3" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-emerald-800">{learn.title}</h3>
          {learn.summary && <p className="mt-2 text-sm leading-6 text-slate-600">{learn.summary}</p>}
        </div>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        {learn.cta}
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
  const packageCta = t('packages.cta', { defaultValue: 'View details' });
  const learnCard = t('packages.learn', { returnObjects: true });
  const overviewSubtitle = t('overview.subtitle', {
    defaultValue: t('overview.description', { defaultValue: '' }),
  });
  const overviewDescription = t('overview.description', { defaultValue: '' });
  const overviewBoundary = t('overview.boundary', { returnObjects: true });
  const boundaryBullets = Array.isArray(overviewBoundary?.bullets)
    ? overviewBoundary.bullets.filter(Boolean)
    : [];

  return (
    <>
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Head>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Illustration of service pathways' })}
      >
        <Link
          href="/contact?from=services-hero"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          aria-label={t('cta.primaryAria', { defaultValue: 'Book a 20-minute intro call' })}
        >
          {t('cta.primaryCta')}
        </Link>
        <Link
          href="/contact?from=services-hero"
          className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
          aria-label={t('cta.secondaryAria', { defaultValue: 'Contact SustainSage' })}
        >
          {t('cta.secondaryCta')}
        </Link>
      </Hero>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('overview.title')}</h2>
            {overviewSubtitle && (
              <p className="mt-4 text-base leading-7 text-slate-600">{overviewSubtitle}</p>
            )}
            {overviewDescription && overviewDescription !== overviewSubtitle && (
              <p className="mt-4 text-sm leading-6 text-slate-600">{overviewDescription}</p>
            )}
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {overviewBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {overviewBoundary?.title && (
              <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
                <h3 className="text-lg font-semibold text-slate-900">{overviewBoundary.title}</h3>
                {overviewBoundary.body && (
                  <p className="mt-3 text-sm leading-6 text-slate-700">{overviewBoundary.body}</p>
                )}
                {boundaryBullets.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                    {boundaryBullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('packages.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('packages.description')}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} ctaLabel={packageCta} />
            ))}
            <LearnMoreCard learn={learnCard} />
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
              href="/contact?from=services-cta"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
              aria-label={t('cta.primaryAria')}
            >
              {t('cta.primaryCta')}
            </Link>
            <Link
              href="/contact?from=services-cta"
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
    </>
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
