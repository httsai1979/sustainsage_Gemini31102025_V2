import Head from 'next/head';
import { useRouter } from 'next/router';

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

export default function MainLayout({ children, title, desc, jsonLd }) {
  const router = useRouter();
  const canonical = buildCanonicalPath(router.asPath ? router.asPath.split('?')[0] : '');
  const pageTitle = title || 'SustainSage Coaching';

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Head>
        <title>{pageTitle}</title>
        {desc && <meta name="description" content={desc} />}
        <link rel="canonical" href={canonical} />
        <JsonLd data={jsonLd} />
      </Head>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
