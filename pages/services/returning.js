import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

function ReturningServicePage() {
  return (
    <ServiceDetailPage
      serviceKey="returning"
      heroImage="/images/services/returning.svg"
      heroAlt="Returning client tune-up coaching"
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

export default ReturningServicePage;
