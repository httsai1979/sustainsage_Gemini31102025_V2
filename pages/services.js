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
  pathway: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M4.5 18h5l1.5-4.5h2L15 9h4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M4.5 21h15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M12 3.75a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5Zm0 0v4.5m0 12v-4.5m0 0 4-4m-8 0 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  ),
  partnership: (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-700" aria-hidden="true">
      <path
        d="M8.25 7.5a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm6.75 1.5a2.25 2.25 0 1 0 0-4.5"
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
};

function IconBadge({ type }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100" aria-hidden="true">
      {ICONS[type] ?? ICONS.pathway}
    </span>
  );
}

function ServicesPage() {
  const { t } = useTranslation('services');
  const packages = t('packages.cards', { returnObjects: true });
  const howSteps = t('howItWorks.steps', { returnObjects: true });
  const checklist = t('checklist.items', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        note={t('hero.note')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Coaching services illustration' })}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('hero.primaryCtaAria')}>
          {t('hero.primaryCta')}
        </Link>
        <Link href="#packages" className="btn-secondary" aria-label={t('hero.secondaryCtaAria')}>
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="packages">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('packages.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-slate-600">{t('packages.subtitle')}</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.title} className={`reveal-${index + 2}`}>
                <article className={`${CARD_BASE_CLASS} h-full text-left`}>
                  <IconBadge type={pkg.icon} />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{pkg.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{pkg.summary}</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">{t('packages.labels.for')}</p>
                      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                        {pkg.for.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">{t('packages.labels.includes')}</p>
                      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                        {pkg.includes.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">{t('packages.labels.outcomes')}</p>
                      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                        {pkg.outcomes.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="services-how-it-works">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {t('howItWorks.title')}
              </h2>
            </Reveal>
            <Reveal className="reveal-1">
              <p className="mt-4 text-base leading-7 text-emerald-900">{t('howItWorks.subtitle')}</p>
            </Reveal>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {howSteps.map((step, index) => (
              <Reveal key={step.title} className={`reveal-${index + 2}`}>
                <li className={`${CARD_BASE_CLASS} h-full bg-white text-left`}>
                  <p className="text-sm font-semibold text-emerald-700">{`${index + 1}. ${step.title}`}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="is-this-for-me">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('checklist.title')}
            </h2>
          </Reveal>
          <Reveal className="reveal-1">
            <p className="mt-4 text-base leading-7 text-slate-600">{t('checklist.subtitle')}</p>
          </Reveal>
          <Reveal className="reveal-2">
            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
              {checklist.map((item) => (
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
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('cta.body')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary" aria-label={t('cta.primaryAria')}>
              {t('cta.primaryCta')}
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
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
