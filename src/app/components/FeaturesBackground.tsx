'use client';

import { motion } from 'motion/react';

export function FeaturesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {/* SVG Grid Layer 1 - 80px spacing */}
      <svg className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <pattern
            id="grid-pattern-1"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
              animate={{
                d: [
                  "M 80 0 L 0 0 0 80",
                  "M 83 0 L 0 3 3 80",
                  "M 80 0 L 0 0 0 80",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-1)" />
      </svg>

      {/* SVG Grid Layer 2 - 60px spacing with offset timing */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <pattern
            id="grid-pattern-2"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="1"
              animate={{
                d: [
                  "M 60 0 L 0 0 0 60",
                  "M 58 0 L 0 2 2 58",
                  "M 63 0 L 0 -2 -2 63",
                  "M 60 0 L 0 0 0 60",
                ],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-2)" />
      </svg>

      {/* Animated black gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 40, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-black/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
          x: [0, -35, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-black/6 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.06, 0.1, 0.06],
          x: [0, 25, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute top-3/4 left-1/2 w-64 h-64 bg-black/7 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.07, 0.11, 0.07],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      <motion.div
        className="absolute top-1/3 left-2/3 w-80 h-80 bg-black/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.05, 0.09, 0.05],
          x: [0, 20, 0],
          y: [0, -35, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Sparkles - floating particles */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-black rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80 - Math.random() * 40, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1 + Math.random() * 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Larger sparkles */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute bg-black rounded-full"
          style={{
            width: `${2 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Horizontal floating particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`horizontal-${i}`}
          className="absolute w-1 h-1 bg-black rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 100 + Math.random() * 50, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"
        animate={{
          top: ['-2px', '100%'],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Second horizontal scanning line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent"
        animate={{
          top: ['-2px', '100%'],
          opacity: [0, 0.25, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          delay: 4
        }}
      />

      {/* Vertical scanning line */}
      <motion.div
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-black/20 to-transparent"
        animate={{
          left: ['-2px', '100%'],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />

      {/* Diagonal scanning line */}
      <motion.div
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-black/15 to-transparent origin-center"
        style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }}
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 0.25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay: 3
        }}
      />

      {/* Diagonal scanning line (opposite direction) */}
      <motion.div
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-black/15 to-transparent origin-center"
        style={{ transform: 'rotate(-45deg)', transformOrigin: 'center' }}
        animate={{
          x: ['-100%', '200%'],
          opacity: [0, 0.25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
      />

      {/* Animated rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute border border-black/10 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            width: '100px',
            height: '100px',
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}

      {/* Pulsing dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-black/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,0,0,0.04),transparent_70%)]" />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.03]" />
    </div>
  );
}
