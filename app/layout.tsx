import type { Metadata, Viewport } from 'next';
import { Analytics } from "@vercel/analytics/next"
import { Poppins } from 'next/font/google';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'FraudInfo — Global Fraud Prevention Platform',
  description:
    'Stay protected from online fraud worldwide. Access verified fraud-reporting agencies, prevention guides, and real-time scam alerts — all in one trusted global platform.',
  keywords: [
    'fraud prevention',
    'scam alerts',
    'global online fraud',
    'cybersecurity',
    'fraud reporting',
    'fraud agencies',
    'scam checker',
    'internet safety',
  ],
  authors: [{ name: 'FraudInfo' }],

  openGraph: {
    title: 'FraudInfo — Global Fraud Prevention Platform',
    description:
      'Your trusted global hub for fraud awareness, scam detection, and prevention resources.',
    url: 'https://fraudinfo.com',
    siteName: 'FraudInfo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FraudInfo Global Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FraudInfo — Global Fraud Prevention Platform',
    description:
      'Protect yourself from online fraud with real-time alerts and verified prevention resources.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body
      className={`${poppins.variable} font-poppins antialiased bg-[#0F0F11] text-white`}
    >
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </body>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}