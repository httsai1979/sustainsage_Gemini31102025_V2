import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DocumentArrowDownIcon, BookOpenIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchResourceItems } from '@/lib/contentful';
import nextI18NextConfig from '@/next-i18next.config.js';

const FILTER_ORDER = ['all', 'career', 'culture', 'growth'];

const FALLBACK_RESOURCES = [
  {
    id: 'values-worksheet',
    translationKey: 'items.valuesWorksheet',
    type: 'worksheet',
    category: 'career',
    image: '/images/resources/values-worksheet.svg',
    href: '/contact?topic=values-worksheet',
  },
  {
    id: 'grounding-audio',
    translationKey: 'items.groundingAudio',
    type: 'audio',
    category: 'growth',
    image: '/images/resources/grounding-audio.svg',
    href: '/contact?topic=grounding-audio',
  },
  {
    id: 'imposter-reading',
    translationKey: 'items.imposterReading',
    type: 'reading',
    category: 'career',
    image: '/images/resources/imposter-reading.svg',
    href: '/blog/career-change-coaching-perspective',
  },
  {
    id: 'culture-checklist',
    translationKey: 'items.cultureChecklist',
    type: 'worksheet',
    category: 'culture',
    image: '/images/resources/culture-checklist.svg',
    href: '/contact?topic=culture-checklist',
  },
];

const TYPE_ICON = {
  worksheet: DocumentArrowDownIcon,
  reading: BookOpenIcon,
  audio: PlayCircleIcon,
};

const TYPE_FALLBACK_IMAGE = {
  worksheet: '/images/resources/values-worksheet.svg',
  reading: '/images/resources/imposter-reading.svg',
  audio: '/images/resources/grounding-audio.svg',
};

const normalizeCategory = (value) => (value ? value.toLowerCase() : 'career');
const normalizeType = (value) => (value ? value.toLowerCase() : 'worksheet');

const buildHref = (item) => {
  if (item.externalUrl) {
    return item.externalUrl;
  }
  const fileUrl = item.file?.fields?.file?.url;
  if (fileUrl) {
    return fileUrl.startsWith('http') ? fileUrl : `https:${fileUrl}`;
  }
  return item.href || null;
};

function ResourceCard({ resource, typeLabel }) {
  const Icon = TYPE_ICON[resource.type] || DocumentArrowDownIcon;
  const href = resource.href || '/contact';
  const isExternal = href.startsWith('http');
  const imageSrc = resource.image || TYPE_FALLBACK_IMAGE[resource.type] || TYPE_FALLBACK_IMAGE.worksheet;
  const ctaLabel = resource.ctaLabel || resource.typeLabel || 'View resource';

  const content = (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-emerald-50">
        <Image
          src={imageSrc}
          alt={resource.title}
          width={480}
          height={320}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="mt-6 flex-1 space-y-3">
        <div className="flex items-center space-x-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
          <span>{typeLabel}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
        {resource.summary && <p className="text-sm leading-6 text-gray-600">{resource.summary}</p>}
      </div>
    </>
  );

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-lg">
      {content}
      <div className="mt-6">
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {ctaLabel}
          </a>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}

export default function ResourcesPage({ allResources = [] }) {
  const { t } = useTranslation('resources');
  const [activeFilter, setActiveFilter] = useState('all');

  const preparedResources = useMemo(() => {
    if (Array.isArray(allResources) && allResources.length > 0) {
      return allResources
        .map((item) => {
          if (!item) return null;
          const type = normalizeType(item.type);
          const category = normalizeCategory(item.category);
          const href = buildHref(item);

          return {
            id: item.id,
            title: item.title,
            summary: item.summary || '',
            type,
            category,
            image: item.image || TYPE_FALLBACK_IMAGE[type] || null,
            href,
            ctaLabel:
              item.ctaText ||
              t(`actions.${type}`, {
                defaultValue: t('actions.default', 'View resource'),
              }),
          };
        })
        .filter(Boolean);
    }

    return FALLBACK_RESOURCES.map((resource) => {
      const type = normalizeType(resource.type);
      return {
        id: resource.id,
        title: t(`${resource.translationKey}.title`),
        summary: t(`${resource.translationKey}.summary`),
        type,
        category: resource.category,
        image: resource.image || TYPE_FALLBACK_IMAGE[type],
        href: resource.href,
        ctaLabel: t(`${resource.translationKey}.cta`),
      };
    });
  }, [allResources, t]);

  const filters = FILTER_ORDER.map((filterId) => ({
    id: filterId,
    label: t(`filters.${filterId}`),
  }));

  const visibleResources = preparedResources.filter((resource) =>
    activeFilter === 'all' ? true : resource.category === activeFilter,
  );

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">{t('hero.subtitle')}</p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={[
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  ].join(' ')}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {visibleResources.length === 0 ? (
              <p className="col-span-3 text-center text-gray-600">{t('emptyState')}</p>
            ) : (
              visibleResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  typeLabel={t(`types.${resource.type}`, { defaultValue: resource.type })}
                />
              ))
            )}
          </div>

          <p className="mt-16 text-center text-sm text-gray-500">{t('contactPrompt')}</p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const allResources = await fetchResourceItems();
  const translations = await serverSideTranslations(locale, ['common', 'resources'], nextI18NextConfig);

  return {
    props: {
      allResources,
      ...translations,
    },
    revalidate: 60,
  };
}
