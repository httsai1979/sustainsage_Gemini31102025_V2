import type { GetStaticProps, NextPage } from 'next';
import type { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContentHero from '@/components/content/ContentHero';
import MainLayout from '@/components/layout/MainLayout';
import ServicesSectionRenderer from '@/components/services/ServicesSectionRenderer';
import Button from '@/components/ui/Button';
import CardShell from '@/components/ui/CardShell';
import PageSection from '@/components/ui/PageSection';
import { getResourcesPageContent } from '@/lib/resourcesContent';
import { validateResourcesContent } from '@/lib/schema/resourcesSchema';
import { toSerializable } from '@/lib/toSerializable';
import type { ResourcesPageContent, ResourcesSection, ToolsSection } from '@/types/resources';
import type { SeoMeta } from '@/types/home';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';
const DEFAULT_CTA_LABEL = 'Open resource';

type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement<P>) => ReactElement;
};

type ResourcesPageProps = {
  content: ResourcesPageContent;
  showFallbackNotice: boolean;
  fallbackNotice: string;
  seo?: SeoMeta | null;
};

type ToolsSectionProps = {
  section: ToolsSection;
};

export function ToolsSection({ section }: ToolsSectionProps) {
  const { id, eyebrow, title, lead, tools, ctaLabel: fallbackCtaLabel } = section;
  const ctaLabel = fallbackCtaLabel ?? DEFAULT_CTA_LABEL;

  return (
    <PageSection id={id} eyebrow={eyebrow} title={title} lead={lead}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const { id: toolId, summary, href, openInNewTab = true } = tool;
          const target = openInNewTab ? '_blank' : undefined;
          const rel = openInNewTab ? 'noreferrer noopener' : undefined;

          return (
            <CardShell key={toolId} iconName={tool.iconName} eyebrow={tool.eyebrow} title={tool.title}>
              {summary.map((paragraph, index) => (
                <p key={`${toolId}-summary-${index}`} className="text-base leading-relaxed text-ink/70">
                  {paragraph}
                </p>
              ))}
              {href ? (
                <div className="mt-4">
                  <Button href={href} target={target} rel={rel} variant="secondary">
                    {tool.ctaLabel ?? ctaLabel}
                  </Button>
                </div>
              ) : null}
            </CardShell>
          );
        })}
      </div>
    </PageSection>
  );
}

const ResourcesPage: NextPageWithLayout<ResourcesPageProps> = ({
  content,
  showFallbackNotice,
  fallbackNotice,
}) => {
  const { hero, sections } = content;

  return (
    <>
      <ContentHero hero={hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      {sections.map((section: ResourcesSection) => {
        if (section.type === 'tools') {
          return <ToolsSection key={section.id} section={section} />;
        }

        switch (section.style) {
          case 'cards':
          case 'prose':
          case 'steps':
          case 'cta':
            return <ServicesSectionRenderer key={section.id} section={section} />;
          default: {
            const exhaustiveCheck: never = section;
            return exhaustiveCheck;
          }
        }
      })}
    </>
  );
};

ResourcesPage.getLayout = function getLayout(page: ReactElement<ResourcesPageProps>) {
  const seo = page.props?.seo ?? {};
  return (
    <MainLayout
      seo={{
        title: seo?.title ?? 'Resources',
        description: seo?.description ?? null,
      }}
    >
      <main>{page}</main>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps<ResourcesPageProps> = async ({ locale = 'en-GB' }) => {
  const resolvedLocale = typeof locale === 'string' ? locale : 'en-GB';
  const { content, isFallback } = getResourcesPageContent(resolvedLocale);
  const typedContent = validateResourcesContent(content, resolvedLocale);
  const fallbackNotice = typedContent.fallbackNotice ?? DEFAULT_NOTICE;
  const { loadNamespace } = await import('@/lib/server/loadNamespace');
  const namespaceCopy = loadNamespace(resolvedLocale, 'resources');

  return toSerializable({
    props: {
      content: typedContent,
      showFallbackNotice: isFallback,
      fallbackNotice,
      seo: namespaceCopy?.seo ?? null,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav', 'resources'])),
    },
  });
};

export default ResourcesPage;
