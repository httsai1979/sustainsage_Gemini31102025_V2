import fs from 'fs';
import path from 'path';

import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { CaseDetail, type CaseDetailContent } from '@/components/cases/CaseDetail';
import { StickyCTA } from '@/components/common/StickyCTA';
import { SubnavTabs } from '@/components/common/SubnavTabs';
import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import SectionContainer from '@/components/sections/SectionContainer';
import { loadContent } from '@/lib/loadContent';
import type { ServiceContent, ServiceSlug } from '@/lib/serviceContentTypes';
import { SERVICE_SLUGS } from '@/lib/serviceContentTypes';
import { sanitizeProps } from '@/lib/toSerializable';

const CASES_SUBNAV_SLUG = 'cases';

type ServiceCaseDetailProps = {
  slug: ServiceSlug;
  service: ServiceContent;
  showFallbackNotice: boolean;
  caseDetail: CaseDetailContent;
  caseUsesFallback: boolean;
};

type ServiceCaseDetailPathParams = {
  slug: ServiceSlug;
  caseSlug: string;
};

export const getStaticPaths: GetStaticPaths<ServiceCaseDetailPathParams> = async ({ locales }) => {
  const allLocales = Array.isArray(locales) && locales.length > 0 ? locales : ['en-GB'];
  const paths: { params: ServiceCaseDetailPathParams; locale?: string }[] = [];

  for (const slug of SERVICE_SLUGS) {
    const directory = path.join(process.cwd(), 'content', 'services', slug, 'cases');

    if (!fs.existsSync(directory)) {
      continue;
    }

    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const caseSlugs = Array.from(
      new Set(
        entries
          .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
          .map((entry) => entry.name.split('.')[0])
          .filter((value): value is string => Boolean(value))
      )
    );

    for (const caseSlug of caseSlugs) {
      for (const locale of allLocales) {
        paths.push({
          params: { slug, caseSlug },
          locale,
        });
      }
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServiceCaseDetailProps, ServiceCaseDetailPathParams> = async ({
  params,
  locale,
}) => {
  const slugParam = params?.slug;
  const caseSlugParam = params?.caseSlug;

  if (typeof slugParam !== 'string' || !SERVICE_SLUGS.includes(slugParam as ServiceSlug)) {
    return { notFound: true };
  }

  if (typeof caseSlugParam !== 'string' || caseSlugParam.length === 0) {
    return { notFound: true };
  }

  const requestedLocale = typeof locale === 'string' && locale.length > 0 ? locale : 'en-GB';
  const { loadServiceContent } = await import('@/lib/server/serviceContent');
  const serviceResult = await loadServiceContent(slugParam as ServiceSlug, requestedLocale);

  if (!serviceResult) {
    return { notFound: true };
  }

  const casePattern = `content/services/${slugParam}/cases/${caseSlugParam}.{locale}.json`;
  const { data: caseDetail, locale: caseLocale } = loadContent<CaseDetailContent>(
    casePattern,
    requestedLocale,
    'en-GB'
  );

  if (!caseDetail) {
    return { notFound: true };
  }

  const caseUsesFallback = Boolean(caseLocale && caseLocale !== requestedLocale);

  return {
    props: sanitizeProps({
      slug: slugParam as ServiceSlug,
      caseSlug: caseSlugParam,
      service: serviceResult.service,
      showFallbackNotice: serviceResult.showFallbackNotice,
      caseDetail,
      caseUsesFallback,
    }),
  };
};

export default function ServiceCaseDetailPage({
  slug,
  service,
  showFallbackNotice,
  caseDetail,
  caseUsesFallback,
}: ServiceCaseDetailProps) {
  const hero = service.hero ?? {};
  const basePath = `/services/${slug}`;
  const fallbackMessage = service.fallbackNotice ??
    'Temporarily showing English content while we complete this translation.';

  return (
    <>
      <PageLayoutV2
        header={
          <div className="space-y-4">
            {hero.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.eyebrow}</p>
            ) : null}
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                {hero.title ?? service.title ?? 'Service detail'}
              </h1>
              {hero.subtitle ? <p className="text-base leading-7 text-slate-600">{hero.subtitle}</p> : null}
            </div>
          </div>
        }
        subnav={<SubnavTabs base={basePath} tabs={getSubnavTabs(basePath)} active={CASES_SUBNAV_SLUG} />}
      >
        <div className="space-y-10">
          <SectionContainer>
            <div className="space-y-3">
              <Link href={`${basePath}/cases`} className="inline-flex items-center text-sm font-medium text-emerald-700">
                <span aria-hidden className="mr-2">&larr;</span>
                Back to cases overview
              </Link>
              {showFallbackNotice ? (
                <p className="text-xs leading-5 text-slate-500">{fallbackMessage}</p>
              ) : null}
              {caseUsesFallback ? (
                <p className="text-xs leading-5 text-slate-500">Case available in English while we prepare this translation.</p>
              ) : null}
            </div>
          </SectionContainer>

          <SectionContainer variant="surface" wide>
            <CaseDetail
              {...caseDetail}
              header={
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Case detail
                </p>
              }
            />
          </SectionContainer>
        </div>
      </PageLayoutV2>
      <StickyCTA />
    </>
  );
}

function getSubnavTabs(base: string) {
  return [
    { slug: 'overview', label: 'Overview', href: base },
    { slug: 'pricing', label: 'Pricing' },
    { slug: 'readiness', label: 'Readiness' },
    { slug: 'process', label: 'Process' },
    { slug: 'agreement', label: 'Agreement' },
    { slug: 'faq', label: 'FAQ' },
    { slug: 'cases', label: 'Cases' },
  ];
}
