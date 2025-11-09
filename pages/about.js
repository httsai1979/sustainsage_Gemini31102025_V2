import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';

function BulletList({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="space-y-3 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CoachCard({ coach }) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {coach.image ? (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-emerald-50">
            <Image src={coach.image} alt={coach.imageAlt} fill sizes="64px" className="object-contain p-3" />
          </div>
        ) : null}
        <div className="space-y-1">
          {coach.title ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{coach.title}</p>
          ) : null}
          <h3 className="text-lg font-semibold text-slate-900">{coach.name}</h3>
        </div>
      </div>
      <dl className="space-y-5 text-sm leading-6 text-slate-700">
        {coach.languages ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {coach.languagesLabel}
            </dt>
            <dd className="mt-1 text-slate-900">{coach.languages}</dd>
          </div>
        ) : null}
        {coach.location ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {coach.locationLabel}
            </dt>
            <dd className="mt-1 text-slate-900">{coach.location}</dd>
          </div>
        ) : null}
        {coach.training?.length ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {coach.trainingLabel}
            </dt>
            <dd className="mt-2">
              <BulletList items={coach.training} />
            </dd>
          </div>
        ) : null}
        {coach.specialties?.length ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {coach.specialtiesLabel}
            </dt>
            <dd className="mt-2">
              <BulletList items={coach.specialties} />
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export default function AboutPage() {
  const { t } = useTranslation('about');

  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const practice = t('practice', { returnObjects: true });
  const coaches = t('coaches', { returnObjects: true });
  const ethics = t('ethics', { returnObjects: true });
  const cta = t('cta', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
      </Head>

      <section className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl space-y-6">
            {hero?.kicker ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.kicker}</p>
            ) : null}
            <div className="typography flex flex-col gap-4">
              <h1>{hero?.title}</h1>
              {hero?.body ? <p>{hero.body}</p> : null}
            </div>
          </div>
          {hero?.bullets?.length ? (
            <div className="mt-12 max-w-3xl rounded-3xl border border-emerald-100 bg-white/90 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{hero.bulletsTitle}</p>
              <div className="mt-4">
                <BulletList items={hero.bullets} />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="typography max-w-3xl flex flex-col gap-4">
            <h2>{practice?.title}</h2>
            {practice?.intro ? <p>{practice.intro}</p> : null}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {practice?.sections?.map((section) => (
              <div key={section.title} className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
                <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
                {section?.body ? <p className="mt-3 text-sm leading-6 text-slate-700">{section.body}</p> : null}
                <div className="mt-4">
                  <BulletList items={section?.bullets} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="typography max-w-3xl flex flex-col gap-4">
            <h2>{coaches?.title}</h2>
            {coaches?.intro ? <p>{coaches.intro}</p> : null}
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {coaches?.people?.map((coach) => (
              <CoachCard key={coach.name} coach={coach} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="typography max-w-3xl flex flex-col gap-4">
            <h2>{ethics?.title}</h2>
            {ethics?.intro ? <p>{ethics.intro}</p> : null}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ethics?.items?.map((item) => (
              <div key={item.title} className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 text-sm leading-6 text-slate-700">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="typography flex flex-col gap-4">
            <h2>{cta?.title}</h2>
            {cta?.body ? <p>{cta.body}</p> : null}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={cta?.primary?.href ?? '/services'}
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              {cta?.primary?.label}
            </Link>
            <Link
              href={cta?.secondary?.href ?? '/faq'}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              {cta?.secondary?.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

AboutPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  };
}
