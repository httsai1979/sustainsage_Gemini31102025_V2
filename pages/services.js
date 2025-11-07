import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const CARD_BASE_CLASS =
  'rounded-2xl border border-emerald-100 bg-white/80 p-4 md:p-6 shadow-sm transition hover:shadow-md';

function PackageCard({ icon, title, description, details }) {
  return (
    <article className={`${CARD_BASE_CLASS} h-full`}>
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{details}</p>
    </article>
  );
}

function ServicesPage() {
  const { t } = useTranslation('services');
  const packages = t('individual.packages', { returnObjects: true });
  const organisation = t('organisation', { returnObjects: true });
  const practical = t('practical', { returnObjects: true });
  const faqSnippet = t('faqSnippet.items', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/services.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Coaching services illustration' })}
      >
        <Link href="/contact" className="btn-primary" aria-label={t('hero.primaryCtaAria')}>
          {t('hero.primaryCta')}
        </Link>
        <Link href="/contact" className="btn-secondary" aria-label={t('hero.secondaryCtaAria')}>
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20" id="individual-services">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('individual.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('individual.intro')}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <PackageCard
                key={pkg.title}
                icon={['🌱', '🌿', '🔎'][index % 3]}
                title={pkg.title}
                description={pkg.description}
                details={pkg.details}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="organisation">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('organisation.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-900">{organisation.intro}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {organisation.points.map((point) => (
              <article key={point} className={CARD_BASE_CLASS}>
                <p className="text-sm leading-6 text-slate-600">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="practical-info">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('practical.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{practical.intro}</p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
            {practical.items.map((item) => (
              <li key={item} className={CARD_BASE_CLASS}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-50/60 py-16 sm:py-20" id="faq">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('faqSnippet.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-900">{t('faqSnippet.intro')}</p>
          <dl className="mt-10 space-y-6">
            {faqSnippet.map((item) => (
              <div key={item.question} className={CARD_BASE_CLASS}>
                <dt className="text-lg font-semibold text-slate-900">{item.question}</dt>
                <dd className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
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
            <Link href="/contact" className="btn-secondary" aria-label={t('cta.secondaryAria')}>
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
      ...(await serverSideTranslations(locale, ['common', 'services'], nextI18NextConfig)),
    },
  };
}

export default ServicesPage;
