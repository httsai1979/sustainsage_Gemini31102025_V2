import type { ReactNode } from 'react';

import cn from '@/lib/cn';

import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
  if (!eyebrow && !title && !subtitle) {
    return null;
  }

  return (
    <Reveal>
      <div
        className={cn(
          'max-w-3xl space-y-4',
          align === 'center' && 'mx-auto text-center',
        )}
      >
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">{eyebrow}</p>
        ) : null}
        {title ? <h2 className="text-3xl font-semibold leading-tight text-ink md:text-4xl">{title}</h2> : null}
        {subtitle ? (
          <p className="text-base leading-relaxed text-ink/70">{subtitle}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
