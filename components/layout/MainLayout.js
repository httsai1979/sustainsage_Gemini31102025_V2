import Head from 'next/head';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const DEFAULT_DESCRIPTION = 'Calm, practical coaching for people navigating transitions.';

export default function MainLayout({ children, title, desc }) {
  const hasTitle = typeof title === 'string' && title.trim().length > 0;
  const hasDescription = typeof desc === 'string' && desc.trim().length > 0;

  const pageTitle = hasTitle ? `${title} | SustainSage` : 'SustainSage';
  const description = hasDescription ? desc : DEFAULT_DESCRIPTION;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="min-h-screen flex flex-col bg-sage-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
