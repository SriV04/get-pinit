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
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });
  const reduced = useReducedMotion() ?? false;

  const enter = (delay = 0) => reduced ? {} : ({
    initial: { y: 24 },
    animate: { y: 0 },
    transition: { duration: 0.4, delay },
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100vh', scrollSnapAlign: 'start', background: '#080808', color: '#f7e9ff' }}
      ref={sectionRef}
      aria-label="The Vibe Engine"
    >
      <StarBackground />

      <div className="section-content lg:justify-center">
        <div className="flex flex-row items-center gap-4 lg:gap-14 lg:h-full py-4 lg:py-0 w-full">

          {/* Left: text + tags + 26 stat + phone on mobile */}
          <div className="flex flex-col gap-5 w-full lg:flex-1 min-w-0">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,155,214,0.25)] bg-[rgba(255,155,214,0.07)] text-[#ff9bd6] text-xs font-semibold uppercase tracking-[0.15em] self-start"
              {...(reduced ? {} : {
                initial: { y: -12 },
                animate: { y: 0 },
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
                initial: { scale: 0.9 },
                animate: { scale: 1 },
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

            {/* Phone mockup — below stat on mobile, hidden on desktop (shown in right col) */}
            <motion.div
              className="flex lg:hidden justify-center"
              {...(reduced ? {} : {
                initial: { scale: 0.9 },
                animate: { scale: 1 },
                transition: { duration: 0.4, delay: 0.2 },
              })}
            >
              <div className="phone-mockup" style={{ width: 'clamp(80px, 22vw, 140px)' }}>
                <Image
                  src="/explore.jpeg"
                  alt="Pinit app explore screen"
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              </div>
            </motion.div>
          </div>

          {/* Right: phone mockup — desktop only */}
          <motion.div
            className="hidden lg:flex flex-shrink-0 items-center justify-center"
            {...(reduced ? {} : {
              initial: { x: 32 },
              animate: { x: 0 },
              transition: { duration: 0.5, delay: 0.15, ease: 'easeOut' },
            })}
          >
            <div className="phone-mockup" style={{ width: 'clamp(160px, 22vw, 260px)' }}>
              <Image
                src="/explore.jpeg"
                alt="Pinit app explore screen"
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
