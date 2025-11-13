import PropTypes from 'prop-types';
import type { ElementType, ReactNode } from 'react';

import cn from '@/lib/cn';

interface ProseProps {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export default function Prose({ as: Component = 'div', className, children }: ProseProps) {
  return (
    <Component className={cn('typography prose-base space-y-5', className)}>
      {children}
    </Component>
  );
}

Prose.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
