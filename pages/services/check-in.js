import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

function CheckInServicePage() {
  return (
    <ServiceDetailPage
      serviceKey="checkIn"
      heroImage="/images/services/check-in.svg"
      heroAlt="Single coaching check-in with notebook and tea"
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

export default CheckInServicePage;
