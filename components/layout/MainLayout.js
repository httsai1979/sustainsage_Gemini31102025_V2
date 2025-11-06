import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ title, desc, jsonLd, children }) {
  const seoTitle = title || 'SustainSage | Clear, calm coaching';
  const seoDesc =
    desc ||
    'ICF-aligned, client-led coaching for UK newcomers, returners and professionals in English and Traditional Chinese.';

  return (
    <>
      <DefaultSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{ title: seoTitle, description: seoDesc, site_name: 'SustainSage' }}
      />
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      </Head>
      <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-slate-900">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
