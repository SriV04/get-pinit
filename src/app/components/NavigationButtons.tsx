"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Navigation buttons for manual carousel control
 * Provides left/right arrow buttons to rotate the carousel
 */
export function NavigationButtons({ onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <>
      {/* Left arrow button */}
      <motion.button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30
                   flex items-center justify-center
                   focus:outline-none"
        onClick={onPrevious}
        whileHover={{ scale: 1.2, opacity: 0.7 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous feature"
      >
        <ChevronLeft className="w-8 h-8 text-black drop-shadow-md" />
      </motion.button>

      {/* Right arrow button */}
      <motion.button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30
                   flex items-center justify-center
                   focus:outline-none"
        onClick={onNext}
        whileHover={{ scale: 1.2, opacity: 0.7 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next feature"
      >
        <ChevronRight className="w-8 h-8 text-black drop-shadow-md" />
      </motion.button>
    </>
  );
}
