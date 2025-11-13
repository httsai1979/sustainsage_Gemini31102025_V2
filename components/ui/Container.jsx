import cn from '@/lib/cn';
import PropTypes from 'prop-types';

export default function Container({ children, className = '' }) {
  return <div className={cn('ssg-container', className)}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
