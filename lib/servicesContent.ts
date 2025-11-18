import servicesIndexEn from '@/content/services/index.en-GB.json';
import midCareerEn from '@/content/services/mid-career.en-GB.json';
import newcomersUkEn from '@/content/services/newcomers-uk.en-GB.json';
import graduatesEn from '@/content/services/graduates.en-GB.json';

const FALLBACK_LOCALE = 'en-GB';

const EN_CONTENT = {
  index: servicesIndexEn,
  'mid-career': midCareerEn,
  'newcomers-uk': newcomersUkEn,
  graduates: graduatesEn,
};

type ServicesPageKey = keyof typeof EN_CONTENT;

type ServicesContentResult = {
  content: any;
  usedLocale: string;
  isFallback: boolean;
};

const LOCALE_ALIASES: Record<string, string> = {
  en: 'en-GB',
  'en-gb': 'en-GB',
  'en-us': 'en-GB',
  'zh': 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh-sg': 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-hk': 'zh-TW',
};

const CONTENT_BY_LOCALE: Record<string, typeof EN_CONTENT> = {
  'en-GB': EN_CONTENT,
};

function normalizeLocale(locale?: string | null): string | undefined {
  if (!locale) return undefined;
  const trimmed = locale.trim();
  if (!trimmed) return undefined;
  const lower = trimmed.toLowerCase();
  return LOCALE_ALIASES[lower] ?? trimmed;
}

export function getServicesPageContent(pageKey: ServicesPageKey, locale?: string | null): ServicesContentResult {
  const normalized = normalizeLocale(locale);
  const canonical = normalized && CONTENT_BY_LOCALE[normalized] ? normalized : FALLBACK_LOCALE;
  const contentByLocale = CONTENT_BY_LOCALE[canonical] ?? EN_CONTENT;
  const content = contentByLocale[pageKey] ?? EN_CONTENT[pageKey];
  const requestedCanonical = normalized ?? FALLBACK_LOCALE;
  const isFallback = canonical !== requestedCanonical;

  return {
    content,
    usedLocale: canonical,
    isFallback,
  };
}
