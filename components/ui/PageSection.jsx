import clsx from 'clsx';
import PropTypes from 'prop-types';

import { H2 } from './H';
import Prose from './Prose';

export default function PageSection({
  id,
  className,
  eyebrow,
  title,
  lead,
  children,
  prose = false,
}) {
  return (
    <section id={id} className={clsx('py-16 sm:py-20', className)}>
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
