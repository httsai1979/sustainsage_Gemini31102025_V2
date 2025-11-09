import ICFServicePage from '@/components/services/ICFServicePage';
import { getServiceStaticProps } from '@/lib/serviceTranslations';

export default function ReturnerCoachingPage() {
  return (
    <ICFServicePage
      namespace="services-returner-coaching"
      image="/images/services/returning.svg"
      imageAlt="Illustration representing coaching for returners"
    />
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return getServiceStaticProps(locale, 'services-returner-coaching');
}
