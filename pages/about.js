import Image from 'next/image';
import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/80 p-4 md:p-6 shadow-sm transition hover:shadow-md';

function NarrativeSection({ title, body, items }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">{body}</p>
        {items && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.title || item} className={CARD_BASE_CLASS}>
                {item.title ? (
                  <>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </>
                ) : (
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

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
  const approachPrinciples = t('approach.items', { returnObjects: true });
  const ethicsPoints = t('ethics.items', { returnObjects: true });
  const founders = t('founders.people', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
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

      <NarrativeSection title={t('story.title')} body={t('story.body')} />
      <NarrativeSection title={t('approach.title')} body={t('approach.body')} items={approachPrinciples} />
      <NarrativeSection title={t('ethics.title')} body={t('ethics.body')} items={ethicsPoints} />
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
