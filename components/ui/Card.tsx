import type { ComponentType, ElementType, ReactNode } from 'react';

import cn from '@/lib/cn';

export type CardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  footer?: ReactNode;
  as?: ComponentType<any> | ElementType;
  icon?: ReactNode;
  prose?: boolean;
  tag?: ReactNode;
};

export default function Card({
  title,
  subtitle,
  children,
  className,
  footer,
  as: Component = 'div',
  icon,
  prose = false,
  tag,
}: CardProps) {
  return (
    <Component
      className={cn(
        'flex h-full flex-col rounded-3xl border border-sustain-cardBorder bg-white p-6 shadow-card dark:border-sustain-cardBorder-dark dark:bg-sustain-surface-dark/90',
        className,
      )}
    >
      {(icon || tag || title || subtitle) && (
        <div className="flex items-start gap-3">
          {icon ? <div className="mt-1 text-sustain-primary">{icon}</div> : null}
          <div className="space-y-2">
            {tag ? (
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/60 dark:text-ink/50">{tag}</div>
            ) : null}
            {title ? <h3 className="text-xl font-semibold text-ink dark:text-sustain-text-dark">{title}</h3> : null}
            {subtitle ? (
              prose ? (
                <div className="prose prose-slate text-ink/80 dark:text-sustain-text-dark/80">{subtitle}</div>
              ) : (
                <p className="text-base leading-relaxed text-ink/70 dark:text-sustain-text-dark/80">{subtitle}</p>
              )
            ) : null}
          </div>
        </div>
      )}

      {children ? (
        <div className={cn('mt-4 text-base leading-relaxed text-ink/80 dark:text-sustain-text-dark/80', prose && 'prose prose-slate')}>
          {children}
        </div>
      ) : null}

      {footer ? <div className="mt-6 pt-4">{footer}</div> : null}
    </Component>
  );
}
