import Image from 'next/image';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import MainLayout from '@/components/layout/MainLayout';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const FALLBACK_RESOURCES = [
  {
    id: 'self-talk-reframe',
    image: '/images/resources/values-worksheet.svg',
    translationKey: 'items.selfTalk',
    href: '/contact?topic=self-talk-reframe',
  },
  {
    id: 'experiment-ladder',
    image: '/images/resources/culture-checklist.svg',
    translationKey: 'items.experimentLadder',
    href: '/contact?topic=experiment-ladder',
  },
  {
    id: 'values-map',
    image: '/images/resources/values-worksheet.svg',
    translationKey: 'items.valuesMap',
    href: '/contact?topic=values-map',
  },
  {
    id: 'emotion-triangle',
    image: '/images/resources/grounding-audio.svg',
    translationKey: 'items.emotionTriangle',
    href: '/contact?topic=emotion-triangle',
  },
  {
    id: 'thought-log',
    image: '/images/resources/imposter-reading.svg',
    translationKey: 'items.thoughtLog',
    href: '/contact?topic=thought-log',
  },
  {
    id: 'beliefs-explorer',
    image: '/images/resources/culture-checklist.svg',
    translationKey: 'items.beliefsExplorer',
    href: '/contact?topic=beliefs-explorer',
  },
];

function ResourceCard({ resource }) {
  return (
    <HoverLift className="h-full">
      <article className="flex h-full flex-col justify-between rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-emerald-50">
            <Image
              src={resource.image}
              alt={resource.title}
              width={400}
              height={280}
              className="h-44 w-full object-cover"
            />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-slate-900">{resource.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{resource.summary}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-emerald-700">{resource.formatLabel}</p>
        </div>
        <div className="mt-6">
          <Link
            href={resource.href}
            className="inline-flex items-center justify-center rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800"
          >
            {resource.cta}
          </Link>
        </div>
      </article>
    </HoverLift>
  );
}

function ResourcesPage() {
  const { t } = useTranslation('resources');
  const resources = FALLBACK_RESOURCES.map((item) => ({
    ...item,
    title: t(`${item.translationKey}.title`),
    summary: t(`${item.translationKey}.summary`),
    formatLabel: t(`${item.translationKey}.format`),
    cta: t(`${item.translationKey}.cta`),
  }));

  return (
    <>
      <Hero
        image="/hero/resources.svg"
        align="left"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {t('curatedTitle')}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-600">{t('usageNote')}</p>
        </div>
      </section>

      <div className="px-6 pb-16">
        <ICFNotice className="mx-auto max-w-4xl" />
      </div>
    </>
  );
}

ResourcesPage.getLayout = function getLayout(page) {
  return (
    <MainLayout title="Resources | SustainSage" desc="Self-reflection tools you can use at your pace.">
      {page}
    </MainLayout>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'resources'], nextI18NextConfig)),
    },
  };
}

export default ResourcesPage;
