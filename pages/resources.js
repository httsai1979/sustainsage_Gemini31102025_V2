import { useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchResourceItems } from '../lib/contentful';
import nextI18NextConfig from '../next-i18next.config.js';
import { DocumentArrowDownIcon, LinkIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

const filterTypes = ['All', 'Worksheet', 'Reading', 'Audio'];

export default function ResourcesPage({ allResources = [] }) {
  const { t } = useTranslation('common');
  const [filter, setFilter] = useState('All');

  const filteredResources = allResources.filter((resource) => {
    if (!resource) {
      return false;
    }
    if (filter === 'All') {
      return true;
    }
    return resource.type === filter;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'Worksheet':
        return <DocumentArrowDownIcon className="h-8 w-8 text-gray-700" />;
      case 'Reading':
        return <LinkIcon className="h-8 w-8 text-gray-700" />;
      case 'Audio':
        return <PlayCircleIcon className="h-8 w-8 text-gray-700" />;
      default:
        return null;
    }
  };

  const getResourceLink = (item) => {
    if (item.type === 'Worksheet' && item.file?.fields?.file?.url) {
      return {
        href: `https:${item.file.fields.file.url}`,
        target: '_blank',
        rel: 'noopener noreferrer',
      };
    }

    if ((item.type === 'Reading' || item.type === 'Audio') && item.externalUrl) {
      return {
        href: item.externalUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
      };
    }

    return { href: '#', target: '_self' };
  };

  return (
    <>
      <Head>
        <title>{t('resources.heroTitle')}</title>
        <meta name="description" content={t('resources.heroSubtitle')} />
      </Head>

      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('resources.heroTitle')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('resources.heroSubtitle')}
            </p>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-4">
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                  ${filter === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {type === 'All' ? t('resources.filterAll') : t(`resources.cardType${type}`)}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredResources.length === 0 ? (
              <p className="col-span-3 text-center text-gray-600">
                {t('resources.emptyState', 'No resources found for this category.')}
              </p>
            ) : (
              filteredResources.map((item) => (
                <a
                  key={item.id}
                  {...getResourceLink(item)}
                  className="block rounded-2xl bg-gray-50 p-6 shadow-sm ring-1 ring-inset ring-gray-200 transition-shadow hover:ring-indigo-400"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">{getIcon(item.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm font-medium text-indigo-600">{item.ctaText}</p>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const allResources = await fetchResourceItems();
  const translations = await serverSideTranslations(locale, ['common'], nextI18NextConfig);

  return {
    props: {
      allResources,
      ...translations,
    },
    revalidate: 60,
  };
}
