import Image from 'next/image';
import PropTypes from 'prop-types';

import cn from '@/lib/cn';

export default function ResponsiveImage({
  src,
  alt = '',
  width = 1200,
  height = 800,
  className = '',
  priority = false,
}) {
  if (!src) return null;
  return (
    <div className={cn('overflow-hidden rounded-2xl bg-white shadow-card', className)}>
      <Image src={src} alt={alt} width={width} height={height} priority={priority} className="h-full w-full object-cover" />
    </div>
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  priority: PropTypes.bool,
};
