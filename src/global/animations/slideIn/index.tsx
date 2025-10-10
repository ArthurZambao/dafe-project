'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, ReactNode } from 'react';

interface SlideInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  from?: 'right' | 'left' | 'bottom';
  triggerOnView?: boolean; // <- nova prop
}

export function SlideIn({
  children,
  delay = 0,
  duration = 1.3,
  className = '',
  once = true,
  from = 'right',
  triggerOnView = true, // <- por padrão, anima quando entra na tela
}: SlideInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '0px' });
  const controls = useAnimation();

  const initialPosition = {
    x: from === 'left' ? '-20%' : from === 'right' ? '20%' : 0,
    y: from === 'bottom' ? '20%' : 0,
  };

  useEffect(() => {
    if (triggerOnView) {
      if (inView) {
        controls.start({
          x: 0,
          y: 0,
          opacity: 1,
          transition: { duration, delay, ease: 'easeOut' },
        });
      }
    } else {
      // Se triggerOnView for falso, anima direto
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration, delay, ease: 'easeOut' },
      });
    }
  }, [inView, triggerOnView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: initialPosition.x, y: initialPosition.y, opacity: 0 }}
      animate={controls}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
}
