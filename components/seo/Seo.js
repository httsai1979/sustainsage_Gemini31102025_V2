import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE = {
  name: 'SustainSage Group',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sustainsage-group.com',
  defaultTitle: 'SustainSage Coaching',
  defaultDesc: 'Coaching for returners and graduates — calm, practical.',
  ogImage: '/og-default.jpg', // if file missing, browsers will just skip; safe fallback
};

export default function Seo({ title, description, noIndex, ogImage }) {
  const { asPath, locale, locales } = useRouter();
  const url = `${SITE.url}${asPath === '/' ? '' : asPath}`;
  const pageTitle = title ? `${title} — ${SITE.name}` : SITE.defaultTitle;
  const desc = description || SITE.defaultDesc;
  const image = ogImage || SITE.ogImage;
  const currentLocale = locale || 'en';

  const hrefs = (locales || []).map(l => ({
    hrefLang: l,
    href: `${SITE.url}${asPath}`,
  }));

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: 'hc.tsai@sustainsage-group.com',
    telephone: '+44-7510-317-',
  };
  const webJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {(hrefs || []).map(h => (
        <link key={h.hrefLang} rel="alternate" hrefLang={h.hrefLang} href={h.href} />
      ))}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={currentLocale} />
      {(locales || [])
        .filter(l => l && l !== currentLocale)
        .map(l => (
          <meta key={`og-locale-${l}`} property="og:locale:alternate" content={l} />
        ))}
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webJsonLd) }} />
    </Head>
  );
}
