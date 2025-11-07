import ServiceDetailPage from '@/components/services/ServiceDetailPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

function ExperimentsServicePage() {
  return (
    <ServiceDetailPage
      serviceKey="experiments"
      heroImage="/images/services/experiments.svg"
      heroAlt="Ethical experiments and stewardship coaching"
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

export default ExperimentsServicePage;
