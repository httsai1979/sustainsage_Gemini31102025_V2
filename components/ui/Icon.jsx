import cn from '@/lib/cn';
import PropTypes from 'prop-types';

import { ICONS } from '@/components/icons/map';

const INLINE_ICONS = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  arrowright: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4.2 4.2M14.8 14.8 19 19M5 19l4.2-4.2M14.8 9.2 19 5" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8h.01M11 12h2v6h-2z" />
    </svg>
  ),
};

export default function Icon({ name = 'info', className } = {}) {
  if (!name) return null;
  const key = name.toLowerCase();
  const Component = ICONS[key];
  if (Component) {
    return (
      <Component
        className={cn('h-6 w-6 text-slate-600 sm:h-7 sm:w-7 sm:text-slate-700', className)}
        aria-hidden="true"
      />
    );
  }

  const InlineIcon = INLINE_ICONS[key] ?? INLINE_ICONS.info;
  if (!InlineIcon) return null;
  return (
    <span
      className={cn('inline-flex h-6 w-6 text-slate-600 sm:h-7 sm:w-7 sm:text-slate-700', className)}
      aria-hidden="true"
    >
      {InlineIcon}
    </span>
  );
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};
