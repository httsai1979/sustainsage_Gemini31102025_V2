import ICFServicePage from '@/components/services/ICFServicePage';
import { getServiceStaticProps } from '@/lib/serviceTranslations';

export default function EarlyCareerCoachingPage() {
  return (
    <ICFServicePage
      namespace="services-early-career-coaching"
      image="/images/services/early-career.svg"
      imageAlt="Illustration representing early-career coaching"
    />
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return getServiceStaticProps(locale, 'services-early-career-coaching');
}
