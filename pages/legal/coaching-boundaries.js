import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import PageSection from '@/components/ui/PageSection';
import { loadJSON } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';
import { orderSections } from '@/lib/orderSections';
import BulletHighlights from '@/components/Sections/BulletHighlights';
import ProseSection from '@/components/Sections/ProseSection';

BulletHighlights.propTypes = {
  block: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default function CoachingBoundariesPage({
  content = {},
  showFallbackNotice = false,
  fallbackNotice = null,
} = {}) {
  const scope = content?.scope ?? {};
  const sections = orderSections(content?.sections || []);
  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <MainLayout
      seo={{
        title: content?.title,
        description: content?.description,
      }}
    >
      <PageSection className="bg-emerald-50/60" title={content?.title} lead={content?.description}>
        <div className="space-y-3">
          {showFallbackNotice ? (
            <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
          ) : null}
          {content?.lastUpdated ? (
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-800">{content.lastUpdated}</p>
          ) : null}
        </div>
      </PageSection>

      <PageSection>
        <div className="grid gap-6 sm:grid-cols-2">
          <BulletHighlights
            block={{
              title: scope?.whatYouGet?.title,
              description: scope?.whatYouGet?.description,
              items: scope?.whatYouGet?.items ?? [],
            }}
          />
          <BulletHighlights
            block={{
              title: scope?.whatWeDontDo?.title,
              description: scope?.whatWeDontDo?.description,
              items: scope?.whatWeDontDo?.items ?? [],
            }}
          />
        </div>
      </PageSection>
      {sections.map((section, idx) => (
        <ProseSection key={section.title ?? idx} section={section} />
      ))}
    </MainLayout>
  );
}

CoachingBoundariesPage.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    lastUpdated: PropTypes.string,
    scope: PropTypes.shape({
      whatYouGet: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
      }),
      whatWeDontDo: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        paragraphs: PropTypes.arrayOf(PropTypes.string),
        items: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};


export async function getStaticProps({ locale = 'en-GB' }) {
  const content = loadJSON('legal/coaching-boundaries', locale);
  const fallbackNotice =
    typeof content?.fallbackNotice === 'string' && content.fallbackNotice.length > 0
      ? content.fallbackNotice
      : null;
  const isEnglishLocale = typeof locale === 'string' && locale.toLowerCase().startsWith('en');
  const showFallbackNotice = !isEnglishLocale && Boolean(fallbackNotice);

  return toSerializable({
    props: {
      content,
      showFallbackNotice,
      fallbackNotice,
      ...(await serverSideTranslations(locale, ['common', 'nav'])),
    },
  });
}
