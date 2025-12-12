'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number; 
}

export function FadeInUp({ children, delay = 0 }: FadeInUpProps) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(true);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={start ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}
