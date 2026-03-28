import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Syne } from "next/font/google";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0b1220",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fraudinfo.com"),
  title: "FraudInfo | Fraud Intelligence and Response Workspace",
  description:
    "FraudInfo helps people verify threats, find reporting agencies, monitor live scam signals, and act faster when fraud happens.",
  keywords: [
    "fraud prevention",
    "scam alerts",
    "fraud reporting",
    "agency lookup",
    "scam research",
    "consumer protection",
    "cyber fraud",
    "fraud intelligence",
  ],
  authors: [{ name: "FraudInfo" }],
  openGraph: {
    title: "FraudInfo | Fraud Intelligence and Response Workspace",
    description:
      "A cleaner way to verify suspicious activity, discover trusted agencies, and respond to fraud with confidence.",
    url: "https://fraudinfo.com",
    siteName: "FraudInfo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FraudInfo dashboard preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FraudInfo | Fraud Intelligence and Response Workspace",
    description:
      "Verify suspicious activity, find the right agencies, and move from uncertainty to action faster.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body
      className={`${inter.variable} ${syne.variable} page-shell bg-bg-dark font-[var(--font-inter)] text-text-primary antialiased`}
    >
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Analytics />
    </body>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
