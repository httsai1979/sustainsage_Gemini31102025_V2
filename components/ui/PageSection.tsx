import PropTypes from 'prop-types';
import type { ReactNode } from 'react';

import Prose from './Prose';
import SectionContainer from './SectionContainer';
import SectionHeading from './SectionHeading';

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
  return (
    <SectionContainer id={id} className={className} background={background === 'paper' ? 'muted' : 'default'}>
      {(eyebrow || title || lead) && <SectionHeading eyebrow={eyebrow} title={title} subtitle={lead} />}
      {prose ? <Prose className="mt-8 text-ink/80">{children}</Prose> : <div className="mt-10">{children}</div>}
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
  background: PropTypes.oneOf(['default', 'paper']),
  children: PropTypes.node,
};
