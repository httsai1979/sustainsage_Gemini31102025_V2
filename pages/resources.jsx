import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContentHero from '@/components/content/ContentHero';
import MainLayout from '@/components/layout/MainLayout';
import ServicesSectionRenderer from '@/components/services/ServicesSectionRenderer';
import CardShell from '@/components/ui/CardShell';
import PageSection from '@/components/ui/PageSection';
import { getResourcesPageContent } from '@/lib/resourcesContent';
import { toSerializable } from '@/lib/toSerializable';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

function normalizeSummary(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((paragraph) => typeof paragraph === 'string' && paragraph.trim().length > 0);
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return [value];
  }
  return [];
}

function ToolsSection({ section }) {
  const tools = Array.isArray(section?.tools) ? section.tools : [];
  if (!tools.length) return null;
  const fallbackCtaLabel = section?.ctaLabel ?? 'Open resource';

  return (
    <PageSection id={section?.id} eyebrow={section?.eyebrow} title={section?.title} lead={section?.lead}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const paragraphs = normalizeSummary(tool?.summary);
          const hasHref = typeof tool?.href === 'string' && tool.href.trim().length > 0;
          const ctaLabel = tool?.ctaLabel ?? fallbackCtaLabel;
          const openInNewTab = tool?.openInNewTab ?? true;
          const Tag = hasHref ? 'a' : 'div';
          return (
            <CardShell
              key={tool?.id ?? tool?.slug ?? tool?.title}
              as={Tag}
              href={hasHref ? tool.href : undefined}
              target={hasHref && openInNewTab ? '_blank' : undefined}
              rel={hasHref && openInNewTab ? 'noreferrer noopener' : undefined}
              iconName={tool?.iconName}
              eyebrow={tool?.eyebrow}
              title={tool?.title}
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {hasHref && ctaLabel ? (
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sustain-primary">
                  {ctaLabel}
                  <span aria-hidden>→</span>
                </div>
              ) : null}
            </CardShell>
          );
        })}
      </div>
    </PageSection>
  );
}

ToolsSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string,
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    ctaLabel: PropTypes.string,
    tools: PropTypes.arrayOf(PropTypes.object),
  }),
};

function ResourcesPage({ content, showFallbackNotice, fallbackNotice }) {
  const hero = content?.hero ?? {};
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <>
      <ContentHero hero={hero} showFallbackNotice={showFallbackNotice} fallbackNotice={fallbackNotice} />
      {sections.map((section) => {
        if (Array.isArray(section?.tools)) {
          return <ToolsSection key={section?.id ?? section?.title} section={section} />;
        }
        return <ServicesSectionRenderer key={section?.id ?? section?.title} section={section} />;
      })}
    </>
  );
}

ResourcesPage.propTypes = {
  content: PropTypes.shape({
    hero: PropTypes.object,
    sections: PropTypes.array,
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};

ResourcesPage.getLayout = function getLayout(page) {
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

export async function getStaticProps({ locale = 'en-GB' }) {
  const resolvedLocale = typeof locale === 'string' ? locale : 'en-GB';
  const { content, isFallback } = getResourcesPageContent(resolvedLocale);
  const fallbackNotice = content?.fallbackNotice ?? DEFAULT_NOTICE;
  const { loadNamespace } = await import('@/lib/server/loadNamespace');
  const namespaceCopy = loadNamespace(resolvedLocale, 'resources');

  return toSerializable({
    props: {
      content,
      showFallbackNotice: isFallback,
      fallbackNotice,
      seo: namespaceCopy?.seo ?? null,
      ...(await serverSideTranslations(resolvedLocale, ['common', 'nav', 'resources'])),
    },
  });
}

export default ResourcesPage;
