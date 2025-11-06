import fs from 'fs';
import path from 'path';

import { FALLBACK_BLOG_KEYS } from './blogFallback';

export function resolveFallbackKey(locale, slug) {
  if (!slug) {
    return null;
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'blog.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContents);

    return FALLBACK_BLOG_KEYS.find((key) => json?.[key]?.slug === slug) || null;
  } catch (error) {
    console.warn('[blogFallback] Unable to resolve fallback blog key:', error);
    return null;
  }
}
