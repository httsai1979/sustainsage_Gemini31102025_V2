// components/sections/BulletHighlights.tsx
import React from 'react';
import BulletList from './BulletList';

type Block = { title?: string; description?: string; items?: string[] };

export default function BulletHighlights({ block = {} as Block }) {
  if (!block?.items?.length) return null;
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/95 p-6 shadow-sm">
      {block.title ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{block.title}</p>
      ) : null}
      {block.description ? <p className="mt-2 text-sm leading-6 text-slate-700">{block.description}</p> : null}
      <BulletList items={block.items as string[]} />
    </div>
  );
}
