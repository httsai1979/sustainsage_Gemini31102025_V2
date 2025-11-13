// components/sections/ProseSection.tsx
import React from 'react';
import SectionTitle from './SectionTitle';

type Item = { title?: string; description?: string } | string;
type Section = {
  title?: string;
  lead?: string;
  paragraphs?: string[];
  items?: Item[];
};

function renderItem(it: Item, idx: number) {
  if (typeof it === 'string') {
    return (
      <li key={idx} className="flex gap-3">
        <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
        <span>{it}</span>
      </li>
    );
  }
  return (
    <li key={idx} className="rounded-xl border border-emerald-100 bg-white/95 p-4 shadow-sm">
      {it.title ? <p className="text-sm font-medium text-slate-900">{it.title}</p> : null}
      {it.description ? <p className="mt-1 text-sm text-slate-700">{it.description}</p> : null}
    </li>
  );
}

export default function ProseSection({ section = {} as Section }) {
  const { title, lead, paragraphs = [], items = [] } = section;
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle title={title} lead={lead} />
        {paragraphs?.length ? (
          <div className="prose prose-slate mt-4 max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : null}
        {items?.length ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">{items.map(renderItem)}</ul>
        ) : null}
      </div>
    </section>
  );
}
