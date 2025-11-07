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
  'rounded-2xl border border-emerald-100 bg-white/80 p-4 md:p-6 shadow-sm transition hover:shadow-md';

function FoundersSection({ title, intro, people }) {
  return (
    <section className="bg-emerald-50/60 py-16 sm:py-20" id="founders">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-900">{intro}</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {people.map((person) => (
            <article key={person.name} className={`${CARD_BASE_CLASS} flex h-full flex-col items-start text-left`}>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-emerald-100">
                  <Image src={person.image} alt={person.name} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{person.name}</h3>
                  <p className="text-sm font-medium text-emerald-700">{person.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{person.bio}</p>
              <p className="mt-3 text-xs uppercase tracking-wide text-emerald-700">{person.languages}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{person.focus}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const { t } = useTranslation('about');
  const pillars = t('pillars.items', { returnObjects: true });
  const storyParagraphs = t('story.paragraphs', { returnObjects: true });
  const agreements = t('agreements.items', { returnObjects: true });
  const fitFor = t('fit.for', { returnObjects: true });
  const fitNotFor = t('fit.notFor', { returnObjects: true });
  const practicePoints = t('practice.points', { returnObjects: true });
  const founders = t('founders.people', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        note={t('hero.note')}
        image="/hero/about.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Coaching team illustration' })}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('hero.primaryCtaAria')}>
          {t('hero.primaryCta')}
        </Link>
        <Link href="/services" className="btn-secondary" aria-label={t('hero.secondaryCtaAria')}>
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('pillars.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('pillars.intro')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} h-full text-left`}>
                  <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('story.title')}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 text-base leading-7 text-emerald-900">
            {storyParagraphs.map((paragraph) => (
              <Reveal key={paragraph} className="reveal-1">
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('agreements.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <ul className="mt-6 space-y-4 text-base leading-7 text-slate-700">
              {agreements.map((item) => (
                <li key={item} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('fit.title')}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal className="reveal-1">
              <div className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                <h3 className="text-lg font-semibold text-emerald-900">{t('fit.forLabel')}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {fitFor.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal className="reveal-2">
              <div className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                <h3 className="text-lg font-semibold text-emerald-900">{t('fit.notForLabel')}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {fitNotFor.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('practice.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('practice.intro')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {practicePoints.map((point) => (
                <li key={point} className={`${CARD_BASE_CLASS} bg-white/90 text-left`}>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-emerald-950/90 py-16">
        <div className="mx-auto max-w-4xl px-6 text-emerald-50">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('dataProtection.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-emerald-100">{t('dataProtection.body')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <Link
              href={t('dataProtection.linkHref')}
              className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-200 underline-offset-4 transition hover:text-emerald-100"
            >
              {t('dataProtection.link')}
            </Link>
          </Reveal>
        </div>
      </section>

      <FoundersSection title={t('founders.title')} intro={t('founders.intro')} people={founders} />

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
