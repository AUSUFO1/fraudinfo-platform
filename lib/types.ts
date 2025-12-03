export type ReportingChannelType = "phone" | "email" | "website";

export interface ReportingChannel {
  type: ReportingChannelType;
  value: string;
  label: string;
}

export interface Agency {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  country: string;
  website: string;
  phone?: string;
  email?: string;
  verified: boolean;
  reportingChannels: ReportingChannel[];
}
