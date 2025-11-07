import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import ServiceCard from '@/components/ui/ServiceCard';
import HomeFaq from '@/components/Sections/HomeFaq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

function HomePage() {
  const { t } = useTranslation('home');

  const fitBullets = t('fit.bullets', { returnObjects: true });
  const approachBullets = t('approach.bullets', { returnObjects: true });
  const supportBullets = t('support.bullets', { returnObjects: true });
  const serviceCards = t('services.cards', { returnObjects: true });

  return (
    <MainLayout title={t('seo.title')} desc={t('seo.description')}>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="/hero/home.svg"
        imageAlt={t('hero.imageAlt', { defaultValue: 'Illustration of a reflective coaching conversation' })}
        priority
      >
        <Link
          href="/contact?from=home-hero"
          className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          aria-label={t('hero.primaryCtaAria')}
        >
          {t('hero.primaryCta')}
        </Link>
        <Link
          href="/services"
          className={`${BUTTON_BASE} bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100 focus-visible:outline-emerald-700`}
          aria-label={t('hero.secondaryCtaAria')}
        >
          {t('hero.secondaryCta')}
        </Link>
      </Hero>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('fit.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('fit.description')}</p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-slate-700">
            {fitBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('approach.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('approach.description')}</p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-slate-700">
            {approachBullets.map((item) => (
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
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('services.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('services.description')}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((card) => (
              <ServiceCard
                key={card.slug}
                title={card.title}
                description={card.description}
                href={card.href}
                cta={card.cta}
                imageSrc={card.image}
                imageAlt={card.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('support.title')}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t('support.description')}</p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-slate-700">
            {supportBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeFaq />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-emerald-50/70 px-8 py-12 text-center shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('cta.body')}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact?from=home-cta"
              className={`${BUTTON_BASE} bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
              aria-label={t('cta.primaryAria')}
            >
              {t('cta.primaryCta')}
            </Link>
            <Link
              href="/contact?from=home-cta"
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
      ...(await serverSideTranslations(locale, ['common', 'home', 'faq'], nextI18NextConfig)),
    },
  };
}

export default HomePage;
