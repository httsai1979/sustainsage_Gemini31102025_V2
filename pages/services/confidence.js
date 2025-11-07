import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

function ConfidenceServicePage() {
  return (
    <ServiceDetailPage
      serviceKey="confidence"
      heroImage="/images/services/confidence.svg"
      heroAlt="Illustration of a microphone with gentle waves"
    />
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'serviceDetails'], nextI18NextConfig)),
    },
  };
}

export default ConfidenceServicePage;
