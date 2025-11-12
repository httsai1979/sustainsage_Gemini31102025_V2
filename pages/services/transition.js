import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StructuredServicePage from '@/components/services/StructuredServicePage';
import { sanitizeProps } from '@/lib/toSerializable';

export default function TransitionServicePage() {
  return <StructuredServicePage serviceKey="transition" image="/images/services/transition.svg" />;
}

export async function getStaticProps({ locale }) {
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'services'])),
  };

  return {
    props: sanitizeProps(props),
  };
}
