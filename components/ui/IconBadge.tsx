import type { ReactNode } from 'react';

import cn from '@/lib/cn';

import { getLucideIcon } from './icons';

interface IconBadgeProps {
  iconName?: string | null;
  icon?: ReactNode;
  className?: string;
  variant?: 'solid' | 'faint';
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP: Record<NonNullable<IconBadgeProps['size']>, string> = {
  sm: 'h-10 w-10 rounded-2xl',
  md: 'h-12 w-12 rounded-3xl',
  lg: 'h-14 w-14 rounded-[32px]',
};

export default function IconBadge({
  iconName,
  icon,
  className,
  variant = 'solid',
  size = 'md',
}: IconBadgeProps) {
  const LucideIcon = typeof iconName === 'string' ? getLucideIcon(iconName) : null;
  const content = icon ?? (LucideIcon ? <LucideIcon className="h-5 w-5" aria-hidden /> : null);

  if (!content) {
    return null;
  }

  const variantClass =
    variant === 'faint'
      ? 'bg-primary/5 text-primary'
      : 'bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 text-primary';

  return (
    <span
      className={cn('inline-flex items-center justify-center text-lg', SIZE_MAP[size], variantClass, className)}
      aria-hidden
    >
      {content}
    </span>
  );
}
