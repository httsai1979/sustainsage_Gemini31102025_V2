// components/sections/SectionTitle.tsx
import React from 'react';

type Props = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  className?: string;
};

export default function SectionTitle({ eyebrow, title, lead, className = '' }: Props) {
  return (
    <div className={`typography flex flex-col gap-3 ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
      ) : null}
      {title ? <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2> : null}
      {lead ? <p className="text-slate-700">{lead}</p> : null}
    </div>
  );
}
