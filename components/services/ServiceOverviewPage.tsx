import Link from 'next/link';

import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { CaseCard } from '@/components/cases/CaseCard';
import SectionContainer from '@/components/sections/SectionContainer';
import PageSection from '@/components/ui/PageSection';
import ServiceSubnav from '@/components/services/ServiceSubnav';
import { sectionizeServiceOverview } from '@/lib/sectionize';
import { dedupeBy } from '@/lib/dedupe';

export type ServiceHero = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export type ServiceKeyPoint = {
  title?: string;
  description?: string;
};

export type ServiceCase = {
  title?: string;
  context?: string;
  coaching_moves?: string;
  shift?: string;
  tools_used?: string[];
  disclaimer?: string;
};

export type ServiceOverview = {
  slug: string;
  title?: string;
  fallbackNotice?: string;
  hero?: ServiceHero;
  who?: {
    title?: string;
    description?: string;
    items?: Array<{ title?: string; description?: string } | string>;
  };
  scenarios?: Array<{ title?: string; description?: string } | string>;
  key_points?: {
    title?: string;
    description?: string;
    items?: ServiceKeyPoint[];
  };
  cases?: {
    title?: string;
    description?: string;
    items?: ServiceCase[];
  };
  process?: {
    title?: string;
    description?: string;
    steps?: Array<{ title?: string; description?: string } | string>;
    note?: string;
  };
  boundaries?: {
    title?: string;
    description?: string;
    items?: Array<{ title?: string; description?: string; question?: string; answer?: string }>;
  };
  faq?: {
    title?: string;
    description?: string;
    items?: Array<{ title?: string; description?: string; question?: string; answer?: string }>;
  };
  cta?: {
    title?: string;
    description?: string;
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export type ServiceOverviewPageProps = {
  service: ServiceOverview;
  showFallbackNotice?: boolean;
};

function KeyCard({ title, description }: ServiceKeyPoint) {
  if (!title && !description) {
    return null;
  }

  return (
    <article className="rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card">
      {title ? <h3 className="text-lg font-semibold text-sustain-text">{title}</h3> : null}
      {description ? <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p> : null}
    </article>
  );
}

function OverviewCTA({ cta }: { cta?: ServiceOverview['cta'] }) {
  if (!cta?.title && !cta?.description) {
    return null;
  }

  return (
    <SectionContainer variant="surface" tone="muted">
      <div className="text-center">
        {cta.title ? <h2 className="text-2xl font-semibold text-sustain-text">{cta.title}</h2> : null}
        {cta.description ? <p className="mt-3 text-base leading-7 text-slate-700">{cta.description}</p> : null}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {cta.primary?.href && cta.primary?.label ? (
            <Link
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-sustain-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-sustain-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sustain-green"
            >
              {cta.primary.label}
            </Link>
          ) : null}
          {cta.secondary?.href && cta.secondary?.label ? (
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-sustain-green ring-1 ring-inset ring-sustain-cardBorder transition hover:bg-sustain-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sustain-green"
            >
              {cta.secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </SectionContainer>
  );
}

export function ServiceOverviewPage({ service, showFallbackNotice = false }: ServiceOverviewPageProps) {
  const hero = service.hero ?? {};
  const keyCards = dedupeBy(
    Array.isArray(service.key_points?.items)
      ? service.key_points?.items.filter((item) => item && (item.title || item.description))
      : [],
    (item, index) => item?.title ?? item?.description ?? index
  );
  const cases = dedupeBy(
    Array.isArray(service.cases?.items)
      ? service.cases?.items.filter((item) => item && (item.title || item.context || item.coaching_moves || item.shift))
      : [],
    (item, index) => item?.title ?? item?.slug ?? item?.context ?? index
  );
  const sections = sectionizeServiceOverview(service);

  const subnavTabs = [
    { slug: 'overview', label: 'Overview', href: `/services/${service.slug}` },
    { slug: 'pricing', label: 'Pricing' },
    { slug: 'readiness', label: 'Readiness' },
    { slug: 'process', label: 'Process' },
    { slug: 'agreement', label: 'Agreement' },
    { slug: 'faq', label: 'FAQ' },
    { slug: 'cases', label: 'Cases' },
  ];

  const fallbackNotice = service.fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <PageLayoutV2
      header={
      <div className="space-y-4">
        {hero.eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-green">{hero.eyebrow}</p> : null}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-sustain-text md:text-4xl">
              {hero.title ?? service.title ?? 'Service overview'}
            </h1>
            {hero.subtitle ? <p className="text-base leading-7 text-slate-700">{hero.subtitle}</p> : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackNotice}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {hero.primaryCta?.href && hero.primaryCta?.label ? (
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-sustain-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-sustain-green/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sustain-green"
              >
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero.secondaryCta?.href && hero.secondaryCta?.label ? (
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-sustain-green ring-1 ring-inset ring-sustain-cardBorder transition hover:bg-sustain-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sustain-green"
              >
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      }
      subnav={<ServiceSubnav base={`/services/${service.slug}`} tabs={subnavTabs} active="overview" />}
    >
      <div className="space-y-10 md:space-y-12">
        {sections.map((section, index) => {
          const isCases = section.items === service.cases?.items;
          const isKeyPoints = section.items === service.key_points?.items;
          const isProcess = section.items === service.process?.steps;
          const isBoundaries = section.items === service.boundaries?.items;
          const isFaq = section.items === service.faq?.items;
          const metaTitle = isCases
            ? service.cases?.title
            : isKeyPoints
            ? service.key_points?.title
            : isProcess
            ? service.process?.title
            : isBoundaries
            ? service.boundaries?.title
            : isFaq
            ? service.faq?.title
            : section.title;
          const metaLead = isCases
            ? service.cases?.description
            : isKeyPoints
            ? service.key_points?.description
            : isProcess
            ? service.process?.description
            : isBoundaries
            ? service.boundaries?.description
            : isFaq
            ? service.faq?.description
            : section.lead;

          if (isCases) {
            return (
              <PageSection key={`cases-${index}`} title={metaTitle} lead={metaLead}>
                {cases.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cases.map((item) => (
                      <CaseCard
                        key={item.title ?? item.context ?? item.shift}
                        title={item.title}
                        context={item.context}
                        coaching_moves={item.coaching_moves}
                        shift={item.shift}
                        tools_used={item.tools_used}
                        disclaimer={item.disclaimer}
                      />
                    ))}
                  </div>
                ) : null}
              </PageSection>
            );
          }

          if (isKeyPoints) {
            return (
              <PageSection key={`key-points-${index}`} title={metaTitle} lead={metaLead}>
                {keyCards.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {keyCards.map((item) => (
                      <KeyCard key={item.title ?? item.description} title={item.title} description={item.description} />
                    ))}
                  </div>
                ) : null}
              </PageSection>
            );
          }

          if (isProcess) {
            const processNote = service.process?.note;
            return (
              <PageSection key={`process-${index}`} title={metaTitle} lead={metaLead}>
                {Array.isArray(section.items) && section.items.length > 0 ? (
                  <ol className="mt-6 space-y-4">
                    {section.items.map((step: any, stepIndex: number) => {
                      const title = typeof step === 'string' ? null : step?.title;
                      const description = typeof step === 'string' ? step : step?.description;
                      return (
                        <li key={title ?? description ?? stepIndex} className="flex gap-4">
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sustain-green text-sm font-semibold text-white">
                            {stepIndex + 1}
                          </span>
                          <div className="rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card">
                            {title ? <h3 className="text-base font-semibold text-sustain-text">{title}</h3> : null}
                            {description ? (
                              <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
                {processNote ? <p className="mt-6 text-xs leading-5 text-slate-500">{processNote}</p> : null}
              </PageSection>
            );
          }

          const items = Array.isArray(section.items) ? section.items : [];
          if (items.length === 0) {
            return null;
          }

          return (
            <PageSection key={`section-${index}`} title={metaTitle} lead={metaLead}>
              <div className="mt-6 space-y-4">
                {items.map((item, itemIndex) => {
                  const title = item?.title ?? item?.question;
                  const description = item?.description ?? item?.answer ?? item?.summary ?? item;
                  return (
                    <div
                      key={title ?? description ?? itemIndex}
                      className="rounded-card border border-sustain-cardBorder bg-white p-6 shadow-card"
                    >
                      {title ? <h3 className="text-base font-semibold text-sustain-text">{title}</h3> : null}
                      {description && typeof description === 'string' ? (
                        <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </PageSection>
          );
        })}

        <OverviewCTA cta={service.cta} />
      </div>
    </PageLayoutV2>
  );
}
