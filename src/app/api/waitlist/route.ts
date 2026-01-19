import { NextResponse } from 'next/server';
import { sendWaitlistNotification, sendWaitlistWelcomeEmail } from '@/lib/email';
import { addToWaitlist } from '@/lib/supabase';

export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: { email?: string } | undefined;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const email = data?.email?.trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
  }

  try {
    // Add email to Supabase waitlist table
    const { success, isNew, error } = await addToWaitlist(email);
    
    if (!success) {
      console.error('Failed to add to waitlist:', error);
      return NextResponse.json({ ok: false, error: 'Failed to save to waitlist.' }, { status: 500 });
    }

    // Only send emails for new signups (not duplicates)
    if (isNew) {
      // Send welcome email to the user
      await sendWaitlistWelcomeEmail(email);
      
      // Send notification email to admin (optional - won't fail if it errors)
      try {
        await sendWaitlistNotification(email);
      } catch (notifyError) {
        console.error('Failed to send admin notification (non-critical):', notifyError);
      }
    }

    return NextResponse.json({ ok: true, isNew });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to process signup.' }, { status: 500 });
  }
}
