import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';

import MainLayout from '@/components/layout/MainLayout';
import nextI18NextConfig from '../next-i18next.config.js';

function MyApp({ Component, pageProps }) {
  const resolvedLayoutProps =
    typeof Component.layoutProps === 'function'
      ? Component.layoutProps(pageProps)
      : Component.layoutProps || pageProps?.layoutProps;

  const getLayout = Component.getLayout || ((page) => (
    <MainLayout {...resolvedLayoutProps}>{page}</MainLayout>
  ));

  return getLayout(<Component {...pageProps} />);
}

export default appWithTranslation(MyApp, nextI18NextConfig);
