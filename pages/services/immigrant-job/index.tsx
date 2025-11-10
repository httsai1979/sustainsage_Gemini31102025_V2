import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ServiceOverviewPage, type ServiceOverviewPageProps } from '@/components/services/ServiceOverviewPage';
import { getServiceOverview } from '@/lib/services';
import { toSerializable } from '@/lib/toSerializable';

const SLUG = 'immigrant-job';

export default function ImmigrantJobServicePage(props: ServiceOverviewPageProps) {
  return <ServiceOverviewPage {...props} />;
}

export const getStaticProps: GetStaticProps<ServiceOverviewPageProps> = async ({ locale }) => {
  const currentLocale = typeof locale === 'string' && locale.length > 0 ? locale : 'en-GB';
  const { service, isFallback } = getServiceOverview(SLUG, currentLocale);

  return toSerializable({
    props: {
      service,
      showFallbackNotice: isFallback,
      ...(await serverSideTranslations(currentLocale, ['common'])),
    },
  });
};
