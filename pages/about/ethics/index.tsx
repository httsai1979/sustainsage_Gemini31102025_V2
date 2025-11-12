import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { getAboutSubnav } from '@/components/about/AboutSubnav';
import { StickyCTA } from '@/components/common/StickyCTA';
import { loadContent } from '@/lib/loadContent';
import { toSerializable } from '@/lib/toSerializable';

type EthicsProps = {
  ethics: any;
  usedLocale: string | null;
  locale: string;
  fallbackNotice?: string | null;
};

function Header({
  ethics,
  showFallback,
  fallbackNotice,
}: {
  ethics: any;
  showFallback: boolean;
  fallbackNotice?: string | null;
}) {
  const notice = fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';
  return (
    <div className="space-y-4">
      {ethics?.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{ethics.eyebrow}</p>
      ) : null}
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {ethics?.title ?? 'Ethics & boundaries'}
        </h1>
        {ethics?.summary ? (
          <p className="max-w-3xl text-base leading-7 text-slate-700">{ethics.summary}</p>
        ) : null}
        {showFallback ? <p className="text-xs font-medium text-slate-500">{notice}</p> : null}
      </div>
      {ethics?.icfReference ? (
        <Link
          href="https://coachingfederation.org/ethics/code-of-ethics"
          className="inline-flex w-fit items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          {ethics.icfReference}
        </Link>
      ) : null}
    </div>
  );
}

export default function EthicsPage({ ethics, usedLocale, locale, fallbackNotice }: EthicsProps) {
  const showFallback = Boolean(usedLocale && usedLocale !== locale);
  const principles = Array.isArray(ethics?.principles) ? ethics.principles : [];
  const dataPractices = ethics?.dataPractices;

  return (
    <>
      <PageLayoutV2
        header={<Header ethics={ethics} showFallback={showFallback} fallbackNotice={fallbackNotice} />}
        subnav={getAboutSubnav('ethics')}
      >
        {principles.length ? (
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Principles we hold in every engagement</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {principles.map((item: string, index: number) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm font-semibold text-emerald-700">
              <Link href="/about/approach" className="inline-flex items-center gap-1 transition hover:text-emerald-900">
                <span>See how our coaching approach keeps boundaries in view</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        ) : null}

        {dataPractices?.items?.length ? (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-slate-900">{dataPractices.title ?? 'How we handle your data'}</h2>
            <div className="mt-4 space-y-3 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-sm text-sm leading-6 text-slate-700">
              {dataPractices.items.map((item: string, index: number) => (
                <p key={index} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <div className="mt-4 text-sm font-semibold text-emerald-700">
              <Link href="/services/how-coaching-works" className="inline-flex items-center gap-1 transition hover:text-emerald-900">
                <span>Read our detailed coaching agreement</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mt-12 rounded-3xl border border-emerald-100 bg-emerald-900 p-6 text-white">
          <h2 className="text-xl font-semibold">When coaching is not the right support</h2>
          <p className="mt-3 text-sm leading-6 text-emerald-100">
            We pause and refer you to trusted therapeutic, legal, or crisis resources whenever the scope moves beyond ethical coaching boundaries.
          </p>
          <div className="mt-4 text-sm font-semibold">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-white transition hover:text-emerald-200"
            >
              <span>Request a referral or safeguarding check-in</span>
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

  return toSerializable({
    props: {
      ethics: aboutContent.data?.ethics ?? null,
      usedLocale: aboutContent.locale,
      locale,
      fallbackNotice: aboutContent.data?.fallbackNotice ?? null,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}
