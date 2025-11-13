import PropTypes from 'prop-types';
import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';

import cn from '@/lib/cn';

const variants = {
  h1: 'text-[32px] leading-[1.25] font-bold sm:text-[40px]',
  h2: 'text-[24px] leading-[1.35] font-semibold text-slate-900',
  h3: 'text-[20px] leading-[1.4] font-semibold text-slate-900',
  h4: 'text-[18px] leading-[1.45] font-semibold text-slate-900',
};

type HeadingTag = keyof typeof variants;

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

function createHeading(tag: HeadingTag) {
  const variant = variants[tag];
  return forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    { as: Component = tag, className, children, ...props },
    ref,
  ) {
    return (
      <Component
        ref={ref}
        className={cn(
          'text-slate-900 tracking-tight',
          variant,
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  });
}

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');

const headingPropTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

H1.propTypes = headingPropTypes;
H2.propTypes = headingPropTypes;
H3.propTypes = headingPropTypes;
H4.propTypes = headingPropTypes;
