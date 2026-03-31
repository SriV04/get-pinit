'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { AnimatedBackground } from './AnimatedBackground';

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduced = useReducedMotion() ?? false;

  const anim = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.45, delay, ease: 'easeOut' },
        };

  return (
    <section className="section-dark" ref={sectionRef} aria-label="The founding team">
      <AnimatedBackground />

      <div className="section-content justify-center items-center gap-5 md:gap-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div className="waitlist-badge" {...anim(0)}>
          <span className="waitlist-badge-dot" />
          The Team
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-bold leading-tight"
          {...anim(0.07)}
        >
          <em style={{ fontStyle: 'italic' }}>Built by</em>{' '}
          people tired of mediocre spots
        </motion.h2>

        {/* Story */}
        <motion.p
          className="text-lg md:text-xl text-[rgba(247,233,255,0.65)] leading-relaxed max-w-2xl"
          {...anim(0.14)}
        >
          Shlok and Sri both moved to London from smaller cities, excited about
          discovering trendy new restaurants in the capital. Overwhelmed by the
          abundance they often settled on mediocrity. Tired of this, they built
          Pinit.
        </motion.p>

        {/* Photos */}
        <motion.div
          className="grid grid-cols-2 gap-6 md:gap-10 w-full max-w-2xl"
          {...anim(0.22)}
        >
          {[
            { src: '/shlok.jpeg', name: 'Shlok Shah', position: 'object-[center_30%]' },
            { src: '/sri.jpeg', name: 'Sriharsha Vitta', position: 'object-center' },
          ].map(({ src, name, position }) => (
            <div key={name} className="flex flex-col items-center gap-4">
              <div className="w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10">
                <Image
                  src={src}
                  alt={name}
                  width={600}
                  height={600}
                  className={`object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500 ${position}`}
                />
              </div>
              <p className="text-base md:text-lg font-semibold text-[rgba(247,233,255,0.85)]">{name}</p>
              <p className="text-sm md:text-base text-[rgba(247,233,255,0.4)]">Co-Founder</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
