import Image from 'next/image';
import Link from 'next/link';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { SITE_URL } from '@/lib/seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const ABOUT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SustainSage Group Ltd.',
  url: SITE_URL,
};

function AboutPage() {
  const { t } = useTranslation('about');
  const principles = t('philosophy.principles', { returnObjects: true });
  const founders = t('founders.people', { returnObjects: true });
  const safeguards = t('safeguards.items', { returnObjects: true });

  return (
    <>
      <Hero image="/hero/about.svg" align="left" title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <Link href="/contact" className="btn-primary">
          {t('cta.primaryCta')}
        </Link>
        <Link href="/services" className="btn-secondary">
          {t('cta.secondaryCta')}
        </Link>
      </Hero>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('philosophy.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('philosophy.intro')}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('founders.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('founders.intro')}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="flex flex-col items-center rounded-3xl border border-emerald-100 bg-white p-6 text-center shadow-sm"
              >
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full border-4 border-emerald-100 bg-emerald-50 object-cover"
                />
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{founder.name}</h3>
                <p className="text-sm font-medium text-emerald-700">{founder.role}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{founder.bio}</p>
                {founder.credentials && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-emerald-800">
                    {founder.credentials}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('safeguards.title')}
          </h2>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            {safeguards.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald-900 py-16 text-emerald-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('cta.title')}</h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">{t('cta.body')}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
              {t('cta.primaryCta')}
            </Link>
            <Link href="/contact" className="btn-secondary inline-flex items-center justify-center">
              {t('cta.secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

AboutPage.getLayout = function getLayout(page) {
  return <MainLayout jsonLd={ABOUT_JSON_LD}>{page}</MainLayout>;
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'], nextI18NextConfig)),
    },
  };
}

export default AboutPage;
