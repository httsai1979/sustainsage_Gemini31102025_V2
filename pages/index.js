import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import StickyCTA from '@/components/StickyCTA';
import { Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/80 p-4 md:p-6 shadow-sm transition hover:shadow-md';

const ICONS = {
  leaf: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M19.5 4.5c-7.5-.5-12 2.5-15 8 4-3 9.5-4.5 14.5-3.5-3.5 2-6 4.5-7.5 7.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M12 3.75a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5Zm0 0v4.5m0 12v-4.5m0 0 4.24-4.24m-8.48 0L12 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  steps: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M5 17h5v-3h4v-3h5V8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M5 20h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M7 9h6m-6 4h4m9-1.5a7.5 7.5 0 0 0-7.5-7.5H8.25A5.25 5.25 0 0 0 3 9.75v5.5A3.75 3.75 0 0 0 6.75 19h.75v3l3-3h3a7.5 7.5 0 0 0 7.5-7.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3.75c-2.5 3-2.5 13.5 0 16.5m0-16.5c2.5 3 2.5 13.5 0 16.5M3.75 12h16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  anchor: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M12 4.5v11.25M9 7.5 12 4.5l3 3m6 5.25a9 9 0 0 1-18 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

function IconBadge({ icon }) {
  return (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100"
      aria-hidden="true"
    >
      {ICONS[icon] ?? ICONS.leaf}
    </span>
  );
}

function HomePage() {
  const { t } = useTranslation('home');
  const outcomes = t('keyOutcomes.items', { returnObjects: true });
  const whoCards = t('whoWeHelp.cards', { returnObjects: true });
  const howSteps = t('howItWorks.steps', { returnObjects: true });
  const packages = t('starterPackages.cards', { returnObjects: true });
  const whyPoints = t('whySustainSage.points', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        note={t('hero.note')}
        image="/hero/home.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Coaching illustration' })}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('hero.primaryCtaAria')}>
          {t('hero.primaryCta')}
        </Link>
        <Link href="#how-it-works" className="btn-secondary" aria-label={t('hero.secondaryCtaAria')}>
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="key-outcomes">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('keyOutcomes.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('keyOutcomes.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {outcomes.map((item, index) => (
              <Reveal key={item.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} h-full text-left`}>
                  <IconBadge icon={item.icon} />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="who-we-help">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('whoWeHelp.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('whoWeHelp.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whoCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} bg-white text-left`}>
                  <IconBadge icon={card.icon} />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm font-medium text-emerald-700">{card.scenario}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {card.support.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="how-it-works">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('howItWorks.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('howItWorks.subtitle')}</p>
            </Reveal>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {howSteps.map((step, index) => (
              <Reveal key={step.title} className={`reveal-${index + 2}`}>
                <li className={`${CARD_BASE_CLASS} h-full text-left`}>
                  <p className="text-sm font-semibold text-emerald-700">{`${index + 1}. ${step.title}`}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="starter-packages">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('starterPackages.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('starterPackages.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} bg-white text-left`}>
                  <IconBadge icon={pkg.icon} />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{pkg.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{pkg.description}</p>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                    aria-label={pkg.ariaLabel}
                  >
                    {pkg.linkLabel}
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="why-sustainsage">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('whySustainSage.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('whySustainSage.subtitle')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <ul className="mt-6 grid gap-4 text-sm leading-6 text-slate-700 sm:grid-cols-2">
              {whyPoints.map((point) => (
                <li key={point} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}> 
                  <span className="flex items-center gap-2">
                    <IconBadge icon="anchor" />
                    <span>{point}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-emerald-50" id="home-cta">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('cta.body')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary" aria-label={t('cta.primaryAria')}>
              {t('cta.primaryCta')}
            </Link>
            <Link href="/services" className="btn-secondary" aria-label={t('cta.secondaryAria')}>
              {t('cta.secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 pb-20">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
      <StickyCTA />
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'], nextI18NextConfig)),
    },
  };
}

export default HomePage;
