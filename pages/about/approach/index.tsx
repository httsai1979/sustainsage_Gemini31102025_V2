import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { getAboutSubnav } from '@/components/about/AboutSubnav';
import { StickyCTA } from '@/components/common/StickyCTA';
import { loadContent } from '@/lib/loadContent';
import { sanitizeProps } from '@/lib/toSerializable';

type ApproachProps = {
  approach: any;
  usedLocale: string | null;
  locale: string;
  fallbackNotice?: string | null;
};

function Header({
  approach,
  showFallback,
  fallbackNotice,
}: {
  approach: any;
  showFallback: boolean;
  fallbackNotice?: string | null;
}) {
  const notice = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  return (
    <div className="space-y-4">
      {approach?.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{approach.eyebrow}</p>
      ) : null}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {approach?.title ?? 'Our approach'}
        </h1>
        {approach?.description ? (
          <p className="max-w-2xl text-base leading-7 text-slate-700">{approach.description}</p>
        ) : null}
        {showFallback ? <p className="text-xs font-medium text-slate-500">{notice}</p> : null}
      </div>
      <Link
        href="/about/approach/cases"
        className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
      >
        Browse coaching cases
      </Link>
    </div>
  );
}

function PillarCard({ item }: { item: any }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-5">
      {item?.title ? (
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
      ) : null}
      {item?.description ? (
        <p className="text-sm leading-6 text-slate-700">{item.description}</p>
      ) : null}
    </article>
  );
}

export default function ApproachPage({ approach, usedLocale, locale, fallbackNotice }: ApproachProps) {
  const showFallback = Boolean(usedLocale && usedLocale !== locale);
  const pillars = Array.isArray(approach?.pillars) ? approach.pillars : [];

  return (
    <>
      <PageLayoutV2
        header={<Header approach={approach} showFallback={showFallback} fallbackNotice={fallbackNotice} />}
        subnav={getAboutSubnav('approach')}
      >
        {pillars.length ? (
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">How we structure coaching</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {pillars.map((pillar: any, index: number) => (
                <PillarCard key={pillar?.title ?? index} item={pillar} />
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 text-sm font-semibold text-emerald-700 sm:flex-row">
              <Link
                href="/about/ethics"
                className="inline-flex items-center gap-1 transition hover:text-emerald-900"
              >
                <span>Review our ethics commitments</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/about/team"
                className="inline-flex items-center gap-1 transition hover:text-emerald-900"
              >
                <span>Meet the coaching team</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What to expect in partnership</h2>
          <ul className="space-y-3 text-sm leading-6 text-slate-700">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
              <span>We align on scope, consent, and cadence before the first session.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
              <span>Bilingual facilitation keeps cultural nuance intact as you test new experiments.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
              <span>Regular reflection loops ensure agreements stay ethical, accessible, and useful.</span>
            </li>
          </ul>
          <div className="pt-4 text-sm font-semibold text-emerald-700">
            <Link href="/contact" className="inline-flex items-center gap-1 transition hover:text-emerald-900">
              <span>Book a chemistry chat</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </PageLayoutV2>
      <StickyCTA />
    </>
  );
}

export async function getStaticProps({ locale = 'en-GB' }) {
  const aboutContent = loadContent<any>('content/about/{locale}.json', locale);

  const props = {
    approach: aboutContent.data?.approach ?? null,
    usedLocale: aboutContent.locale,
    locale,
    fallbackNotice: aboutContent.data?.fallbackNotice ?? null,
    ...(await serverSideTranslations(locale, ['common'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
