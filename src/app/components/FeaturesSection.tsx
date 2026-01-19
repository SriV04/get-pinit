'use client';

import { forwardRef } from 'react';
import { Sparkles, Users, Gem, Send, Gavel, Candy, Bell, Check } from 'lucide-react';
import { FeaturesBackground } from './FeaturesBackground';
import { CircularCarousel } from './CircularCarousel';

const FEATURES = [
  {
    title: 'TikTok / Instagram Integration',
    description: 'That restaurant reel you saved three months ago? We pull it out automatically. Stop doomscrolling your saves trying to find it.',
    icon: Send,
    customGradient: 'linear-gradient(to bottom right, rgba(61, 22, 57, 0.9), rgba(61, 22, 57, 0.8))',
  },
  {
    title: 'Hidden Gems',
    description: 'The spots your friends keep pinning that nobody else knows about yet. Find them before the queue does.',
    icon: Gem,
    customGradient: 'linear-gradient(to bottom right, rgba(61, 22, 57, 0.9), rgba(61, 22, 57, 0.8))',
  },
  {
    title: 'Real-Time Alerts',
    description: "Walk past somewhere you pinned six months ago? We'll remind you. Your saved spots, surfaced exactly when they're useful.",
    icon: Bell,
    customGradient: 'linear-gradient(to bottom right, rgba(61, 22, 57, 0.9), rgba(61, 22, 57, 0.8))',
  },
  {
    title: 'Your Bubbles',
    description: 'Create a bubble with your group and we\'ll remember everyone\'s dietary requirements, vibes, and preferences. Finding somewhere that actually works for everyone? Done automatically.',
    icon: Users,
    customGradient: 'linear-gradient(to bottom right, rgba(61, 22, 57, 0.9), rgba(61, 22, 57, 0.8))',
  },
  {
    title: 'Smart Pins',
    description: 'Pins that know what you want before you do. Filter by diet, price, cuisine, and more—instantly.',
    icon: Sparkles,
    customGradient: 'linear-gradient(to bottom right, rgba(61, 22, 57, 0.9), rgba(61, 22, 57, 0.8))',
  },
  {
    title: 'Sweet Treat Fix',
    description: 'Need something sweet, need it now. One tap to find the closest dessert spot.',
    icon: Candy,
    customGradient: 'linear-gradient(to bottom right, rgba(61, 22, 57, 0.9), rgba(61, 22, 57, 0.8))',
  },
  {
    title: 'Gavel : Never Argue Again',
    description: "Swipe right on places you'd go, left on ones you wouldn't. No more hour-long group chat debates, we will find a spot everyone loves.",
    icon: Gavel,
    customGradient: 'linear-gradient(to bottom right, rgba(61, 22, 57, 0.9), rgba(61, 22, 57, 0.8))',
  },
];

const PROBLEMS = [
  "Restaurants saved directly from your reels",
  "Real time options for every occasion",
  "Options for that one fussy friend",
  "Overpriced options"
];

export const FeaturesSection = forwardRef<HTMLElement>(function FeaturesSection(_, ref) {
  return (
    <section className="features-scene" ref={ref}>
      <FeaturesBackground />

      <div className="features-content">
        <header className="features-header flex-shrink-0 mt-4 md:mt-6 lg:mt-8">
          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-12 md:mb-12 lg:mb-20 text-center">
            Food is never worth settling for...
          </h1>

          {/* Problem Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {PROBLEMS.map((problem, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-1.5">
                {/* Tick Icon */}
                <Check className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 text-green-600 stroke-[2.5]" />
                {/* Problem Text */}
                <p className="text-xs md:text-sm lg:text-base text-black/80 leading-tight">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* Circular Carousel */}
        <div className="flex-1 flex items-center">
          <CircularCarousel features={FEATURES} />
        </div>
      </div>
    </section>
  );
});
