import PropTypes from 'prop-types';
import type { ReactNode } from 'react';

import cn from '@/lib/cn';

import { H2 } from './H';
import Prose from './Prose';

interface PageSectionProps {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  prose?: boolean;
}

export default function PageSection({
  id,
  className,
  eyebrow,
  title,
  lead,
  children,
  prose = false,
}: PageSectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20', className)}>
      <div className="mx-auto max-w-7xl px-6">
        {(eyebrow || title || lead) && (
          <header className="mb-10 space-y-4">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">{eyebrow}</p>
            ) : null}
            {title ? <H2>{title}</H2> : null}
            {lead ? <p className="text-base leading-7 text-slate-600">{lead}</p> : null}
          </header>
        )}
        {prose ? <Prose>{children}</Prose> : children}
      </div>
    </section>
  );
}

PageSection.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  lead: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prose: PropTypes.bool,
  children: PropTypes.node,
};
