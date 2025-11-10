import ForAudiencePage from '@/components/for/ForAudiencePage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { toSerializable } from '@/lib/toSerializable';

import nextI18NextConfig from '../../next-i18next.config.js';

function ParentsReturningToWorkPage() {
  return <ForAudiencePage pageKey="parentsReturningToWork" />;
}

export async function getStaticProps({ locale = 'en' }) {
  return toSerializable({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forPages'], nextI18NextConfig)),
    },
  });
}

export default ParentsReturningToWorkPage;
