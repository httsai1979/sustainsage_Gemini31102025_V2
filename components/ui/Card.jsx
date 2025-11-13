import cn from '@/lib/cn';
import PropTypes from 'prop-types';

import { H3 } from './H';
import Prose from './Prose';

export default function Card({
  title,
  subtitle,
  children,
  className,
  footer,
  as: Component = 'article',
  icon = null,
  prose = false,
}) {
  return (
    <Component className={cn('rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm', className)}>
      <div className="space-y-4">
        {(icon || title || subtitle) && (
          <div className="space-y-2">
            {icon ? <div className="text-slate-700">{icon}</div> : null}
            {title ? <H3 className="text-slate-900">{title}</H3> : null}
            {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
          </div>
        )}
        {prose ? <Prose className="space-y-4">{children}</Prose> : children}
      </div>
      {footer ? <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600">{footer}</div> : null}
    </Component>
  );
}

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  className: PropTypes.string,
  footer: PropTypes.node,
  icon: PropTypes.node,
  prose: PropTypes.bool,
  as: PropTypes.elementType,
};
