import React, { type ReactNode } from 'react';

type SectionContainerProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  tone?: 'default' | 'muted';
};

export default function SectionContainer({
  eyebrow,
  title,
  lead,
  children,
  className = '',
  tone = 'default',
}: SectionContainerProps) {
  const toneClass = tone === 'muted' ? 'bg-emerald-50/70' : 'bg-white/95';
  const baseClasses = `rounded-3xl border border-emerald-100 ${toneClass} p-6 shadow-sm`;
  const classes = className ? `${baseClasses} ${className}` : baseClasses;
  const hasHeader = Boolean(eyebrow || title || lead);

  return (
    <section className={classes}>
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
