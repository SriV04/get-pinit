'use client';

import { Hero } from '@/app/components/Hero';
import { ProblemSection } from '@/app/components/ProblemSection';
import { HowItWorksSection } from '@/app/components/HowItWorksSection';
import { VibeEngineSection } from '@/app/components/VibeEngineSection';
import { BubblesSection } from '@/app/components/BubblesSection';
import { MoreFeaturesSection } from '@/app/components/MoreFeaturesSection';
import { TeamSection } from '@/app/components/TeamSection';
import { ContactSection } from '@/app/components/ContactSection';


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
      <ContactSection />
    </main>
  );
}
