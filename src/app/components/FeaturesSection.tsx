'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Gem, Share2, MapPin, Video, Gavel, Candy, Bell } from 'lucide-react';
import { FeaturesBackground } from './FeaturesBackground';

const FEATURES = [
  {
    title: 'Your Bubbles',
    description: 'Private groups of friends whose taste you actually trust. No influencers. No algorithms. Just real recommendations from real people.',
    icon: Users,
    size: 'medium',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(26, 22, 61, 0.9), rgba(26, 22, 61, 0.8))',
  },
  {
    title: 'TikTok Integration',
    description: 'Save spots straight from your feed',
    icon: Video,
    size: 'medium',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(123, 52, 44, 0.9), rgba(123, 52, 44, 0.8))',
  },
  {
    title: 'Smart Pins',
    description: 'AI-powered recs based on your vibe',
    icon: Sparkles,
    size: 'small',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(28, 77, 33, 0.9), rgba(28, 77, 33, 0.8))',
  },
  {
    title: 'Hidden Gems',
    description: 'Skip tourist traps, find local treasures',
    icon: Gem,
    size: 'small',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(26, 22, 61, 0.9), rgba(26, 22, 61, 0.8))',
  },
  {
    title: 'Live Map View',
    description: 'See every pin on an interactive globe',
    icon: MapPin,
    size: 'medium',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(123, 52, 44, 0.9), rgba(123, 52, 44, 0.8))',
  },
  {
    title: 'Never Argue Again',
    description: 'End the "where should we eat?" debate instantly',
    icon: Gavel,
    size: 'medium',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(28, 77, 33, 0.9), rgba(28, 77, 33, 0.8))',
  },
  {
    title: 'Sweet Treat Fix',
    description: 'Find the closest place to get that sugar rush',
    icon: Candy,
    size: 'small',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(26, 22, 61, 0.9), rgba(26, 22, 61, 0.8))',
  },
  {
    title: 'Real-Time Alerts',
    description: "Get notified when you're near a wishlist spot",
    icon: Bell,
    size: 'small',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(123, 52, 44, 0.9), rgba(123, 52, 44, 0.8))',
  },
  {
    title: 'Share Lists',
    description: 'Curate and share your perfect itinerary',
    icon: Share2,
    size: 'small',
    gradient: '',
    customGradient: 'linear-gradient(to bottom right, rgba(28, 77, 33, 0.9), rgba(28, 77, 33, 0.8))',
  },
];

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'col-span-2 row-span-2 md:col-span-2 md:row-span-2';
    case 'medium':
      return 'col-span-2 md:col-span-1 row-span-1';
    case 'small':
      return 'col-span-1 row-span-1';
    default:
      return 'col-span-1 row-span-1';
  }
};

export const FeaturesSection = forwardRef<HTMLElement>(function FeaturesSection(_, ref) {
  return (
    <section className="features-scene" ref={ref}>
      <FeaturesBackground />

      <div className="features-content">
        <header className="features-header">
          <h2>Pin places you'll actually love</h2>
          <p>
            Pinit blends friends, taste, and real-time energy into a playful map
            you can trust. Drop a pin, plan the vibe, and never miss a gem.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4 max-w-6xl mx-auto px-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';

            return (
              <motion.article
                className={`
                  ${getSizeClasses(feature.size)}
                  relative overflow-hidden rounded-3xl
                  ${feature.customGradient ? '' : `bg-gradient-to-br ${feature.gradient}`}
                  backdrop-blur-xl border border-white/40
                  p-6 md:p-8
                  group cursor-pointer
                  hover:border-white/60 transition-all duration-300
                  shadow-lg hover:shadow-xl
                `}
                style={feature.customGradient ? { background: feature.customGradient } : {}}
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background gradient orb */}
                <div
                  className={`
                    absolute -right-8 -top-8 w-32 h-32
                    ${feature.customGradient ? '' : `bg-gradient-to-br ${feature.gradient}`}
                    rounded-full blur-3xl opacity-40
                    group-hover:opacity-60 transition-opacity duration-300
                  `}
                  style={feature.customGradient ? { background: feature.customGradient } : {}}
                />

                {/* Content */}
                <div className={`relative z-10 flex flex-col h-full ${isLarge ? 'justify-between' : 'justify-start'}`}>
                  <div className={`
                    ${isLarge ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12'}
                    rounded-2xl bg-white/80 backdrop-blur-sm
                    flex items-center justify-center
                    mb-4 group-hover:scale-110 transition-transform duration-300
                    shadow-md
                  `}>
                    <Icon className={`${isLarge ? 'w-8 h-8 md:w-10 md:h-10' : 'w-6 h-6'} text-gray-800`} />
                  </div>

                  <div>
                    <h3 className={`
                      ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
                      font-bold text-white mb-2 drop-shadow-sm
                    `}>
                      {feature.title}
                    </h3>
                    <p className={`
                      ${isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'}
                      text-white/90 leading-relaxed drop-shadow-sm
                    `}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
});
