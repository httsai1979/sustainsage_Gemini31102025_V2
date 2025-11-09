import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StructuredServicePage from '@/components/services/StructuredServicePage';

export default function LeadershipServicePage() {
  return <StructuredServicePage serviceKey="leadership" image="/images/services/leadership.svg" />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'])),
    },
  };
}
