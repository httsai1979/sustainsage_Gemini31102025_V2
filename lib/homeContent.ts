import homeIndexEn from '@/content/home/index.en-GB.json';
import homeIndexZhCn from '@/content/home/index.zh-CN.json';
import homeIndexZhTw from '@/content/home/index.zh-TW.json';

const FALLBACK_LOCALE = 'en-GB';

const EN_CONTENT = {
  index: homeIndexEn,
};

const ZH_CN_CONTENT = {
  index: homeIndexZhCn,
};

const ZH_TW_CONTENT = {
  index: homeIndexZhTw,
};

type HomeContentResult = {
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
  sc: 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-hk': 'zh-TW',
  'zh-mo': 'zh-TW',
  tc: 'zh-TW',
};

const CONTENT_BY_LOCALE: Record<string, typeof EN_CONTENT> = {
  'en-GB': EN_CONTENT,
  'zh-CN': ZH_CN_CONTENT,
  'zh-TW': ZH_TW_CONTENT,
};

function normalizeLocale(locale?: string | null): string | undefined {
  if (!locale) return undefined;
  const trimmed = locale.trim();
  if (!trimmed) return undefined;
  const lower = trimmed.toLowerCase();
  return LOCALE_ALIASES[lower] ?? trimmed;
}

export function getHomePageContent(locale?: string | null): HomeContentResult {
  const normalized = normalizeLocale(locale);
  const canonical = normalized && CONTENT_BY_LOCALE[normalized] ? normalized : FALLBACK_LOCALE;
  const contentByLocale = CONTENT_BY_LOCALE[canonical] ?? EN_CONTENT;
  const content = contentByLocale.index ?? EN_CONTENT.index;
  const requested = normalized ?? FALLBACK_LOCALE;
  const isFallback = canonical !== requested;

  return {
    content,
    usedLocale: canonical,
    isFallback,
  };
}
