'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Mail, MessageSquare, Send } from 'lucide-react';
import { StarBackground } from './StarBackground';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  message: '',
};

export function ContactSection() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const errorId = useId();
  const reduced = useReducedMotion() ?? false;

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setError('');
      if (status === 'success') {
        setStatus('idle');
      }
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const message = form.message.trim();

    if (name.length < 2) {
      setError('Please enter your name.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (message.length < 10) {
      setError('Please add a short message so we know what to reply to.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.error || 'Request failed');
      }

      setForm(INITIAL_FORM);
      setStatus('success');
    } catch (submitError) {
      console.error('Contact form submission failed', submitError);
      setStatus('idle');
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.45, delay, ease: 'easeOut' as const },
        };

  return (
    <section
      className="relative overflow-hidden bg-[#080808] text-[#f7e9ff] min-h-[100svh] md:h-screen"
      style={{ scrollSnapAlign: 'start' }}
      aria-label="Contact Pinit"
    >
      <StarBackground />

      <div className="section-content justify-center">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-center max-w-6xl mx-auto w-full">
          <motion.div className="text-center lg:text-left space-y-5" {...fadeUp(0)}>
            <div className="waitlist-badge self-center lg:self-start">
              <span className="waitlist-badge-dot" />
              Contact
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#f7e9ff]">
                Got a complaint, feedback
                <span className="block font-[family-name:var(--font-serif)] italic font-normal text-[#ff9bd6]">
                  or just have a question?
                </span>
              </h2>

              <p className="text-base md:text-lg leading-relaxed text-[rgba(247,233,255,0.62)] max-w-xl">
                Send us a note and we&apos;ll get back to you directly. Beta access requests,
                feedback, press, investor intros, all of it belongs here.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
              {[
                {
                  icon: Mail,
                  title: 'Direct replies',
                  copy: 'Every message lands straight in our inbox.',
                },
                {
                  icon: MessageSquare,
                  title: 'Anything Pinit',
                  copy: 'Product questions, partnerships, or early access.',
                },
              ].map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-white/12 bg-[linear-gradient(135deg,rgba(88,23,128,0.42),rgba(40,9,66,0.72))] backdrop-blur-xl px-5 py-4 text-left shadow-[0_18px_40px_rgba(21,3,36,0.34)]"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(255,155,214,0.12)] text-[#ff9bd6]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-[#f7e9ff]">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[rgba(247,233,255,0.58)]">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-[32px] border border-white/12 bg-[linear-gradient(135deg,rgba(88,23,128,0.88),rgba(40,9,66,0.84))] p-5 sm:p-6 lg:p-7 shadow-[0_24px_60px_rgba(21,3,36,0.45)] backdrop-blur-xl"
            {...fadeUp(0.08)}
          >
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.18em] text-[rgba(247,233,255,0.48)]">
                    Name
                  </span>
                  <input
                    id={nameId}
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Your name"
                    disabled={status === 'submitting'}
                    className="contact-input"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.18em] text-[rgba(247,233,255,0.48)]">
                    Email
                  </span>
                  <input
                    id={emailId}
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@domain.com"
                    disabled={status === 'submitting'}
                    className="contact-input"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium uppercase tracking-[0.18em] text-[rgba(247,233,255,0.48)]">
                  Message
                </span>
                <textarea
                  id={messageId}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Tell us what you're working on, what you'd like to ask, or how we can help."
                  disabled={status === 'submitting'}
                  className="contact-textarea min-h-[170px] resize-none leading-relaxed"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  required
                />
              </label>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-[rgba(247,233,255,0.48)]">
                  We usually reply from the same inbox within a couple of days.
                </p>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgba(255,255,255,0.96)] px-5 py-3 text-sm font-semibold text-[#2b0b3d] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,155,214,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  <span>{status === 'submitting' ? 'Sending…' : 'Send Message'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-4 text-sm text-[#ffd8ea]" role="alert" id={errorId}>
                {error}
              </p>
            )}

            {status === 'success' && !error && (
              <p className="mt-4 text-sm text-[#ffd8ea]" role="status">
                Message sent. We&apos;ll be in touch shortly.
              </p>
            )}

            <div className="mt-6 border-t border-white/10 pt-4 text-sm text-[rgba(247,233,255,0.58)]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span>Legal</span>
                <Link
                  href="/privacy-policy"
                  className="text-[#ffd8ea] transition hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="text-[#ffd8ea] transition hover:text-white"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
