import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL, normaliseLocale } from '@/content/siteStrategy';

const DEFAULT_TITLE = 'Cross-cultural career transition coaching | SustainSage';
const DEFAULT_DESCRIPTION = 'Career transition coaching for Chinese-speaking professionals building their next chapter in the UK.';

export default function SEO({ title, desc, og = {}, noindex = false, schema = [] }) {
  const router = useRouter();
  const locale = normaliseLocale(router.locale);
  const path = (router.asPath || '/').split(/[?#]/)[0];
  const cleanPath = path === '/' ? '' : path;
  const canonical = `${SITE_URL}${locale === 'zh-TW' ? '/zh-TW' : ''}${cleanPath}`;
  const pageTitle = title ? `${title} | SustainSage` : DEFAULT_TITLE;
  const description = typeof desc === 'string' && desc.trim() ? desc : DEFAULT_DESCRIPTION;
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en-GB" href={`${SITE_URL}${cleanPath}`} />
      <link rel="alternate" hrefLang="zh-TW" href={`${SITE_URL}/zh-TW${cleanPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${cleanPath}`} />
      <meta property="og:site_name" content="SustainSage" />
      <meta property="og:title" content={og.title ?? pageTitle} />
      <meta property="og:description" content={og.description ?? description} />
      <meta property="og:type" content={og.type ?? 'website'} />
      <meta property="og:url" content={og.url ?? canonical} />
      <meta property="og:locale" content={og.locale ?? (locale === 'zh-TW' ? 'zh_TW' : 'en_GB')} />
      {schemas.filter(Boolean).map((item, index) => (
        <script key={item['@id'] ?? index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
    </Head>
  );
}
