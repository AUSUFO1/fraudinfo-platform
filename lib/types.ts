export type ReportingChannelType = "phone" | "email" | "website";

export interface ReportingChannel {
  type: ReportingChannelType;
  value: string;
  label: string;
  available24h?: boolean; // optional for flexibility
}

export interface Agency {
  id: string;
  name: string;
  shortName?: string; // added for EFCC, IC3, etc.
  description: string;
  category: string;
  region: string;
  country: string;
  phone?: string;
  email?: string;
  verified: boolean;

  languages?: string[];
  emergencyAvailable?: boolean;
  specialties?: string[];

  reportingChannels: ReportingChannel[];
}

export interface FraudResource {
  id: string;
  name: string;
  description: string;
  url: string;
  verified: boolean;
  tags: string[];
}
