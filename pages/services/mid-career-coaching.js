import ICFServicePage from '@/components/services/ICFServicePage';
import { getServiceStaticProps } from '@/lib/serviceTranslations';

export default function MidCareerCoachingPage() {
  return (
    <ICFServicePage
      namespace="services-mid-career-coaching"
      image="/images/services/experiments.svg"
      imageAlt="Illustration representing mid-career coaching"
    />
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return getServiceStaticProps(locale, 'services-mid-career-coaching');
}
