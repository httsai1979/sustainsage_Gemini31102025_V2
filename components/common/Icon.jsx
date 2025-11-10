import Image from 'next/image';
import PropTypes from 'prop-types';

const AVAILABLE_ICONS = [
  'target',
  'compass',
  'clock',
  'handshake',
  'privacy',
  'consent',
  'note',
  'book',
  'mail',
  'phone',
  'calendar',
  'arrow',
];

export default function Icon({ name, className, alt, decorative }) {
  if (!name || !AVAILABLE_ICONS.includes(name)) {
    return null;
  }

  const isDecorative = decorative ?? !alt;
  const resolvedAlt = isDecorative ? '' : alt;

  return (
    <Image
      src={`/icons/${name}.svg`}
      alt={resolvedAlt}
      width={24}
      height={24}
      className={className}
      aria-hidden={isDecorative ? 'true' : undefined}
      role={isDecorative ? undefined : 'img'}
      loading="lazy"
    />
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(AVAILABLE_ICONS).isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
  decorative: PropTypes.bool,
};

Icon.defaultProps = {
  className: 'h-6 w-6',
  alt: undefined,
  decorative: true,
};
