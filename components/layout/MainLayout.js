import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ title, desc, jsonLd, children }) {
  return (
    <>
      <DefaultSeo defaultTitle="SustainSage" description="Calm, client-led coaching (ICF-aligned)" />
      <Head>
        {title && <title>{title}</title>}
        {desc && <meta name="description" content={desc} />}
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
      </Head>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4">{children}</main>
      <Footer />
    </>
  );
}
