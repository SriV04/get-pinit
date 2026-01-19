'use client';

import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Gem, Share2, MapPin, Video, Gavel, Candy, Bell } from 'lucide-react';

const FEATURES = [
  {
    title: 'Your Bubbles',
    description: 'Create trusted circles of friends who share the best spots. See what your crew loves in real-time.',
    icon: Users,
    size: 'large',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'TikTok Integration',
    description: 'Save spots straight from your feed',
    icon: Video,
    size: 'medium',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Smart Pins',
    description: 'AI-powered recs based on your vibe',
    icon: Sparkles,
    size: 'small',
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    title: 'Hidden Gems',
    description: 'Skip tourist traps, find local treasures',
    icon: Gem,
    size: 'small',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Live Map View',
    description: 'See every pin on an interactive globe',
    icon: MapPin,
    size: 'medium',
    gradient: 'from-rose-500/20 to-orange-500/20',
  },
  {
    title: 'Never Argue Again',
    description: 'End the "where should we eat?" debate instantly',
    icon: Gavel,
    size: 'medium',
    gradient: 'from-amber-500/20 to-red-500/20',
  },
  {
    title: 'Sweet Treat Fix',
    description: 'Find the closest place to get that sugar rush',
    icon: Candy,
    size: 'small',
    gradient: 'from-pink-500/20 to-fuchsia-500/20',
  },
  {
    title: 'Real-Time Alerts',
    description: "Get notified when you're near a wishlist spot",
    icon: Bell,
    size: 'small',
    gradient: 'from-blue-500/20 to-violet-500/20',
  },
  {
    title: 'Share Lists',
    description: 'Curate and share your perfect itinerary',
    icon: Share2,
    size: 'small',
    gradient: 'from-indigo-500/20 to-purple-500/20',
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
      <div className="features-sky" aria-hidden="true">
        <div className="features-orb features-orb--left" />
        <div className="features-orb features-orb--right" />
        <div className="features-dots" />
      </div>

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
                  bg-gradient-to-br ${feature.gradient}
                  backdrop-blur-xl border border-white/10
                  p-6 md:p-8
                  group cursor-pointer
                  hover:border-white/20 transition-all duration-300
                `}
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
                <div className={`
                  absolute -right-8 -top-8 w-32 h-32
                  bg-gradient-to-br ${feature.gradient}
                  rounded-full blur-3xl opacity-30
                  group-hover:opacity-50 transition-opacity duration-300
                `} />

                {/* Content */}
                <div className={`relative z-10 flex flex-col h-full ${isLarge ? 'justify-between' : 'justify-start'}`}>
                  <div className={`
                    ${isLarge ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12'}
                    rounded-2xl bg-white/10 backdrop-blur-sm
                    flex items-center justify-center
                    mb-4 group-hover:scale-110 transition-transform duration-300
                  `}>
                    <Icon className={`${isLarge ? 'w-8 h-8 md:w-10 md:h-10' : 'w-6 h-6'} text-white`} />
                  </div>

                  <div>
                    <h3 className={`
                      ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
                      font-bold text-white mb-2
                    `}>
                      {feature.title}
                    </h3>
                    <p className={`
                      ${isLarge ? 'text-base md:text-lg' : 'text-sm md:text-base'}
                      text-gray-300 leading-relaxed
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
