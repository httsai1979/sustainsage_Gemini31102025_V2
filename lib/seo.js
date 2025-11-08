export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sustainsage.com';

export function buildCanonicalPath(path = '') {
  if (!path) return SITE_URL;
  const trimmed = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, '')}${trimmed}`;
}

export const DEFAULT_SEO = {
  titleTemplate: '%s | SustainSage Coaching',
  defaultTitle: 'SustainSage Coaching',
  description: 'Calm, practical coaching for people navigating transitions.',
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
