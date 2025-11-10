import PropTypes from 'prop-types';

const ICON_PATHS = {
  target: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 7.5v3" />
      <path d="M9 12h3" />
    </>
  ),
  compass: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  clock: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5l3 1.5" />
    </>
  ),
  handshake: () => (
    <>
      <path d="M5 10.5 8.5 7H12l3 3h4" />
      <path d="m5 10.5 4.5 4.5L12 13l3 2.5 2.5-2" />
      <path d="M7.5 15.5 6 17" />
      <path d="M15 15.5 16.5 17" />
    </>
  ),
  privacy: () => (
    <>
      <path d="M12 3 5.5 6v5c0 4.1 2.8 7.8 6.5 9 3.7-1.2 6.5-4.9 6.5-9V6L12 3z" />
      <rect x="9.5" y="11" width="5" height="4.5" rx="1.5" />
      <path d="M12 11V9.5a1.5 1.5 0 0 1 3 0V11" />
    </>
  ),
  consent: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  note: () => (
    <>
      <path d="M7 4.5h7.5L19 9v10.5a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-15a.5.5 0 0 1 .5-.5z" />
      <path d="M14.5 4.5v4a.5.5 0 0 0 .5.5h4" />
      <path d="M9 12h6" />
      <path d="M9 15h6" />
    </>
  ),
  book: () => (
    <>
      <path d="M5 5.5c1.8-.5 3.7-.5 5.5 0v13.5c-1.8-.5-3.7-.5-5.5 0V5.5z" />
      <path d="M18.5 5.5c-1.8-.5-3.7-.5-5.5 0v13.5c1.8-.5 3.7-.5 5.5 0V5.5z" />
    </>
  ),
  mail: () => (
    <>
      <rect x="4" y="6" width="16" height="12" rx="1.5" />
      <path d="m5 7 7 6 7-6" />
    </>
  ),
  phone: () => (
    <>
      <path d="M8 4h2.2a1.5 1.5 0 0 1 1.5 1.3l.3 2a1.5 1.5 0 0 1-.4 1.2L10.5 10a11 11 0 0 0 3.5 3.5l1.5-1.1a1.5 1.5 0 0 1 1.2-.4l2 .3a1.5 1.5 0 0 1 1.3 1.5V18a2 2 0 0 1-2.2 2 15 15 0 0 1-13-13A2 2 0 0 1 8 4z" />
    </>
  ),
  calendar: () => (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  arrow: () => (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
};

export default function Icon({ name, className, title, decorative, strokeWidth }) {
  const SvgContent = ICON_PATHS[name];

  if (!SvgContent) {
    return null;
  }

  const isDecorative = decorative ?? !title;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={isDecorative ? 'presentation' : 'img'}
      aria-hidden={isDecorative ? 'true' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <SvgContent />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICON_PATHS)).isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  decorative: PropTypes.bool,
  strokeWidth: PropTypes.number,
};

Icon.defaultProps = {
  className: 'h-6 w-6',
  title: undefined,
  decorative: true,
  strokeWidth: 1.5,
};
