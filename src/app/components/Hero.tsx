'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { GlobeAnimationCanvas } from '@/app/components/GlobeAnimationCanvas';

type HeroProps = {
  onChevronClick?: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Hero({ onChevronClick }: HeroProps) {
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus('success');
    setEmail('');
  };
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

      <div className="hero-content">
        <div className="waitlist-badge">
          <span className="waitlist-badge-dot" />
          Limited invites
        </div>
        <div className="waitlist-heading">
          <h2>Join the waitlist for early access</h2>
          <p>Unlock early invites, launch perks, and first-dibs on new drops.</p>
        </div>
        <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor={inputId}>
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            disabled={status === 'submitting'}
            required
          />
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Joining…' : 'Join waitlist'}
          </button>
        </form>
        {error && (
          <p className="waitlist-error" role="alert" id={errorId}>
            {error}
          </p>
        )}
        {status === 'success' && !error && (
          <p className="waitlist-success" role="status">
            You are on the list! We will reach out with early access soon.
          </p>
        )}
      </div>

      <button className="hero-chevron" type="button" onClick={onChevronClick}>
        <span className="sr-only">Scroll to features</span>
        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <GlobeAnimationCanvas />
    </section>
  );
}
