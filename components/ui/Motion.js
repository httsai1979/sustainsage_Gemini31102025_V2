import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 12 }) {
  const reduce = useReducedMotion();
  const initial = reduce ? {} : { opacity: 0, y };
  const animate = reduce ? {} : { opacity: 1, y: 0 };
  return (
    <motion.div initial={initial} whileInView={animate} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 0.45, delay }}>
      {children}
    </motion.div>
  );
}

export function HoverLift({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;
  return <motion.div whileHover={{ y: -4 }} whileTap={{ y: 0 }}>{children}</motion.div>;
}
