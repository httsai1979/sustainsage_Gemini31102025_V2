import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import NavBar from '../nav/NavBar';
import Footer from './Footer';

export default function MainLayout({ title, desc, jsonLd, children }) {
  const pageTitle = title || 'SustainSage';
  const description =
    desc ||
    'Calm, client-led coaching for mid-career professionals, newcomers and graduates. ICF-aligned, bilingual support.';

  return (
    <>
      <DefaultSeo
        defaultTitle="SustainSage"
        titleTemplate="%s | SustainSage"
        description={description}
        openGraph={{
          type: 'website',
          locale: 'en_GB',
          site_name: 'SustainSage',
        }}
      />
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />
        )}
      </Head>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <Footer />
    </>
  );
}
