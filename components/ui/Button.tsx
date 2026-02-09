import Link from 'next/link';
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import cn from '@/lib/cn';

type ButtonVariants = 'primary' | 'secondary' | 'ghost';
type ButtonSizes = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  className?: string;
  children: ReactNode;
};

type LinkProps = BaseProps & {
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkProps | NativeButtonProps;

const VARIANT_MAP: Record<ButtonVariants, string> = {
  primary:
    'bg-[var(--color-brand-sage)] text-white shadow-lg shadow-emerald-900/10 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/20 active:translate-y-0 active:shadow-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-sage)] relative overflow-hidden',
  secondary:
    'bg-white text-[var(--color-brand-sage)] ring-1 ring-[color:var(--color-brand-sage)]/20 hover:bg-[var(--color-brand-sage)]/5 hover:ring-[color:var(--color-brand-sage)]/40 hover:shadow-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-sage)]',
  ghost:
    'text-[var(--color-brand-sage)] hover:bg-[var(--color-brand-sage)]/5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-brand-sage)]/50',
};

const SIZE_MAP: Record<ButtonSizes, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-8 py-4 text-lg',
};

const BASE_CLASS = 'inline-flex items-center justify-center rounded-pill font-semibold tracking-tight outline-none select-none active:scale-[0.98] transition-all duration-300';

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, href, ...rest }, ref) => {
    const classes = cn(BASE_CLASS, VARIANT_MAP[variant], SIZE_MAP[size], className);

    if (href) {
      return (
        <Link href={href} ref={ref as Ref<HTMLAnchorElement>} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
