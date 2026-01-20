'use client';

import { motion } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

export function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate random positions only on client to avoid hydration mismatch
  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 6,
    }));
  }, [isMounted]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#42143d]">
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />

      {/* Animated gradient orbs - toned down */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-black/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.06, 0.03],
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Floating particles - reduced */}
      {isMounted && particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.4, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)]" />
    </div>
  );
}
