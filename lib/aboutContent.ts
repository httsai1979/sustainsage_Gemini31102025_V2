import { loadJSON } from './loadContent';

type AboutContentResult = {
  content: any;
  usedLocale: string;
  isFallback: boolean;
};

/**
 * Standardized loader for About pages
 */
export function getAboutPageContent(pageKey: string, locale?: string | null): AboutContentResult {
  const pattern = `content/about/${pageKey}.{locale}.json`;
  const { data: content, usedLocale, isFallback } = loadJSON<any>(pattern, locale);

  return {
    content,
    usedLocale,
    isFallback,
  };
}
