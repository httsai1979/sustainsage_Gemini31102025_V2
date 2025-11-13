import PropTypes from 'prop-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@/components/layout/MainLayout';
import { loadJSON } from '@/lib/content';
import { toSerializable } from '@/lib/toSerializable';
import { orderSections } from '@/lib/content/normalize';
import BulletHighlights from '@/components/sections/BulletHighlights';
import ProseSection from '@/components/sections/ProseSection';

// 與服務頁一致的 Examples-first 守門（已存在則確保正則包含 'examples' 關鍵字）
const EXAMPLE_RE =
  /(範例|案例|情境|使用情境|先看例子|適合誰|誰適合|example|examples|use case|scenario|scenarios|who (it'?s )?for|before\/after)/i;
const isExampleSection = (section) => {
  if (!section || typeof section !== 'object') return false;
  const title = String(section.title ?? section.heading ?? '');
  const lead = String(section.lead ?? section.summary ?? section.description ?? '');
  return EXAMPLE_RE.test(title) || EXAMPLE_RE.test(lead);
};
const ensureExampleFirst = (sections) => {
  if (typeof orderSections === 'function') {
    return orderSections(sections);
  }
  if (!Array.isArray(sections)) return [];
  const example = sections.filter(isExampleSection);
  const rest = sections.filter((s) => !isExampleSection(s));
  return [...example, ...rest];
};

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
  const rawSections = Array.isArray(content?.sections) ? content.sections : [];
  const sections = ensureExampleFirst(rawSections);
  const fallbackMessage =
    fallbackNotice ?? 'Temporarily showing English content while we complete this translation.';

  return (
    <MainLayout
      seo={{
        title: content?.title,
        description: content?.description,
      }}
    >
      <section className="bg-emerald-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="typography flex flex-col gap-4">
            <h1>{content?.title}</h1>
            {content?.description ? <p>{content.description}</p> : null}
            {showFallbackNotice ? (
              <p className="text-xs font-medium text-slate-500">{fallbackMessage}</p>
            ) : null}
            {content?.lastUpdated ? (
              <p className="text-sm font-medium uppercase tracking-wide text-emerald-800">{content.lastUpdated}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 grid gap-6 sm:grid-cols-2">
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
      </section>
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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });
}
