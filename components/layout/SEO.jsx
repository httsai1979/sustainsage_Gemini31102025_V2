import Head from 'next/head';

const SITE_NAME = 'SustainSage';
const DEFAULT_TITLE = SITE_NAME;
const DEFAULT_DESCRIPTION =
  'Calm, practical coaching for people navigating transitions, relocations, and re-entry moments.';

const buildImages = (og = {}) => {
  if (Array.isArray(og.images)) {
    return og.images.filter(Boolean);
  }

  if (og.image) {
    return [og.image];
  }

  return [];
};

export default function SEO({ title, desc, og = {}, noindex = false }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const description = typeof desc === 'string' && desc.trim() ? desc : DEFAULT_DESCRIPTION;

  const ogTitle = og.title ?? pageTitle;
  const ogDescription = og.description ?? description;
  const ogType = og.type ?? 'website';
  const ogUrl = og.url;
  const ogLocale = og.locale;
  const ogImages = buildImages(og);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
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
    </Head>
  );
}
