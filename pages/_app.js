import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import MainLayout from '@/components/layout/MainLayout';

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ||
    ((page) => <MainLayout>{page}</MainLayout>);

  return getLayout(<Component {...pageProps} />);
}

export default appWithTranslation(MyApp, nextI18NextConfig);
