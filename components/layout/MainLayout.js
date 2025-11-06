import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({
  title,
  description,
  children,
}) {
  const pageTitle = title
    ? `${title} | SustainSage`
    : 'SustainSage';

  const pageDesc =
    description ||
    'Calm, client-led coaching for real-life change.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Head>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
