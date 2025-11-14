import fs from 'fs';
import path from 'path';

export function loadNamespace(locale = 'en-GB', namespace, fallback = 'en-GB') {
  if (!namespace) {
    return null;
  }

  const normalized = typeof locale === 'string' && locale.length ? locale : fallback;
  const candidates = [normalized, fallback].filter((value, index, array) => value && array.indexOf(value) === index);

  for (const candidate of candidates) {
    const filePath = path.join(process.cwd(), 'public', 'locales', candidate, `${namespace}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
      } catch (error) {
        console.warn(`Failed to read namespace ${namespace} for ${candidate}:`, error);
      }
    }
  }

  return null;
}
