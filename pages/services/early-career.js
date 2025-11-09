import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StructuredServicePage from '@/components/services/StructuredServicePage';

export default function EarlyCareerServicePage() {
  return <StructuredServicePage serviceKey="earlyCareer" image="/images/services/early-career.svg" />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'])),
    },
  };
}
