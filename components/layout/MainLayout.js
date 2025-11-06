import Head from 'next/head';
import { useRouter } from 'next/router';
import NavBar from '../nav/NavBar';
import Footer from './Footer';

export default function MainLayout({ title = 'SustainSage', desc = 'Calm, practical coaching.', jsonLd = null, children }) {
  const { asPath } = useRouter();
  const origin = typeof window === 'undefined' ? 'https://www.sustainsage-group.com' : window.location.origin;
  const canonical = origin + (asPath?.split('#')[0] || '');
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={canonical} />
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
