import { loadJSON } from './loadContent';

/**
 * Standardized loader for Resources content
 */
export function getResourcesPageContent(locale?: string | null) {
  const { data: content, usedLocale, isFallback } = loadJSON<any>(
    'content/resources/index.{locale}.json',
    locale
  );

  return {
    content,
    usedLocale,
    isFallback,
  };
}
