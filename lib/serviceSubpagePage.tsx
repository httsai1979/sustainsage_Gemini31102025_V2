import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

import Link from 'next/link';

import { CaseCard } from '@/components/cases/CaseCard';
import { StickyCTA } from '@/components/common/StickyCTA';
import ServiceSubnav from '@/components/services/ServiceSubnav';
import { SERVICE_SLUGS, type ServiceContent, type ServiceSlug } from '@/lib/serviceContentTypes';
import { sanitizeProps } from '@/lib/toSerializable';
import { dedupeBy } from '@/lib/dedupe';

export type ServiceSubpageProps = {
  slug: ServiceSlug;
  service: ServiceContent;
  showFallbackNotice: boolean;
};

type SubnavSlug = 'overview' | 'pricing' | 'readiness' | 'process' | 'agreement' | 'faq' | 'cases';

type ServiceCTA = {
  title?: string;
  description?: string;
  note?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
};

type ServiceSubnavTab = {
  slug: SubnavSlug;
  label: string;
  href?: string;
  id?: string;
  cta?: ServiceCTA;
};

type CreateServiceSubpageOptions = {
  subSlug: Exclude<SubnavSlug, 'overview'>;
  heading: string | ((service: ServiceContent) => string);
  intro?: (service: ServiceContent) => ReactNode;
  renderContent: (service: ServiceContent) => ReactNode;
};

type CreateServiceSubpageResult = {
  Page: (props: ServiceSubpageProps) => ReactElement;
  getStaticPaths: GetStaticPaths;
  getStaticProps: GetStaticProps<ServiceSubpageProps>;
};

export function createServiceSubpage({
  subSlug,
  heading,
  intro,
  renderContent,
}: CreateServiceSubpageOptions): CreateServiceSubpageResult {
  const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const allLocales = Array.isArray(locales) && locales.length > 0 ? locales : ['en-GB'];
    const paths = allLocales.flatMap((locale) =>
      SERVICE_SLUGS.map((slug) => ({
        params: { slug },
        locale,
      }))
    );

    return { paths, fallback: false };
  };

  const getStaticProps: GetStaticProps<ServiceSubpageProps> = async ({ params, locale }) => {
    const slugParam = params?.slug;

    if (typeof slugParam !== 'string' || !SERVICE_SLUGS.includes(slugParam as ServiceSlug)) {
      return { notFound: true };
    }

    const requestedLocale = typeof locale === 'string' && locale.length > 0 ? locale : 'en-GB';
    const { loadServiceContent } = await import('@/lib/server/serviceContent');
    const contentResult = await loadServiceContent(slugParam as ServiceSlug, requestedLocale);

    if (!contentResult) {
      return { notFound: true };
    }

    const { service, showFallbackNotice } = contentResult;

    return {
      props: sanitizeProps({
        slug: slugParam as ServiceSlug,
        service,
        showFallbackNotice,
      }),
    };
  };

  function Page({ service, showFallbackNotice }: ServiceSubpageProps) {
    const headingText = typeof heading === 'function' ? heading(service) : heading;

    return (
      <ServiceSubpageLayout
        service={service}
        active={subSlug}
        heading={headingText}
        intro={intro ? intro(service) : null}
        showFallbackNotice={showFallbackNotice}
      >
        {renderContent(service)}
      </ServiceSubpageLayout>
    );
  }

  return { Page, getStaticPaths, getStaticProps };
}

export function createServiceSubpageStaticProps(
  slug: ServiceSlug
): GetStaticProps<ServiceSubpageProps> {
  return async ({ locale }) => {
    const requestedLocale = typeof locale === 'string' && locale.length > 0 ? locale : 'en-GB';
    const { loadServiceContent } = await import('@/lib/server/serviceContent');
    const contentResult = await loadServiceContent(slug, requestedLocale);

    if (!contentResult) {
      return { notFound: true };
    }

    const { service, showFallbackNotice } = contentResult;

    return {
      props: sanitizeProps({
        slug,
        service,
        showFallbackNotice,
      }),
    };
  };
}

type ServiceSubpageLayoutProps = {
  service: ServiceContent;
  heading: string;
  active: Exclude<SubnavSlug, 'overview'>;
  intro?: ReactNode;
  showFallbackNotice?: boolean;
  children: ReactNode;
};

function ServiceSubpageLayout({
  service,
  heading,
  active,
  intro,
  showFallbackNotice = false,
  children,
}: ServiceSubpageLayoutProps) {
  const { t } = useTranslation('serviceDetails');
  const hero = service.hero ?? {};
  const basePath = `/services/${service.slug}`;
  const tabLabels = (t('tabs', { returnObjects: true }) ?? {}) as Record<string, string>;
  const tabs = getSubnavTabs(basePath, tabLabels);
  const cases = dedupeBy(
    Array.isArray(service.cases?.items)
      ? service.cases?.items.filter((item) => item && (item.title || item.context || item.coaching_moves || item.shift))
      : [],
    (item, index) => item?.title ?? item?.slug ?? item?.context ?? index
  );
  const caseCards = cases.slice(0, 3);
  const fallbackMessage =
    service.fallbackNotice ??
    t('subpage.fallbackNotice', 'Temporarily showing English content while we complete this translation.');
  const activeTab = tabs.find((tab) => tab.id === active || tab.slug === active);
  const defaultCta: ServiceCTA = {
    title: t('subpage.defaultCta.title', 'Next steps'),
    description:
      t('subpage.defaultCta.description',
        'Compare pricing or start a 20-minute chat to see if this coaching pathway fits your moment.'),
    primary: {
      href: `${basePath}/pricing`,
      label: t('subpage.defaultCta.primary', 'Review pricing'),
    },
    secondary: {
      href: '/contact',
      label: t('subpage.defaultCta.secondary', 'Book a 20-minute chat'),
    },
    note: t('subpage.defaultCta.note', ''),
  };
  const resolvedCta: ServiceCTA =
    activeTab?.cta ?? (service as ServiceContent & { cta?: ServiceCTA })?.cta ?? defaultCta;

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
            <ServiceSubnav base={basePath} tabs={tabs} active={active} orientation="vertical" />
            {resolvedCta ? (
              <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
                {resolvedCta.title ? (
                  <p className="text-sm font-semibold text-sustain-text">{resolvedCta.title}</p>
                ) : null}
                {resolvedCta.description ? (
                  <p className="mt-2 text-sm leading-6 text-slate-700">{resolvedCta.description}</p>
                ) : null}
                {resolvedCta.primary || resolvedCta.secondary ? (
                  <div className="mt-4 flex flex-col gap-3">
                    {resolvedCta.primary?.href && resolvedCta.primary?.label ? (
                      <Link href={resolvedCta.primary.href} className="ss-btn-primary text-center">
                        {resolvedCta.primary.label}
                      </Link>
                    ) : null}
                    {resolvedCta.secondary?.href && resolvedCta.secondary?.label ? (
                      <Link href={resolvedCta.secondary.href} className="ss-btn-secondary text-center">
                        {resolvedCta.secondary.label}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
                {resolvedCta.note ? (
                  <p className="mt-4 text-xs leading-5 text-slate-500">{resolvedCta.note}</p>
                ) : null}
              </div>
            ) : null}
          </aside>

          <div className="space-y-10">
            <div className="rounded-3xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{heading}</p>
              {intro ? (
                <div className="mt-3 text-sm leading-6 text-slate-700">
                  {intro}
                </div>
              ) : null}
              {showFallbackNotice ? (
                <p className="mt-4 text-xs font-medium text-slate-500">{fallbackMessage}</p>
              ) : null}
            </div>

            {children}

            {caseCards.length > 0 ? (
              <section className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-sustain-text">
                    {service.cases?.title ?? 'Composite coaching glimpses'}
                  </h2>
                  {service.cases?.description ? (
                    <p className="mt-2 text-sm leading-6 text-slate-700">{service.cases.description}</p>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {caseCards.map((item, index) => (
                    <CaseCard
                      key={item.title ?? item.context ?? item.shift ?? index}
                      title={item.title}
                      context={item.context}
                      coaching_moves={item.coaching_moves}
                      shift={item.shift}
                      tools_used={item.tools_used}
                      disclaimer={item.disclaimer}
                      href={item.slug ? `${basePath}/cases/${item.slug}` : undefined}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </section>
      <StickyCTA />
    </>
  );
}

function getSubnavTabs(base: string, labels?: Record<string, string>): ServiceSubnavTab[] {
  const tabs: ServiceSubnavTab[] = [
    { slug: 'overview', label: labels?.overview ?? 'Overview', href: base },
    { slug: 'pricing', label: labels?.pricing ?? 'Pricing' },
    { slug: 'readiness', label: labels?.readiness ?? 'Readiness' },
    { slug: 'process', label: labels?.process ?? 'Process' },
    { slug: 'agreement', label: labels?.agreement ?? 'Agreement' },
    { slug: 'faq', label: labels?.faq ?? 'FAQ' },
    { slug: 'cases', label: labels?.cases ?? 'Cases' },
  ];

  return tabs;
}

