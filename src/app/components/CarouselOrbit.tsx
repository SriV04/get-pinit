'use client';

import { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { IconButton } from './IconButton';
import {
  get3DIconPosition,
  getResponsiveRadius,
  getResponsiveIconSize,
  getDepthScale,
  getDepthBlur,
  getDepthZIndex
} from '../utils/circularLayout';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  customGradient: string;
}

interface CarouselOrbitProps {
  features: Feature[];
  activeIndex: number;
  onFeatureClick: (index: number) => void;
}

export function CarouselOrbit({ features, activeIndex, onFeatureClick }: CarouselOrbitProps) {
  const [radius, setRadius] = useState(220);
  const [iconSize, setIconSize] = useState(72);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setRadius(getResponsiveRadius(width));
      setIconSize(getResponsiveIconSize(width));
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      {features.map((feature, index) => {
        // Hide the active feature's icon button (it's shown in the center card)
        if (index === activeIndex) {
          return null;
        }

        // Get 3D position with depth (z-axis)
        const position = get3DIconPosition(index, features.length, radius);

        // Calculate depth-based properties
        const depthScale = getDepthScale(position.z);
        const depthBlur = getDepthBlur(position.z);
        const zIndex = getDepthZIndex(position.z);

        return (
          <IconButton
            key={feature.title}
            icon={feature.icon}
            isActive={false}
            onClick={() => onFeatureClick(index)}
            position={position}
            customGradient={feature.customGradient}
            size={iconSize}
            title={feature.title}
            depthScale={depthScale}
            depthBlur={depthBlur}
            zIndex={zIndex}
          />
        );
      })}
    </>
  );
}
