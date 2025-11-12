import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ServiceOverviewPage, type ServiceOverviewPageProps } from '@/components/services/ServiceOverviewPage';
import { getServiceOverview } from '@/lib/services';
import { sanitizeProps } from '@/lib/toSerializable';

const SLUG = 'graduate-start';

export default function GraduateStartServicePage(props: ServiceOverviewPageProps) {
  return <ServiceOverviewPage {...props} />;
}

export const getStaticProps: GetStaticProps<ServiceOverviewPageProps> = async ({ locale }) => {
  const currentLocale = typeof locale === 'string' && locale.length > 0 ? locale : 'en-GB';
  const { service, isFallback } = getServiceOverview(SLUG, currentLocale);

  const props = {
    service,
    showFallbackNotice: isFallback,
    ...(await serverSideTranslations(currentLocale, ['common'])),
  };

  return {
    props: sanitizeProps(props),
  };
};
