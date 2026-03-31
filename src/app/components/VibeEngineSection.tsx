'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { AnimatedBackground } from './AnimatedBackground';

// §6 visual-hierarchy: mix highlighted and regular vibes; varied ordering creates natural weight
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
  { label: 'Outdoor', highlight: false },
  { label: 'Bar Vibes', highlight: false },
  { label: 'Brunch Spot', highlight: true },
  { label: 'Quick Bite', highlight: false },
  { label: 'Solo-Friendly', highlight: false },
];

export function VibeEngineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  // Always same shape — avoids TypeScript union spread issue
  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 24 },
    transition: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay },
  });

  return (
    <section className="section-dark" ref={sectionRef} aria-label="The Vibe Engine">
      <AnimatedBackground />

      <div className="section-content justify-center items-center gap-5 md:gap-7 text-center">
        {/* Badge */}
        <motion.div
          className="waitlist-badge"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: -12 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.35, ease: 'easeOut' },
          })}
        >
          <span className="waitlist-badge-dot" />
          Powered by Agentic AI · Vector Similarity Matching
        </motion.div>

        {/* §6 weight-hierarchy: bold headline */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold max-w-3xl leading-tight"
          {...enter(0.06)}
        >
          We know who you take recommendations from
        </motion.h2>

        {/* §6 body text: 16px+, 1.6 line-height, secondary colour */}
        <motion.p
          className="text-base md:text-lg text-[rgba(247,233,255,0.65)] max-w-lg leading-relaxed"
          {...enter(0.1)}
        >
          It&apos;s not about cuisine — it&apos;s about vibe. The same way you trust certain friends&apos; restaurant picks, Pinit learns your exact taste profile.
        </motion.p>

        {/* §7 scale-feedback: stat card pops in */}
        <motion.div
          className="stat-card"
          style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 3rem' }}
          {...(reduced ? {} : {
            initial: { opacity: 0, scale: 0.92 },
            animate: inView ? { opacity: 1, scale: 1 } : {},
            transition: { duration: 0.4, delay: 0.14, ease: 'backOut' },
          })}
          whileHover={reduced ? {} : { scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
        >
          <span className="stat-number">26</span>
          <span className="stat-label">distinct vibe dimensions per restaurant</span>
        </motion.div>

        {/* §7 stagger: 40ms per tag, backOut easing for playful pop */}
        <div
          className="flex flex-wrap gap-2 justify-center max-w-2xl"
          role="list"
          aria-label="Example vibe categories"
        >
          {VIBES.map((vibe, i) => (
            <motion.span
              key={vibe.label}
              role="listitem"
              className={`vibe-tag${vibe.highlight ? ' vibe-tag--highlight' : ''}`}
              {...(reduced ? {} : {
                initial: { opacity: 0, scale: 0.7 },
                animate: inView ? { opacity: 1, scale: 1 } : {},
                transition: { duration: 0.3, delay: 0.2 + i * 0.04, ease: 'backOut' },
              })}
            >
              {vibe.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
