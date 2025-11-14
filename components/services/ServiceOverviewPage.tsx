import Link from 'next/link';
import type { ComponentType } from 'react';
import { useTranslation } from 'next-i18next';

import { CaseCard } from '@/components/cases/CaseCard';
import ServiceSubnav from '@/components/services/ServiceSubnav';
import Card from '@/components/ui/Card';
import StepList from '@/components/ui/StepList';
import FAQAccordion from '@/components/faq/FAQAccordion';
import { sectionizeServiceOverview } from '@/lib/sectionize';
import { dedupeBy } from '@/lib/dedupe';

const SimpleCard = Card as ComponentType<any>;

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

function OverviewCTA({ cta }: { cta?: ServiceOverview['cta'] }) {
  if (!cta?.title && !cta?.description) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-sustain-cardBorder bg-white p-8 text-center shadow-md">
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
  );
}

export function ServiceOverviewPage({ service, showFallbackNotice = false }: ServiceOverviewPageProps) {
  const { t } = useTranslation('serviceDetails');
  const hero = service.hero ?? {};
  const basePath = `/services/${service.slug}`;
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
    (item, index) => item?.title ?? item?.context ?? index
  );
  const sections = sectionizeServiceOverview(service);
  const tabLabels = (t('tabs', { returnObjects: true }) ?? {}) as Record<string, string>;
  const subnavTabs = [
    { slug: 'overview', label: tabLabels.overview ?? 'Overview', href: `/services/${service.slug}` },
    { slug: 'pricing', label: tabLabels.pricing ?? 'Pricing' },
    { slug: 'readiness', label: tabLabels.readiness ?? 'Readiness' },
    { slug: 'process', label: tabLabels.process ?? 'Process' },
    { slug: 'agreement', label: tabLabels.agreement ?? 'Agreement' },
    { slug: 'faq', label: tabLabels.faq ?? 'FAQ' },
    { slug: 'cases', label: tabLabels.cases ?? 'Cases' },
  ];

  const translationFallback = t(
    'subpage.fallbackNotice',
    'Temporarily showing English content while we complete this translation.'
  );
  const fallbackNotice = service.fallbackNotice ?? translationFallback;
  const overviewCopy = (t('overviewPage', { returnObjects: true }) ?? {}) as Record<string, unknown>;
  const sidebarLabel =
    typeof overviewCopy?.sidebarEyebrow === 'string'
      ? (overviewCopy.sidebarEyebrow as string)
      : 'In this service';
  const sidebarFallback =
    typeof overviewCopy?.sidebarFallback === 'string'
      ? (overviewCopy.sidebarFallback as string)
      : 'Gentle coaching containers for your specific transition or experiment.';
  const contactCopy = (overviewCopy?.contactCard as Record<string, unknown>) ?? {};
  const contactTitle =
    typeof contactCopy?.title === 'string'
      ? (contactCopy.title as string)
      : 'Need a gentle sounding board?';
  const contactBody =
    typeof contactCopy?.body === 'string'
      ? (contactCopy.body as string)
      : 'Book a 20-minute chat or email a few lines about what is shifting right now.';
  const contactNote = typeof contactCopy?.note === 'string' ? (contactCopy.note as string) : null;

  const renderHeader = (title?: string, lead?: string) => {
    if (!title && !lead) {
      return null;
    }
    return (
      <div className="space-y-2">
        {title ? <h2 className="text-2xl font-semibold text-sustain-text">{title}</h2> : null}
        {lead ? <p className="text-base leading-7 text-slate-700">{lead}</p> : null}
      </div>
    );
  };

  const renderSimpleCards = (items: any[], keyPrefix: string) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item, index) => {
          const title = item?.title ?? item?.question ?? item?.heading ?? null;
          const description =
            item?.description ?? item?.answer ?? item?.body ?? item?.summary ?? item?.context ?? item ?? '';
          return (
            <SimpleCard key={`${keyPrefix}-${title ?? index}`} title={title ?? undefined}>
              {description ? <p>{description}</p> : null}
            </SimpleCard>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-sustain-bg">
      <div className="bg-gradient-to-br from-sustain-green/15 via-sustain-bg to-slate-50">
        <div className="ss-container py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {hero.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green">{hero.eyebrow}</p>
              ) : null}
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold leading-tight text-sustain-text md:text-4xl">
                  {hero.title ?? service.title ?? 'Service overview'}
                </h1>
                {hero.subtitle ? <p className="text-base leading-7 text-slate-700">{hero.subtitle}</p> : null}
                {showFallbackNotice ? (
                  <p className="text-xs font-medium text-slate-500">{fallbackNotice}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                {hero.primaryCta?.href && hero.primaryCta?.label ? (
                  <Link
                    href={hero.primaryCta.href}
                    className="ss-btn-primary"
                  >
                    {hero.primaryCta.label}
                  </Link>
                ) : null}
                {hero.secondaryCta?.href && hero.secondaryCta?.label ? (
                  <Link href={hero.secondaryCta.href} className="ss-btn-secondary">
                    {hero.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="rounded-3xl border border-sustain-cardBorder bg-white/80 p-8 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{sidebarLabel}</p>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {service.who?.description ?? service.key_points?.description ?? sidebarFallback}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="ss-container flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,260px)_1fr]">
          <aside className="space-y-6">
            <ServiceSubnav base={basePath} tabs={subnavTabs} active="overview" orientation="vertical" />
            <div className="rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-sustain-text">{contactTitle}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{contactBody}</p>
              <div className="mt-4 flex flex-col gap-3">
                {hero.primaryCta?.href && hero.primaryCta?.label ? (
                  <Link href={hero.primaryCta.href} className="ss-btn-primary">
                    {hero.primaryCta.label}
                  </Link>
                ) : null}
                {hero.secondaryCta?.href && hero.secondaryCta?.label ? (
                  <Link href={hero.secondaryCta.href} className="ss-btn-secondary">
                    {hero.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
              {contactNote ? (
                <p className="mt-4 text-xs leading-5 text-slate-500">{contactNote}</p>
              ) : null}
            </div>
          </aside>

          <div className="space-y-12">
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
                  <section key={`cases-${index}`} className="space-y-6">
                    {renderHeader(metaTitle, metaLead)}
                    {cases.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  </section>
                );
              }

              if (isKeyPoints) {
                return (
                  <section key={`key-points-${index}`} className="space-y-6">
                    {renderHeader(metaTitle, metaLead)}
                    {keyCards.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {keyCards.map((item) => (
                          <SimpleCard key={item.title ?? item.description} title={item.title}>
                            {item.description ? <p>{item.description}</p> : null}
                          </SimpleCard>
                        ))}
                      </div>
                    ) : null}
                  </section>
                );
              }

              if (isProcess) {
                const steps = Array.isArray(section.items)
                  ? section.items.map((step: any, stepIndex: number) => ({
                      title: typeof step === 'string' ? null : step?.title,
                      description: typeof step === 'string' ? step : step?.description,
                      stepNumber: stepIndex + 1,
                    }))
                  : [];
                return (
                  <section key={`process-${index}`} className="space-y-6">
                    {renderHeader(metaTitle, metaLead)}
                    {steps.length > 0 ? <StepList steps={steps} /> : null}
                    {service.process?.note ? (
                      <p className="text-xs font-medium text-slate-500">{service.process.note}</p>
                    ) : null}
                  </section>
                );
              }

              if (isFaq) {
                const faqItems = Array.isArray(service.faq?.items) ? service.faq.items : [];
                return (
                  <section key={`faq-${index}`} className="space-y-6">
                    {renderHeader(metaTitle, metaLead)}
                    <FAQAccordion items={faqItems} />
                  </section>
                );
              }

              const items = Array.isArray(section.items)
                ? section.items.map((item: any) =>
                    typeof item === 'string'
                      ? { description: item }
                      : {
                          title: item?.title ?? item?.question ?? item?.heading ?? item?.label,
                          description:
                            item?.description ?? item?.answer ?? item?.body ?? item?.summary ?? item?.context ?? '',
                        }
                  )
                : [];

              if (isBoundaries) {
                return (
                  <section key={`boundaries-${index}`} className="space-y-6">
                    {renderHeader(metaTitle, metaLead)}
                    <div className="space-y-4">
                      {items.map((item, itemIndex) => (
                        <div
                          key={`boundary-${item.title ?? itemIndex}`}
                          className="rounded-2xl border border-sustain-cardBorder bg-white p-6 shadow-sm"
                        >
                          {item.title ? <h3 className="text-base font-semibold text-sustain-text">{item.title}</h3> : null}
                          {item.description ? (
                            <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              return (
                <section key={`section-${index}`} className="space-y-6">
                  {renderHeader(metaTitle, metaLead)}
                  {renderSimpleCards(items, `section-${index}`)}
                </section>
              );
            })}

            <OverviewCTA cta={service.cta} />
          </div>
        </div>
      </section>
    </div>
  );
}
