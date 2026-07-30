export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sustainsage-group.com';

export function buildCanonicalPath(path = '') {
  if (!path) return SITE_URL;
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, '')}${trimmed}`;
}

export const DEFAULT_SEO = {
  titleTemplate: '%s | SustainSage Coaching',
  defaultTitle: 'SustainSage Coaching',
  description: 'Career transition coaching for Chinese-speaking professionals building their next chapter in the UK.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'SustainSage Coaching',
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};
