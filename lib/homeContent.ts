import homeIndexEn from '@/content/home/index.en-GB.json';
import homeIndexEnUs from '@/content/home/index.en-US.json';
import homeIndexZhCn from '@/content/home/index.zh-CN.json';
import homeIndexZhTw from '@/content/home/index.zh-TW.json';
import homeIndexZhHk from '@/content/home/index.zh-HK.json';
import homeIndexJaJp from '@/content/home/index.ja-JP.json';
import homeIndexFrFr from '@/content/home/index.fr-FR.json';
import homeIndexEsEs from '@/content/home/index.es-ES.json';
import { loadJSON as loadTranslationJSON } from './loadContent';

const FALLBACK_LOCALE = 'en-GB';

const EN_CONTENT = {
  index: homeIndexEn,
};

const EN_US_CONTENT = {
  index: homeIndexEnUs,
};

const ZH_CN_CONTENT = {
  index: homeIndexZhCn,
};

const ZH_TW_CONTENT = {
  index: homeIndexZhTw,
};

const ZH_HK_CONTENT = {
  index: homeIndexZhHk,
};

const JA_JP_CONTENT = {
  index: homeIndexJaJp,
};

const FR_FR_CONTENT = {
  index: homeIndexFrFr,
};

const ES_ES_CONTENT = {
  index: homeIndexEsEs,
};

type HomeContentResult = {
  content: any;
  usedLocale: string;
  isFallback: boolean;
  fallbackNotice: string | null;
};

type HomeTranslation = {
  fallbackNotice?: string;
};

type CommonTranslation = {
  fallbackNotice?: string;
};

const LOCALE_ALIASES: Record<string, string> = {
  en: 'en-GB',
  'en-gb': 'en-GB',
  'en-us': 'en-US',
  'zh': 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh-sg': 'zh-CN',
  sc: 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-hk': 'zh-HK',
  'zh-mo': 'zh-HK',
  tc: 'zh-TW',
  'ja-jp': 'ja-JP',
  ja: 'ja-JP',
  fr: 'fr-FR',
  'fr-fr': 'fr-FR',
  es: 'es-ES',
  'es-es': 'es-ES',
};

const CONTENT_BY_LOCALE: Record<string, typeof EN_CONTENT> = {
  'en-GB': EN_CONTENT,
  'en-US': EN_US_CONTENT,
  'zh-CN': ZH_CN_CONTENT,
  'zh-TW': ZH_TW_CONTENT,
  'zh-HK': ZH_HK_CONTENT,
  'ja-JP': JA_JP_CONTENT,
  'fr-FR': FR_FR_CONTENT,
  'es-ES': ES_ES_CONTENT,
};

function normalizeLocale(locale?: string | null): string | undefined {
  if (!locale) return undefined;
  const trimmed = locale.trim();
  if (!trimmed) return undefined;
  const lower = trimmed.replace('_', '-').toLowerCase();
  return LOCALE_ALIASES[lower] ?? trimmed;
}

function loadHomeTranslation(locale: string): HomeTranslation {
  const { data, usedLocale, requestedLocale } = loadTranslationJSON<HomeTranslation>(
    'public/locales/{locale}/home.json',
    locale,
    FALLBACK_LOCALE
  );

  if (requestedLocale && usedLocale && usedLocale !== requestedLocale) {
    console.warn(
      `[homeContent] Missing home translation for locale "${requestedLocale}". Using ${usedLocale}.`
    );
  }

  if (!data && requestedLocale) {
    console.warn(
      `[homeContent] Missing home translation for locale "${requestedLocale}". Using ${usedLocale ?? FALLBACK_LOCALE}.`
    );
  }

  return data ?? {};
}

export function getHomePageContent(locale?: string | null): HomeContentResult {
  const normalized = normalizeLocale(locale);
  const requested = normalized ?? FALLBACK_LOCALE;
  const canonical = normalized && CONTENT_BY_LOCALE[normalized] ? normalized : FALLBACK_LOCALE;
  const contentByLocale = CONTENT_BY_LOCALE[canonical] ?? EN_CONTENT;
  const content = contentByLocale.index ?? EN_CONTENT.index;
  const isFallback = canonical !== requested;

  if (isFallback) {
    console.warn(
      `[homeContent] Missing home content for locale "${requested}". Falling back to ${canonical}.`
    );
  }

  const translations = loadHomeTranslation(requested);
  const { data: commonTranslations } = loadTranslationJSON<CommonTranslation>(
    'public/locales/{locale}/common.json',
    requested,
    FALLBACK_LOCALE
  );
  const fallbackNotice = translations.fallbackNotice ?? commonTranslations?.fallbackNotice ?? null;

  return {
    content,
    usedLocale: canonical,
    isFallback,
    fallbackNotice,
  };
}
