'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Globe } from './Globe';
import { AnimatedBackground } from './AnimatedBackground';

interface FoodItem {
  id: number;
  image: string;
  startX: number;
  delay: number;
}

interface Pin {
  id: number;
  x: number;      // pixels from left
  y: number;      // pixels from top
  rotation: number; // degrees
}

const foodItems: FoodItem[] = [
  { id: 1, image: '/sushi.png', startX: 30, delay: 0 },
  { id: 2, image: '/pizza.png', startX: 60, delay: 1.0 },
];

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [fallingItems, setFallingItems] = useState<Set<number>>(new Set());
  const [pins, setPins] = useState<Pin[]>([]);
  const [shouldVibrate, setShouldVibrate] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  // Globe dimension tracking
  const [globeInfo, setGlobeInfo] = useState<{
    centerX: number;
    centerY: number;
    radius: number;
  } | null>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  // Falling food positions tracking
  const [fallingFoodPositions, setFallingFoodPositions] = useState<Map<number, {
    x: number;  // screen X position in pixels
    y: number;  // screen Y position in pixels
    velocity: number; // vertical velocity in pixels per frame
    isFalling: boolean;
  }>>(new Map());
  const animationFrameRef = useRef<number | null>(null);
  const foodDropsInitialized = useRef(false);

  // Calculate globe dimensions
  useEffect(() => {
    const updateGlobeDimensions = () => {
      if (!globeContainerRef.current) return;

      const container = globeContainerRef.current;
      const canvas = container.querySelector('canvas');

      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = rect.width / 2;

        console.log('Globe dimensions:', { centerX, centerY, radius });
        setGlobeInfo({ centerX, centerY, radius });
      }
    };

    // Initial calculation
    updateGlobeDimensions();

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      updateGlobeDimensions();
    });

    if (globeContainerRef.current) {
      resizeObserver.observe(globeContainerRef.current);
    }

    // Recalculate after a short delay to ensure globe is fully rendered
    const timeout = setTimeout(updateGlobeDimensions, 500);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    // Only initialize food drops once when globeInfo becomes available
    if (!globeInfo || foodDropsInitialized.current) return;

    foodDropsInitialized.current = true;

    // Start dropping food items sequentially
    foodItems.forEach((item) => {
      setTimeout(() => {
        setFallingItems(prev => new Set(prev).add(item.id));

        // Initialize falling position for this item
        const startXPixels = (item.startX / 100) * window.innerWidth;
        setFallingFoodPositions(prevMap => {
          const newMap = new Map(prevMap);
          newMap.set(item.id, {
            x: startXPixels,
            y: -100,
            velocity: 0, // Start with zero velocity
            isFalling: true,
          });
          return newMap;
        });
      }, item.delay * 1000);
    });
  }, [globeInfo]);

  // Animation loop for falling food items
  useEffect(() => {
    if (!globeInfo) return;

    const GRAVITY = 0.5; // acceleration in pixels per frame squared

    const animate = () => {
      setFallingFoodPositions(prevMap => {
        const newMap = new Map(prevMap);
        let hasChanges = false;

        for (const [itemId, position] of prevMap.entries()) {
          if (!position.isFalling) continue;

          // Apply gravity to velocity
          const newVelocity = position.velocity + GRAVITY;
          const newY = position.y + newVelocity;
          const collided = checkCollision(position.x, newY);

          if (collided) {
            // Stop falling and trigger pin transformation
            newMap.set(itemId, { ...position, y: newY, velocity: 0, isFalling: false });
            hasChanges = true;

            // Find the food item
            const foodItem = foodItems.find(item => item.id === itemId);
            if (foodItem) {
              handleFoodHitGlobe(foodItem, position.x, newY);
            }

            console.log(`Food ${itemId} hit globe at:`, { x: position.x, y: newY, velocity: newVelocity });
          } else {
            // Continue falling with updated velocity
            newMap.set(itemId, { ...position, y: newY, velocity: newVelocity });
            hasChanges = true;
          }
        }

        return hasChanges ? newMap : prevMap;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [globeInfo]);

  // Watch for all pins to be in position
  useEffect(() => {
    if (pins.length === foodItems.length) {
      // Wait for entrance animations (400ms) + sit still period (1000ms) = 1400ms
      setTimeout(() => {
        setShouldVibrate(true);
      }, 1400);

      // Show explosion after vibration (400ms entrance + 1000ms sit + 800ms vibrate)
      setTimeout(() => {
        setShowExplosion(true);
      }, 2200);

      // Show black screen
      setTimeout(() => {
        setShowBlackScreen(true);
      }, 2700);

      // Complete and transition to main page
      setTimeout(() => {
        onComplete();
      }, 4200);
    }
  }, [pins, onComplete]);

  // Check if food item collides with globe
  const checkCollision = (foodX: number, foodY: number): boolean => {
    if (!globeInfo) return false;

    const foodRadius = 40; // Half of the 80px food item size
    // Reduce effective radius to account for globe shadow (use 85% of actual radius)
    const distance = Math.sqrt(
      Math.pow(foodX - globeInfo.centerX, 2) +
      Math.pow(foodY - globeInfo.centerY, 2)
    );

    return distance <= globeInfo.radius + foodRadius;
  };

  const handleFoodHitGlobe = (item: FoodItem, collisionX: number, collisionY: number) => {
    if (!globeInfo) return;

    // Calculate rotation angle to point toward globe center
    const angle = Math.atan2(
      collisionY - globeInfo.centerY,
      collisionX - globeInfo.centerX
    );
    const rotationDegrees = (angle * 180) / Math.PI + 90; // +90 to orient pin correctly

    // Manual Y position for each pin (adjust these values to position pins correctly on globe)
    const pinYPositions: { [key: number]: number } = {
      1: window.innerHeight * 0.75, // First pin (sushi) - 72% down the screen
      2: window.innerHeight * 0.82, // Second pin (pizza) - 78% down the screen
    };

    const manualPinY = pinYPositions[item.id] || window.innerHeight * 0.75;

    console.log(`Pin ${item.id} collision:`, { collisionX, collisionY, manualPinY, rotationDegrees });

    const hitPosition: Pin = {
      id: item.id,
      x: collisionX, // Use the exact x position from the falling food
      y: manualPinY,
      rotation: rotationDegrees,
    };

    setPins(prev => [...prev, hitPosition]);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50"
      >
        {/* Animated Background */}
        <AnimatedBackground />

          {/* Globe positioned at bottom - only showing top half */}
          <div ref={globeContainerRef} className="absolute -bottom-[20vh] left-0 right-0 h-[60vh] flex items-center justify-center overflow-hidden">
            <Globe className="opacity-80 !max-w-[1800px]" />
          </div>

          {/* Falling food items */}
          {foodItems.map((item) => {
            const position = fallingFoodPositions.get(item.id);
            const hasPinAppeared = pins.some(pin => pin.id === item.id);
            if (!position || !position.isFalling || hasPinAppeared) return null;

            return (
              <motion.div
                key={`food-${item.id}`}
                className="absolute"
                style={{
                  left: position.x,
                  top: position.y,
                  transform: 'translate(-50%, -50%)', // Center the food item
                }}
                animate={{
                  rotate: position.isFalling ? 360 : 0,
                }}
                transition={{
                  rotate: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Image
                  src={item.image}
                  alt="Food"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain drop-shadow-2xl"
                />
              </motion.div>
            );
          })}

          {/* Pins that appear after food hits globe */}
          {pins.map((pin) => (
            <motion.div
              key={`pin-${pin.id}`}
              className="absolute"
              style={{
                left: pin.x,
                top: pin.y,
              }}
              initial={{ scale: 1, rotate: pin.rotation }}
              animate={
                shouldVibrate
                  ? {
                      scale: 1,
                      rotate: pin.rotation,
                      x: [0, -10, 10, -8, 8, -5, 5, -3, 3, 0],
                      y: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0],
                    }
                  : {
                      scale: 1,
                      rotate: pin.rotation,
                      y: [0, -20, -15, -10, -5, 0], // Bounce animation
                    }
              }
              transition={
                shouldVibrate
                  ? {
                      duration: 0.8,
                      ease: "easeInOut",
                      repeat: 0,
                    }
                  : {
                      y: {
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1], // Bounce easing
                        times: [0, 0.3, 0.5, 0.7, 0.9, 1],
                      },
                    }
              }
            >
              <Image
                src="/pin.png"
                alt="Pin"
                width={400}
                height={400}
                className="w-96 h-96 object-contain drop-shadow-2xl"
                style={{
                  transform: 'translate(-50%, -50%)',
                  filter: 'brightness(1.2) saturate(3) hue-rotate(320deg) drop-shadow(0 0 20px rgba(214, 0, 107, 0.7))'
                }}
              />
            </motion.div>
          ))}

        {/* Explosion effect */}
        {showExplosion && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Multiple explosion circles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-[#D6006B] via-[#FF1493] to-[#FF69B4]"
                style={{
                  width: 100,
                  height: 100,
                  left: '50%',
                  top: '65%',
                }}
                initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [1, 0.6, 0],
                  x: Math.cos((i * 360) / 8 * Math.PI / 180) * 300,
                  y: Math.sin((i * 360) / 8 * Math.PI / 180) * 300,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: i * 0.05,
                }}
              />
            ))}

            {/* Center flash */}
            <motion.div
              className="absolute rounded-full bg-white"
              style={{
                width: 50,
                height: 50,
                left: '50%',
                top: '65%',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 20, 25], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        )}

        {/* Black screen transition */}
        {showBlackScreen && (
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </>
  );
}
