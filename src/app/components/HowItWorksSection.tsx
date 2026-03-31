'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { Share2, Sparkles, Bell } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { CanvasText } from '@/components/ui/canvas-text';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  inView: boolean;
  reduced: boolean;
}

const GridItem = ({ icon, title, description, delay = 0, inView, reduced }: GridItemProps) => (
  <motion.div
    className="flex-1"
    {...(reduced ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.45, delay, ease: 'easeOut' },
    })}
  >
    <div className="relative h-full rounded-2xl border border-[rgba(255,255,255,0.08)] p-2 md:rounded-3xl md:p-3">
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
      <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl bg-[rgba(8,4,18,0.88)] p-5 md:p-7 shadow-[0px_0px_27px_0px_rgba(20,10,40,0.8)]">
        <div className="w-fit rounded-xl border border-[rgba(255,155,214,0.25)] bg-[rgba(255,155,214,0.07)] p-2 md:p-3">
          {icon}
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-end">
          <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#f7e9ff] leading-snug">
            {title}
          </h3>
          <p className="text-xs md:text-base lg:text-lg text-[rgba(247,233,255,0.6)] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="section-dark" ref={sectionRef} aria-label="How Pinit works">
      <AnimatedBackground />

      <div className="section-content justify-center">
        <div className="flex flex-col gap-6 w-full py-8 lg:py-12">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <motion.div
              className="waitlist-badge self-start"
              {...(reduced ? {} : {
                initial: { opacity: 0, y: -12 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.35, ease: 'easeOut' },
              })}
            >
              <span className="waitlist-badge-dot" />
              How It Works
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f7e9ff] leading-tight"
              {...(reduced ? {} : {
                initial: { opacity: 0, y: 20 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.4, delay: 0.06, ease: 'easeOut' },
              })}
            >
              Three steps to your{' '}
              <CanvasText
                text="next favourite"
                colors={[
                  'rgba(255, 155, 214, 1)',
                  'rgba(220, 130, 255, 0.9)',
                  'rgba(255, 155, 214, 0.8)',
                  'rgba(200, 110, 255, 0.9)',
                  'rgba(255, 155, 214, 1)',
                ]}
                animationDuration={10}
              />
              {' '}restaurant
            </motion.h2>
          </div>

          {/* 2-column grid: left = Share + Discover, right = Build + phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">

            {/* Left column: Share + Discover stacked */}
            <div className="flex flex-col gap-4">
              <GridItem
                icon={<Share2 className="h-6 w-6 text-[#ff9bd6]" />}
                title="Share"
                description="See a cool restaurant? Swap that save button to a share to your Pinit profile with a tap. We extract the location and pin it to your map. As you share we build up your taste or
                and all your saved places in one map when you need them"
                delay={0.1}
                inView={inView}
                reduced={reduced}
              />
              <GridItem
                icon={<Bell className="h-6 w-6 text-[#ff9bd6]" />}
                title="Discover"
                description="Get notified the moment you're near a restaurant you've saved, or one that matches your taste profile. No more endless scrolling or FOMO. Just the right places, at the right time."
                delay={0.2}
                inView={inView}
                reduced={reduced}
              />
            </div>

            {/* Right column: Build card + phone mockup stacked */}
            <div className="flex flex-col gap-4">
              <GridItem
                icon={<Sparkles className="h-6 w-6 text-[#ff9bd6]" />}
                title="Build Your Taste Profile"
                description="We extract the location and vibes across 26 dimensions. The more you share, the better we know your taste."
                delay={0.15}
                inView={inView}
                reduced={reduced}
              />

              <motion.div
                className="flex justify-center"
                {...(reduced ? {} : {
                  initial: { opacity: 0, y: 20 },
                  animate: inView ? { opacity: 1, y: 0 } : {},
                  transition: { duration: 0.5, delay: 0.25, ease: 'easeOut' },
                })}
              >
                <div className="phone-mockup">
                  <Image
                    src="/share-screen2.png"
                    alt="Pinit app share screen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 180px, 260px"
                  />
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
