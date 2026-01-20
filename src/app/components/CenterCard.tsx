'use client';

import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  customGradient: string;
}

interface CenterCardProps {
  feature: Feature;
  index: number;
  direction: 'next' | 'prev';
}

export function CenterCard({ feature, index, direction }: CenterCardProps) {
  const Icon = feature.icon;
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent));
  }, []);

  return (
    <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.div
        key={index}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        custom={direction}
        initial={{ opacity: 0, x: direction === 'next' ? 400 : -400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === 'next' ? -400 : 400 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(102, 126, 234, 0.4), 0 0 30px rgba(118, 75, 162, 0.3)",
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween",
        }}
        style={{
          willChange: 'transform, opacity',
        }}
      >
        <motion.div
          className="w-[300px] sm:w-[340px] md:w-[380px] lg:w-[440px] xl:w-[500px] 2xl:w-[560px] rounded-3xl border-2 shadow-2xl p-6 md:p-7 lg:p-8 xl:p-9 bg-white"
          style={{
            backdropFilter: isAndroid ? 'none' : 'blur(20px)',
            backgroundColor: isAndroid ? 'rgba(255, 255, 255, 0.98)' : undefined,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}
          whileHover={{
            borderColor: 'rgba(102, 126, 234, 0.5)',
          }}
        >
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-5 lg:space-y-6">
            {/* Icon with gradient background */}
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
              whileHover={{
                rotate: [0, -5, 5, -5, 0],
                scale: 1.1,
              }}
              transition={{
                rotate: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
                scale: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }
              }}
            >
              <Icon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white" strokeWidth={2} />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-black">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black/70 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
