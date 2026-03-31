'use client';

import { cn } from '@/lib/utils';
import { useId } from 'react';

interface NoiseBackgroundProps {
  gradientColors?: string[];
  containerClassName?: string;
  className?: string;
  children?: React.ReactNode;
  noiseOpacity?: number;
}

/**
 * Container with an SVG fractal-noise texture layered over a gradient.
 * Gives cards/boxes a premium tactile feel.
 */
export function NoiseBackground({
  gradientColors = ['rgb(88, 23, 128)', 'rgb(40, 9, 66)'],
  containerClassName,
  className,
  children,
  noiseOpacity = 0.06,
}: NoiseBackgroundProps) {
  const id = useId();
  const filterId = `noise-${id.replace(/:/g, '')}`;
  const gradient =
    gradientColors.length >= 2
      ? `linear-gradient(135deg, ${gradientColors.join(', ')})`
      : gradientColors[0];

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Gradient base */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* SVG fractal noise overlay */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: noiseOpacity }}
        aria-hidden="true"
      >
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>

      {/* Subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,155,214,0.12),transparent_60%)]" />

      {/* Content */}
      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  );
}
