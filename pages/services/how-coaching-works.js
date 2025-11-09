import ICFServicePage from '@/components/services/ICFServicePage';
import { getServiceStaticProps } from '@/lib/serviceTranslations';

export default function HowCoachingWorksPage() {
  return (
    <ICFServicePage
      namespace="services-how-coaching-works"
      image="/images/services/check-in.svg"
      imageAlt="Illustration explaining how coaching works"
    />
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return getServiceStaticProps(locale, 'services-how-coaching-works');
}
