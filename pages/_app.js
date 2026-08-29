import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';
import CookieConsent, { getStoredConsent, storeConsent } from '@/components/CookieConsent';
import { GA_MEASUREMENT_ID, hasGa, pageview } from '@/lib/ga';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [consent, setConsent] = useState('unknown');
  useEffect(() => setConsent(getStoredConsent()), []);
  useEffect(() => {
    if (consent !== 'granted' || !hasGa) return undefined;
    const handle = (url) => pageview(url);
    pageview(window.location.pathname + window.location.search);
    router.events.on('routeChangeComplete', handle);
    return () => router.events.off('routeChangeComplete', handle);
  }, [consent, router.events]);
  const handleConsent = (value) => {
    const next = value === 'granted' ? 'granted' : 'denied';
    storeConsent(next);
    setConsent(next);
  };
  const page = <Component {...pageProps} />;
  const content = Component.getLayout ? Component.getLayout(page) : <MainLayout>{page}</MainLayout>;
  return (
    <>
      {hasGa && consent === 'granted' ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{page_path:window.location.pathname});`}</Script>
        </>
      ) : null}
      {content}
      <CookieConsent consent={consent} onConsent={handleConsent} />
    </>
  );
}
