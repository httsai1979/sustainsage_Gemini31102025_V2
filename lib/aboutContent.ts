import indexEn from '@/content/about/index.en-GB.json';
import storyEn from '@/content/about/story.en-GB.json';
import coachEn from '@/content/about/coach.en-GB.json';
import valuesEn from '@/content/about/values.en-GB.json';
import approachEn from '@/content/about/approach.en-GB.json';

const FALLBACK_LOCALE = 'en-GB';

const EN_CONTENT = {
  index: indexEn,
  story: storyEn,
  coach: coachEn,
  values: valuesEn,
  approach: approachEn,
};

type AboutPageKey = keyof typeof EN_CONTENT;

type AboutContentResult = {
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

export function getAboutPageContent(pageKey: AboutPageKey, locale?: string | null): AboutContentResult {
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
