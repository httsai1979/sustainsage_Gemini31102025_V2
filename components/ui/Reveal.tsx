import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import cn from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
}

const TRANSFORM_MAP: Record<NonNullable<RevealProps['from']>, string> = {
  bottom: 'translate3d(0, 32px, 0)',
  left: 'translate3d(-32px, 0, 0)',
  right: 'translate3d(32px, 0, 0)',
};

export default function Reveal({ children, className, delay = 0, from = 'bottom' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const transitionDelay = delay > 0 ? `${delay}s` : undefined;
  const hiddenTransform = TRANSFORM_MAP[from] ?? TRANSFORM_MAP.bottom;

  return (
    <div
      ref={ref}
      className={cn(
        'will-change-transform transition duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none',
        isVisible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{
        transform: isVisible ? 'none' : hiddenTransform,
        transitionDelay,
      }}
    >
      {children}
    </div>
  );
}
