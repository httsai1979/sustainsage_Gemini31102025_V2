import clsx from 'clsx';
import PropTypes from 'prop-types';

import { ICONS } from '@/components/icons/map';

export default function Icon({ name, className }) {
  if (!name) return null;
  const key = name.toLowerCase();
  const Component = ICONS[key];
  if (!Component) return null;
  return (
    <Component
      className={clsx('h-6 w-6 text-slate-600 sm:h-7 sm:w-7 sm:text-slate-700', className)}
      aria-hidden="true"
    />
  );
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};
