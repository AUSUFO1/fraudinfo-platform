// Agency Types
export interface Agency {
  id: string;
  name: string;
  description: string;
  category: AgencyCategory;
  region: string;
  country: string;
  logo?: string;
  website: string;
  phone?: string;
  email?: string;
  verified: boolean;
  reportingChannels: ReportingChannel[];
}

export type AgencyCategory = 
  | "cybercrime"
  | "financial-fraud"
  | "consumer-protection"
  | "law-enforcement"
  | "international"
  | "telecom-fraud";

export interface ReportingChannel {
  type: "phone" | "email" | "website" | "app";
  value: string;
  label: string;
}

// Fraud Tips Types
export interface FraudTip {
  id: string;
  title: string;
  description: string;
  category: FraudCategory;
  tips: string[];
  severity: "low" | "medium" | "high" | "critical";
}

export type FraudCategory =
  | "phishing"
  | "romance-scam"
  | "investment-fraud"
  | "identity-theft"
  | "online-shopping"
  | "crypto-scam"
  | "phone-scam"
  | "email-scam";

// RSS Feed Types
export interface RSSFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category?: string;
}

export interface RSSSource {
  name: string;
  url: string;
  category: string;
  region: string;
}

// Scam Alert Types
export interface ScamAlert {
  id: string;
  title: string;
  description: string;
  type: FraudCategory;
  urgency: "low" | "medium" | "high";
  date: string;
  source: string;
  affectedRegions: string[];
}