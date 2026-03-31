'use client';

import { motion, useReducedMotion } from 'motion/react';
import { AnimatedBackground } from './AnimatedBackground';
import { WaitlistCTA } from './WaitlistCTA';

export function WaitlistSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="waitlist-scene"
      aria-label="Join the waitlist"
    >
      <AnimatedBackground />

      {/* §6 visual-hierarchy: eyebrow line + CTA card */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-[620px] px-4">
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(247,233,255,0.5)]"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, ease: 'easeOut' },
          })}
        >
          Early Access
        </motion.p>

        <motion.div
          className="w-full"
          {...(reduced ? {} : {
            initial: { opacity: 0, y: 20, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.4, delay: 0.08, ease: "easeOut" },
          })}
        >
          <WaitlistCTA
            headline="Be the first to never settle again."
            supportingText="Early access. Limited spots. No algorithms — just vibes."
            buttonText="Get Early Access"
            badgeText="Closing soon"
          />
        </motion.div>
      </div>
    </section>
  );
}
