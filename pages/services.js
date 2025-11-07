import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/85 p-6 shadow-sm transition hover:shadow-md';

const SERVICE_ICONS = {
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

function ServiceIcon({ type }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100/70">
      {SERVICE_ICONS[type] ?? SERVICE_ICONS.transition}
    </span>
  );
}

function ServicesPage() {
  const { t } = useTranslation('services');
  const packageCards = t('packages.cards', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Abstract illustration of coaching services' })}
      />

      <section className="bg-white py-16 sm:py-20" id="services-overview">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('packages.title')}</h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('overview.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packageCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <HoverLift>
                  <article className={`${CARD_BASE_CLASS} flex h-full flex-col justify-between bg-white text-left`}>
                    <div className="flex flex-col gap-4">
                      <ServiceIcon type={card.icon} />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                        <p className="mt-2 text-sm font-medium text-emerald-700">{card.for}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{card.focus}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{card.format}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        href={card.href}
                        className="inline-flex items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                        aria-label={card.ariaLabel}
                      >
                        {card.cta}
                      </Link>
                    </div>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-emerald-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('cta.body')}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            aria-label={t('cta.primaryAria')}
          >
            {t('cta.primaryCta')}
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

export default ServicesPage;
