import Image from 'next/image';
import Link from 'next/link';
import type { ElementType, ReactNode } from 'react';
import { ArrowRight, CheckCircle, Quotes } from '@phosphor-icons/react';

type HeroProps = { eyebrow: string; title: string; intro: string; cta?: string; meta?: string; image?: string; imageAlt?: string; note?: string; compact?: boolean };

export function CrossBorderMap({ locale = 'en-GB' }: { locale?: string }) {
  const zh = locale === 'zh-TW';
  return <svg viewBox="0 0 640 420" role="img" aria-label={zh ? '亞洲總部、領導者與英國團隊之間的責任關係' : 'Accountability between Asian headquarters, the leader and the UK team'} className="h-auto w-full">
    <defs><linearGradient id="mapWash" x1="0" x2="1"><stop stopColor="#173d2f" /><stop offset="1" stopColor="#245a46" /></linearGradient></defs>
    <rect width="640" height="420" rx="4" fill="url(#mapWash)" />
    <path d="M136 136 C230 72 410 72 504 136" fill="none" stroke="#d9b27c" strokeWidth="2" strokeDasharray="4 8" />
    <path d="M136 148 C204 224 238 260 320 304" fill="none" stroke="#d7e3dc" strokeWidth="1.5" />
    <path d="M504 148 C436 224 402 260 320 304" fill="none" stroke="#d7e3dc" strokeWidth="1.5" />
    <circle cx="136" cy="136" r="54" fill="#f3efe6" /><circle cx="504" cy="136" r="54" fill="#f3efe6" /><circle cx="320" cy="304" r="67" fill="#d9b27c" />
    <text x="136" y="132" textAnchor="middle" fill="#173d2f" fontSize="16" fontWeight="700">{zh ? '亞洲總部' : 'ASIA HQ'}</text><text x="136" y="154" textAnchor="middle" fill="#53675f" fontSize="12">{zh ? '方向與速度' : 'Direction & speed'}</text>
    <text x="504" y="132" textAnchor="middle" fill="#173d2f" fontSize="16" fontWeight="700">{zh ? '英國團隊' : 'UK TEAM'}</text><text x="504" y="154" textAnchor="middle" fill="#53675f" fontSize="12">{zh ? '信任與採用' : 'Trust & adoption'}</text>
    <text x="320" y="298" textAnchor="middle" fill="#173d2f" fontSize="17" fontWeight="700">{zh ? '你' : 'YOU'}</text><text x="320" y="321" textAnchor="middle" fill="#173d2f" fontSize="12">{zh ? '承擔兩邊的結果' : 'Accountable to both'}</text>
    <text x="320" y="395" textAnchor="middle" fill="#c8d9d0" fontSize="11" letterSpacing="2">SUSTAINSAGE · CROSS-BORDER LEADERSHIP</text>
  </svg>;
}

export function PageHero({ eyebrow, title, intro, cta, meta, image, imageAlt = '', note, compact = !cta && !image }: HeroProps) {
  const mapLocale=/[\u3400-\u9fff]/.test(title)?'zh-TW':'en-GB';
  if(compact) return <header className="border-b border-[#173d2f]/10 bg-[#f3f0e9] pt-24 text-[#10251d]"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><p className="mb-7 flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-[#27634e]"><span aria-hidden className="h-px w-9 bg-[#bb783b]" />{eyebrow}</p><h1 className="max-w-[17ch] text-balance text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[1.02] tracking-[-0.05em]">{title}</h1><p className="mt-8 max-w-[60ch] text-pretty text-lg leading-8 text-[#40554c] sm:text-xl">{intro}</p>{meta?<p className="mt-7 max-w-[52ch] border-l-2 border-[#d9b27c] pl-5 text-sm leading-6 text-[#5b6c65]">{meta}</p>:null}</div></header>;
  if(image) return <header className="relative isolate min-h-[min(800px,100dvh)] overflow-hidden bg-[#10251d] pt-24 text-white">
    <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="absolute inset-0 -z-30 object-cover object-center" />
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(11,30,23,.84)_0%,rgba(14,39,29,.66)_42%,rgba(14,39,29,.16)_70%,rgba(14,39,29,.04)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(11,30,23,.72)_0%,rgba(11,30,23,.34)_45%,rgba(11,30,23,.78)_100%)]" />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,.08),transparent_40%,rgba(0,0,0,.18))]" />
    <div className="mx-auto flex min-h-[calc(min(800px,100dvh)-6rem)] max-w-7xl items-end px-5 pb-14 pt-20 sm:px-8 sm:pb-20 lg:items-center lg:pb-12">
      <div className="max-w-[780px]">
        <p className="mb-7 flex items-center gap-3 text-xs font-bold tracking-[0.16em] !text-[#efc48e]"><span aria-hidden className="h-px w-9 bg-[#efc48e]" />{eyebrow}</p>
        <h1 className="max-w-[20ch] text-balance text-[clamp(2.7rem,5.4vw,5.2rem)] font-medium leading-[1.01] tracking-[-0.052em] !text-white">{title}</h1>
        <p className="mt-7 max-w-[56ch] text-pretty text-lg leading-8 !text-[#edf4ef] sm:text-xl">{intro}</p>
        {cta?<div className="mt-9 flex flex-wrap items-center gap-5"><Link href="/contact" className="inline-flex min-h-12 items-center bg-[#f3f0e9] px-6 py-3 font-bold !text-[#173d2f] shadow-[0_12px_36px_rgba(0,0,0,.18)] transition-colors hover:bg-white">{cta}<ArrowRight aria-hidden className="ml-2 h-4 w-4" weight="bold" /></Link>{meta?<p className="max-w-sm text-sm leading-6 !text-[#d7e3dc]">{meta}</p>:null}</div>:meta?<p className="mt-7 max-w-sm border-l-2 border-[#e0b47b] pl-5 text-sm leading-6 !text-[#d7e3dc]">{meta}</p>:null}
      </div>
    </div>
  </header>;
  return <header className="border-b border-[#173d2f]/10 bg-[#f3f0e9] pt-24 text-[#10251d]"><div className="mx-auto grid min-h-[680px] max-w-7xl items-stretch lg:grid-cols-[1.08fr_.92fr]">
    <div className="flex items-center px-5 py-20 sm:px-8 lg:py-28 lg:pr-16"><div className="max-w-[760px]"><p className="mb-7 flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-[#27634e]"><span aria-hidden className="h-px w-9 bg-[#bb783b]" />{eyebrow}</p><h1 className="max-w-[18ch] text-balance text-[clamp(2.8rem,5.7vw,5.35rem)] font-medium leading-[1.01] tracking-[-0.052em]">{title}</h1><p className="mt-8 max-w-[58ch] text-pretty text-lg leading-8 text-[#40554c] sm:text-xl">{intro}</p>{cta ? <div className="mt-10 flex flex-wrap items-center gap-5"><Link href="/contact" className="ssg-primary-button group">{cta}<ArrowRight aria-hidden className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" weight="bold" /></Link>{meta ? <p className="max-w-sm text-sm leading-6 text-[#5b6c65]">{meta}</p> : null}</div> : meta ? <p className="mt-8 max-w-sm text-sm leading-6 text-[#5b6c65]">{meta}</p> : null}</div></div>
    <div className="relative min-h-[400px] overflow-hidden bg-[#173d2f] lg:min-h-full">{image ? <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover grayscale-[18%]" /> : <div className="absolute inset-0 grid place-items-center p-6 sm:p-10"><CrossBorderMap locale={mapLocale} /></div>}{note ? <div className="absolute bottom-0 left-0 max-w-md bg-[#f3f0e9] p-6 text-base leading-7 text-[#31483f] sm:p-8"><span className="mb-3 block text-xs font-bold tracking-[.14em] text-[#9a5d2d]">FIELD NOTE</span>{note}</div> : null}</div>
  </div></header>;
}

export function ContentSection({ id, eyebrow, title, intro, tone = 'paper', children }: { id?: string; eyebrow?: string; title: string; intro?: string; tone?: 'paper' | 'sage' | 'sand' | 'dark'; children: ReactNode }) {
  const backgrounds = { paper: 'bg-[#fbfaf6]', sage: 'bg-[#e9efea]', sand: 'bg-[#f3f0e9]', dark: 'bg-[#173d2f] text-white' }; const dark = tone === 'dark';
  return <section id={id} className={`scroll-mt-24 border-b border-[#173d2f]/10 ${backgrounds[tone]}`}><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="grid gap-6 lg:grid-cols-12"><div className="lg:col-span-4">{eyebrow ? <p className={`text-xs font-bold tracking-[.15em] ${dark ? 'text-[#e0b47b]' : 'text-[#9a5d2d]'}`}>{eyebrow}</p> : null}</div><div className="lg:col-span-8"><h2 className={`max-w-[22ch] text-balance text-3xl font-medium leading-[1.08] tracking-[-.036em] sm:text-5xl ${dark ? 'text-white' : 'text-[#10251d]'}`}>{title}</h2>{intro ? <p className={`mt-5 max-w-[64ch] text-pretty text-lg leading-8 ${dark ? 'text-[#d7e3dc]' : 'text-[#52665e]'}`}>{intro}</p> : null}</div></div><div className="mt-12 lg:mt-16">{children}</div></div></section>;
}

export function EditorialMedia({ src, alt, caption }: { src: string; alt: string; caption?: string; align?: 'left' | 'right' }) { return <figure><div className="relative aspect-[16/10] overflow-hidden bg-[#dfe6e0]"><Image src={src} alt={alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" /></div>{caption ? <figcaption className="mt-4 text-sm leading-6 text-[#5b6c65]">{caption}</figcaption> : null}</figure>; }
export function MediaSplit({ media, children, reverse = false }: { media: ReactNode; children: ReactNode; reverse?: boolean }) { return <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"><div className={reverse ? 'lg:order-2 lg:col-span-5' : 'lg:col-span-5'}>{children}</div><div className={reverse ? 'lg:order-1 lg:col-span-7' : 'lg:col-span-7'}>{media}</div></div>; }
export function IconCardGrid({ items }: { items: readonly { id?: string; title: string; body: string; icon: ElementType }[] }) { return <div className="divide-y divide-[#173d2f]/15 border-y border-[#173d2f]/15">{items.map((item) => { const Icon = item.icon; return <article id={item.id} key={item.title} className="grid gap-5 py-8 md:grid-cols-[56px_1fr_1.35fr] md:items-start"><Icon aria-hidden className="h-7 w-7 text-[#2b6a53]" /><h3 className="text-xl font-semibold tracking-[-.02em] text-[#173d2f]">{item.title}</h3><p className="leading-7 text-[#53675f]">{item.body}</p></article>; })}</div>; }
export function NumberedList({ items }: { items: readonly string[] }) { return <ol className="divide-y divide-[#173d2f]/15 border-y border-[#173d2f]/15">{items.map((item, index) => <li key={item} className="grid gap-4 py-7 sm:grid-cols-[72px_1fr]"><span className="font-mono text-sm text-[#9a5d2d]">0{index + 1}</span><span className="max-w-[68ch] text-pretty text-lg leading-8 text-[#31483f]">{item}</span></li>)}</ol>; }
export function BulletList({ items }: { items: readonly string[] }) { return <ul className="grid gap-4">{items.map((item) => <li key={item} className="flex gap-4 text-pretty text-lg leading-8 text-[#31483f]"><CheckCircle aria-hidden className="mt-[.3rem] h-6 w-6 shrink-0 text-[#2b6a53]" /><span>{item}</span></li>)}</ul>; }
export function QuotePanel({ quote, attribution }: { quote: string; attribution: string }) { return <blockquote className="border-l-2 border-[#d9b27c] py-3 pl-7"><Quotes aria-hidden className="h-8 w-8 text-[#d9b27c]" weight="fill" /><p className="mt-6 text-pretty text-2xl font-medium leading-9 tracking-[-.02em] text-[#173d2f]">{quote}</p><footer className="mt-6 text-sm text-[#5b6c65]">{attribution}</footer></blockquote>; }
export function PrimaryCTA({ title, body, label }: { title: string; body: string; label: string }) { return <section className="bg-[#173d2f] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:items-end lg:py-24"><div className="lg:col-span-8"><p className="text-xs font-bold tracking-[.15em] text-[#e0b47b]">A HUMAN NEXT STEP</p><h2 className="mt-5 max-w-[19ch] text-balance text-3xl font-medium tracking-[-.035em] text-white sm:text-5xl">{title}</h2><p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-[#d7e3dc]">{body}</p></div><div className="lg:col-span-4 lg:text-right"><Link href="/contact" className="inline-flex min-h-12 items-center border-b border-[#e0b47b] py-3 font-bold text-white transition-colors hover:text-[#f0c995]">{label}<ArrowRight className="ml-3 h-4 w-4" weight="bold" /></Link></div></div></section>; }
