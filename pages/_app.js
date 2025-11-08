import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.css';

import CookieConsent, { getStoredConsent, storeConsent } from '@/components/CookieConsent';
import MainLayout from '@/components/layout/MainLayout';
import { GA_MEASUREMENT_ID, hasGa, pageview } from '@/lib/ga';
import { DEFAULT_SEO } from '@/lib/seo';

import nextI18NextConfig from '../next-i18next.config.js';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [consent, setConsent] = useState('unknown');

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  useEffect(() => {
    if (consent !== 'granted' || typeof window === 'undefined') return undefined;

    const handleRouteChange = (url) => {
      pageview(url);
    };

    pageview(window.location.pathname + window.location.search);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [consent, router.events]);

  const handleConsent = (value) => {
    const nextValue = value === 'granted' ? 'granted' : 'denied';
    storeConsent(nextValue);
    setConsent(nextValue);
    if (nextValue === 'granted' && typeof window !== 'undefined') {
      pageview(window.location.pathname + window.location.search);
    }
  };

  const getLayout = Component.getLayout ?? ((page) => page);
  const page = getLayout(<Component {...pageProps} />);
  const content = Component.getLayout ? page : <MainLayout>{page}</MainLayout>;

  return (
    <>
      <Head>
        <title>{DEFAULT_SEO.defaultTitle}</title>
        <meta name="description" content={DEFAULT_SEO.description} />
      </Head>
      {hasGa && consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
      {content}
      <CookieConsent consent={consent} onConsent={handleConsent} />
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
