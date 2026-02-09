import { loadJSON, FALLBACK_LOCALE } from './loadContent';

type ServicesContentResult = {
  content: any;
  usedLocale: string;
  isFallback: boolean;
};

/**
 * Standardized loader for Service pages
 */
export function getServicesPageContent(pageKey: string, locale?: string | null): ServicesContentResult {
  const pattern = pageKey === 'index'
    ? 'content/services/index.{locale}.json'
    : `content/services/${pageKey}.{locale}.json`;

  const { data: content, usedLocale, isFallback } = loadJSON<any>(pattern, locale);

  return {
    content,
    usedLocale,
    isFallback,
  };
}
