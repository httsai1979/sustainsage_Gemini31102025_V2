import Head from 'next/head';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function ComparisonTable({ headers, rows }) {
  if (!headers || !rows) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-emerald-100 text-left text-sm leading-6 text-slate-700">
        <thead className="bg-emerald-50/70 text-xs font-semibold uppercase tracking-wide text-emerald-800">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.aspect} className="even:bg-emerald-950/5">
              <th scope="row" className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">
                {row.aspect}
              </th>
              <td className="px-4 py-4 align-top">{row.coaching}</td>
              <td className="px-4 py-4 align-top">{row.mentoring}</td>
              <td className="px-4 py-4 align-top">{row.therapy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BulletList({ items }) {
  if (!items || items.length === 0) {
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

function Paragraphs({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5 text-base leading-7 text-slate-600">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function HowCoachingWorksPage() {
  const { t } = useTranslation('howCoachingWorks');
  const comparisonRows = t('comparison.rows', { returnObjects: true });
  const sessionItems = t('session.items', { returnObjects: true });
  const ethicsItems = t('ethics.items', { returnObjects: true });
  const expectationItems = t('expectations.bullets', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Head>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Head>

      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt')}
      >
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          {t('cta.primary')}
        </Link>
        <Link
          href="/contact?from=how-coaching-works"
          className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
        >
          {t('cta.secondary')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('definition.title')}</h2>
          <div className="mt-6">
            <Paragraphs items={t('definition.paragraphs', { returnObjects: true })} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('session.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t('session.intro')}</p>
          <BulletList items={sessionItems} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('comparison.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('comparison.caption')}</p>
          </div>
          <div className="mt-8">
            <ComparisonTable headers={t('comparison.headers', { returnObjects: true })} rows={comparisonRows} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('ethics.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('ethics.intro')}</p>
            <BulletList items={ethicsItems} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('expectations.title')}</h2>
            <BulletList items={expectationItems} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">{t('cta.body')}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {t('cta.primary')}
            </Link>
            <Link
              href="/contact?from=how-coaching-works"
              className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
            >
              {t('cta.secondary')}
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
      ...(await serverSideTranslations(locale, ['common', 'howCoachingWorks'], nextI18NextConfig)),
    },
  };
}

export default HowCoachingWorksPage;
