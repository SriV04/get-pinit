'use client';

import { motion } from 'motion/react';

export function FeaturesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fdfcfb]">
      {/* Purple blob - brand color #1A163D */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(26, 22, 61, 0.6), transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Terracotta blob - brand color */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[450px] h-[450px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(123, 52, 44, 0.5), transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Forest Green blob - brand color */}
      <motion.div
        className="absolute bottom-[15%] left-[20%] w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(28, 77, 33, 0.5), transparent 70%)'
        }}
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Purple blob (second) - brand color #1A163D */}
      <motion.div
        className="absolute bottom-[25%] right-[15%] w-[480px] h-[480px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(26, 22, 61, 0.5), transparent 70%)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -35, 0],
          y: [0, 35, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10" />

      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
    </div>
  );
}
