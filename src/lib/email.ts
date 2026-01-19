import nodemailer from 'nodemailer';

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

export const sendWaitlistEmail = async (email: string) => {
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!from) {
    throw new Error('Missing SMTP_FROM or SMTP_USER env var');
  }
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
