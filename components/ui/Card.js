/**
 * Reusable card container used across the marketing pages.
 */
const Card = ({ children, hoverEffect = false, className = '' }) => {
  const classes = ['card', hoverEffect ? 'card-hover' : null, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

export default Card;