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
  const toArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);
  const brandParagraphs = toArray(t('brand.paragraphs', { returnObjects: true }));
  const brandHighlights = toArray(t('brand.highlights', { returnObjects: true }));
  const practicePillars = toArray(t('practice.pillars', { returnObjects: true }));
  const coachParagraphs = toArray(t('coach.paragraphs', { returnObjects: true }));
  const coachHighlights = toArray(t('coach.highlights', { returnObjects: true }));

  return (
    <>
      <Hero
        image="/hero/about.svg"
        align="left"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('brand.title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{t('brand.lead')}</p>
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
            {brandParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 rounded-3xl bg-emerald-50/60 p-6 sm:grid-cols-2">
            {brandHighlights.map((item) => (
              <div key={item} className="text-sm leading-6 text-emerald-900">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('practice.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('practice.lead')}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {practicePillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-3xl border border-emerald-100 bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t('coach.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">{t('coach.lead')}</p>
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
            {coachParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-4 rounded-3xl border border-slate-200 p-6 sm:grid-cols-2">
            {coachHighlights.map((item) => (
              <li key={item} className="text-sm leading-6 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

AboutPage.layoutProps = {
  title: 'About | SustainSage',
  desc: 'Bilingual, ICF-aligned coaching practice grounded in ethics and cultural fluency.',
  jsonLd: ABOUT_JSON_LD,
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'], nextI18NextConfig)),
    },
  };
}

export default AboutPage;
