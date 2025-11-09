import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

function DeepeningServicePage() {
  return (
    <ServiceDetailPage
      serviceKey="deepening"
      heroImage="/images/services/experiments.svg"
      heroAlt="Deepening coaching partnership illustration"
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

export default DeepeningServicePage;
