import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

function NewToUkServicePage() {
  return (
    <ServiceDetailPage
      serviceKey="newToUk"
      heroImage="/images/services/new-to-uk.svg"
      heroAlt="Coaching support for newcomers to the UK"
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

export default NewToUkServicePage;
