'use client';

import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020617]">
      {/* Depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f172a,transparent_55%),linear-gradient(120deg,#0f172a,#082f49,#020617)]" />

      {/* Animated aurora bands */}
      <motion.div
        className="absolute -top-1/3 left-1/4 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-400/30 via-sky-500/10 to-transparent blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-emerald-300/20 via-cyan-300/10 to-transparent blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 30, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Starfield */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.2],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Diagonal mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_70%)]" />
    </div>
  );
}
