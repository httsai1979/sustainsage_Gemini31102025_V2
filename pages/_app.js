// pages/_app.js

import '../styles/globals.css'; 
import { appWithTranslation } from 'next-i18next';
// ⚠️ 檢查這裡的路徑是否正確：對於 _app.js 來說，Layout 在 components/layout 內
import Layout from '../components/layout/Layout'; // <-- 確保是 `../components/layout/Layout`

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);