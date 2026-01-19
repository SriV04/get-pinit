import { NextResponse } from 'next/server';
import { sendWaitlistEmail } from '@/lib/email';

export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: { email?: string } | undefined;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const email = data?.email?.trim();
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
  }

  try {
    await sendWaitlistEmail(email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to send waitlist email', error);
    return NextResponse.json({ ok: false, error: 'Failed to send email.' }, { status: 500 });
  }
}
