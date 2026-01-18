'use client';

import { useId, useState } from 'react';

type WaitlistCTAProps = {
  headline: string;
  supportingText: string;
  buttonText?: string;
  badgeText?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistCTA({
  headline,
  supportingText,
  buttonText = 'Join waitlist',
  badgeText = 'Limited invites',
}: WaitlistCTAProps) {
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
    <div className="waitlist-card">
      <div className="waitlist-badge">
        <span className="waitlist-badge-dot" />
        {badgeText}
      </div>
      <div className="waitlist-heading">
        <h2>{headline}</h2>
        <p>{supportingText}</p>
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
          {status === 'submitting' ? 'Joining…' : buttonText}
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
  );
}
