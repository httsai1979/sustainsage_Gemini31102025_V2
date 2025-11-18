import PropTypes from 'prop-types';

import PageSection from '@/components/ui/PageSection';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

export default function ContentHero({ hero = {}, showFallbackNotice = false, fallbackNotice = null }) {
  const introParagraphs = Array.isArray(hero?.intro)
    ? hero.intro
    : hero?.intro
    ? [hero.intro]
    : [];
  const chips = Array.isArray(hero?.chips) ? hero.chips : [];

  return (
    <PageSection id={hero?.id ?? 'page-hero'} eyebrow={hero?.eyebrow} title={hero?.title} lead={hero?.lead}>
      {introParagraphs.length ? (
        <div className="space-y-4 text-base leading-relaxed text-sustain-textMuted">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {chips.length ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-sustain-cardBorder bg-white/90 px-3 py-1 text-xs font-semibold text-sustain-textMuted"
            >
              {chip}
            </span>
          ))}
        </div>
      ) : null}
      {showFallbackNotice ? (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-sustain-textMuted">
          {fallbackNotice ?? DEFAULT_NOTICE}
        </p>
      ) : null}
    </PageSection>
  );
}

ContentHero.propTypes = {
  hero: PropTypes.shape({
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    intro: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    chips: PropTypes.arrayOf(PropTypes.string),
  }),
  showFallbackNotice: PropTypes.bool,
  fallbackNotice: PropTypes.string,
};
