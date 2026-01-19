import 'dotenv/config';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

const sendTestEmail = async () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !port || !user || !pass) {
    console.error('Missing SMTP environment variables. Check your .env file.');
    console.log('Required: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS');
    process.exit(1);
  }

  console.log('SMTP Configuration:');
  console.log(`  Host: ${host}`);
  console.log(`  Port: ${port}`);
  console.log(`  Secure: ${secure}`);
  console.log(`  User: ${user}`);
  console.log(`  From: ${from}`);
  console.log('');

  // Load the HTML email template
  const templatePath = join(__dirname, '../src/emails/waitlist-welcome.html');
  const htmlContent = readFileSync(templatePath, 'utf-8');

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection verified\n');

    console.log('Sending waitlist welcome email to sriharsha.vitta@gmail.com...');
    const info = await transporter.sendMail({
      from,
      to: 'sriharsha.vitta@gmail.com',
      subject: "You're In! Welcome to the Pinit Waitlist 🎉",
      text: "You're on the Pinit waitlist! Thanks for joining us. We're building the simplest way to save, organise, and rediscover all those amazing spots you stumble across. Never lose a TikTok again — save places you see on social media and find them instantly when you need them. Keep an eye on your inbox for early access!",
      html: htmlContent,
    });

    console.log('✓ Email sent successfully!');
    console.log(`  Message ID: ${info.messageId}`);
    console.log(`  Response: ${info.response}`);
  } catch (error) {
    console.error('✗ Failed to send email:');
    console.error(error);
    process.exit(1);
  }
};

sendTestEmail();
