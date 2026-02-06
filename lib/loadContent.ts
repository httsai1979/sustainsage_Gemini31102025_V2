import fs from 'fs';
import path from 'path';

export const FALLBACK_LOCALE = 'en-GB';

export const LOCALE_ALIASES: Record<string, string> = {
  en: 'en-GB',
  'en-gb': 'en-GB',
  'en-us': 'en-GB',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh-sg': 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-hk': 'zh-TW',
};

export function normalizeLocale(locale?: string | null): string {
  if (!locale) return FALLBACK_LOCALE;
  const trimmed = locale.trim();
  if (!trimmed) return FALLBACK_LOCALE;
  const lower = trimmed.toLowerCase().replace('_', '-');
  return LOCALE_ALIASES[lower] ?? trimmed;
}

export type LoadJSONResult<T = unknown> = {
  data: T | null;
  usedLocale: string;
  requestedLocale: string;
  isFallback: boolean;
};

/**
 * Loads a JSON file based on a pattern and locale.
 * Example pattern: 'content/services/index.{locale}.json'
 */
export function loadJSON<T = unknown>(
  pattern: string,
  locale?: string | null,
  fallback = FALLBACK_LOCALE
): LoadJSONResult<T> {
  const requested = normalizeLocale(locale);
  // Order of preference: requested locale, fallback locale, base file (without locale)
  const candidates = [requested, fallback].filter((v, i, a) => a.indexOf(v) === i);

  for (const candidate of candidates) {
    const candidatePath = path.join(process.cwd(), pattern.replace('{locale}', candidate));
    if (fs.existsSync(candidatePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(candidatePath, 'utf-8'));
        return {
          data,
          usedLocale: candidate,
          requestedLocale: requested,
          isFallback: candidate !== requested,
        };
      } catch (e) {
        console.error(`Failed to parse JSON at ${candidatePath}`, e);
      }
    }
  }

  // Final fallback: try removing .{locale}. entirely if present
  if (pattern.includes('.{locale}.')) {
    const baseFile = path.join(process.cwd(), pattern.replace('.{locale}.', '.'));
    if (fs.existsSync(baseFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(baseFile, 'utf-8'));
        return {
          data,
          usedLocale: fallback,
          requestedLocale: requested,
          isFallback: true,
        };
      } catch (e) {
        console.error(`Failed to parse JSON at ${baseFile}`, e);
      }
    }
  }

  return {
    data: null,
    usedLocale: fallback,
    requestedLocale: requested,
    isFallback: true,
  };
}

/**
 * Higher-level helper for standard page content retrieval
 */
export function getPageContent<T = unknown>(
  basePath: string,
  slug: string,
  locale?: string | null
): LoadJSONResult<T> {
  const pattern = `${basePath}/${slug}.{locale}.json`;
  return loadJSON<T>(pattern, locale);
}
