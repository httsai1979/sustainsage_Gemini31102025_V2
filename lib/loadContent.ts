import fs from 'fs';
import path from 'path';

export type LoadJSONResult<T = unknown> = {
  data: T | null;
  usedLocale: string | null;
  requestedLocale: string;
  fallbackLocale: string;
};

export function loadJSON<T = unknown>(pattern: string, locale: string | undefined, fallback = 'en-GB'): LoadJSONResult<T> {
  const requestedLocale = locale && typeof locale === 'string' && locale.length > 0 ? locale : fallback;
  const tryPath = (l: string) => path.join(process.cwd(), pattern.replace('{locale}', l));

  const localesToTry: string[] = [];

  if (requestedLocale) {
    localesToTry.push(requestedLocale);
  }

  if (fallback && fallback !== requestedLocale) {
    localesToTry.push(fallback);
  }

  for (const candidate of localesToTry) {
    const candidatePath = tryPath(candidate);
    if (fs.existsSync(candidatePath)) {
      const raw = fs.readFileSync(candidatePath, 'utf-8');
      return {
        data: JSON.parse(raw) as T,
        usedLocale: candidate,
        requestedLocale,
        fallbackLocale: fallback,
      };
    }
  }

  return {
    data: null,
    usedLocale: null,
    requestedLocale,
    fallbackLocale: fallback,
  };
}
