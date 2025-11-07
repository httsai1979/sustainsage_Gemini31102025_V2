import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/85 p-5 shadow-sm transition hover:shadow-md';

const ICONS = {
  ethos: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M12 4.5 6.75 7.5v5.25a6.75 6.75 0 0 0 10.5 5.72"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="m12 4.5 5.25 3v5.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M8.25 8.25a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm6.75 1.5a2.25 2.25 0 1 0 0-4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5.25 18.75v-1.5a3.75 3.75 0 0 1 7.5 0v1.5m1.5 0v-1.5a3.75 3.75 0 0 1 3.75-3.75h.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  practice: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M6 15h4l2-6 2 9 2-6h2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M5 19h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
};

function IconBadge({ type }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100" aria-hidden="true">
      {ICONS[type] ?? ICONS.ethos}
    </span>
  );
}

function AboutPage() {
  const { t } = useTranslation('about');
  const practiceCards = t('practiceInBrief.cards', { returnObjects: true });
  const coaches = t('coaches.cards', { returnObjects: true });
  const principles = t('principles.items', { returnObjects: true });
  const experience = t('experience.items', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        note={t('hero.note')}
        image="/hero/about.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Coaching team illustration' })}
      />

      <section className="bg-white py-16 sm:py-20" id="practice-in-brief">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('practiceInBrief.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('practiceInBrief.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {practiceCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} h-full text-left`}>
                  <IconBadge type={card.icon} />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="coaches">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('coaches.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('coaches.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {coaches.map((coach, index) => (
              <Reveal key={coach.name} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} flex h-full flex-col gap-5 bg-white text-left md:flex-row`}>
                  <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border border-emerald-100 md:mx-0">
                    <Image src={coach.image} alt={coach.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{coach.name}</h3>
                      <p className="text-sm font-medium text-emerald-700">{coach.role}</p>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {coach.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="principles">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('principles.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {principles.map((item) => (
                <li key={item} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="experience">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('experience.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-emerald-900">
              {experience.map((item) => (
                <li key={item} className={`${CARD_BASE_CLASS} bg-white text-left`}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-950/90 py-16">
        <div className="mx-auto max-w-4xl px-6 text-emerald-50">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t('icfSummary.title')}</h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-emerald-100">{t('icfSummary.body')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <a
              href={t('icfSummary.linkHref')}
              className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-200 underline-offset-4 transition hover:text-emerald-100"
            >
              {t('icfSummary.link')}
            </a>
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
