import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function Prose({ as: Component = 'div', className, children }) {
  return (
    <Component className={clsx('typography prose-base space-y-5', className)}>
      {children}
    </Component>
  );
}

Prose.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};
