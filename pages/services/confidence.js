import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/85 p-6 shadow-sm transition hover:shadow-md';

const DETAIL_ICONS = {
  voice: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M15.5 4.5v15m-7-12H6.75A1.75 1.75 0 0 0 5 9.25v5.5A1.75 1.75 0 0 0 6.75 16.5H8.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M9 8.25 15.5 4.5v15L9 15.75V8.25Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  ),
  language: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M5.25 6h13.5A1.75 1.75 0 0 1 20.5 7.75v8.5A1.75 1.75 0 0 1 18.75 18H5.25A1.75 1.75 0 0 1 3.5 16.25v-8.5A1.75 1.75 0 0 1 5.25 6Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M7.75 9.75h3m-3 3h3m2.5-3h3m-3 3h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  boundaries: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path d="M6 12h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5M12 19.5A7.5 7.5 0 0 1 4.5 12M12 4.5a7.5 7.5 0 0 0-7.5 7.5M12 19.5a7.5 7.5 0 0 0 7.5-7.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  practice: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path d="M5 19h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path
        d="M8 15.5 10 9l2 5 2-4 2 5.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

function DetailIcon({ type }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/70">
      {DETAIL_ICONS[type] ?? DETAIL_ICONS.voice}
    </span>
  );
}

function ConfidenceServicePage() {
  const { t } = useTranslation('services');
  const forItems = t('details.confidence.for.items', { returnObjects: true });
  const exploreCards = t('details.confidence.explore.cards', { returnObjects: true });
  const structureLines = t('details.confidence.structure.points', { returnObjects: true });
  const questions = t('details.confidence.questions.items', { returnObjects: true });
  const boundaries = t('details.confidence.boundaries.items', { returnObjects: true });

  return (
    <MainLayout title={t('details.confidence.seo.title')} desc={t('details.confidence.seo.description')}>
      <Hero
        title={t('details.confidence.hero.title')}
        subtitle={t('details.confidence.hero.subtitle')}
        image="/hero/confidence.svg"
        imageAlt={t('details.confidence.hero.imageAlt')}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('details.confidence.hero.ctaAria')}>
          {t('details.confidence.hero.cta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="who-this-is-for">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.confidence.for.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {forItems.map((item) => (
                <li key={item} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="focus-topics">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('details.confidence.explore.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('details.confidence.explore.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {exploreCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <HoverLift>
                  <article className={`${CARD_BASE_CLASS} bg-white text-left`}>
                    <DetailIcon type={card.icon} />
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.body}</p>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="package-structure">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.confidence.structure.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('details.confidence.structure.subtitle')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {structureLines.map((line) => (
                <li key={line} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="reflective-questions">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.confidence.questions.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-emerald-900">
              {questions.map((question) => (
                <li key={question} className={`${CARD_BASE_CLASS} bg-white text-left`}>
                  {question}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="boundaries">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.confidence.boundaries.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('details.confidence.boundaries.subtitle')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {boundaries.map((item) => (
                <li key={item} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-emerald-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('details.confidence.cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('details.confidence.cta.body')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary" aria-label={t('details.confidence.cta.primaryAria')}>
              {t('details.confidence.cta.primaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 pb-20">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ConfidenceServicePage;
