import contactIndexEn from '@/content/contact/index.en-GB.json';
import contactIndexFrFr from '@/content/contact/index.fr-FR.json';
import contactIndexEsEs from '@/content/contact/index.es-ES.json';

const FALLBACK_LOCALE = 'en-GB';

const EN_CONTENT = {
  index: contactIndexEn,
};

const FR_FR_CONTENT = {
  index: contactIndexFrFr,
};

const ES_ES_CONTENT = {
  index: contactIndexEsEs,
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
  fr: 'fr-FR',
  'fr-fr': 'fr-FR',
  es: 'es-ES',
  'es-es': 'es-ES',
};

const CONTENT_BY_LOCALE: Record<string, typeof EN_CONTENT> = {
  'en-GB': EN_CONTENT,
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

export function getContactPageContent(locale?: string | null) {
  const normalized = normalizeLocale(locale);
  const canonical = normalized && CONTENT_BY_LOCALE[normalized] ? normalized : FALLBACK_LOCALE;
  const contentByLocale = CONTENT_BY_LOCALE[canonical] ?? EN_CONTENT;
  const content = contentByLocale.index ?? EN_CONTENT.index;
  const requestedCanonical = normalized ?? FALLBACK_LOCALE;
  const isFallback = canonical !== requestedCanonical;

  if (isFallback) {
    console.warn(
      `[contactContent] Missing contact content for locale "${requestedCanonical}". Falling back to ${canonical}.`
    );
  }

  return {
    content,
    usedLocale: canonical,
    isFallback,
  } as const;
}
