import Link from 'next/link';

import PageLayoutV2 from '@/components/layout/PageLayoutV2';
import { SubnavTabs } from '@/components/common/SubnavTabs';
import { CaseCard } from '@/components/cases/CaseCard';
import SectionContainer from '@/components/sections/SectionContainer';

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
    <article className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm">
      {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
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
        {cta.title ? <h2 className="text-2xl font-semibold text-slate-900">{cta.title}</h2> : null}
        {cta.description ? <p className="mt-3 text-base leading-7 text-slate-700">{cta.description}</p> : null}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {cta.primary?.href && cta.primary?.label ? (
            <Link
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {cta.primary.label}
            </Link>
          ) : null}
          {cta.secondary?.href && cta.secondary?.label ? (
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
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
  const keyCards = Array.isArray(service.key_points?.items)
    ? service.key_points?.items.filter((item) => item && (item.title || item.description))
    : [];
  const cases = Array.isArray(service.cases?.items)
    ? service.cases?.items.filter((item) => item && (item.title || item.context || item.coaching_moves || item.shift))
    : [];

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
          {hero.eyebrow ? <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{hero.eyebrow}</p> : null}
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              {hero.title ?? service.title ?? 'Service overview'}
            </h1>
            {hero.subtitle ? <p className="text-base leading-7 text-slate-600">{hero.subtitle}</p> : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackNotice}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {hero.primaryCta?.href && hero.primaryCta?.label ? (
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero.secondaryCta?.href && hero.secondaryCta?.label ? (
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200 transition hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      }
      subnav={<SubnavTabs base={`/services/${service.slug}`} tabs={subnavTabs} active="overview" />}
    >
      <div className="space-y-12">
        {service.cases?.title || service.cases?.description || cases.length > 0 ? (
          <SectionContainer variant="surface" title={service.cases?.title} lead={service.cases?.description} wide>
            {cases.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
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
          </SectionContainer>
        ) : null}

        {service.key_points?.title || service.key_points?.description || keyCards.length > 0 ? (
          <SectionContainer variant="surface" title={service.key_points?.title} lead={service.key_points?.description} wide>
            {keyCards.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {keyCards.map((item) => (
                  <KeyCard key={item.title ?? item.description} title={item.title} description={item.description} />
                ))}
              </div>
            ) : null}
          </SectionContainer>
        ) : null}

        <OverviewCTA cta={service.cta} />
      </div>
    </PageLayoutV2>
  );
}
