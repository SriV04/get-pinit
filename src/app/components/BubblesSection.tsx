'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Check, Users, User } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { CanvasText } from '@/components/ui/canvas-text';

const SATELLITES = [
  { angle: -50, radius: 110 },
  { angle: 210, radius: 107 },
  { angle: 50, radius: 112 },
  { angle: 160, radius: 109 },
];

const BENEFITS = [
  'Matches vibe preferences for the whole group',
  'Handles every dietary requirement automatically',
  'No debates. No compromises. Just great food.',
];

export function BubblesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="section-dark" ref={sectionRef} aria-label="Bubbles group dining">
      <AnimatedBackground />

      <div className="section-content justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 h-full py-8 lg:py-0">

          {/* Left: bubble graphic */}
          <motion.div
            className="relative flex items-center justify-center w-72 h-72 md:w-84 md:h-84 flex-shrink-0 order-2 lg:order-1 scale-[0.72] md:scale-[0.85] lg:scale-100 origin-center"
            aria-hidden="true"
            {...(reduced ? {} : {
              initial: { opacity: 0, x: -32 },
              animate: inView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.45, ease: 'easeOut' },
            })}
          >
            {/* Pulse rings */}
            {[150, 205, 260].map((size, i) => (
              <div
                key={i}
                className="bubble-ring--dark"
                style={{ width: size, height: size, animationDelay: `${i * 0.9}s` }}
              />
            ))}

            {/* Centre avatar */}
            <motion.div
              className="bubble-avatar--dark relative z-10 flex items-center justify-center"
              style={{ width: 84, height: 84 }}
              animate={reduced ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Users className="w-9 h-9 text-[#ff9bd6]" />
            </motion.div>

            {/* Satellite avatars */}
            {SATELLITES.map((sat, i) => {
              const rad = (sat.angle * Math.PI) / 180;
              const x = Math.cos(rad) * sat.radius;
              const y = Math.sin(rad) * sat.radius;
              return (
                <motion.div
                  key={i}
                  className="bubble-avatar--dark absolute z-10 flex items-center justify-center"
                  style={{ left: '50%', top: '50%', marginLeft: -24, marginTop: -24 }}
                  initial={reduced ? { opacity: 1, scale: 1, x, y } : { opacity: 0, scale: 0, x, y }}
                  animate={reduced ? { x, y } : (inView ? { opacity: 1, scale: 1, x, y } : {})}
                  transition={{ duration: 0.4, delay: 0.22 + i * 0.04, ease: 'backOut' }}
                >
                  <motion.div
                    animate={reduced ? {} : { y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                  >
                    <User className="w-4 h-4 text-[#f7e9ff]" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: text */}
          <motion.div
            className="flex flex-col gap-5 max-w-lg text-center lg:text-left order-1 lg:order-2"
            {...(reduced ? {} : {
              initial: { opacity: 0, x: 32 },
              animate: inView ? { opacity: 1, x: 0 } : {},
              transition: { duration: 0.45, delay: 0.1, ease: 'easeOut' },
            })}
          >
            <div className="waitlist-badge self-center lg:self-start">
              <span className="waitlist-badge-dot" />
              Bubbles · Group Dining Solved
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f7e9ff] leading-tight">
              No one{' '}
              <CanvasText
                text="compromises."
                colors={[
                  'rgba(255, 155, 214, 1)',
                  'rgba(220, 130, 255, 0.9)',
                  'rgba(255, 155, 214, 0.75)',
                  'rgba(200, 110, 255, 0.9)',
                  'rgba(255, 155, 214, 1)',
                ]}
                animationDuration={10}
              />
              <br />Not even that one fussy friend.
            </h2>

            <p className="text-base md:text-lg text-[rgba(247,233,255,0.62)] leading-relaxed">
              Create a bubble with your group. We match everyone&apos;s vibe preferences <em>and</em> dietary requirements — finding somewhere that actually works for everyone.
            </p>

            <ul className="flex flex-col gap-3" aria-label="Key benefits">
              {BENEFITS.map((benefit, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-[rgba(247,233,255,0.75)] text-sm md:text-base"
                  {...(reduced ? {} : {
                    initial: { opacity: 0, x: 16 },
                    animate: inView ? { opacity: 1, x: 0 } : {},
                    transition: { duration: 0.35, delay: 0.25 + i * 0.04, ease: 'easeOut' },
                  })}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(255,155,214,0.15)] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#ff9bd6] stroke-[3]" aria-hidden="true" />
                  </span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
