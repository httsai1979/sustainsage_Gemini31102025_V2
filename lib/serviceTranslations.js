import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../next-i18next.config.js';

export async function getServiceStaticProps(locale, namespace) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', namespace], nextI18NextConfig)),
    },
  };
}
