import ICFServicePage from '@/components/services/ICFServicePage';
import { getServiceStaticProps } from '@/lib/serviceTranslations';

export default function UkNewcomerCoachingPage() {
  return (
    <ICFServicePage
      namespace="services-uk-newcomer-coaching"
      image="/images/services/new-to-uk.svg"
      imageAlt="Illustration representing support for newcomers to the UK"
    />
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return getServiceStaticProps(locale, 'services-uk-newcomer-coaching');
}
