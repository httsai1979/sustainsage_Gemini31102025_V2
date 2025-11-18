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

interface HeroShellProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  description?: Array<string | ReactNode> | string | ReactNode;
  chips?: Array<string>;
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
        'relative overflow-hidden bg-gradient-to-b from-white via-background to-background py-20 sm:py-24 lg:py-28',
        className,
      )}
    >
      <div className="ssg-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
        <Reveal>
          <div className="space-y-6">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary/70">{eyebrow}</p>
            ) : null}
            {title ? <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">{title}</h1> : null}
            {subtitle ? (
              <p className="text-lg leading-relaxed text-ink/80">{subtitle}</p>
            ) : null}
            {paragraphs.length ? (
              <div className="space-y-3 text-base leading-relaxed text-ink/70">
                {paragraphs.map((paragraph, index) => (
                  <p key={`hero-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {chips.length ? (
              <div className="flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
            {(primaryCta?.href || secondaryCta?.href) && (
              <div className="flex flex-wrap gap-3">
                {primaryCta?.href ? (
                  <Button href={primaryCta.href}>{primaryCta.label ?? 'Book a 20-minute chat'}</Button>
                ) : null}
                {secondaryCta?.href ? (
                  <Button href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label ?? 'Learn more'}
                  </Button>
                ) : null}
              </div>
            )}
            {meta ? <p className="text-sm text-ink/60">{meta}</p> : null}
            {notice ? (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">{notice}</p>
            ) : null}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-4 shadow-[0_35px_100px_rgba(15,23,42,0.15)]">
            {image?.src ? (
              <Image
                src={image.src}
                alt={image?.alt ?? ''}
                width={960}
                height={960}
                sizes="(min-width: 1024px) 420px, 90vw"
                className="h-full w-full rounded-[24px] object-cover"
                priority
              />
            ) : (
              <div className="h-[320px] w-full rounded-[24px] bg-gradient-to-br from-primary/40 via-primary/20 to-transparent" />
            )}
            <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-tr from-primary/5 via-transparent to-white/60" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
