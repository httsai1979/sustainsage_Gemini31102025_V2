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
  background?: 'default' | 'paper';
}

export default function PageSection({
  id,
  className,
  eyebrow,
  title,
  lead,
  children,
  prose = false,
  background = 'default',
}: PageSectionProps) {
  const backgroundClass = background === 'paper' ? 'bg-paper' : '';
  return (
    <section id={id} className={cn('ssg-section', backgroundClass, className)}>
      <div className="ssg-container">
        {(eyebrow || title || lead) && (
          <header className="mb-10 max-w-3xl space-y-3">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">{eyebrow}</p>
            ) : null}
            {title ? <H2 className="text-ink">{title}</H2> : null}
            {lead ? <p className="text-base leading-7 text-ink/80">{lead}</p> : null}
          </header>
        )}
        {prose ? <Prose className="text-ink/80">{children}</Prose> : children}
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
  background: PropTypes.oneOf(['default', 'paper']),
  children: PropTypes.node,
};
