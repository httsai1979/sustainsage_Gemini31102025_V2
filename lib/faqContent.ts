import { loadJSON } from './loadContent';

/**
 * Standardized loader for FAQ content
 */
export function getFAQPageContent(locale?: string | null) {
  const { data: content, usedLocale, isFallback } = loadJSON<any>(
    'content/faq/index.{locale}.json',
    locale
  );

  return {
    content,
    usedLocale,
    isFallback,
  };
}
