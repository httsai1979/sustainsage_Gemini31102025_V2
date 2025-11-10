import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StructuredServicePage from '@/components/services/StructuredServicePage';
import { toSerializable } from '@/lib/toSerializable';

export default function TransitionServicePage() {
  return <StructuredServicePage serviceKey="transition" image="/images/services/transition.svg" />;
}

export async function getStaticProps({ locale }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'])),
    },
  });
}
