import PropTypes from 'prop-types';

import HeroShell from '@/components/ui/HeroShell';

const DEFAULT_NOTICE = 'Temporarily showing English content while we complete this translation.';

export default function ContentHero({ hero = {}, showFallbackNotice = false, fallbackNotice = null }) {
  const introParagraphs = Array.isArray(hero?.intro)
    ? hero.intro
    : hero?.intro
    ? [hero.intro]
    : [];
  const chips = Array.isArray(hero?.chips) ? hero.chips : [];

  return (
    <HeroShell
      eyebrow={hero?.eyebrow}
      title={hero?.title}
      subtitle={hero?.lead}
      description={introParagraphs}
      chips={chips}
      notice={showFallbackNotice ? fallbackNotice ?? DEFAULT_NOTICE : null}
      image={hero?.image}
    />
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
