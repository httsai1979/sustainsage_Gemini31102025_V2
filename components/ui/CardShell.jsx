import PropTypes from 'prop-types';

import cn from '@/lib/cn';

import IconBadge from './IconBadge';

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
  const resolvedIcon = icon
    ? icon
    : iconName
    ? (
      <IconBadge iconName={iconName} className={iconClassName} />
    )
    : null;

  return (
    <Tag
      className={cn(
        'group relative flex h-full flex-col rounded-[32px] border border-white/70 bg-white/95 p-6 shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.16)] focus-within:-translate-y-1 focus-within:shadow-[0_35px_80px_rgba(15,23,42,0.2)] md:p-8',
        className,
      )}
      {...rest}
    >
      {(resolvedIcon || eyebrow || title || meta) && (
        <div className="flex items-start gap-3">
          {resolvedIcon ? <div className="shrink-0">{resolvedIcon}</div> : null}
          <div className="flex-1 space-y-1">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-ink/50">{eyebrow}</p>
            ) : null}
            {title ? (
              <h3 className={cn('text-lg font-semibold text-ink md:text-xl', titleClassName)}>{title}</h3>
            ) : null}
            {meta ? (
              <p className={cn('text-xs text-ink/60', metaClassName)}>{meta}</p>
            ) : null}
          </div>
        </div>
      )}

      {children ? (
        <div className={cn('mt-4 text-base leading-relaxed text-ink/70', bodyClassName)}>{children}</div>
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
