import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';

import i18nConfig from '../../next-i18next.config';

const SERVICE_SLUGS = ['transition-relocation', 'return-to-work-clarity', 'uk-workplace-confidence'];

function BulletList({ items }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SnapshotCard({ snapshot, index, labels }) {
  const icons = [
    (
      <svg key="icon-0" viewBox="0 0 24 24" fill="none" className="h-10 w-10 rounded-xl bg-emerald-50 p-2 text-emerald-700">
        <path d="M12 4c4.418 0 8 3.134 8 7s-3.582 7-8 7-8-3.134-8-7 3.582-7 8-7z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 20l3-5 3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="icon-1" viewBox="0 0 24 24" fill="none" className="h-10 w-10 rounded-xl bg-emerald-50 p-2 text-emerald-700">
        <path d="M12 3l8 5v8l-8 5-8-5V8l8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 8l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  ];

  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      {icons[index] ?? icons[0]}
      <div className="space-y-3 text-sm leading-6 text-slate-700">
        <div>
          <p className="font-semibold text-emerald-800">{labels.context}</p>
          <p>{snapshot.context}</p>
        </div>
        <div>
          <p className="font-semibold text-emerald-800">{labels.approach}</p>
          <p>{snapshot.approach}</p>
        </div>
        <div>
          <p className="font-semibold text-emerald-800">{labels.outcome}</p>
          <p>{snapshot.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailPage({ slug }) {
  const namespace = `services-${slug}`;
  const { t } = useTranslation(namespace);

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const isForYou = t('isForYou', { returnObjects: true });
  const explore = t('explore', { returnObjects: true });
  const format = t('format', { returnObjects: true });
  const snapshot = t('snapshot', { returnObjects: true });
  const not = t('not', { returnObjects: true });
  const cta = t('cta', { returnObjects: true });

  return (
    <MainLayout>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{hero.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{hero.summary}</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{isForYou.title}</h2>
            <div className="mt-6">
              <BulletList items={isForYou.items} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{explore.title}</h2>
            <div className="mt-6">
              <BulletList items={explore.items} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{format.title}</h2>
          <div className="mt-6">
            <BulletList items={format.bullets} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{snapshot.title}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {snapshot.items.map((item, index) => (
              <SnapshotCard
                key={`${item.context}-${index}`}
                snapshot={item}
                index={index}
                labels={{
                  context: t('snapshot.labels.context', { defaultValue: 'Context' }),
                  approach: t('snapshot.labels.approach', { defaultValue: 'How we supported' }),
                  outcome: t('snapshot.labels.outcome', { defaultValue: 'What changed' }),
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{not.title}</h2>
          <div className="mt-6">
            <BulletList items={not.items} />
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/80 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
          <p className="text-base leading-7 text-slate-700">{cta.body}</p>
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

export async function getStaticPaths() {
  const locales = i18nConfig.i18n?.locales ?? ['en'];
  const paths = SERVICE_SLUGS.flatMap((slug) => locales.map((locale) => ({ params: { slug }, locale })));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const { slug } = params;

  if (!SERVICE_SLUGS.includes(slug)) {
    return { notFound: true };
  }

  return {
    props: {
      slug,
      ...(await serverSideTranslations(locale, ['common', 'services', `services-${slug}`])),
    },
  };
}
