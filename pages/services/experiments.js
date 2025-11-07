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
  map: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path d="M4.5 6.75 9 4.5l6 2.25 4.5-2.25v12l-4.5 2.25-6-2.25-4.5 2.25v-12Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M9 4.5v12.75m6-10.5v12.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path d="M6.75 4.5h10.5A1.75 1.75 0 0 1 19 6.25v11.5A1.75 1.75 0 0 1 17.25 19H6.75A1.75 1.75 0 0 1 5 17.75V6.25A1.75 1.75 0 0 1 6.75 4.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M9 8h6m-6 3h4m-4 3h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  results: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path d="M5.25 6.75h13.5v10.5H5.25z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.5 14.5 10 12l2 2 3.5-3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  decide: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M12 3.75 4.5 9l7.5 4.5L19.5 9 12 3.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M4.5 14.25 12 18.75l7.5-4.5" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  ),
};

function DetailIcon({ type }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/70">
      {DETAIL_ICONS[type] ?? DETAIL_ICONS.map}
    </span>
  );
}

function ExperimentsServicePage() {
  const { t } = useTranslation('services');
  const forItems = t('details.experiments.for.items', { returnObjects: true });
  const focusCards = t('details.experiments.focus.cards', { returnObjects: true });
  const packageItems = t('details.experiments.package.items', { returnObjects: true });
  const sessionParagraphs = t('details.experiments.session.paragraphs', { returnObjects: true });
  const prompts = t('details.experiments.prompts.items', { returnObjects: true });
  const boundaries = t('details.experiments.boundaries.items', { returnObjects: true });

  return (
    <MainLayout title={t('details.experiments.seo.title')} desc={t('details.experiments.seo.description')}>
      <Hero
        title={t('details.experiments.hero.title')}
        subtitle={t('details.experiments.hero.subtitle')}
        image="/hero/experiments.svg"
        imageAlt={t('details.experiments.hero.imageAlt')}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('details.experiments.hero.ctaAria')}>
          {t('details.experiments.hero.cta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="who-this-is-for">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('details.experiments.for.title')}
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
                {t('details.experiments.focus.title')}
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
              {t('details.experiments.package.title')}
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
              {t('details.experiments.session.title')}
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
              {t('details.experiments.prompts.title')}
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
              {t('details.experiments.boundaries.title')}
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
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('details.experiments.cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('details.experiments.cta.body')}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            aria-label={t('details.experiments.cta.primaryAria')}
          >
            {t('details.experiments.cta.primaryCta')}
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

export default ExperimentsServicePage;
