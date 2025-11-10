import fs from 'fs';
import path from 'path';

export type LoadContentResult<T = unknown> = {
  data: T | null;
  locale: string | null;
};

export type LoadJSONResult<T = unknown> = {
  data: T | null;
  usedLocale: string | null;
  requestedLocale: string;
  fallbackLocale: string;
};

export function loadContent<T = unknown>(
  relativePattern: string,
  locale: string,
  fallback = 'en-GB'
): LoadContentResult<T> {
  const candidates = [locale, fallback].filter((value, index, array) => value && array.indexOf(value) === index);

  for (const candidate of candidates) {
    const candidatePath = path.join(process.cwd(), relativePattern.replace('{locale}', candidate));
    if (fs.existsSync(candidatePath)) {
      const data = JSON.parse(fs.readFileSync(candidatePath, 'utf-8')) as T;
      return { data, locale: candidate };
    }
  }

  return { data: null, locale: null };
}

export function loadJSON<T = unknown>(pattern: string, locale: string | undefined, fallback = 'en-GB'): LoadJSONResult<T> {
  const requestedLocale = locale && typeof locale === 'string' && locale.length > 0 ? locale : fallback;
  const { data, locale: usedLocale } = loadContent<T>(pattern, requestedLocale, fallback);

  return {
    data,
    usedLocale,
    requestedLocale,
    fallbackLocale: fallback,
  };
}
