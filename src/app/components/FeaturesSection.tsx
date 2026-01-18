'use client';

import { forwardRef } from 'react';
import { WaitlistCTA } from '@/app/components/WaitlistCTA';

const FEATURES = [
  {
    title: 'Personalised recs',
    description: 'See spots tailored to your mood, taste, and the people you love.',
  },
  {
    title: 'Friend-powered finds',
    description: 'Pin the places your crew keeps whispering about.',
  },
  {
    title: 'Hidden gems',
    description: 'Trade the tourist traps for local-only treasures.',
  },
  {
    title: 'Save & share pins',
    description: 'Keep your shortlist tidy and share it with one tap.',
  },
  {
    title: 'Map-first discovery',
    description: 'A globe view that makes every plan feel effortless.',
  },
];

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
          <h2>Pin places you’ll actually love</h2>
          <p>
            Pinit blends friends, taste, and real-time energy into a playful map
            you can trust. Drop a pin, plan the vibe, and never miss a gem.
          </p>
        </header>

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon" aria-hidden="true">
                <span />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="features-cta">
          <WaitlistCTA
            headline="Get early access"
            supportingText="Lock in your spot before the first invites go out."
            buttonText="Request invite"
          />
        </div>
      </div>
    </section>
  );
});
