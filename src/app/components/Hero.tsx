'use client';

import Image from 'next/image';
import { GlobeAnimationCanvas } from '@/app/components/GlobeAnimationCanvas';

export function Hero() {
  return (
    <section className="hero-scene">
      <div className="hero-sky">
        <div className="hero-logo">
          <Image
            src="/pinit-logo.png"
            alt="Pinit"
            width={1200}
            height={1200}
            priority
          />
        </div>
      </div>
      <GlobeAnimationCanvas />
    </section>
  );
}
