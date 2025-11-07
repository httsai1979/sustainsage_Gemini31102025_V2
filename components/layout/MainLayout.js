import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import { buildCanonicalPath } from '@/lib/seo';

import Header from './Header';
import Footer from './Footer';

function JsonLd({ data }) {
  if (!data) return null;
  const entries = Array.isArray(data) ? data : [data];
  return entries.map((item, index) => (
    <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
  ));
}

function resolveNamespace(pathname = '') {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/blog/')) return 'blog';

  const map = {
    '/about': 'about',
    '/services': 'services',
    '/resources': 'resources',
    '/blog': 'blog',
    '/contact': 'contact',
  };

  return map[pathname] || null;
}

export default function MainLayout({ children, title, desc, jsonLd }) {
  const router = useRouter();
  const namespace = useMemo(() => resolveNamespace(router.pathname), [router.pathname]);
  const { t } = useTranslation(namespace ?? 'common');

  const translatedTitle = namespace ? t('seo.title', { defaultValue: '' }) : '';
  const translatedDescription = namespace ? t('seo.description', { defaultValue: '' }) : '';

  const pageTitle = title || translatedTitle || 'SustainSage Coaching';
  const pageDescription = desc || translatedDescription || undefined;

  const canonicalPath = useMemo(() => {
    const asPath = router.asPath ? router.asPath.split('?')[0] : '';
    return buildCanonicalPath(asPath);
  }, [router.asPath]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Head>
        <title>{pageTitle}</title>
        {pageDescription && <meta name="description" content={pageDescription} />}
        <link rel="canonical" href={canonicalPath} />
        <JsonLd data={jsonLd} />
      </Head>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
