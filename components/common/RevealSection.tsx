import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import cn from '@/lib/cn';

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const clampDelay = (value: number) => {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), 0.6);
};

export default function RevealSection({ children, className = '', delay = 0 }: RevealSectionProps) {
  const [hasShown, setHasShown] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      setHasShown(true);
    }
  }, [inView]);

  const transitionDelay = useMemo(() => `${clampDelay(delay)}s`, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'translate-y-6 opacity-0 transition-all duration-500 ease-out will-change-transform',
        hasShown && 'translate-y-0 opacity-100',
        className,
      )}
      style={{ transitionDelay }}
    >
      {children}
    </div>
  );
}
