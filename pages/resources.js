// pages/resources.js

import { useState } from 'react'; // [ ! ] 我們需要 useState 來管理篩選器
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// [ ! ] 匯入 Contentful 服務 (使用 ../ 路徑)
import { fetchResourceItems } from '../lib/contentful';

// [ ! ] 匯入我們需要的圖示
import { DocumentArrowDownIcon, LinkIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

// 篩選器的類型
// 註：V1.0 規格書要求按「主題」篩選 (例如 職涯反思)。
// 我們的模型目前只有「類型」。我們暫時先按「類型」篩選，功能是相同的。
const filterTypes = ['All', 'Worksheet', 'Reading', 'Audio'];

export default function ResourcesPage({ allResources }) {
  const { t } = useTranslation('common');

  // [ ! ] 篩選器狀態管理
  const [filter, setFilter] = useState('All'); // 預設顯示 "All"

  // 根據當前 'filter' 狀態過濾 'allResources'
  const filteredResources = allResources.filter(resource => {
    if (filter === 'All') {
      return true; // "All" = 顯示全部
    }
    // 只顯示 'type' 與當前 'filter' 匹配的資源
    return resource.type === filter; 
  });

  // [ ! ] 根據資源類型返回對應的圖示
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

  // [ ! ] 根據資源類型返回對應的 CTA 連結
  const getResourceLink = (item) => {
    if (item.type === 'Worksheet' && item.file?.fields?.file?.url) {
      // 類型：Worksheet (PDF) -> 連結到 Contentful 媒體檔案
      return {
        href: `https:${item.file.fields.file.url}`,
        target: '_blank', // 在新分頁開啟 PDF
        rel: 'noopener noreferrer',
      };
    }
    if ((item.type === 'Reading' || item.type === 'Audio') && item.externalUrl) {
      // 類型：Reading / Audio -> 連結到外部 URL
      return {
        href: item.externalUrl,
        target: '_blank', // 在新分頁開啟
        rel: 'noopener noreferrer',
      };
    }
    // 預設/備用連結
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
          {/* V1.0 規格書 2.4 節 - Hero 區 */}
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('resources.heroTitle')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('resources.heroSubtitle')}
            </p>
          </div>

          {/* [ ! ] 篩選器按鈕 */}
          <div className="mt-16 flex items-center justify-center space-x-4">
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors
                  ${filter === type
                    ? 'bg-indigo-600 text-white' // 選中狀態
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // 未選中狀態
                  }
                `}
              >
                {/* 我們從 common.json 獲取翻譯。
                  t('resources.filterAll') = All
                  t('resources.cardTypeWorksheet') = Worksheets
                  ...
                */}
                {type === 'All' ? t('resources.filterAll') : t(`resources.cardType${type}`)}
              </button>
            ))}
          </div>

          {/* [ ! ] 資源卡片網格 */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredResources.length === 0 ? (
              <p className="text-gray-600 col-span-3 text-center">No resources found for this category.</p>
            ) : (
              filteredResources.map((item) => (
                <a
                  key={item.id}
                  {...getResourceLink(item)} // 動態設定連結 (href, target)
                  className="block rounded-2xl bg-gray-50 p-6 shadow-sm ring-1 ring-inset ring-gray-200 hover:ring-indigo-400 transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-indigo-600">
                        {item.ctaText}
                      </p>
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

// [ ! ] getStaticProps
export async function getStaticProps({ locale }) {
  // 1. 從 Contentful 獲取所有資源
  const allResources = await fetchResourceItems();
  
  // 2. 獲取翻譯
  const translations = await serverSideTranslations(locale, ['common']);

  // 3. 將 allResources 和 translations 作為 props 傳遞給頁面
  return {
    props: {
      allResources,
      ...translations,
    },
    revalidate: 60, // 啟用 ISR
  };
}