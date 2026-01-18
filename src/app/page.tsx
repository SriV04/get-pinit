'use client';

import { useRef } from 'react';
import { Hero } from '@/app/components/Hero';
import { FeaturesSection } from '@/app/components/FeaturesSection';

export default function Home() {
  const featuresRef = useRef<HTMLElement | null>(null);

  const handleChevronClick = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="snap-container">
      <Hero onChevronClick={handleChevronClick} />
      <FeaturesSection ref={featuresRef} />
    </main>
  );
}
