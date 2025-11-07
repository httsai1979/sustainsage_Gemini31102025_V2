import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import MainLayout from '@/components/layout/MainLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../../next-i18next.config.js';

const BUTTON_BASE =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const FALLBACK_SECTION_TITLES = {
  who: 'Who this is for',
  topics: 'What we work on together',
  how: 'How it works',
  approach: 'Our coaching approach',
  not: 'What this is not',
};

function Section({ title, items }) {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function NewToUkServicePage() {
  const { t } = useTranslation('serviceDetails');
  const detail = t('newToUk', { returnObjects: true });
  const localizedSectionTitles = t('sectionTitles', { returnObjects: true });
  const sectionTitles = { ...FALLBACK_SECTION_TITLES, ...localizedSectionTitles };

  const sections = [
    { key: 'who', title: sectionTitles.who, items: detail.who },
    { key: 'topics', title: sectionTitles.topics, items: detail.topics },
    { key: 'how', title: sectionTitles.how, items: detail.how },
    { key: 'approach', title: sectionTitles.approach, items: detail.approach },
    { key: 'not', title: sectionTitles.not, items: detail.not },
  ];

  return (
    <MainLayout title={`${detail.title} | SustainSage`} desc={detail.subtitle}>
      <Hero
        title={detail.title}
        subtitle={detail.subtitle}
        image="/images/services/new-to-uk.svg"
        imageAlt="Illustration of a signpost and UK skyline"
      />

      {sections.map((section) => (
        <Section key={section.key} title={section.title} items={section.items} />
      ))}

      <section className="bg-emerald-950/5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-100 bg-white px-8 py-10 text-center shadow-sm">
          <p className="text-base leading-7 text-slate-700">{detail.cta}</p>
          <Link
            href={`/contact?package=${detail.slug}`}
            className={`${BUTTON_BASE} mt-6 bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700`}
          >
            {detail.ctaButton}
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'serviceDetails'], nextI18NextConfig)),
    },
  };
}

export default NewToUkServicePage;
