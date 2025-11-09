import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

import nextI18NextConfig from '../../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function renderSegments(segments = []) {
  if (!Array.isArray(segments) || segments.length === 0) {
    return null;
  }

  return segments.map((segment, index) => {
    if (segment?.type === 'link' && segment?.href) {
      return (
        <Link
          key={`${segment.href}-${index}`}
          href={segment.href}
          className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline"
        >
          {segment.label}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Link>
      );
    }

    return <span key={index}>{segment?.value ?? ''}</span>;
  });
}

function BulletList({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HowCoachingWorksPage() {
  const { t } = useTranslation('services-how-coaching-works');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const sections = t('sections', { returnObjects: true }) ?? {};

  const definition = sections.definition ?? {};
  const journey = sections.journey ?? {};
  const boundaries = sections.boundaries ?? {};
  const ethics = sections.ethics ?? {};
  const selfCheck = sections.selfCheck ?? {};
  const packages = sections.packages ?? {};
  const cta = sections.cta ?? {};

  return (
    <MainLayout>
      <Head>
        <title>{seo?.title ?? 'How coaching works with SustainSage'}</title>
        <meta
          name="description"
          content={seo?.description ?? 'Understand our ICF-aligned coaching approach and boundaries.'}
        />
      </Head>

      <Hero
        title={hero?.title ?? 'How coaching works'}
        subtitle={hero?.subtitle ?? ''}
        image="/hero/services.svg"
        imageAlt={hero?.imageAlt ?? 'Illustration describing how coaching works'}
      >
        <Link
          href="/contact?from=how-coaching-works"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          {hero?.primaryCta ?? 'Book an intro call'}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
        >
          {hero?.secondaryCta ?? 'View all services'}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {definition?.title}
          </h2>
          <BulletList items={definition?.items} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{journey?.title}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {(journey?.steps ?? []).map((step) => (
              <li key={step.title} className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{boundaries?.title}</h2>
            <BulletList items={boundaries?.items} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{ethics?.title}</h2>
            <BulletList items={ethics?.items} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{selfCheck?.title}</h2>
          {selfCheck?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{selfCheck.description}</p>
          ) : null}
          <BulletList items={selfCheck?.items} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{packages?.title}</h2>
          {packages?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{packages.description}</p>
          ) : null}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(packages?.cards ?? []).map((pkg) => (
              <Link
                key={pkg.href}
                href={pkg.href}
                className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <span className="text-base font-semibold text-slate-900">{pkg.title}</span>
                <span className="mt-3 text-sm leading-6 text-slate-700">{pkg.description}</span>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-700">
                  {packages?.linkLabel ?? 'Learn more →'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">{renderSegments(cta?.body)}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=how-coaching-works"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {cta?.primaryCta ?? hero?.primaryCta ?? 'Book an intro call'}
            </Link>
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
            >
              {cta?.secondaryCta ?? hero?.secondaryCta ?? 'Explore all services'}
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'services-how-coaching-works'],
        nextI18NextConfig,
      )),
    },
  };
}
