import { loadJSON, FALLBACK_LOCALE } from './loadContent';

type HomeContentResult = {
  content: any;
  usedLocale: string;
  isFallback: boolean;
  fallbackNotice: string | null;
};

type HomeTranslation = {
  fallbackNotice?: string;
};

/**
 * Optimized loader for Home Page content
 */
export function getHomePageContent(locale?: string | null): HomeContentResult {
  const {
    data: content,
    usedLocale,
    isFallback
  } = loadJSON<any>('content/home/index.{locale}.json', locale);

  const { data: translations } = loadJSON<HomeTranslation>(
    'public/locales/{locale}/home.json',
    locale
  );

  const { data: commonTranslations } = loadJSON<any>(
    'public/locales/{locale}/common.json',
    locale
  );

  const fallbackNotice = translations?.fallbackNotice ?? commonTranslations?.fallbackNotice ?? null;

  return {
    content,
    usedLocale,
    isFallback,
    fallbackNotice,
  };
}
