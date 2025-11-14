import PropTypes from 'prop-types';

import cn from '@/lib/cn';

const BACKGROUND_MAP = {
  default: 'bg-transparent',
  muted: 'bg-slate-50',
  sage: 'bg-sustain-green/5',
};

export default function Section({
  as: Component = 'section',
  background = 'default',
  children,
  className = '',
  fullWidth = false,
  innerClassName = '',
}) {
  const wrapperClasses = cn(
    'py-16 md:py-20',
    BACKGROUND_MAP[background] ?? BACKGROUND_MAP.default,
    className,
  );

  const innerClasses = cn(fullWidth ? 'w-full' : 'ss-container', innerClassName);

  return (
    <Component className={wrapperClasses}>
      <div className={innerClasses}>{children}</div>
    </Component>
  );
}

Section.propTypes = {
  as: PropTypes.elementType,
  background: PropTypes.oneOf(['default', 'muted', 'sage']),
  children: PropTypes.node,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  innerClassName: PropTypes.string,
};
