import type { Metadata } from 'next';
import { ContactSection } from '@/app/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact | Pinit',
  description: 'Get in touch with the Pinit team.',
  alternates: {
    canonical: 'https://www.get-pinit.co.uk/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="h-screen overflow-y-auto">
      <ContactSection />
    </main>
  );
}
