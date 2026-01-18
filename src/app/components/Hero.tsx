'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';

export function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="mb-1 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Sparkles behind logo */}
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
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}

              {/* Glowing ring effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-gradient-to-r from-[#42143d] via-[#6b2360] to-[#42143d] blur-2xl opacity-40" />
              </motion.div>
            </div>

            <Image
              src="/pinit-logo.png"
              alt="Pinit"
              width={1000}
              height={1000}
              className="h-56 md:h-150 w-auto relative z-10"
              priority
            />
          </motion.div>

          {/* Quote */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-16 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            "Good things happen to those who wait"
          </motion.p>

          {/* Email form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
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

          {/* Scroll indicator */}
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
