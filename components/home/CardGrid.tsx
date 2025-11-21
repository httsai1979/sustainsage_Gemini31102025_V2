import type { ReactNode } from 'react';

import RevealSection from '@/components/common/RevealSection';

type CardGridProps<T> = {
  items?: T[];
  columns?: 'two' | 'three' | 'four';
  className?: string;
  revealGroupSize?: number;
  renderCard: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string | number | null | undefined;
};

const COLUMN_CLASS_MAP: Record<NonNullable<CardGridProps<unknown>['columns']>, string> = {
  two: 'md:grid-cols-2',
  three: 'sm:grid-cols-2 lg:grid-cols-3',
  four: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export default function CardGrid<T>({
  items,
  columns = 'three',
  className,
  revealGroupSize,
  renderCard,
  getKey,
}: CardGridProps<T>) {
  const list = Array.isArray(items) ? items : [];
  const gridClassName = ['mt-8 grid grid-cols-1 gap-6', COLUMN_CLASS_MAP[columns], className]
    .filter(Boolean)
    .join(' ');
  const modulo = revealGroupSize ?? (columns === 'two' ? 2 : columns === 'four' ? 4 : 3);

  return (
    <div className={gridClassName}>
      {list.map((item, index) => (
        <RevealSection key={getKey?.(item, index) ?? index} delay={(index % modulo) * 0.08}>
          {renderCard(item, index)}
        </RevealSection>
      ))}
    </div>
  );
}
