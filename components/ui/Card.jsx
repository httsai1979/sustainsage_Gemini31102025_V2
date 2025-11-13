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
        'bg-white rounded-card border border-sustain-cardBorder p-6 shadow-card transition-colors md:p-8',
        'space-y-3',
        className,
      )}
    >
      <div className="space-y-4">
        {(tag || icon || title || subtitle) && (
          <div className="space-y-3">
            {tag ? (
              <span className="inline-flex items-center rounded-full bg-sustain-green/10 px-3 py-1 text-xs font-semibold text-sustain-green">
                {tag}
              </span>
            ) : null}
            {icon ? (
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sustain-green/10 text-sustain-green">
                {icon}
              </div>
            ) : null}
            {title ? (
              <h3 className="text-base font-semibold tracking-tight text-sustain-text md:text-lg">{title}</h3>
            ) : null}
            {subtitle ? <p className="text-sm text-slate-600 md:text-base">{subtitle}</p> : null}
          </div>
        )}
        {prose ? (
          <Prose className="space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">{children}</Prose>
        ) : (
          <div className="text-sm leading-relaxed text-slate-700 md:text-base">{children}</div>
        )}
      </div>
      {footer ? (
        <div className="mt-6 border-t border-sustain-cardBorder/70 pt-4 text-sm text-slate-600">
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
