import Image from 'next/image';
import Link from 'next/link';
import type { ElementType, ReactNode } from 'react';
import { ArrowRight, Check, CheckCircle, Compass, Quotes } from '@phosphor-icons/react';

type HeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  cta?: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  cta,
  meta,
  image = '/images/editorial/career-hero.webp',
  imageAlt = '',
}: HeroProps) {
  return (
    <header className="relative isolate min-h-[min(860px,100dvh)] overflow-hidden bg-[#eef1ed] pt-24 text-[#12231d]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[66%_center]"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(238,241,237,.72)_0%,rgba(238,241,237,.84)_62%,rgba(238,241,237,.98)_100%)] sm:bg-[linear-gradient(90deg,rgba(238,241,237,.98)_0%,rgba(238,241,237,.94)_38%,rgba(238,241,237,.36)_66%,rgba(18,35,29,.08)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#eef1ed] to-transparent" />
      <div className="mx-auto flex min-h-[calc(min(860px,100dvh)-6rem)] max-w-7xl items-end px-5 pb-16 sm:px-8 sm:pb-20 lg:items-center lg:pb-10">
        <div className="max-w-[760px]">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-[#27634e] sm:text-sm">
            <span aria-hidden className="h-px w-9 bg-[#d98b42]" />
            {eyebrow}
          </p>
          <h1 className="max-w-[17ch] text-balance text-[clamp(2.8rem,6vw,5.7rem)] font-medium leading-[.98] tracking-[-0.052em] text-[#10251d]">
            {title}
          </h1>
          <p className="mt-7 max-w-[56ch] text-pretty text-lg leading-8 text-[#334a41] sm:text-xl">{intro}</p>
          {cta ? (
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/contact" className="ssg-primary-button group">
                {cta}
                <ArrowRight aria-hidden className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" weight="bold" />
              </Link>
              {meta ? <p className="max-w-sm text-sm leading-6 text-[#53675f]">{meta}</p> : null}
            </div>
          ) : meta ? <p className="mt-7 max-w-sm text-sm leading-6 text-[#53675f]">{meta}</p> : null}
        </div>
      </div>
    </header>
  );
}

export function ContentSection({
  id,
  eyebrow,
  title,
  intro,
  tone = 'paper',
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'paper' | 'sage' | 'sand';
  children: ReactNode;
}) {
  const backgrounds = {
    paper: 'bg-[#f8faf7]',
    sage: 'bg-[#edf2ee]',
    sand: 'bg-[#f4f1ea]',
  };
  return (
    <section id={id} className={`scroll-mt-24 ${backgrounds[tone]}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-3xl">
          {eyebrow ? <p className="mb-4 text-xs font-bold tracking-[0.15em] text-[#2b6a53]">{eyebrow}</p> : null}
          <h2 className="text-balance text-3xl font-medium leading-[1.08] tracking-[-0.036em] text-[#10251d] sm:text-5xl">{title}</h2>
          {intro ? <p className="mt-5 max-w-[62ch] text-pretty text-lg leading-8 text-[#52665e]">{intro}</p> : null}
        </div>
        <div className="mt-10 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}

export function EditorialMedia({ src, alt, caption, align = 'right' }: { src: string; alt: string; caption?: string; align?: 'left' | 'right' }) {
  return (
    <figure className={`relative ${align === 'right' ? 'lg:ml-auto' : ''}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#dfe6e0] shadow-[0_24px_70px_rgba(16,37,29,.14)]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
      </div>
      {caption ? <figcaption className="mt-4 max-w-[62ch] text-sm leading-6 text-[#5b6c65]">{caption}</figcaption> : null}
    </figure>
  );
}

export function MediaSplit({ media, children, reverse = false }: { media: ReactNode; children: ReactNode; reverse?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={reverse ? 'lg:order-2 lg:col-span-5' : 'lg:col-span-5'}>{children}</div>
      <div className={reverse ? 'lg:order-1 lg:col-span-7' : 'lg:col-span-7'}>{media}</div>
    </div>
  );
}

export function IconCardGrid({ items }: { items: readonly { id?: string; title: string; body: string; icon: ElementType }[] }) {
  const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];
  return (
    <div className="grid gap-4 md:grid-cols-12">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <article id={item.id} key={item.title} className={`group scroll-mt-28 rounded-[1.25rem] border border-[#173d2f]/10 bg-white/80 p-7 shadow-[0_16px_48px_rgba(16,37,29,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#2b6a53]/30 hover:shadow-[0_22px_56px_rgba(16,37,29,.11)] ${spans[index % spans.length]}`}>
            <div className="flex items-start justify-between gap-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[.9rem] bg-[#e3ece6] text-[#27634e]">
                <Icon aria-hidden className="h-6 w-6" weight="regular" />
              </span>
              <ArrowRight aria-hidden className="mt-1 h-5 w-5 text-[#d98b42] transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="mt-8 text-2xl font-medium tracking-[-.025em] text-[#10251d]">{item.title}</h3>
            <p className="mt-3 max-w-[55ch] text-pretty leading-7 text-[#53675f]">{item.body}</p>
          </article>
        );
      })}
    </div>
  );
}

export function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ol className="grid gap-4 lg:grid-cols-2">
      {items.map((item, index) => (
        <li key={item} className="flex min-h-36 gap-5 rounded-[1.25rem] border border-[#173d2f]/10 bg-white/75 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1e563f] font-mono text-sm tabular-nums text-white">{index + 1}</span>
          <span className="pt-1 text-pretty text-lg leading-8 text-[#31483f]">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-pretty text-lg leading-8 text-[#31483f]">
          <CheckCircle aria-hidden className="mt-[.3rem] h-6 w-6 shrink-0 text-[#2b6a53]" weight="regular" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function QuotePanel({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <blockquote className="relative rounded-[1.25rem] bg-[#163b2e] p-8 text-white shadow-[0_24px_70px_rgba(16,37,29,.18)] sm:p-10">
      <Quotes aria-hidden className="h-9 w-9 text-[#e5a05a]" weight="fill" />
      <p className="mt-7 text-pretty text-2xl font-medium leading-9 tracking-[-.02em]">{quote}</p>
      <footer className="mt-7 text-sm text-[#c8d9d0]">{attribution}</footer>
    </blockquote>
  );
}

export function PrimaryCTA({ title, body, label }: { title: string; body: string; label: string }) {
  return (
    <section className="bg-[#e8eee9]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[1.25rem] border border-[#173d2f]/10 bg-[#f8faf7] px-7 py-12 shadow-[0_22px_70px_rgba(16,37,29,.09)] sm:px-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <Compass aria-hidden className="absolute -right-7 -top-10 h-48 w-48 text-[#dfe9e2]" weight="thin" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold tracking-[0.15em] text-[#2b6a53]">NEXT STEP</p>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-[-0.035em] text-[#10251d] sm:text-5xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-[#53675f]">{body}</p>
          </div>
          <Link href="/contact" className="ssg-primary-button group relative mt-8 shrink-0 lg:mt-0">
            <Check aria-hidden className="mr-2 h-4 w-4" weight="bold" />
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}
