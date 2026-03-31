'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { StarBackground } from './StarBackground';

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const reduced = useReducedMotion() ?? false;
  const [sectionHeight, setSectionHeight] = useState('100vh');

  useEffect(() => {
    const update = () => setSectionHeight(`${window.innerHeight}px`);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 24 },
    transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] overflow-hidden"
      style={{ height: sectionHeight, scrollSnapAlign: 'start' }}
      aria-label="The problem"
    >
      <StarBackground />

      <div className="section-content justify-center items-center h-full text-center">
        {/* Block 1: the stats */}
        <motion.div {...fadeIn(0)} className="space-y-3 md:space-y-5">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            <span className="font-[family-name:var(--font-serif)] italic font-normal">67%</span>{' '}
            of people turn to social media
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            to pick a place.
          </p>
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            An average of{' '}
            <span className="font-[family-name:var(--font-serif)] italic font-normal">40</span>{' '}
            minutes spent.
          </p>
        </motion.div>

        {/* Block 2: dimmed supporting line */}
        <motion.div {...fadeIn(0.36)} className="mt-[5vh]">
          <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-white/45 leading-snug font-light">
            That hidden gem scrolled past last month. Never visited. Never remembered.
          </p>
        </motion.div>

        {/* Block 3: closing CTA */}
        <motion.p
          {...fadeIn(0.54)}
          className="mt-[5vh] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
        >
          Stop scrolling,{' '}
          <span className="font-[family-name:var(--font-serif)] italic font-normal">Start going</span>
        </motion.p>
      </div>
    </section>
  );
}
