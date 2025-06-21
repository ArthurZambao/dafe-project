'use client';

import { motion } from 'framer-motion';

interface AnimatedContentProps extends React.PropsWithChildren {
  inverse?: boolean;
}

export function AnimatedContent({ children, inverse }: Readonly<AnimatedContentProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: inverse ? -50 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: inverse ? 50 : -50 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}