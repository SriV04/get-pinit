'use client';

import { useRef } from 'react';
import { Hero } from '@/app/components/Hero';
import { FeaturesSection } from '@/app/components/FeaturesSection';
import { ProblemSection } from '@/app/components/ProblemSection';
import { HowItWorksSection } from '@/app/components/HowItWorksSection';
import { VibeEngineSection } from '@/app/components/VibeEngineSection';
import { BubblesSection } from '@/app/components/BubblesSection';
import { TeamSection } from '@/app/components/TeamSection';
import { WaitlistSection } from '@/app/components/WaitlistSection';

export default function Home() {
  const featuresRef = useRef<HTMLElement | null>(null);

  const handleChevronClick = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="snap-container">
      <Hero onChevronClick={handleChevronClick} />
      <FeaturesSection ref={featuresRef} />
      <ProblemSection />
      <HowItWorksSection />
      <VibeEngineSection />
      <BubblesSection />
      <TeamSection />
      <WaitlistSection />
    </main>
  );
}
