import Image from 'next/image';
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
  imageSrc = null,
  imageAlt = '',
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
        'group relative flex h-full flex-col rounded-[32px] border border-white/60 bg-white/90 backdrop-blur-md p-6 shadow-card ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-ssgCard hover:border-primary/20 focus-within:-translate-y-2 focus-within:shadow-ssgCard md:p-8',
        className,
      )}
      {...rest}
    >
      {imageSrc ? (
        <div className="relative mb-5 overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-primary/10 via-white to-primary/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={imageSrc}
              alt={imageAlt || title || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />
        </div>
      ) : null}

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
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  children: PropTypes.node,
  bodyClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  metaClassName: PropTypes.string,
};
