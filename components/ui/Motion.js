import RevealBase from './Reveal';

export const Reveal = ({ children, className = '', threshold }) => (
  <RevealBase className={className} threshold={threshold}>
    {children}
  </RevealBase>
);

export const HoverLift = ({ children, className = '' }) => (
  <div
    className={`transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none ${className}`.trim()}
  >
    {children}
  </div>
);
