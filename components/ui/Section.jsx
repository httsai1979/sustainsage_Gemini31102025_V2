import cn from '@/lib/cn';
import PropTypes from 'prop-types';

export default function Section({ children, className = '' }) {
  return <section className={cn('ssg-section', className)}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
