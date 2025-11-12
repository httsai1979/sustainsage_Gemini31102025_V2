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
        <li key={item.title} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <div>
            <p className="font-medium text-slate-900">{item.title}</p>
            {item.description ? <p className="mt-1 text-slate-700">{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

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
          className="font-semibold text-emerald-700 hover:underline"
        >
          {segment.label}
        </Link>
      );
    }

    return <span key={index}>{segment?.value ?? ''}</span>;
  });
}

export default function ForCareerReturnersPage() {
  const { t } = useTranslation('services-personas');
  const content = t('careerReturners', { returnObjects: true }) ?? {};
  const seo = content.seo ?? {};
  const hero = content.hero ?? {};
  const sections = content.sections ?? {};

  const packages = sections.packages ?? {};

  return (
    <>
      <Head>
        <title>{seo?.title ?? 'Coaching for career returners'}</title>
        <meta
          name="description"
          content={seo?.description ?? 'Support for professionals re-entering the workforce.'}
        />
      </Head>

      <Hero
        title={hero?.title ?? 'Coaching for career returners'}
        subtitle={hero?.subtitle ?? ''}
        image="/images/services/transition.svg"
        imageAlt={hero?.imageAlt ?? 'Illustration symbolising a fresh chapter'}
      >
        <Link
          href="/contact?from=for-career-returners"
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
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {sections?.challenges?.title}
          </h2>
          <BulletList items={sections?.challenges?.items} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {sections?.support?.title}
          </h2>
          <BulletList items={sections?.support?.items} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {sections?.vignette?.title}
          </h2>
          <div className="mt-6 rounded-3xl border border-emerald-100 bg-white/90 p-6 text-sm leading-6 text-slate-700 shadow-sm">
            <p>{sections?.vignette?.body}</p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{packages?.title}</h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            {(packages?.paragraphs ?? []).map((paragraph, index) => (
              <p key={index}>{renderSegments(paragraph)}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'services-personas'], nextI18NextConfig)),
  };

  return {
    props: sanitizeProps(props),
  };
}
