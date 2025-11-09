import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';

import nextI18NextConfig from '../../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

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

function TextSegments({ segments }) {
  if (!Array.isArray(segments) || segments.length === 0) {
    return null;
  }

  return segments.map((segment, index) => {
    if (segment?.type === 'link' && segment?.href) {
      return (
        <Link
          key={`${segment.href}-${index}`}
          href={segment.href}
          className="font-semibold text-emerald-700 hover:underline"
        >
          {segment.label}
        </Link>
      );
    }

    return <span key={index}>{segment?.value ?? ''}</span>;
  });
}

export default function TransitionCoachingPage() {
  const { t } = useTranslation('services-transition-coaching');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const sections = t('sections', { returnObjects: true }) ?? {};

  const fit = sections.fit ?? {};
  const journey = sections.journey ?? {};
  const ethics = sections.ethics ?? {};
  const example = sections.example ?? {};
  const cta = sections.cta ?? {};

  return (
    <MainLayout>
      <Head>
        <title>{seo?.title ?? 'Transition Coaching – 6 sessions for relocation & role change'}</title>
        <meta
          name="description"
          content={seo?.description ?? 'Clarify your move to the UK, stabilise change and shape work that fits your life.'}
        />
      </Head>

      <Hero
        title={hero?.title ?? 'Transition Coaching – 6 sessions'}
        subtitle={hero?.subtitle ?? ''}
        image="/images/services/transition.svg"
        imageAlt={hero?.imageAlt ?? 'Illustration representing transition coaching support'}
      >
        <Link
          href="/contact?from=transition-coaching"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          {hero?.primaryCta ?? 'Book an intro call'}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
        >
          {hero?.secondaryCta ?? 'Back to services'}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{fit?.title}</h2>
          <BulletList items={fit?.items} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{journey?.title}</h2>
            {journey?.description ? (
              <p className="mt-4 text-base leading-7 text-slate-600">{journey.description}</p>
            ) : null}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {(journey?.sessions ?? []).map((session) => (
              <div key={session.number} className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
                <h3 className="text-base font-semibold text-emerald-800">
                  {`Session ${session.number}`} – {session.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{session.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{ethics?.title}</h2>
          <BulletList items={ethics?.items} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{example?.title}</h2>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-sm">
            <p className="text-base leading-7 text-slate-700">{example?.body}</p>
          </div>
          {example?.note ? (
            <p className="mt-6 text-sm leading-6 text-slate-500">{example.note}</p>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">
            <TextSegments segments={cta?.body} />
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=transition-coaching"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {cta?.primaryCta ?? hero?.primaryCta ?? 'Book an intro call'}
            </Link>
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
            >
              {cta?.secondaryCta ?? 'Explore all services'}
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
        ['common', 'services-transition-coaching'],
        nextI18NextConfig,
      )),
    },
  };
}
