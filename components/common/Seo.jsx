import Head from 'next/head';

const SITE_NAME = 'SustainSage';
const DEFAULT_TITLE = SITE_NAME;
const DEFAULT_DESCRIPTION =
  'Calm, practical coaching for people navigating transitions, relocations, and re-entry moments.';

export default function Seo({ title, description, noindex = false, openGraph = {} }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;
  const ogTitle = openGraph.title ?? pageTitle;
  const ogDescription = openGraph.description ?? pageDescription;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noindex ? <meta name="robots" content="noindex" /> : null}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={openGraph.type ?? 'website'} />
    </Head>
  );
}
