'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Search, Gavel, List, Tag, BookOpen, Candy } from 'lucide-react';
import { CanvasText } from '@/components/ui/canvas-text';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { StarBackground } from './StarBackground';

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
      <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-xl bg-[rgba(8,4,18,0.88)] p-6 shadow-[0px_0px_27px_0px_rgba(20,10,40,0.8)]">
        <div className="w-fit rounded-lg border border-[rgba(255,155,214,0.25)] bg-[rgba(255,155,214,0.07)] p-2">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="pt-0.5 text-xl font-bold text-[#f7e9ff] md:text-2xl leading-snug">
            {title}
          </h3>
          <p className="text-sm text-[rgba(247,233,255,0.55)] md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const CARDS = [
  {
    icon: <Search className="h-4 w-4 text-[#ff9bd6]" />,
    title: 'Magic Search',
    description: "'Cosy date night', 'Spicy ramen under £15', 'Vibes like Soho but quieter' — just type it. We get it.",
  },
  {
    icon: <Gavel className="h-4 w-4 text-[#ff9bd6]" />,
    title: 'Gavel',
    description: "Can't decide? We give you the top 5 tailored picks so you never have to debate the group chat again.",
  },
  {
    icon: <List className="h-4 w-4 text-[#ff9bd6]" />,
    title: 'Top Lists',
    description: 'Specific vibe or cuisine in mind? We curate lists of the best eats around you, updated constantly.',
  },
  {
    icon: <Tag className="h-4 w-4 text-[#ff9bd6]" />,
    title: 'Dietary Tags',
    description: 'Every restaurant scored for your specific dietary needs — vegan, gluten-free, halal and more. No guesswork.',
  },
  {
    icon: <BookOpen className="h-4 w-4 text-[#ff9bd6]" />,
    title: 'Menu Recs',
    description: "Can't decide what to order? We surface the top picks from the menu so you don't have to overthink it.",
  },
  {
    icon: <Candy className="h-4 w-4 text-[#ff9bd6]" />,
    title: 'Sweet Treat',
    description: 'Fancy something sweet nearby? One tap shows you every dessert spot to hit your sugar craving.',
  },
];

export function MoreFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="section-dark" ref={sectionRef} aria-label="More features" style={{ background: '#080808' }}>
      <StarBackground />

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
              And There&apos;s More
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f7e9ff] leading-tight"
              {...(reduced ? {} : {
                initial: { opacity: 0, y: 20 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.4, delay: 0.06, ease: 'easeOut' },
              })}
            >
              Everything else you{' '}
              <CanvasText
                text="didn't know you needed"
                colors={[
                  'rgba(255, 155, 214, 1)',
                  'rgba(220, 130, 255, 0.9)',
                  'rgba(255, 155, 214, 0.8)',
                  'rgba(200, 110, 255, 0.9)',
                  'rgba(255, 155, 214, 1)',
                ]}
                animationDuration={14}
              />
            </motion.h2>
          </div>

          {/* Bento grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {CARDS.map((card, i) => (
              <GridItem
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
                delay={0.1 + i * 0.07}
                inView={inView}
                reduced={reduced}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
