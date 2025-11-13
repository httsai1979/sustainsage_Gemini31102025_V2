import React, { type ReactNode } from 'react';

type SectionContainerProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  tone?: 'default' | 'muted';
  variant?: 'layout' | 'surface';
  wide?: boolean;
};

export default function SectionContainer({
  eyebrow,
  title,
  lead,
  children,
  className = '',
  tone = 'default',
  variant = 'layout',
  wide = false,
}: SectionContainerProps) {
  const hasHeader = Boolean(eyebrow || title || lead);

  if (variant === 'surface') {
    const toneClass = tone === 'muted' ? 'bg-emerald-50/70' : 'bg-white/95';
    const baseClasses = `rounded-3xl border border-emerald-100 ${toneClass} p-6 shadow-sm`;
    const classes = className ? `${baseClasses} ${className}` : baseClasses;

    return (
      <section className={wide ? `mx-auto max-w-5xl ${classes}` : classes}>
        {hasHeader ? (
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
            ) : null}
            {title ? <h2 className="text-xl font-semibold text-slate-900">{title}</h2> : null}
            {lead ? <p className="text-sm leading-6 text-slate-700">{lead}</p> : null}
          </div>
        ) : null}
        {children ? <div className={hasHeader ? 'mt-6' : undefined}>{children}</div> : null}
      </section>
    );
  }

  const sectionClasses = ['py-16', 'sm:py-20', className].filter(Boolean).join(' ');
  const widthClass = wide ? 'max-w-6xl' : 'max-w-4xl';

  return (
    <section className={sectionClasses}>
      <div className={`mx-auto ${widthClass} px-4 md:px-6`}>
        {hasHeader ? (
          <div className="space-y-3">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
            ) : null}
            {title ? <h2 className="text-2xl font-semibold text-slate-900">{title}</h2> : null}
            {lead ? <p className="text-base leading-7 text-slate-700">{lead}</p> : null}
          </div>
        ) : null}
        {children ? <div className={hasHeader ? 'mt-6' : undefined}>{children}</div> : null}
      </div>
    </section>
  );
}
