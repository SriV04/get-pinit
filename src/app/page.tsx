'use client';

import { useState } from 'react';
import { Hero } from '@/app/components/Hero';
import { IntroAnimation } from '@/app/components/IntroAnimation';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      {!showIntro && <Hero />}
    </>
  );
}
