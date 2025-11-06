export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sustainsage.com';

export function buildCanonicalPath(path = '') {
  if (!path) return SITE_URL;
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, '')}${trimmed}`;
}
