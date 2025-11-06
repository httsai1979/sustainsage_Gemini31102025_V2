import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

function MyApp({ Component, pageProps }) {
  // 不在 _app 全域包 MainLayout，避免雙重 NavBar / Footer
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp, nextI18NextConfig);
