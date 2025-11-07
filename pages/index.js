import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import StickyCTA from '@/components/StickyCTA';
import HomeFaq from '@/components/Sections/HomeFaq';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/85 p-5 shadow-sm transition hover:shadow-md';

const WHO_ICONS = {
  globe: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-700" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3.75c-2.5 3-2.5 13.5 0 16.5m0-16.5c2.5 3 2.5 13.5 0 16.5M3.75 12h16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-700" aria-hidden="true">
      <path
        d="M12 3.75a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5Zm3.2 4.1-2.63 5.69-5.69 2.63 2.63-5.69 5.69-2.63Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  bridge: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-700" aria-hidden="true">
      <path
        d="M3 15h18m-15 0v4.5m12-4.5v4.5M6 9a6 6 0 0 1 12 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M4.5 12h15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  sprout: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-700" aria-hidden="true">
      <path
        d="M12 21V11.5C9 11 7.5 8.5 7.5 6c2.5 0 4 1.5 4.5 3.5.5-2 2-3.5 4.5-3.5 0 2.5-1.5 5-4.5 5.5V21"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

const FOCUS_ICONS = {
  transition: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M5 12h5.5L8 6m11 12h-5.5L16 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M4 19h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  confidence: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M7 10.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5S14 15 11.5 15v3.75m0 0L9 21m2.5-3.25L14 21"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  experiments: (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-700" aria-hidden="true">
      <path
        d="M8.5 4.5h7M9 4.5v6.75l-3.5 6.5A2.5 2.5 0 0 0 7.75 21h8.5a2.5 2.5 0 0 0 2.25-3.25L15 11.25V4.5"
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

function WhoIcon({ type }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">{WHO_ICONS[type] ?? WHO_ICONS.globe}</span>
  );
}

function FocusIcon({ type }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/70">{FOCUS_ICONS[type] ?? FOCUS_ICONS.transition}</span>
  );
}

function HomePage() {
  const { t } = useTranslation('home');
  const whoCards = t('whoWeHelp.cards', { returnObjects: true });
  const focusCards = t('focus.cards', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/home.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Abstract illustration of a calm conversation' })}
        priority
      >
        <Link href="/contact" className="btn-primary" aria-label={t('hero.primaryCtaAria')}>
          {t('hero.primaryCta')}
        </Link>
        <Link href="/services" className="btn-secondary" aria-label={t('hero.secondaryCtaAria')}>
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="who-we-help">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('whoWeHelp.title')}</h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('whoWeHelp.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whoCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <HoverLift>
                  <article className={`${CARD_BASE_CLASS} flex h-full flex-col gap-4 text-left`}>
                    <WhoIcon type={card.icon} />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{card.need}</p>
                    </div>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="focus">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('focus.title')}</h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('focus.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {focusCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <HoverLift>
                  <article className={`${CARD_BASE_CLASS} flex h-full flex-col justify-between bg-white text-left`}>
                    <div className="flex flex-col gap-4">
                      <FocusIcon type={card.icon} />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{card.descriptionLine1}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{card.descriptionLine2}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        href={card.href}
                        className="inline-flex items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                        aria-label={card.ariaLabel}
                      >
                        {card.linkLabel}
                      </Link>
                    </div>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeFaq />

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
