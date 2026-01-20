'use client';

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IconButtonProps {
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  position: { x: number; y: number; z: number };  // Added z coordinate
  customGradient: string;
  size: number;
  title: string;
  depthScale: number;  // Scale factor based on depth
  depthBlur: number;   // Blur amount based on depth
  zIndex: number;      // Z-index for proper layering
}

export function IconButton({
  icon: Icon,
  isActive,
  onClick,
  position,
  customGradient,
  size,
  title,
  depthScale,
  depthBlur,
  zIndex,
}: IconButtonProps) {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent));
  }, []);

  return (
    <motion.button
      onClick={onClick}
      className="absolute rounded-full bg-white border-2 flex items-center justify-center cursor-pointer transition-all"
      style={{
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        // 3D transform with depth (translateZ) and scale
        transform: `
          translate3d(
            calc(-50% + ${position.x}px),
            calc(-50% + ${position.y}px),
            ${position.z}px
          )
          scale(${depthScale})
        `,
        // Android optimization: Use opacity instead of expensive filters
        filter: isAndroid
          ? (isActive ? 'none' : 'opacity(0.7)')
          : `blur(${depthBlur}px) grayscale(${isActive ? 0 : 0.5})`,
        borderColor: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)',
        // Android optimization: Remove box-shadow for better performance
        boxShadow: isAndroid
          ? 'none'
          : (isActive ? '0 4px 20px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)'),
        zIndex: zIndex,
        willChange: 'transform',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        // Scale animation adjusted for depth scale
        scale: isActive ? 1.1 * depthScale : depthScale,
        opacity: isActive ? 1 : 0.7,
      }}
      whileHover={{
        scale: 1.15 * depthScale,
        boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      aria-pressed={isActive}
      aria-label={title}
    >
      <div
        className="rounded-full w-full h-full flex items-center justify-center"
        style={{
          background: isActive ? customGradient : 'transparent',
          opacity: isActive ? 0.9 : 0.3,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Icon
          className="text-gray-800"
          style={{
            width: size * 0.5,
            height: size * 0.5,
            strokeWidth: 2,
          }}
        />
      </div>
    </motion.button>
  );
}
