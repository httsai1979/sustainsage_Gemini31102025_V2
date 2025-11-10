import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import { toSerializable } from '@/lib/toSerializable';

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
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          {segment.label}
        </Link>
      );
    }

    return <span key={index}>{segment?.value ?? ''}</span>;
  });
}

function BulletList({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
      {items.map((item, index) => {
        const title = typeof item === 'string' ? null : item?.title;
        const description = typeof item === 'string' ? item : item?.description;
        const segments = Array.isArray(item?.segments) ? item.segments : null;

        return (
          <li key={title ?? description ?? index} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
            <div>
              {title ? <p className="font-semibold text-slate-900">{title}</p> : null}
              {segments ? (
                <p className="mt-1 text-slate-700">{renderSegments(segments)}</p>
              ) : description && title ? (
                <p className="mt-1 text-slate-700">{description}</p>
              ) : (
                !title && <span>{description}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function ApproachPage() {
  const { t } = useTranslation('about-approach');
  const seo = t('seo', { returnObjects: true });
  const hero = t('hero', { returnObjects: true });
  const sections = t('sections', { returnObjects: true });

  const grounding = sections?.grounding ?? {};
  const feel = sections?.feel ?? {};
  const ethics = sections?.ethics ?? {};
  const standards = sections?.standards ?? {};

  return (
    <MainLayout>
      <Head>
        <title>{seo?.title ?? 'Our coaching approach | SustainSage'}</title>
        <meta
          name="description"
          content={seo?.description ?? 'Understand how SustainSage approaches coaching.'}
        />
      </Head>

      <Hero
        title={hero?.title ?? 'Our coaching approach'}
        subtitle={hero?.subtitle ?? ''}
        image="/hero/about.svg"
        imageAlt={hero?.imageAlt ?? 'Illustration representing our coaching approach'}
      >
        <Link
          href="/services/how-coaching-works"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
        >
          {hero?.primaryCta ?? 'See the full journey'}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-50 focus-visible:outline-emerald-700`}
        >
          {hero?.secondaryCta ?? 'Explore services'}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {grounding?.title}
          </h2>
          {grounding?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{grounding.description}</p>
          ) : null}
          <BulletList items={grounding?.items ?? []} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {feel?.title}
          </h2>
          {feel?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{feel.description}</p>
          ) : null}
          <BulletList items={feel?.items ?? []} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {ethics?.title}
          </h2>
          {ethics?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{ethics.description}</p>
          ) : null}
          <BulletList items={ethics?.items ?? []} />
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {standards?.title}
          </h2>
          {standards?.description ? (
            <p className="mt-4 text-base leading-7 text-slate-600">{standards.description}</p>
          ) : null}
          <BulletList items={standards?.items ?? []} />
          {standards?.cta ? (
            <div className="mt-10 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{standards.cta.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{renderSegments(standards.cta.segments)}</p>
            </div>
          ) : null}
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about-approach'], nextI18NextConfig)),
    },
  });
}
