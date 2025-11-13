import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PersonaServicePage from '@/components/services/PersonaServicePage';
import { sanitizeProps } from '@/lib/toSerializable';

import nextI18NextConfig from '../../next-i18next.config.js';

export default function ForCareerReturnersPage() {
  return (
    <PersonaServicePage
      personaKey="careerReturners"
      image="/images/services/returning.svg"
      imageAlt="Illustration symbolising a fresh chapter"
    />
  );
}

export async function getStaticProps({ locale }) {
  const props = {
    ...(await serverSideTranslations(locale, ['common', 'services-personas'], nextI18NextConfig)),
  };

  return {
    props: sanitizeProps(props),
  };
}
