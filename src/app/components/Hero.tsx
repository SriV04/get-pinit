'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { GlobeStaticPins2 } from './GlobeWithStaticPins2';

type HeroProps = {
  onChevronClick?: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Hero({ onChevronClick }: HeroProps) {
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitted(false);

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Waitlist submission failed', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="hero-scene">
      <AnimatedBackground />
      <div className="hero-sky">
        <div className="hero-logo">
          <Image
            src="/pinit-logo.png"
            alt="Pinit"
            width={1200}
            height={1200}
            priority
          />
        </div>
      </div>

      <div className="hero-content">
        <div className="waitlist-badge">
          <span className="waitlist-badge-dot" />
          Limited invites
        </div>
        <div className="waitlist-heading">
          <h2>Join the waitlist for early access</h2>
          <p>Unlock early invites, launch perks, and first-dibs on new drops.</p>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          className="hero-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#42143d] to-[#6b2360] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300" />
            <div className="relative flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full p-2 border border-gray-700">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                disabled={isSubmitting}
                className="flex-1 bg-transparent px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-100 placeholder-gray-500 outline-none min-w-0"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#42143d] to-[#6b2360] hover:from-[#5a1c51] hover:to-[#7d2c70] text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group/btn whitespace-nowrap shrink-0"
              >
                <span className="hidden sm:inline">
                  {isSubmitting ? 'Joining…' : 'Join Waitlist'}
                </span>
                <span className="sm:hidden">{isSubmitting ? 'Joining…' : 'Join'}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-300 mt-3 sm:mt-4 text-sm sm:text-base text-center" id={errorId}>
              {error}
            </p>
          )}
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 mt-3 sm:mt-4 text-sm sm:text-base text-center"
            >
              ✓ You're on the list!
            </motion.p>
          )}
        </motion.form>
      </div>

      <button className="hero-chevron" type="button" onClick={onChevronClick}>
        <span className="sr-only">Scroll to features</span>
        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="hero-globe-container max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px]">
        <GlobeStaticPins2 />
      </div>
    </section>
  );
}
