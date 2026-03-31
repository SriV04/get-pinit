'use client';

import { Hero } from '@/app/components/Hero';
import { ProblemSection } from '@/app/components/ProblemSection';
import { HowItWorksSection } from '@/app/components/HowItWorksSection';
import { VibeEngineSection } from '@/app/components/VibeEngineSection';
import { BubblesSection } from '@/app/components/BubblesSection';
import { MoreFeaturesSection } from '@/app/components/MoreFeaturesSection';
import { TeamSection } from '@/app/components/TeamSection';


export default function Home() {
  return (
    <main className="snap-container">
      <Hero onChevronClick={() => {}} />
      <ProblemSection />
      <HowItWorksSection />
      <VibeEngineSection />
      <BubblesSection />
      <MoreFeaturesSection />
      <TeamSection />
    </main>
  );
}
