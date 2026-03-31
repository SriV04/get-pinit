'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Share2, Sparkles, Bell, ArrowRight } from 'lucide-react';

// §4 style-match: clean light section — no heavy particle bg for investor readability
// §6 whitespace-balance: generous spacing between elements

const STEPS = [
  {
    number: '01',
    icon: Share2,
    title: 'Share',
    description:
      'See a restaurant on Instagram or TikTok? Share the reel directly to Pinit. No more saving posts and forgetting.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Build',
    description:
      'We extract the location and vibes automatically. The more you share and like, the better we understand your taste.',
  },
  {
    number: '03',
    icon: Bell,
    title: 'Discover',
    description:
      "Get notified the moment you're near a restaurant you've saved. The right place, surfaced at exactly the right time.",
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  return (
    // §4 style-match: subtle gradient — not flat white, not heavy particles
    <section
      className="how-it-works-scene"
      ref={sectionRef}
      aria-label="How Pinit works"
    >
      <div className="section-content justify-center items-center gap-6 md:gap-10">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,35,96,0.09)] border border-[rgba(107,35,96,0.18)] text-[#42143d] text-xs font-semibold uppercase tracking-[0.15em]"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: -12 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.35, ease: 'easeOut' },
          })}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6b2360]" />
          How It Works
        </motion.div>

        {/* §6 weight-hierarchy: large bold heading */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-[#1a0524] text-center max-w-2xl leading-tight"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: 20 },
            animate: inView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.4, delay: 0.06, ease: "easeOut" },
          })}
        >
          Three steps to your next favourite restaurant
        </motion.h2>

        {/* §5 layout: horizontal on md+, vertical stack on mobile */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3 w-full max-w-4xl">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex flex-col md:flex-row items-center flex-1 min-w-0">
                {/* §4 elevation-consistent: glass card with border + shadow */}
                <motion.div
                  className="hiw-card flex-1 w-full"
                  {...(reduced ? {} : {
                    initial: { opacity: 0, y: 28 },
                    animate: inView ? { opacity: 1, y: 0 } : {},
                    transition: { duration: 0.4, delay: 0.12 + i * 0.04, ease: "easeOut" },
                  })}
                  // §7 scale-feedback + §2 press-feedback: spring hover
                  whileHover={reduced ? {} : {
                    y: -4,
                    transition: { type: 'spring', stiffness: 400, damping: 22 },
                  }}
                >
                  {/* §6 weight-hierarchy: step number as small label */}
                  <span className="hiw-step-number">{step.number}</span>

                  {/* Icon container */}
                  <motion.div
                    className="hiw-icon-wrap"
                    whileHover={reduced ? {} : {
                      scale: 1.08,
                      rotate: -4,
                      transition: { type: 'spring', stiffness: 350 },
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="w-7 h-7 text-[#6b2360]" />
                  </motion.div>

                  {/* Text — §6: 500 medium for title, 400 regular for body, 1.6 line-height */}
                  <h3 className="text-lg md:text-xl font-bold text-[#1a0524] mt-1">{step.title}</h3>
                  <p className="text-sm md:text-base text-[#1a0524]/60 leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </motion.div>

                {/* §5 connector: only between cards, desktop only */}
                {i < STEPS.length - 1 && (
                  <motion.div
                    className="hidden md:flex items-center justify-center flex-shrink-0 px-1"
                    aria-hidden="true"
                    {...(reduced ? {} : {
                      initial: { opacity: 0 },
                      animate: inView ? { opacity: 1 } : {},
                      transition: { duration: 0.3, delay: 0.28 + i * 0.04 },
                    })}
                  >
                    <ArrowRight className="w-5 h-5 text-[#6b2360]/30" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
