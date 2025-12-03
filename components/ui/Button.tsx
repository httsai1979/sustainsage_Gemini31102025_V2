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
    'bg-[var(--color-brand-sage)] text-white shadow-lg shadow-emerald-900/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-sage)]',
  secondary:
    'bg-white text-[var(--color-brand-sage)] ring-1 ring-inset ring-[color:var(--color-brand-sage)]/40 hover:bg-primary-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-sage)]',
  ghost:
    'text-[var(--color-brand-sage)] ring-1 ring-transparent hover:bg-primary/10 hover:ring-[color:var(--color-brand-sage)]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-sage)]/70',
};

const SIZE_MAP: Record<ButtonSizes, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-3.5 text-lg',
};

const BASE_CLASS = 'inline-flex items-center justify-center rounded-pill font-semibold tracking-tight transition duration-300 focus-visible:ring-0';

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
