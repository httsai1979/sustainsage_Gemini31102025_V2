import Head from 'next/head';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ title = 'SustainSage', desc = '', jsonLd, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {desc && <meta name="description" content={desc} />}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </Head>
      <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
