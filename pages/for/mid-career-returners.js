import ForAudiencePage from '@/components/for/ForAudiencePage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18NextConfig from '../../next-i18next.config.js';

function MidCareerReturnersPage() {
  return <ForAudiencePage pageKey="midCareerReturners" />;
}

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forPages'], nextI18NextConfig)),
    },
  };
}

export default MidCareerReturnersPage;
