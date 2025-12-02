import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const SITE_NAME = 'SustainSage';
const DEFAULT_TITLE = SITE_NAME;
const DEFAULT_DESCRIPTION =
  'Calm, practical coaching for people navigating transitions, relocations, and re-entry moments.';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sustainsage.com';

const buildAbsoluteUrl = (path = '') => {
  if (typeof path !== 'string' || path.trim().length === 0) {
    return SITE_URL;
  }

  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

const buildImages = (og = {}) => {
  if (Array.isArray(og.images)) {
    return og.images.filter(Boolean);
  }

  if (og.image) {
    return [og.image];
  }

  return [];
};

export default function SEO({
  title,
  desc,
  og = {},
  noindex = false,
  canonical,
  alternates = [],
  twitter = {},
}) {
  const router = useRouter();

  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const description = typeof desc === 'string' && desc.trim() ? desc : DEFAULT_DESCRIPTION;

  const ogTitle = og.title ?? pageTitle;
  const ogDescription = og.description ?? description;
  const ogType = og.type ?? 'website';
  const ogUrl = og.url ?? canonical ?? buildAbsoluteUrl(router?.asPath ?? '/');
  const ogLocale = og.locale;
  const ogImages = buildImages(og);

  const twitterCard = twitter.card ?? (ogImages.length ? 'summary_large_image' : 'summary');
  const twitterImage = twitter.image ?? ogImages[0];

  const canonicalUrl = buildAbsoluteUrl(canonical ?? router?.asPath ?? '/');
  const alternateLinks = Array.isArray(alternates)
    ? alternates
        .map((link) => ({
          hrefLang: link?.hrefLang ?? link?.hreflang ?? link?.locale,
          href: buildAbsoluteUrl(link?.href ?? link?.url ?? link?.path ?? ''),
        }))
        .filter((link) => link.hrefLang && link.href)
    : [];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {alternateLinks.map((link) => (
        <link key={`${link.hrefLang}-${link.href}`} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
      ))}
      {noindex ? <meta name="robots" content="noindex" /> : null}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      {ogUrl ? <meta property="og:url" content={ogUrl} /> : null}
      {ogLocale ? <meta property="og:locale" content={ogLocale} /> : null}
      {ogImages.map((image) => (
        <meta key={image} property="og:image" content={image} />
      ))}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitter.title ?? ogTitle} />
      <meta name="twitter:description" content={twitter.description ?? ogDescription} />
      {twitter.site ? <meta name="twitter:site" content={twitter.site} /> : null}
      {twitter.creator ? <meta name="twitter:creator" content={twitter.creator} /> : null}
      {twitterImage ? <meta name="twitter:image" content={twitterImage} /> : null}
    </Head>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  og: PropTypes.object,
  noindex: PropTypes.bool,
  canonical: PropTypes.string,
  alternates: PropTypes.arrayOf(
    PropTypes.shape({
      hrefLang: PropTypes.string,
      href: PropTypes.string,
      url: PropTypes.string,
      path: PropTypes.string,
      locale: PropTypes.string,
    })
  ),
  twitter: PropTypes.shape({
    card: PropTypes.string,
    site: PropTypes.string,
    creator: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};
