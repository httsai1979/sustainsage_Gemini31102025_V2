import Image from 'next/image';
import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import HomeForWhom from '@/components/Sections/HomeForWhom';
import StickyCTA from '@/components/StickyCTA';
import { Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/80 p-4 md:p-6 shadow-sm transition hover:shadow-md';

function EmojiCard({ icon, title, description }) {
  return (
    <article className={`${CARD_BASE_CLASS} h-full`}>
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

function StepCard({ title, description, index }) {
  return (
    <article className={`${CARD_BASE_CLASS} h-full`}>
      <p className="text-sm font-semibold text-emerald-700">{`${index}. ${title}`}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

function HomePage() {
  const { t } = useTranslation('home');
  const servicesOverview = t('servicesOverview.cards', { returnObjects: true });
  const howSteps = t('howItWorks.steps', { returnObjects: true });
  const whyPoints = t('whySustainSage.points', { returnObjects: true });
  const founders = t('founders.people', { returnObjects: true });
  const deepDiveLabels = t('deepDive.labels', { returnObjects: true });
  const deepDiveStories = t('deepDive.stories', { returnObjects: true });
  const workingTogetherPoints = t('workingTogether.points', { returnObjects: true });
  const miniCaseCards = t('miniCases.cards', { returnObjects: true });

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
        <Link href="/services" className="btn-secondary" aria-label={t('hero.secondaryCtaAria')}>
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="working-together">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('workingTogether.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('workingTogether.intro')}</p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {workingTogetherPoints.map((point, index) => (
              <Reveal key={point.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} h-full text-left`}>
                  <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{point.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeForWhom />

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="mini-cases">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('miniCases.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('miniCases.intro')}</p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {miniCaseCards.map((card, index) => (
              <Reveal key={card.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} bg-white text-left`}>
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 whitespace-pre-line">{card.story}</p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-emerald-700">
                    {t('miniCases.disclaimer')}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="home-stories">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {deepDiveLabels.storiesTitle}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">
                {deepDiveLabels.storiesIntro}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 space-y-6">
            {deepDiveStories.map((story, index) => (
              <Reveal key={story.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} bg-white text-left`}>
                  <h3 className="text-lg font-semibold text-slate-900">{story.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{story.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="services-overview">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('servicesOverview.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-emerald-900">{t('servicesOverview.intro')}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {servicesOverview.map((card, index) => (
              <EmojiCard
                key={card.title}
                icon={['🪴', '🧭', '🔍'][index % 3]}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{t('howItWorks.title')}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{t('howItWorks.intro')}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {howSteps.map((step, index) => (
                <StepCard
                  key={step.title}
                  index={index + 1}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="why-sustainsage">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('whySustainSage.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('whySustainSage.intro')}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyPoints.map((point, index) => (
              <EmojiCard
                key={point.title}
                icon={['🧭', '🌐', '🛡️'][index % 3]}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="founders">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('founders.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-emerald-900">{t('founders.intro')}</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {founders.map((founder) => (
              <article key={founder.name} className={`${CARD_BASE_CLASS} flex h-full flex-col items-start text-left`}>
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-emerald-100">
                  <Image src={founder.image} alt={founder.name} fill sizes="80px" className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{founder.name}</h3>
                <p className="text-sm font-medium text-emerald-700">{founder.role}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{founder.bio}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/about" className="btn-secondary" aria-label={t('founders.ctaAria')}>
              {t('founders.cta')}
            </Link>
          </div>
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
