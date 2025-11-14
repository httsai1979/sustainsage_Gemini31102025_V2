import fs from 'fs';
import path from 'path';

import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { CaseDetail, type CaseDetailContent } from '@/components/cases/CaseDetail';
import { StickyCTA } from '@/components/common/StickyCTA';
import ServiceSubnav from '@/components/services/ServiceSubnav';
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
      <div className="bg-gradient-to-br from-sustain-green/15 via-sustain-bg to-slate-50">
        <div className="ss-container py-12 space-y-3">
          {hero.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green">{hero.eyebrow}</p>
          ) : null}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold leading-tight text-sustain-text md:text-4xl">
              {hero.title ?? service.title ?? 'Service detail'}
            </h1>
            {hero.subtitle ? <p className="text-base leading-7 text-slate-700">{hero.subtitle}</p> : null}
          </div>
        </div>
      </div>
      <section className="bg-sustain-bg py-16">
        <div className="ss-container flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,260px)_1fr]">
          <aside className="space-y-6">
            <ServiceSubnav base={basePath} tabs={getSubnavTabs(basePath)} active={CASES_SUBNAV_SLUG} orientation="vertical" />
            <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-sustain-text">Need a different example?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Browse other cases or email us so we can share the closest-fit anonymised story.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link href={`${basePath}/cases`} className="ss-btn-secondary text-center">
                  Back to cases
                </Link>
                <Link href={`/contact?from=${slug}-case`} className="ss-btn-primary text-center">
                  Contact SustainSage
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="rounded-3xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
              <Link href={`${basePath}/cases`} className="inline-flex items-center text-sm font-medium text-sustain-green">
                <span aria-hidden className="mr-2">&larr;</span>
                Back to cases overview
              </Link>
              {showFallbackNotice ? (
                <p className="mt-4 text-xs leading-5 text-slate-500">{fallbackMessage}</p>
              ) : null}
              {caseUsesFallback ? (
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Case available in English while we prepare this translation.
                </p>
              ) : null}
            </div>

            <div className="rounded-3xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
              <CaseDetail
                {...caseDetail}
                header={
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green">
                    Case detail
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </section>
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
