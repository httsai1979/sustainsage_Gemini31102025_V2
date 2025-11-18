import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StructuredServicePage from '@/components/services/StructuredServicePage';
import { sanitizeProps } from '@/lib/toSerializable';

export default function LeadershipServicePage() {
  return <StructuredServicePage serviceKey="leadership" image="/images/services/leadership.svg" />;
}

export async function getStaticProps({ locale }) {
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'nav', 'services'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
