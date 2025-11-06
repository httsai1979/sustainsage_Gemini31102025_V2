import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 12 }) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? {} : { opacity: 0, y };
  const animate = reduceMotion ? {} : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({ children }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <>{children}</>;
  }

  return <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>{children}</motion.div>;
}
