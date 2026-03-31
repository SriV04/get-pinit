'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { AnimatedBackground } from './AnimatedBackground';

const STATS = [
  {
    value: 67,
    suffix: '%',
    label: 'of Gen Z & millennials use social media to decide where to eat',
  },
  {
    value: 71,
    suffix: '%',
    label: 'spend 15–20 minutes just deciding where to go',
  },
  {
    value: 15,
    suffix: '%',
    label: 'spend up to an hour choosing a restaurant',
  },
];

// Count-up animation respects reduced-motion by jumping straight to target
function CountUp({ target, inView, reduced }: { target: number; inView: boolean; reduced: boolean }) {
  const [count, setCount] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(target); return; }
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, reduced]);

  return <>{count}</>;
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  // §7: ease-out for entering, 300-400ms duration, 40ms stagger
  // Always same shape — avoids TypeScript union spread issue
  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 24 },
    transition: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay },
  });

  return (
    <section className="section-dark" ref={sectionRef} aria-label="The problem">
      <AnimatedBackground />

      <div className="section-content justify-center items-center gap-6 md:gap-10">
        {/* §6 weight-hierarchy: badge → h2 → body */}
        <motion.div
          className="waitlist-badge"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: -12 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.35, ease: 'easeOut' },
          })}
        >
          <span className="waitlist-badge-dot" />
          The Problem
        </motion.div>

        {/* §6: font-scale — 48/64px heading, bold 700 */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-center max-w-2xl leading-tight"
          {...enter(0.06)}
        >
          Finding somewhere to eat shouldn&apos;t be this hard
        </motion.h2>

        {/* §7 stagger: 40ms per card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-4xl">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-card"
              {...(reduced ? {} : {
                initial: { opacity: 0, y: 32, scale: 0.97 },
                animate: inView ? { opacity: 1, y: 0, scale: 1 } : {},
                transition: { duration: 0.4, delay: 0.14 + i * 0.04, ease: "easeOut" },
              })}
              // §2 press-feedback / §7 scale-feedback: spring hover
              whileHover={reduced ? {} : { scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            >
              {/* §6 number-tabular: font-variant-numeric set in CSS */}
              <div className="stat-number">
                <CountUp target={stat.value} inView={inView} reduced={reduced} />
                {stat.suffix}
              </div>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* §6: body text 16px+, line-height 1.6, secondary opacity */}
        <motion.p
          className="text-base md:text-lg text-[rgba(247,233,255,0.6)] text-center max-w-lg leading-relaxed"
          {...enter(0.28)}
        >
          People save interesting places they see on social media — and never look at them again.
        </motion.p>
      </div>
    </section>
  );
}
