import Image from 'next/image';
import type { ReactNode } from 'react';

import cn from '@/lib/cn';

import Button from './Button';
import Reveal from './Reveal';

interface HeroCta {
  href?: string;
  label?: string;
}

interface HeroImage {
  src?: string;
  alt?: string;
}

interface HeroStat {
  value: string;
  label: string;
}



interface HeroShellProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: Array<string | ReactNode> | string | ReactNode;
  chips?: Array<string>;
  stats?: Array<HeroStat>;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  meta?: ReactNode;
  notice?: ReactNode;
  image?: HeroImage;
  className?: string;
}

const toArray = (value?: HeroShellProps['description']) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
};

export default function HeroShell({
  eyebrow,
  title,
  subtitle,
  description,
  chips = [],
  stats = [],
  primaryCta,
  secondaryCta,
  meta,
  notice,
  image,
  className,
}: HeroShellProps) {
  const paragraphs = toArray(description).filter(Boolean);

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-soft-gradient pt-32 pb-24 md:pt-48 md:pb-36 lg:pt-56 lg:pb-48',
        className,
      )}
    >
      <div className="bg-grid-pattern absolute inset-0 pointer-events-none opacity-5" />
      <div className="ssg-container relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="max-w-2xl space-y-8">
              {eyebrow ? (
                <p className="ss-eyebrow text-primary font-bold">{eyebrow}</p>
              ) : null}
              {title ? <h1 className="text-5xl font-bold leading-[1.1] text-ink md:text-6xl lg:text-7xl">{title}</h1> : null}
              {subtitle ? (
                <p className="text-xl leading-relaxed text-ink/80 md:text-2xl">{subtitle}</p>
              ) : null}

              {chips.length ? (
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink/70 shadow-sm ring-1 ring-black/5"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              ) : null}

              {stats?.length ? (
                <div className="grid grid-cols-2 gap-4 border-t border-ink/10 pt-8 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-2xl font-bold text-ink sm:text-3xl">{stat.value}</p>
                      <p className="text-xs font-medium uppercase tracking-wider text-ink/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {(primaryCta?.href || secondaryCta?.href) && (
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {primaryCta?.href ? (
                    <Button href={primaryCta.href} size="lg">{primaryCta.label ?? 'Book a 20-minute chat'}</Button>
                  ) : null}
                  {secondaryCta?.href ? (
                    <Button href={secondaryCta.href} variant="secondary" size="lg">
                      {secondaryCta.label ?? 'Learn more'}
                    </Button>
                  ) : null}
                </div>
              )}

              <div className="space-y-2">
                {meta ? <p className="text-sm font-medium text-ink/50 uppercase tracking-widest">{meta}</p> : null}
                {notice ? (
                  <p className="text-xs font-semibold text-error/80 italic">{notice}</p>
                ) : null}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-square w-full max-w-xl mx-auto lg:ml-auto">
              {/* Decorative blobs */}
              <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-accent-sage/10 blur-3xl animate-float" />

              <div className="relative h-full w-full overflow-hidden rounded-[48px] border-8 border-white/50 bg-white shadow-2xl">
                {image?.src ? (
                  <Image
                    src={image.src}
                    alt={image?.alt ?? ''}
                    fill
                    sizes="(min-width: 1024px) 600px, 90vw"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-primary/5 to-white text-ink/20">
                    <span className="text-9xl font-bold opacity-20">SS</span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
