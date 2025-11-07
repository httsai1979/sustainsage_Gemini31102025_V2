import Image from 'next/image';
import Link from 'next/link';

import Hero from '@/components/layout/Hero';
import ICFNotice from '@/components/legal/ICFNotice';
import { HoverLift, Reveal } from '@/components/ui/Motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

const FALLBACK_RESOURCES = [
  {
    id: 'reflection-questions',
    image: '/images/resources/values-worksheet.svg',
    translationKey: 'items.reflectionQuestions',
    href: '/contact?topic=reflection-questions',
  },
  {
    id: 'career-experiments',
    image: '/images/resources/culture-checklist.svg',
    translationKey: 'items.careerExperiments',
    href: '/contact?topic=career-experiments',
  },
  {
    id: 'cultural-checklists',
    image: '/images/resources/culture-checklist.svg',
    translationKey: 'items.culturalChecklists',
    href: '/contact?topic=cultural-checklists',
  },
  {
    id: 'conversation-guides',
    image: '/images/resources/imposter-reading.svg',
    translationKey: 'items.conversationGuides',
    href: '/contact?topic=conversation-guides',
  },
  {
    id: 'self-advocacy',
    image: '/images/resources/grounding-audio.svg',
    translationKey: 'items.selfAdvocacy',
    href: '/contact?topic=self-advocacy-toolkit',
  },
  {
    id: 'review-journal',
    image: '/images/resources/values-worksheet.svg',
    translationKey: 'items.reviewJournal',
    href: '/contact?topic=review-journal',
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
            {resource.status && (
              <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                {resource.status}
              </span>
            )}
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
  const resources = FALLBACK_RESOURCES.map((item) => {
    const statusValue = t(`${item.translationKey}.status`);
    const safeStatus = statusValue === `${item.translationKey}.status` ? '' : statusValue;

    return {
      ...item,
      title: t(`${item.translationKey}.title`),
      summary: t(`${item.translationKey}.summary`),
      formatLabel: t(`${item.translationKey}.format`),
      status: safeStatus,
      cta: t(`${item.translationKey}.cta`),
    };
  });

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
          <p className="mt-4 text-base leading-7 text-slate-700">{t('curatedIntro')}</p>
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

ResourcesPage.layoutProps = (pageProps) => {
  const locale = pageProps?._nextI18Next?.initialLocale;
  const store = pageProps?._nextI18Next?.initialI18nStore?.[locale]?.resources;

  return {
    title: store?.seo?.title ?? 'Resources | SustainSage',
    desc:
      store?.seo?.description ??
      'Coaching-informed, bilingual-friendly resources for reflection and career experiments.',
  };
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'resources'], nextI18NextConfig)),
    },
  };
}

export default ResourcesPage;
