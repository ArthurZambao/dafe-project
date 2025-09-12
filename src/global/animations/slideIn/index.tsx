'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  from?: 'right' | 'left' | 'bottom';
}

export function SlideIn({
  children,
  delay = 0,
  duration = 1.3,
  className = '',
  once = true,
  from = 'right',
}: SlideInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '0px' });
  const controls = useAnimation();

  const initialPosition = {
    x: from === 'left' ? -300 : from === 'right' ? 300 : 0,
    y: from === 'bottom' ? 300 : 0,
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        },
      });
    }
  }, [inView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: initialPosition.x, y: initialPosition.y, opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
