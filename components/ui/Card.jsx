import cn from '@/lib/cn';
import PropTypes from 'prop-types';

import Prose from './Prose';

export default function Card({
  title,
  subtitle,
  children,
  className,
  footer,
  as: Component = 'section',
  icon = null,
  prose = false,
  tag = null,
}) {
  return (
    <Component
      className={cn(
        'rounded-card rounded-2xl border border-sustain-cardBorder bg-sustain-surface p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg md:p-8 dark:border-sustain-cardBorder-dark dark:bg-sustain-surface-dark',
        'flex flex-col gap-3',
        className,
      )}
    >
      <div className="space-y-4">
        {(tag || icon || title || subtitle) && (
          <div className="space-y-3">
            {tag ? (
              <span className="inline-flex items-center rounded-full bg-sustain-primary/10 px-3 py-1 text-xs font-semibold text-sustain-primary">
                {tag}
              </span>
            ) : null}
            {icon ? (
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sustain-primary/10 text-sustain-primary">
                {icon}
              </div>
            ) : null}
            {title ? (
              <h3 className="text-base font-semibold tracking-tight text-sustain-text dark:text-sustain-text-dark md:text-lg">{title}</h3>
            ) : null}
            {subtitle ? <p className="text-sm text-sustain-textMuted dark:text-sustain-text-dark/80 md:text-base">{subtitle}</p> : null}
          </div>
        )}
        {prose ? (
          <Prose className="space-y-4 text-sm leading-relaxed text-sustain-textMuted dark:text-sustain-text-dark/90 md:text-base">{children}</Prose>
        ) : (
          <div className="text-sm leading-relaxed text-sustain-textMuted dark:text-sustain-text-dark/90 md:text-base">{children}</div>
        )}
      </div>
      {footer ? (
        <div className="mt-6 border-t border-sustain-cardBorder/70 pt-4 text-sm text-sustain-textMuted dark:border-sustain-cardBorder-dark/70 dark:text-sustain-text-dark/80">
          {footer}
        </div>
      ) : null}
    </Component>
  );
}

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  className: PropTypes.string,
  footer: PropTypes.node,
  icon: PropTypes.node,
  prose: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  as: PropTypes.elementType,
};
