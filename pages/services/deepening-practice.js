import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@/components/layout/Hero';
import { sanitizeProps } from '@/lib/toSerializable';

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

function renderSegments(segments = []) {
  if (!Array.isArray(segments) || segments.length === 0) {
    return null;
  }

  return segments.map((segment, index) => <span key={index}>{segment?.value ?? ''}</span>);
}

export default function DeepeningPracticePage() {
  const { t } = useTranslation('services-deepening-practice');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const sections = t('sections', { returnObjects: true }) ?? {};

  const fit = sections.fit ?? {};
  const focus = sections.focus ?? {};
  const ethics = sections.ethics ?? {};
  const cta = sections.cta ?? {};

  return (
    <>
      <Head>
        <title>{seo?.title ?? 'Deepening Practice – 8 sessions for leaders & practitioners'}</title>
        <meta
          name="description"
          content={seo?.description ?? 'An eight-session coaching space for leaders and practitioners.'}
        />
      </Head>

      <Hero
        title={hero?.title ?? 'Deepening Practice – 8 sessions'}
        subtitle={hero?.subtitle ?? ''}
        image="/images/services/confidence.svg"
        imageAlt={hero?.imageAlt ?? 'Illustration for deepening leadership practice'}
      >
        <Link
          href="/contact?from=deepening-practice"
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
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{fit?.title}</h2>
          <BulletList items={fit?.items} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{focus?.title}</h2>
          <BulletList items={focus?.items} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{ethics?.title}</h2>
          <BulletList items={ethics?.items} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-12 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">{renderSegments(cta?.body)}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=deepening-practice"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
            >
              {cta?.primaryCta ?? hero?.primaryCta ?? 'Book an intro call'}
            </Link>
            <Link
              href="/services"
              className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
            >
              {cta?.secondaryCta ?? 'Explore all services'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'services-deepening-practice'], nextI18NextConfig)),
  };

  return {
    props: sanitizeProps(props),
  };
}
