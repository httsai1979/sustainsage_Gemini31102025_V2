import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function ListWithDots({ items, className }) {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <ul className={cn('mt-3 space-y-2 text-sm leading-relaxed text-slate-700', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

ListWithDots.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

ListWithDots.defaultProps = {
  items: undefined,
  className: undefined,
};
