import Link from 'next/link';
import PropTypes from 'prop-types';

import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Section from '@/components/ui/Section';

export default function TopicsHero({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  backgroundImage = '/images/topics-hero.jpg',
  backgroundAlt = 'Coaching topics background',
}) {
  return (
    <Section fullWidth>
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white">
        <ResponsiveImage
          src={backgroundImage}
          alt={backgroundAlt}
          width={2000}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-slate-900/70" aria-hidden />
        <div className="relative px-6 py-16 md:px-12">
          <div className="md:ml-auto md:w-1/2">
            <div className="rounded-2xl bg-white p-6 text-sustain-text shadow-lg md:p-8">
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sustain-green/80">{eyebrow}</p>
              ) : null}
              {title ? <h2 className="mt-3 text-3xl font-semibold">{title}</h2> : null}
              {description ? <p className="mt-4 text-base leading-relaxed text-slate-700">{description}</p> : null}
              {ctaLabel && ctaHref ? (
                <div className="mt-6">
                  <Link href={ctaHref} className="ss-btn-primary">
                    {ctaLabel}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

TopicsHero.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundAlt: PropTypes.string,
};
