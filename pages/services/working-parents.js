import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StructuredServicePage from '@/components/services/StructuredServicePage';

export default function WorkingParentsServicePage() {
  return <StructuredServicePage serviceKey="workingParents" image="/images/services/working-parents.svg" />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'])),
    },
  };
}
