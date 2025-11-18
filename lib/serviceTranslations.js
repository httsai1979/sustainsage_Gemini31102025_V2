import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../next-i18next.config.js';
import { sanitizeProps } from './toSerializable';

export async function getServiceStaticProps(locale, namespace) {
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'nav', namespace], nextI18NextConfig)),
  };

  return {
    props: sanitizeProps(props),
  };
}
