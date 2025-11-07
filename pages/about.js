import Image from 'next/image';
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

const HOW_ICONS = {
  clientLed: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-700" aria-hidden="true">
      <path
        d="M8.25 8.25a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Zm-2.5 12c0-2.5 2.5-4.5 5-4.5h4.5c2.5 0 5 2 5 4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  reflective: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-700" aria-hidden="true">
      <path
        d="M6.75 4.5h10.5A1.75 1.75 0 0 1 19 6.25v11.5A1.75 1.75 0 0 1 17.25 19H6.75A1.75 1.75 0 0 1 5 17.75V6.25A1.75 1.75 0 0 1 6.75 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M9 8.5h6m-6 3h4m-4 3h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  ethics: (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-700" aria-hidden="true">
      <path
        d="M12 4.5c3 0 6 1.5 6 4.5 0 5-6 9-6 9s-6-4-6-9c0-3 3-4.5 6-4.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M9.75 9h4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
};

function HowIcon({ type }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100/80">
      {HOW_ICONS[type] ?? HOW_ICONS.clientLed}
    </span>
  );
}

function KeywordBadge({ children }) {
  return (
    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">{children}</span>
  );
}

function AboutPage() {
  const { t } = useTranslation('about');
  const clientPoints = t('clients.items', { returnObjects: true });
  const howCards = t('how.cards', { returnObjects: true });
  const coaches = t('coaches.cards', { returnObjects: true });
  const notFit = t('notFit.items', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        note={t('hero.note')}
        image="/hero/about.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Abstract illustration of a supportive coaching partnership' })}
      />

      <section className="bg-white py-16 sm:py-20" id="clients">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('clients.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('clients.subtitle')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <ul className="mt-8 grid gap-4 text-sm leading-6 text-slate-700 sm:grid-cols-2">
              {clientPoints.map((point) => (
                <li key={point} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>{point}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="how-we-coach">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('how.title')}</h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('how.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {howCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <HoverLift>
                  <article className={`${CARD_BASE_CLASS} bg-white text-left`}>
                    <HowIcon type={card.icon} />
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.body}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                      {card.points.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="coaches">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('coaches.title')}</h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('coaches.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {coaches.map((coach, index) => (
              <Reveal key={coach.name} className={`reveal-${index + 2}`}>
                <HoverLift>
                  <article className={`${CARD_BASE_CLASS} flex h-full flex-col gap-6 text-left`}>
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-emerald-100">
                        <Image src={coach.image} alt={coach.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{coach.name}</h3>
                        <p className="text-sm font-medium text-emerald-700">{coach.role}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{coach.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {coach.keywords.map((word) => (
                        <KeywordBadge key={word}>{word}</KeywordBadge>
                      ))}
                    </div>
                  </article>
                </HoverLift>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/90 py-16">
        <div className="mx-auto max-w-4xl px-6 text-emerald-50">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t('notFit.title')}</h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-emerald-100">{t('notFit.subtitle')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-emerald-100">
              {notFit.map((item) => (
                <li key={item} className="rounded-2xl border border-emerald-400/30 bg-white/5 p-4 text-left">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-emerald-50">
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
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'], nextI18NextConfig)),
    },
  };
}

export default AboutPage;
