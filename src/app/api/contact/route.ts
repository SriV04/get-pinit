import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  let data: ContactPayload | undefined;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = data?.name?.trim();
  const email = data?.email?.trim().toLowerCase();
  const message = data?.message?.trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: 'Please include a short message.' },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form submission error:', error);

    const message =
      error instanceof Error ? error.message : 'Failed to send message. Please try again.';
    const isConfigError = message.startsWith('Missing SMTP_');

    return NextResponse.json(
      {
        ok: false,
        error: isConfigError
          ? 'Email is not configured on the server yet.'
          : 'Failed to send message. Please try again.',
      },
      { status: 500 }
    );
  }
}
