import fs from 'fs';
import path from 'path';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactNode } from 'react';

import { CaseCard } from '@/components/cases/CaseCard';
import { StickyCTA } from '@/components/common/StickyCTA';
import { SubnavTabs } from '@/components/common/SubnavTabs';
import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { loadJSON } from '@/lib/loadContent';
import { toSerializable } from '@/lib/toSerializable';

export const SERVICE_SLUGS = ['career-return', 'immigrant-job', 'graduate-start'] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceCaseItem = {
  title?: string;
  context?: string;
  coaching_moves?: string;
  shift?: string;
  tools_used?: string[];
  disclaimer?: string;
};

export type ServiceProcessStep = {
  title?: string;
  description?: string;
};

export type ServicePricingPackage = {
  name?: string;
  duration?: string;
  scope?: string;
  price_note?: string;
};

export type ServicePricingPolicy = {
  title?: string;
  body?: string;
};

export type ServiceContent = {
  slug: ServiceSlug;
  title?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
  pricing?: {
    description?: string;
    note?: string;
    packages?: ServicePricingPackage[];
    policies?: ServicePricingPolicy[];
  };
  readiness?: {
    description?: string;
    checklist?: string[];
    what_to_prepare?: string[];
  };
  process?: {
    title?: string;
    description?: string;
    steps?: ServiceProcessStep[];
    note?: string;
  };
  agreement?: {
    description?: string;
    sections?: {
      heading?: string;
      body?: string;
    }[];
  };
  faq?: {
    title?: string;
    description?: string;
    items?: (
      | { q?: string; a?: string }
      | { question?: string; answer?: string }
    )[];
  };
  cases?: {
    title?: string;
    description?: string;
    items?: ServiceCaseItem[];
  };
};

export type ServiceSubpageProps = {
  slug: ServiceSlug;
  service: ServiceContent;
  showFallbackNotice: boolean;
};

type SubnavSlug = 'overview' | 'pricing' | 'readiness' | 'process' | 'agreement' | 'faq' | 'cases';

type CreateServiceSubpageOptions = {
  subSlug: Exclude<SubnavSlug, 'overview'>;
  heading: string | ((service: ServiceContent) => string);
  intro?: (service: ServiceContent) => ReactNode;
  renderContent: (service: ServiceContent) => ReactNode;
};

type CreateServiceSubpageResult = {
  Page: (props: ServiceSubpageProps) => JSX.Element;
  getStaticPaths: GetStaticPaths;
  getStaticProps: GetStaticProps<ServiceSubpageProps>;
};

export function createServiceSubpage({
  subSlug,
  heading,
  intro,
  renderContent,
}: CreateServiceSubpageOptions): CreateServiceSubpageResult {
  const getStaticPaths: GetStaticPaths = async () => ({
    paths: SERVICE_SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  });

  const getStaticProps: GetStaticProps<ServiceSubpageProps> = async ({ params, locale }) => {
    const slugParam = params?.slug;

    if (typeof slugParam !== 'string' || !SERVICE_SLUGS.includes(slugParam as ServiceSlug)) {
      return { notFound: true };
    }

    const requestedLocale = typeof locale === 'string' && locale.length > 0 ? locale : 'en-GB';
    const result = loadJSON<Partial<ServiceContent>>(`content/services/${slugParam}.{locale}.json`, requestedLocale);

    if (!result.data) {
      return { notFound: true };
    }

    const basePath = path.join(process.cwd(), 'content', 'services', `${slugParam}.json`);
    const baseData = fs.existsSync(basePath)
      ? (JSON.parse(fs.readFileSync(basePath, 'utf-8')) as Partial<ServiceContent>)
      : {};

    const service: ServiceContent = {
      slug: slugParam as ServiceSlug,
      ...baseData,
      ...result.data,
    };

    const showFallbackNotice = Boolean(result.usedLocale && result.usedLocale !== result.requestedLocale);

    return toSerializable({
      props: {
        slug: slugParam as ServiceSlug,
        service,
        showFallbackNotice,
      },
    });
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
  const hero = service.hero ?? {};
  const basePath = `/services/${service.slug}`;
  const tabs = getSubnavTabs(basePath);
  const cases = Array.isArray(service.cases?.items)
    ? service.cases?.items.filter((item) => item && (item.title || item.context || item.coaching_moves || item.shift))
    : [];
  const caseCards = cases.slice(0, 3);

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
        subnav={<SubnavTabs base={basePath} tabs={tabs} active={active} />}
      >
        <div className="space-y-12">
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">{heading}</h2>
              {intro}
            </div>
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">暫用英文內容</p>
            ) : null}
          </section>

          {children}

          {caseCards.length > 0 ? (
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {service.cases?.title ?? 'Composite coaching glimpses'}
                </h2>
                {service.cases?.description ? (
                  <p className="mt-2 text-sm leading-6 text-slate-700">{service.cases.description}</p>
                ) : null}
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {caseCards.map((item, index) => (
                  <CaseCard
                    key={item.title ?? item.context ?? item.shift ?? index}
                    title={item.title}
                    context={item.context}
                    coaching_moves={item.coaching_moves}
                    shift={item.shift}
                    tools_used={item.tools_used}
                    disclaimer={item.disclaimer}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </PageLayoutV2>
      <StickyCTA />
    </>
  );
}

function getSubnavTabs(base: string) {
  const tabs: { slug: SubnavSlug; label: string; href?: string }[] = [
    { slug: 'overview', label: 'Overview', href: base },
    { slug: 'pricing', label: 'Pricing' },
    { slug: 'readiness', label: 'Readiness' },
    { slug: 'process', label: 'Process' },
    { slug: 'agreement', label: 'Agreement' },
    { slug: 'faq', label: 'FAQ' },
    { slug: 'cases', label: 'Cases' },
  ];

  return tabs;
}

