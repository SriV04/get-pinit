'use client';

import { motion } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

export function StarBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stars = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 48 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 0.8 + Math.random() * 1.4,
      duration: 2.5 + Math.random() * 4,
      delay: Math.random() * 10,
      maxOpacity: 0.25 + Math.random() * 0.55,
    }));
  }, [isMounted]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {isMounted && stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, star.maxOpacity, 0],
            scale: [0.6, 1.3, 0.6],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
