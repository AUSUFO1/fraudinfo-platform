export interface ReportingChannel {
  type: 'phone' | 'email' | 'website';
  value: string;
  label: string;
  available24h?: boolean;
}

export interface Agency {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: AgencyCategory;
  region: string;
  country: string;
  website?: string;
  phone?: string;
  email?: string;
  verified: boolean;
  languages: string[];
  emergencyAvailable: boolean;
  reportingChannels: ReportingChannel[];
  specialties: string[];
}

export interface FraudResource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: ResourceCategory;
  verified: boolean;
  icon?: string;
  tags: string[];
  platform?: 'Twitter' | 'LinkedIn' | 'YouTube' | 'Instagram' | 'Facebook';
}

export type AgencyCategory = 
  | 'financial-fraud'
  | 'cybercrime'
  | 'consumer-protection'
  | 'law-enforcement'
  | 'telecom-fraud'
  | 'international';

export type ResourceCategory = 'tool' | 'blog' | 'social' | 'agency';


export interface SearchFilters {
  category: AgencyCategory | 'all';
  region: string;
  resourceType: ResourceCategory | 'all';
}

export interface SearchResults {
  agencies: Agency[];
  resources: FraudResource[];
  total: number;
}