import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const robotoCondensed = localFont({
  src: [
    {
      path: "../../Roboto_Condensed/RobotoCondensed-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../Roboto_Condensed/RobotoCondensed-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../../Roboto_Condensed/RobotoCondensed-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Pinit - Never settle on a restaurant again",
  description: "Organise your saved spots, sync with friends, and find the perfect restaurant for everyone. Join the waitlist for early access.",
  icons: {
    icon: '/AppLogo.png',
    apple: '/AppLogo.png',
  },
  openGraph: {
    title: "Pinit - Never settle on a restaurant again",
    description: "Organise your saved spots, sync with friends, and find the perfect restaurant for everyone. Join the waitlist for early access.",
    url: "https://www.get-pinit.co.uk",
    siteName: "Pinit",
    images: [
      {
        url: "/AppLogo.png",
        width: 1063,
        height: 1063,
        alt: "Pinit App Logo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinit - Never settle on a restaurant again",
    description: "Organise your saved spots, sync with friends, and find the perfect restaurant for everyone. Join the waitlist for early access.",
    images: ["/AppLogo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
