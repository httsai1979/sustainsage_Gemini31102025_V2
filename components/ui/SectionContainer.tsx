import type { ReactNode } from 'react';

import cn from '@/lib/cn';

interface SectionContainerProps {
  id?: string;
  className?: string;
  background?: 'default' | 'muted';
  children: ReactNode;
}

export default function SectionContainer({ id, className, background = 'default', children }: SectionContainerProps) {
  const backgroundClass =
    background === 'muted'
      ? 'bg-gradient-to-b from-background via-white to-background'
      : 'bg-transparent';

  return (
    <section id={id} className={cn('ssg-section', backgroundClass, className)}>
      <div className="ssg-container">{children}</div>
    </section>
  );
}
