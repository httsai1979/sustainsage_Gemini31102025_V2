import PropTypes from 'prop-types';
import type { ReactNode } from 'react';

import Prose from './Prose';
import SectionContainer from './SectionContainer';
import SectionHeading from './SectionHeading';
import cn from '@/lib/cn';

export interface PageSectionProps {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  prose?: boolean;
  background?: 'default' | 'paper' | 'pattern' | 'grid' | 'soft';
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
  const backgroundMap = {
    default: 'bg-transparent',
    paper: 'bg-white',
    pattern: 'bg-white relative overflow-hidden',
    grid: 'bg-paper relative overflow-hidden',
    soft: 'bg-soft-gradient',
  };

  return (
    <SectionContainer id={id} className={cn(backgroundMap[background], className)}>
      {background === 'pattern' && <div className="bg-dot-pattern absolute inset-0 pointer-events-none" />}
      {background === 'grid' && <div className="bg-grid-pattern absolute inset-0 pointer-events-none" />}
      <div className="relative z-10">
        {(eyebrow || title || lead) && <SectionHeading eyebrow={eyebrow} title={title} subtitle={lead} align={background === 'soft' ? 'center' : 'left'} />}
        {prose ? <Prose className="mt-8 text-ink/80">{children}</Prose> : <div className="mt-10">{children}</div>}
      </div>
    </SectionContainer>
  );
}

PageSection.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  lead: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prose: PropTypes.bool,
  background: PropTypes.oneOf(['default', 'paper', 'pattern', 'grid', 'soft']),
  children: PropTypes.node,
};
