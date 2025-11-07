import '@/styles/globals.css';

import MainLayout from '@/components/layout/MainLayout';
import { appWithTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return getLayout(<Component {...pageProps} />);
}

export default appWithTranslation(MyApp, nextI18NextConfig);
