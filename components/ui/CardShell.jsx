import PropTypes from 'prop-types';

import cn from '@/lib/cn';

import Icon from './Icon';

export default function CardShell({
  as: Tag = 'div',
  className = '',
  iconName = null,
  icon = null,
  eyebrow = null,
  title = null,
  meta = null,
  children,
  bodyClassName = '',
  iconClassName = '',
  titleClassName = '',
  metaClassName = '',
  ...rest
}) {
  const resolvedIcon = icon ?? (iconName ? <Icon name={iconName} className={cn('text-sustain-primary', iconClassName)} /> : null);

  return (
    <Tag
      className={cn(
        'group relative flex h-full flex-col rounded-3xl border border-sustain-cardBorder bg-sustain-cardBg/95 p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-sustain-primary/60 hover:shadow-md focus-within:border-sustain-primary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sustain-primary md:p-6',
        className,
      )}
      {...rest}
    >
      {(resolvedIcon || eyebrow || title || meta) && (
        <div className="flex items-start gap-3">
          {resolvedIcon ? <div className="shrink-0">{resolvedIcon}</div> : null}
          <div className="flex-1 space-y-1">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sustain-textMuted">{eyebrow}</p>
            ) : null}
            {title ? (
              <h3 className={cn('text-base font-semibold text-sustain-textMain md:text-lg', titleClassName)}>{title}</h3>
            ) : null}
            {meta ? (
              <p className={cn('text-xs text-sustain-textMuted', metaClassName)}>{meta}</p>
            ) : null}
          </div>
        </div>
      )}

      {children ? (
        <div className={cn('mt-3 text-sm leading-relaxed text-sustain-textMuted', bodyClassName)}>{children}</div>
      ) : null}
    </Tag>
  );
}

CardShell.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  iconName: PropTypes.string,
  icon: PropTypes.node,
  eyebrow: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  bodyClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  metaClassName: PropTypes.string,
};
