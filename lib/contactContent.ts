import { loadJSON } from './loadContent';

/**
 * Standardized loader for Contact content
 */
export function getContactPageContent(locale?: string | null) {
  const { data: content, usedLocale, isFallback } = loadJSON<any>(
    'content/contact/index.{locale}.json',
    locale
  );

  return {
    content,
    usedLocale,
    isFallback,
  };
}
