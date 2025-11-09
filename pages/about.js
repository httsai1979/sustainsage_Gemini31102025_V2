import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';

function BulletList({ items }) {
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

const iconStyles = 'h-10 w-10 rounded-xl bg-emerald-50 p-2 text-emerald-700';

function ApproachIcon({ index }) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconStyles}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconStyles}>
          <path
            d="M12 4l6.5 6.5-6.5 9-6.5-9L12 4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconStyles}>
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

function SnapshotIcon({ index }) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconStyles}>
          <path d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconStyles}>
          <path d="M7 9l5-3 5 3v6l-5 3-5-3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M7 9l5 3 5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconStyles}>
          <path
            d="M12 5c-3.866 0-7 2.239-7 5s3.134 5 7 5 7-2.239 7-5-3.134-5-7-5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M9 20l3-5 3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function AboutPage() {
  const { t } = useTranslation('about');

  const mission = t('mission', { returnObjects: true });
  const roots = t('roots', { returnObjects: true });
  const approach = t('approach', { returnObjects: true });
  const practice = t('practice', { returnObjects: true });
  const boundaries = t('boundaries', { returnObjects: true });
  const snapshots = t('snapshots', { returnObjects: true });
  const cta = t('cta', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const seo = t('seo', { returnObjects: true });

  return (
    <MainLayout>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 md:flex-row md:items-center">
          <div className="space-y-4 md:flex-1">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero.title}</h1>
            <p className="text-base leading-7 text-slate-600">
              <strong className="block text-slate-900">Meet your coach without hype.</strong>
              {hero.subtitle}
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 text-sm leading-6 text-slate-700 md:w-80">
            <p>{mission.description}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{mission.title}</h2>
          <BulletList items={mission.bullets} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{roots.title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            <strong className="block text-slate-900">Where this practice comes from.</strong>
            {roots.description}
          </p>
          <BulletList items={roots.bullets} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{approach.title}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {approach.cards.map((card, index) => (
              <div key={card.title} className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                <ApproachIcon index={index} />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{practice.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              <strong className="block text-slate-900">How sessions feel day to day.</strong>
              {practice.description}
            </p>
            <BulletList items={practice.bullets} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{boundaries.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              <strong className="block text-slate-900">Our lines stay clear.</strong>
              {boundaries.description}
            </p>
            <BulletList items={boundaries.bullets} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{snapshots.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              <strong className="block text-slate-900">Composite stories to protect privacy.</strong>
              {snapshots.intro}
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {snapshots.cards.map((card, index) => (
              <div key={card.title} className="flex h-full flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
                <SnapshotIcon index={index} />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{card.context}</p>
                </div>
                <div className="space-y-3 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-emerald-800">{t('snapshots.supportLabel', { defaultValue: 'How we supported' })}</p>
                  <p>{card.support}</p>
                  <p className="font-semibold text-emerald-800">{t('snapshots.resultLabel', { defaultValue: 'What changed' })}</p>
                  <p>{card.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/80 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{cta.title}</h2>
          <Link
            href={cta.linkHref}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            {cta.linkLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  };
}

export default AboutPage;
