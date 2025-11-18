import PropTypes from 'prop-types';

import { getIconComponent } from '@/components/icons/map';
import cn from '@/lib/cn';

export default function IconBadge({ icon, className }) {
  const Icon = getIconComponent(icon);

  if (!Icon) {
    return null;
  }

  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary/20 text-brand-sage shadow-soft',
        className
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}

IconBadge.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
};

IconBadge.defaultProps = {
  icon: undefined,
  className: undefined,
};
