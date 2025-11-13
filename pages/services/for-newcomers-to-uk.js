import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PersonaServicePage from '@/components/services/PersonaServicePage';
import { sanitizeProps } from '@/lib/toSerializable';

import nextI18NextConfig from '../../next-i18next.config.js';

export default function ForNewcomersToUkPage() {
  return (
    <PersonaServicePage
      personaKey="newcomers"
      image="/images/services/new-to-uk.svg"
      imageAlt="Illustration representing newcomers to the UK"
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
