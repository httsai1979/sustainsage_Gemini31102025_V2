// components/sections/BulletList.tsx
import React from 'react';

export default function BulletList({ items = [] as Array<string> }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
