'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { CanvasText } from '@/components/ui/canvas-text';
import { NoiseBackground } from '@/components/ui/noise-background';
import { StarBackground } from './StarBackground';

const VIBES = [
  { label: 'Intimate', highlight: true },
  { label: 'Buzzy', highlight: false },
  { label: 'Date Night', highlight: true },
  { label: 'Hidden Gem', highlight: true },
  { label: 'Rooftop', highlight: false },
  { label: 'Late Night', highlight: false },
  { label: 'Group Friendly', highlight: true },
  { label: 'Instagrammable', highlight: false },
  { label: 'Cosy', highlight: false },
  { label: 'Upscale', highlight: true },
  { label: 'Casual', highlight: false },
  { label: 'Bar Vibes', highlight: false },
  { label: 'Brunch Spot', highlight: true },
  { label: 'Quick Bite', highlight: false },
];

export function VibeEngineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduced = useReducedMotion() ?? false;

  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 24 },
    transition: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay },
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100vh', scrollSnapAlign: 'start', background: '#080808', color: '#f7e9ff' }}
      ref={sectionRef}
      aria-label="The Vibe Engine"
    >
      <StarBackground />

      <div className="section-content justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-14 h-full py-6 lg:py-0 w-full">

          {/* Left: text + tags + 26 stat */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,155,214,0.25)] bg-[rgba(255,155,214,0.07)] text-[#ff9bd6] text-xs font-semibold uppercase tracking-[0.15em] self-start"
              {...(reduced ? {} : {
                initial: { opacity: 0, y: -12 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.35, ease: 'easeOut' },
              })}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff9bd6]" />
              Powered by Agentic AI
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f7e9ff] leading-tight"
              {...enter(0.06)}
            >
              It&apos;s not about cuisine.{' '}
              <CanvasText
                text="It's about vibe."
                colors={[
                  'rgba(255, 155, 214, 1)',
                  'rgba(220, 130, 255, 0.9)',
                  'rgba(255, 155, 214, 0.8)',
                  'rgba(200, 110, 255, 0.9)',
                  'rgba(255, 155, 214, 1)',
                ]}
                animationDuration={10}
              />
            </motion.h2>

            <motion.p
              className="text-base text-[rgba(247,233,255,0.65)] leading-relaxed"
              {...enter(0.1)}
            >
              The same way you trust certain friends&apos; restaurant picks — Pinit learns your exact taste profile across{' '}
              <strong className="text-[#ff9bd6] font-semibold">26 distinct vibe dimensions</strong>.
            </motion.p>

            {/* Vibe tags — infinite marquee */}
            <div
              className="overflow-hidden w-full"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
              role="list"
              aria-label="Example vibe categories"
            >
              <div className="marquee-track gap-2">
                {[...VIBES, ...VIBES].map((vibe, i) => (
                  <span
                    key={i}
                    role="listitem"
                    className={`vibe-tag flex-shrink-0 mx-1${vibe.highlight ? ' vibe-tag--highlight' : ''}`}
                  >
                    {vibe.label}
                  </span>
                ))}
              </div>
            </div>

            {/* 26 stat pill — below vibe tags */}
            <motion.div
              className="self-center mt-2 lg:mt-4"
              {...(reduced ? {} : {
                initial: { opacity: 0, scale: 0.9 },
                animate: inView ? { opacity: 1, scale: 1 } : {},
                transition: { duration: 0.35, delay: 0.4, ease: 'backOut' },
              })}
            >
              <NoiseBackground
                gradientColors={['rgb(88,23,128)', 'rgb(55,10,80)']}
                containerClassName="rounded-2xl"
                className="flex flex-col items-center px-8 py-4 gap-0.5"
                noiseOpacity={0.07}
              >
                <span className="stat-number" style={{ color: '#ff9bd6', fontSize: 'clamp(2rem,4vw,3rem)' }}>26</span>
                <span className="text-xs text-[rgba(247,233,255,0.7)] text-center">vibe dimensions per restaurant</span>
              </NoiseBackground>
            </motion.div>
          </div>

          {/* Right: phone mockup */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            {...(reduced ? {} : {
              initial: { opacity: 0, x: 32 },
              animate: inView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.5, delay: 0.15, ease: 'easeOut' },
            })}
          >
            <div className="phone-mockup">
              <Image
                src="/explore.jpeg"
                alt="Pinit app explore screen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 180px, 260px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
