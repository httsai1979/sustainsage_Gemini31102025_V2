import ICFServicePage from '@/components/services/ICFServicePage';
import { getServiceStaticProps } from '@/lib/serviceTranslations';

export default function TransitionCoachingPage() {
  return (
    <ICFServicePage
      namespace="services-transition-coaching"
      image="/images/services/transition.svg"
      imageAlt="Illustration representing transition coaching"
    />
  );
}

export async function getStaticProps({ locale = 'en' }) {
  return getServiceStaticProps(locale, 'services-transition-coaching');
}
