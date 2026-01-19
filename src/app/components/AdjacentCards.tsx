'use client';

import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  customGradient: string;
}

interface AdjacentCardsProps {
  features: Feature[];
  activeIndex: number;
  onFeatureClick: (index: number) => void;
  direction: 'next' | 'prev';
}

export function AdjacentCards({ features, activeIndex, onFeatureClick, direction }: AdjacentCardsProps) {
  const totalFeatures = features.length;

  // Calculate previous and next indices with wraparound
  const previousIndex = (activeIndex - 1 + totalFeatures) % totalFeatures;
  const nextIndex = (activeIndex + 1) % totalFeatures;

  const previousFeature = features[previousIndex];
  const nextFeature = features[nextIndex];

  return (
    <>
      {/* Previous Card (Left) - Hidden on mobile */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`prev-${previousIndex}`}
          className="hidden lg:block absolute left-[2%] xl:left-[4%] 2xl:left-[6%] top-1/2 -translate-y-1/2 z-5 cursor-pointer"
          custom={direction}
          initial={{ opacity: 0, x: direction === 'next' ? 400 : -400 }}
          animate={{ opacity: 0.6, x: 0 }}
          exit={{ opacity: 0, x: direction === 'next' ? -400 : 400 }}
          whileHover={{
            scale: 1.12,
            opacity: 1.0,
            filter: "blur(0px) brightness(1.15)",
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          onClick={() => onFeatureClick(previousIndex)}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            filter: 'blur(2px)',
          }}
        >
          <AdjacentCard feature={previousFeature} />
        </motion.div>
      </AnimatePresence>

      {/* Next Card (Right) - Hidden on mobile */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`next-${nextIndex}`}
          className="hidden lg:block absolute right-[2%] xl:right-[4%] 2xl:right-[6%] top-1/2 -translate-y-1/2 z-5 cursor-pointer"
          custom={direction}
          initial={{ opacity: 0, x: direction === 'next' ? 400 : -400 }}
          animate={{ opacity: 0.6, x: 0 }}
          exit={{ opacity: 0, x: direction === 'next' ? -400 : 400 }}
          whileHover={{
            scale: 1.12,
            opacity: 1.0,
            filter: "blur(0px) brightness(1.15)",
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          onClick={() => onFeatureClick(nextIndex)}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            filter: 'blur(2px)',
          }}
        >
          <AdjacentCard feature={nextFeature} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function AdjacentCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div
      className="w-[220px] lg:w-[260px] xl:w-[300px] 2xl:w-[340px] rounded-3xl border-2 border-black/10 shadow-xl p-4 lg:p-5 xl:p-6 bg-white"
      style={{
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
        {/* Icon with gradient background */}
        <motion.div
          className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 rounded-2xl flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
          whileHover={{
            rotate: 360,
            scale: 1.15,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <Icon className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 text-white" strokeWidth={2} />
        </motion.div>

        {/* Title */}
        <h3 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-black">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-xs lg:text-sm xl:text-base 2xl:text-lg text-black/70 leading-relaxed line-clamp-3">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
