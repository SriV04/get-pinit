import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const getTransporter = () => {
  const host = requireEnv('SMTP_HOST');
  const port = Number(requireEnv('SMTP_PORT'));
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
};

const getSender = () => {
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!from) {
    throw new Error('Missing SMTP_FROM or SMTP_USER env var');
  }
  return from;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br />');

/**
 * Sends internal notification about new waitlist signup
 */
export const sendWaitlistNotification = async (email: string) => {
  const from = getSender();
  const to = process.env.WAITLIST_TO ?? from;
  const transporter = getTransporter();

  await transporter.sendMail({
    from,
    to,
    subject: 'New waitlist signup',
    text: `New waitlist signup: ${email}`,
    html: `<p><strong>New waitlist signup</strong></p><p>${email}</p>`,
  });
};

/**
 * Sends welcome email to the user who joined the waitlist
 */
export const sendWaitlistWelcomeEmail = async (email: string) => {
  const from = getSender();
  const transporter = getTransporter();

  // Read the HTML email template
  let htmlContent: string;
  try {
    const templatePath = join(process.cwd(), 'src', 'emails', 'waitlist-welcome.html');
    htmlContent = readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error('Failed to read email template:', error);
    // Fallback to simple HTML if template not found
    htmlContent = `
      <h1>Welcome to the Pinit waitlist!</h1>
      <p>Thanks for signing up. We'll let you know when early access is ready.</p>
    `;
  }

  await transporter.sendMail({
    from,
    to: email,
    subject: "You're on the Pinit waitlist! 📍",
    text: "Thanks for signing up to the Pinit waitlist! We'll email you when early access drops.",
    html: htmlContent,
  });
};

/**
 * Legacy function - sends notification email (kept for backwards compatibility)
 * @deprecated Use sendWaitlistNotification or sendWaitlistWelcomeEmail instead
 */
export const sendWaitlistEmail = sendWaitlistNotification;

type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

export const sendContactEmail = async ({ name, email, message }: ContactEmailInput) => {
  const from = getSender();
  const to = process.env.CONTACT_TO ?? process.env.WAITLIST_TO ?? from;
  const transporter = getTransporter();

  await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>New contact form message</strong></p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message)}</p>
    `,
  });
};
