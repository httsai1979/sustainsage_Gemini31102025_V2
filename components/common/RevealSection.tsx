import type { ReactNode } from 'react';

import Reveal from '@/components/ui/Reveal';

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
};

export default function RevealSection({ children, className = '', delay = 0, from }: RevealSectionProps) {
  return (
    <Reveal delay={delay} className={className} from={from}>
      {children}
    </Reveal>
  );
}
