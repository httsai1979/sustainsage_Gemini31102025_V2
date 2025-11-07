import Image from 'next/image';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import FAQSection from '@/components/Sections/FAQSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function AboutPage() {
  const { t } = useTranslation('about');

  const missionBullets = t('mission.bullets', { returnObjects: true });
  const rootsBullets = t('roots.bullets', { returnObjects: true });
  const practiceBullets = t('practice.bullets', { returnObjects: true });
  const boundaryBullets = t('boundaries.bullets', { returnObjects: true });
  const coaches = t('coaches.cards', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/about.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Two coaches seated in conversation' })}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('mission.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t('mission.description')}</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {missionBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('roots.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t('roots.description')}</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
            {rootsBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('coaches.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('coaches.subtitle')}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {coaches.map((coach) => (
              <div key={coach.name} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-emerald-50">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    sizes="(min-width: 768px) 280px, 100vw"
                    className="object-contain p-6"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{coach.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{coach.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {coach.keywords.map((keyword) => (
                    <li key={keyword} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('practice.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('practice.description')}</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {practiceBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('boundaries.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('boundaries.description')}</p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {boundaryBullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection categories={['about', 'general']} limit={3} />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('cta.body')}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
              aria-label={t('cta.primaryAria')}
            >
              {t('cta.primaryCta')}
            </Link>
            <Link
              href="/contact"
              className={`${BUTTON_BASE} bg-white text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
              aria-label={t('cta.secondaryAria')}
            >
              {t('cta.secondaryCta')}
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about', 'faq'], nextI18NextConfig)),
    },
  };
}

export default AboutPage;
