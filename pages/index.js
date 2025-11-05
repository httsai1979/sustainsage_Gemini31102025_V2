import Link from 'next/link';
import StickyCTA from '@/components/StickyCTA';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { SITE_URL } from '@/lib/seo';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function HomePage() {
  const { t } = useTranslation('home');
  const audiences = t('audiences', { returnObjects: true });
  const process = t('process', { returnObjects: true });
  const faqs = t('faqs', { returnObjects: true });

  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <Link
          href="/contact"
          className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          {t('hero.primaryCta')}
        </Link>
        <a
          href="#how-it-works"
          className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800"
        >
          {t('hero.secondaryCta')}
        </a>
      </Hero>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('audiencesTitle')}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map((item) => (
              <HoverLift key={item.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('processTitle')}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {process.map((step) => (
              <HoverLift key={step.title} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('faqTitle')}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer text-base font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>

      <StickyCTA />
    </>
  );
}

HomePage.getLayout = function getLayout(page) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: SITE_URL,
      name: 'SustainSage Coaching',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SustainSage Group Ltd.',
      url: SITE_URL,
    },
  ];

  return (
    <MainLayout
      title="SustainSage | Coaching"
      desc="Calm, client-led coaching grounded in ICF ethics."
      jsonLd={jsonLd}
    >
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'], nextI18NextConfig)),
    },
  };
}

export default HomePage;
