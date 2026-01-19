'use client';

import { useState, useEffect, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';
import { CarouselOrbit } from './CarouselOrbit';
import { CenterCard } from './CenterCard';
import { NavigationButtons } from './NavigationButtons';
import { AdjacentCards } from './AdjacentCards';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  customGradient: string;
}

interface CircularCarouselProps {
  features: Feature[];
}

export function CircularCarousel({ features }: CircularCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Auto-rotation with pause on hover
  useEffect(() => {
    if (isPaused || isHovered) return;

    const interval = setInterval(() => {
      setDirection('next');
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, isHovered, features.length]);

  // Handle manual feature selection
  const handleFeatureClick = useCallback((index: number) => {
    // Determine direction based on which adjacent card was clicked
    const totalFeatures = features.length;
    const prevIndex = (activeIndex - 1 + totalFeatures) % totalFeatures;
    const nextIndex = (activeIndex + 1) % totalFeatures;

    if (index === prevIndex) {
      setDirection('prev');
    } else if (index === nextIndex) {
      setDirection('next');
    } else {
      // Default to next for other cases
      setDirection('next');
    }

    setActiveIndex(index);
    // Reset the rotation timer by toggling pause
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 100);
  }, [activeIndex, features.length]);

  // Handle navigation button clicks
  const handlePrevious = useCallback(() => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 100);
  }, [features.length]);

  const handleNext = useCallback(() => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % features.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 100);
  }, [features.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          setDirection('next');
          setActiveIndex((prev) => (prev + 1) % features.length);
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 100);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          setDirection('prev');
          setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 100);
          break;
        case ' ':
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [features.length]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
  }, []);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center px-2 lg:px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Product features carousel"
      aria-live="polite"
      aria-atomic="true"
      style={{
        // 3D perspective for depth effect
        perspective: '1800px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Transform Container */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Center Card */}
        <CenterCard feature={features[activeIndex]} index={activeIndex} direction={direction} />
      </div>

      {/* Adjacent Cards (Left and Right) */}
      <AdjacentCards
        features={features}
        activeIndex={activeIndex}
        onFeatureClick={handleFeatureClick}
        direction={direction}
      />

      {/* Navigation Buttons */}
      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Feature {activeIndex + 1} of {features.length}: {features[activeIndex].title}
      </div>
    </div>
  );
}
