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
  context: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M5.25 5.25h13.5v13.5H5.25z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.5 9.5h7m-7 3h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  values: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M12 5.25c2.25-2 6-1 6 2.25 0 3-3.5 6-6 7.75-2.5-1.75-6-4.75-6-7.75 0-3.25 3.75-4.25 6-2.25Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  options: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M12 5.25 4.5 9l7.5 3.75L19.5 9 12 5.25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M4.5 14.25 12 18.75l7.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  experiments: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M9 4.5h6m-6 0v6.75l-3.5 6.5A2.5 2.5 0 0 0 7.75 21h8.5a2.5 2.5 0 0 0 2.25-3.25L15 11.25V4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M9 14h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
};

function DetailIcon({ type }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/70">
      {DETAIL_ICONS[type] ?? DETAIL_ICONS.context}
    </span>
  );
}

function TransitionServicePage() {
  const { t } = useTranslation('services');
  const forItems = t('details.transition.for.items', { returnObjects: true });
  const focusCards = t('details.transition.focus.cards', { returnObjects: true });
  const packageItems = t('details.transition.package.items', { returnObjects: true });
  const sessionParagraphs = t('details.transition.session.paragraphs', { returnObjects: true });
  const prompts = t('details.transition.prompts.items', { returnObjects: true });
  const boundaries = t('details.transition.boundaries.items', { returnObjects: true });

  return (
    <MainLayout title={t('details.transition.seo.title')} desc={t('details.transition.seo.description')}>
      <Hero
        title={t('details.transition.hero.title')}
        subtitle={t('details.transition.hero.subtitle')}
        image="/hero/transition.svg"
        imageAlt={t('details.transition.hero.imageAlt')}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('details.transition.hero.ctaAria')}>
          {t('details.transition.hero.cta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="who-this-is-for">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.transition.for.title')}
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

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="what-we-explore">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('details.transition.focus.title')}
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {focusCards.map((card, index) => (
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
              {t('details.transition.package.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {packageItems.map((line) => (
                <li key={line} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="session-experience">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.transition.session.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <div className="mt-6 space-y-3 text-sm leading-6 text-emerald-900">
              {sessionParagraphs.map((paragraph) => (
                <div key={paragraph} className={`${CARD_BASE_CLASS} bg-white text-left`}>
                  {paragraph}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="reflective-prompts">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.transition.prompts.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {prompts.map((prompt) => (
                <li key={prompt} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {prompt}
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
              {t('details.transition.boundaries.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
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
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('details.transition.cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('details.transition.cta.body')}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            aria-label={t('details.transition.cta.primaryAria')}
          >
            {t('details.transition.cta.primaryCta')}
          </Link>
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

export default TransitionServicePage;
