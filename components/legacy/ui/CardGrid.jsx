import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function CardGrid({ children, columns = { base: 1, md: 2, lg: 3 }, className }) {
  const classes = ['grid gap-6'];

  Object.entries(columns).forEach(([breakpoint, cols]) => {
    if (!cols) return;
    if (breakpoint === 'base') {
      classes.push(`grid-cols-${cols}`);
      return;
    }
    classes.push(`${breakpoint}:grid-cols-${cols}`);
  });

  return <div className={cn(classes.join(' '), className)}>{children}</div>;
}

CardGrid.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.shape({
    base: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }),
  className: PropTypes.string,
};
