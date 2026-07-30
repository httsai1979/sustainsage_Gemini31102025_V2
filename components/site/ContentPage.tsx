import Link from 'next/link';
import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, intro, cta, meta }: { eyebrow: string; title: string; intro: string; cta?: string; meta?: string }) {
  return (
    <header className="relative overflow-hidden border-b border-emerald-950/10 bg-[#f6f1e7] pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(73,108,85,.18),transparent_32%),radial-gradient(circle_at_8%_88%,rgba(184,153,111,.16),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:pb-32">
        <div>
          <p className="mb-5 text-sm font-semibold tracking-[0.16em] text-emerald-800">{eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">{title}</h1>
        </div>
        <div className="self-end border-l border-emerald-900/20 pl-6 lg:pl-9">
          <p className="max-w-[62ch] text-pretty text-lg leading-8 text-slate-700">{intro}</p>
          {cta ? <Link href="/contact" className="ssg-primary-button mt-8">{cta}</Link> : null}
          {meta ? <p className="mt-4 text-sm leading-6 text-slate-600">{meta}</p> : null}
        </div>
      </div>
    </header>
  );
}

export function ContentSection({ id, eyebrow, title, intro, tone = 'paper', children }: { id?: string; eyebrow?: string; title: string; intro?: string; tone?: 'paper' | 'sage' | 'sand'; children: ReactNode }) {
  const backgrounds = { paper: 'bg-[#fcfaf5]', sage: 'bg-[#e9efe8]', sand: 'bg-[#f1e8da]' };
  return (
    <section id={id} className={`scroll-mt-28 border-b border-emerald-950/10 ${backgrounds[tone]}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:py-28">
        <div>
          {eyebrow ? <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-emerald-800">{eyebrow}</p> : null}
          <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl">{title}</h2>
          {intro ? <p className="mt-5 max-w-[50ch] text-pretty leading-7 text-slate-600">{intro}</p> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-emerald-950/10 bg-emerald-950/10">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[3rem_1fr] gap-5 bg-white/85 p-6">
          <span className="font-mono text-sm tabular-nums text-emerald-800">0{index + 1}</span>
          <span className="text-pretty text-lg leading-8 text-slate-800">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-pretty text-lg leading-8 text-slate-800">
          <span aria-hidden className="mt-[.72rem] h-2 w-2 shrink-0 rounded-sm bg-emerald-700" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PrimaryCTA({ title, body, label }: { title: string; body: string; label: string }) {
  return (
    <section className="bg-emerald-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 sm:px-8 lg:flex-row lg:items-end lg:py-24">
        <div>
          <p className="text-sm font-semibold tracking-[0.15em] text-emerald-200">NEXT STEP</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-emerald-50/80">{body}</p>
        </div>
        <Link href="/contact" className="ssg-primary-button shrink-0 bg-[#e7d5b9] text-emerald-950 hover:bg-white">{label}</Link>
      </div>
    </section>
  );
}
