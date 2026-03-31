'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Check, Users, User } from 'lucide-react';

// §4 style-match: clean light section, consistent with HowItWorksSection
// §7 motion-meaning: the bubble visual communicates "group coming together"

const BENEFITS = [
  'Matches vibe preferences for the whole group',
  'Handles every dietary requirement automatically',
  'No debates. No compromises. Just great food.',
];

// Satellite avatar positions around a central hub
const SATELLITES = [
  { label: 'A', angle: -50, radius: 88 },
  { label: 'B', angle: 210, radius: 85 },
  { label: 'C', angle: 50, radius: 90 },
  { label: 'D', angle: 160, radius: 87 },
];

export function BubblesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="bubbles-scene"
      ref={sectionRef}
      aria-label="Bubbles group dining"
    >
      <div className="section-content justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 h-full py-8 md:py-0">

          {/* Left: Text — §5 content-priority: text first on mobile */}
          <motion.div
            className="flex flex-col gap-5 max-w-md text-center md:text-left"
            {...(reduced ? {} : {
              initial: { opacity: 0, x: -32 },
              animate: inView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.45, ease: "easeOut" },
            })}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,35,96,0.09)] border border-[rgba(107,35,96,0.18)] text-[#42143d] text-xs font-semibold uppercase tracking-[0.15em] self-center md:self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6b2360]" />
              Bubbles · Group Dining Solved
            </div>

            {/* §6 weight-hierarchy: bold large heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a0524] leading-tight">
              No one compromises.<br />Not even that one fussy friend.
            </h2>

            {/* §6: body text 16px+, 1.6 line-height */}
            <p className="text-base md:text-lg text-[#1a0524]/60 leading-relaxed">
              Create a bubble with your group. We match everyone&apos;s vibe preferences <em>and</em> dietary requirements — finding somewhere that actually works for everyone.
            </p>

            {/* §7 stagger: 40ms per item */}
            <ul className="flex flex-col gap-3" aria-label="Key benefits">
              {BENEFITS.map((benefit, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-[#1a0524]/70 text-sm md:text-base"
                  {...(reduced ? {} : {
                    initial: { opacity: 0, x: -16 },
                    animate: inView ? { opacity: 1, x: 0 } : {},
                    transition: { duration: 0.35, delay: 0.2 + i * 0.04, ease: "easeOut" },
                  })}
                >
                  {/* §1 color-not-only: check icon + text (not color alone) */}
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(107,35,96,0.1)] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#6b2360] stroke-[3]" aria-hidden="true" />
                  </span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Bubble visual — §7 motion-meaning: orbiting friends coalesce */}
          <motion.div
            className="relative flex items-center justify-center w-56 h-56 md:w-64 md:h-64 flex-shrink-0"
            aria-hidden="true"
            {...(reduced ? {} : {
              initial: { opacity: 0, x: 32 },
              animate: inView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.45, delay: 0.12, ease: "easeOut" },
            })}
          >
            {/* Expanding pulse rings */}
            {[120, 165, 210].map((size, i) => (
              <div
                key={i}
                className="bubble-ring"
                style={{
                  width: size,
                  height: size,
                  animationDelay: `${i * 0.9}s`,
                }}
              />
            ))}

            {/* Center: main user icon */}
            <motion.div
              className="bubble-avatar relative z-10"
              style={{ width: 68, height: 68 }}
              animate={reduced ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Users className="w-7 h-7 text-[#42143d]" />
            </motion.div>

            {/* Satellite avatars — §7 stagger-sequence: staggered entrance */}
            {SATELLITES.map((sat, i) => {
              const rad = (sat.angle * Math.PI) / 180;
              const x = Math.cos(rad) * sat.radius;
              const y = Math.sin(rad) * sat.radius;
              return (
                <motion.div
                  key={i}
                  className="bubble-avatar absolute z-10"
                  style={{ left: '50%', top: '50%', marginLeft: -24, marginTop: -24 }}
                  initial={reduced ? { opacity: 1, scale: 1, x, y } : { opacity: 0, scale: 0, x, y }}
                  animate={reduced ? { x, y } : (inView ? { opacity: 1, scale: 1, x, y } : {})}
                  transition={{ duration: 0.4, delay: 0.22 + i * 0.04, ease: 'backOut' }}
                >
                  <motion.div
                    animate={reduced ? {} : { y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                  >
                    <User className="w-4 h-4 text-[#6b2360]" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
