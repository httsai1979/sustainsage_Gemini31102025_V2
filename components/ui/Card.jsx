import cn from '@/lib/cn';
import PropTypes from 'prop-types';

import { H3 } from './H';
import Prose from './Prose';

export default function Card({
  title,
  subtitle,
  children,
  className,
  footer,
  as: Component = 'article',
  icon = null,
  prose = false,
  tag = null,
}) {
  return (
    <Component
      className={cn(
        'ssg-card border border-white/60 bg-paper shadow-ssgCard transition hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
    >
      <div className="space-y-4">
        {(tag || icon || title || subtitle) && (
          <div className="space-y-3">
            {tag ? (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {tag}
              </span>
            ) : null}
            {icon ? (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {icon}
              </div>
            ) : null}
            {title ? <H3 className="text-lg font-semibold text-ink">{title}</H3> : null}
            {subtitle ? <p className="text-sm text-ink/70">{subtitle}</p> : null}
          </div>
        )}
        {prose ? <Prose className="space-y-4 text-base text-ink/80">{children}</Prose> : children}
      </div>
      {footer ? <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-ink/70">{footer}</div> : null}
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
