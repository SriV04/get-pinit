'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { Globe } from '@/app/components/Globe';

interface Pin {
  id: number;
  angle: number;
}

export function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [globeInfo, setGlobeInfo] = useState<{
    centerX: number;
    centerY: number;
    radius: number;
  } | null>(null);

  const pins: Pin[] = [
    { id: 1, angle: 0 },
    { id: 2, angle: 60 },
    { id: 3, angle: 120 },
    { id: 4, angle: 180 },
    { id: 5, angle: 240 },
    { id: 6, angle: 300 },
  ];

  useEffect(() => {
    const updateGlobeDimensions = () => {
      if (!globeContainerRef.current) return;
      const canvas = globeContainerRef.current.querySelector('canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setGlobeInfo({
          centerX: rect.width / 2,
          centerY: rect.height / 2,
          radius: rect.width / 2,
        });
      }
    };
    updateGlobeDimensions();
    const resizeObserver = new ResizeObserver(updateGlobeDimensions);
    if (globeContainerRef.current) resizeObserver.observe(globeContainerRef.current);
    const timeout = setTimeout(updateGlobeDimensions, 500);
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    // CHANGED: flex items-start and pt-20 (instead of items-center) to push everything up
    <div className="relative min-h-screen flex items-start justify-center pt-20 md:pt-32 overflow-hidden">
      <AnimatedBackground />

      {/* Spinning Globe - Kept at bottom */}
      <div
        ref={globeContainerRef}
        className="absolute -bottom-[20vh] left-0 right-0 h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <Globe className="opacity-80 !max-w-[1800px]" />
        {globeInfo && pins.map((pin) => {
          const angleRad = (pin.angle * Math.PI) / 180;
          const pinX = globeInfo.centerX + Math.cos(angleRad) * globeInfo.radius;
          const pinY = globeInfo.centerY + Math.sin(angleRad) * globeInfo.radius;
          const rotationDegrees = pin.angle + 90;

          return (
            <motion.div
              key={`pin-${pin.id}`}
              className="absolute"
              style={{
                left: pinX,
                top: pinY,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Image
                src="/pin.png"
                alt="Pin"
                width={400}
                height={400}
                className="w-96 h-96 object-contain drop-shadow-2xl"
                style={{
                  transform: `rotate(${rotationDegrees}deg)`,
                  filter: 'brightness(1.2) saturate(3) hue-rotate(320deg) drop-shadow(0 0 20px rgba(214, 0, 107, 0.7))'
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Section */}
          <motion.div
            // CHANGED: Increased negative margin to -mt-24 and reduced mb-2
            className="-mt-24 mb-2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Sparkles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => {
                const angle = (i * 360) / 12;
                const radius = 180 + Math.random() * 40;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: `${x}px`,
                      marginTop: `${y}px`,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
                    }}
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" }}
                  />
                );
              })}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-r from-[#42143d] via-[#6b2360] to-[#42143d] blur-2xl opacity-40" />
              </motion.div>
            </div>

            <Image
              src="/pinit-logo1.png"
              alt="Pinit"
              width={300}
              height={300}
              className="h-100 md:h-104 w-auto relative z-10"
              priority
            />
          </motion.div>

          {/* Email form */}
          <motion.form
            onSubmit={handleSubmit}
            // CHANGED: Increased negative margin to -mt-8 to pull it closer to the logo
            className="max-w-md mx-auto -mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#42143d] to-[#6b2360] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full p-2 border border-gray-700">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-transparent px-4 py-3 text-gray-100 placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#42143d] to-[#6b2360] hover:from-[#5a1c51] hover:to-[#7d2c70] text-white rounded-full px-6 py-3 transition-all duration-300 flex items-center gap-2 group/btn"
                >
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 mt-4"
              >
                ✓ You're on the list!
              </motion.p>
            )}
          </motion.form>

          {/* Scroll indicator - kept relative to the layout */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-gray-400 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
