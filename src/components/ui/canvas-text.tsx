'use client';

import { cn } from '@/lib/utils';

interface CanvasTextProps {
  text: string;
  backgroundClassName?: string;
  colors?: string[];
  lineGap?: number;
  animationDuration?: number;
  className?: string;
}

/**
 * Animated shimmer text — gradient scrolls across the text.
 * Colors are adapted from Pinit brand by default.
 */
export function CanvasText({
  text,
  colors = [
    'rgba(255, 155, 214, 1)',
    'rgba(220, 130, 255, 0.9)',
    'rgba(185, 131, 255, 0.85)',
    'rgba(255, 155, 214, 0.7)',
    'rgba(220, 130, 255, 0.5)',
  ],
  animationDuration = 20,
  className,
  backgroundClassName,
}: CanvasTextProps) {
  const gradient = `linear-gradient(90deg, ${[...colors, ...colors].join(', ')})`;

  return (
    <span
      className={cn('canvas-text-shimmer relative inline-block', backgroundClassName, className)}
      style={
        {
          backgroundImage: gradient,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          '--shimmer-duration': `${animationDuration}s`,
        } as React.CSSProperties
      }
    >
      {text}
    </span>
  );
}
