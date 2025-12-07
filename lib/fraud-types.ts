import { AgencyCategory } from '@/types/fraud.types';
import { LucideIcon } from 'lucide-react';

export interface FraudType {
  id: string;
  name: string;
  description: string;
  examples: string[];
  recommendedCategories: AgencyCategory[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  icon: string; // lucide-react icon name
}

export interface PreparationItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  icon: string; // lucide-react icon name
}

// Fraud Types Database
export const FRAUD_TYPES: FraudType[] = [
  {
    id: 'romance-scam',
    name: 'Romance Scam',
    description: 'Someone you met online is asking for money or gifts',
    examples: [
      'Dating site matches asking for money',
      'Online relationship leading to financial requests',
      'Fake military personnel romance scams'
    ],
    recommendedCategories: ['cybercrime', 'financial-fraud'],
    urgency: 'high',
    icon: 'Heart'
  },
  {
    id: 'investment-fraud',
    name: 'Investment Fraud',
    description: 'Fake investment schemes, cryptocurrency scams, or Ponzi schemes',
    examples: [
      'Cryptocurrency investment scams',
      'Ponzi or pyramid schemes',
      'Fake stock trading platforms',
      'Too-good-to-be-true investment returns'
    ],
    recommendedCategories: ['financial-fraud'],
    urgency: 'critical',
    icon: 'TrendingUp'
  },
  {
    id: 'phishing',
    name: 'Phishing / Identity Theft',
    description: 'Fake emails, texts, or websites trying to steal your information',
    examples: [
      'Fake bank emails asking for login details',
      'Suspicious links in text messages',
      'Fake company websites stealing data',
      'Email impersonation scams'
    ],
    recommendedCategories: ['cybercrime'],
    urgency: 'high',
    icon: 'Mail'
  },
  {
    id: 'online-shopping',
    name: 'Online Shopping Fraud',
    description: 'Fake online stores, non-delivery of goods, or counterfeit products',
    examples: [
      'Paid but never received items',
      'Fake e-commerce websites',
      'Counterfeit products sold as genuine',
      'Social media marketplace scams'
    ],
    recommendedCategories: ['consumer-protection', 'cybercrime'],
    urgency: 'medium',
    icon: 'ShoppingCart'
  },
  {
    id: 'advance-fee',
    name: 'Advance Fee Fraud (419)',
    description: 'Requests for upfront payment with promises of larger returns',
    examples: [
      'Nigerian prince emails',
      'Lottery or prize scams requiring fees',
      'Inheritance scams',
      'Advance payment for loans or jobs'
    ],
    recommendedCategories: ['financial-fraud'],
    urgency: 'high',
    icon: 'DollarSign'
  },
  {
    id: 'tech-support',
    name: 'Tech Support Scam',
    description: 'Fake tech support calls or pop-ups claiming your device has problems',
    examples: [
      'Fake Microsoft/Apple support calls',
      'Pop-up warnings about viruses',
      'Remote access scams',
      'Fake antivirus software'
    ],
    recommendedCategories: ['cybercrime', 'consumer-protection'],
    urgency: 'medium',
    icon: 'Laptop'
  },
  {
    id: 'employment',
    name: 'Employment Fraud',
    description: 'Fake job offers, work-from-home scams, or pyramid schemes',
    examples: [
      'Jobs requiring upfront payment',
      'Fake job postings stealing personal info',
      'Work-from-home schemes',
      'Multi-level marketing scams'
    ],
    recommendedCategories: ['consumer-protection', 'financial-fraud'],
    urgency: 'medium',
    icon: 'Briefcase'
  },
  {
    id: 'bank-fraud',
    name: 'Banking / Payment Fraud',
    description: 'Unauthorized transactions, card cloning, or account takeover',
    examples: [
      'Unauthorized credit card charges',
      'ATM card skimming',
      'Bank account takeover',
      'Mobile money fraud'
    ],
    recommendedCategories: ['financial-fraud'],
    urgency: 'critical',
    icon: 'Building2'
  }
];

// Preparation Checklist
export const PREPARATION_CHECKLIST: PreparationItem[] = [
  {
    id: 'gather-evidence',
    title: 'Gather All Evidence',
    description: 'Collect emails, text messages, screenshots, call recordings, receipts, and any communication with the scammer',
    required: true,
    icon: 'Camera'
  },
  {
    id: 'transaction-details',
    title: 'Document Financial Transactions',
    description: 'Write down dates, amounts, payment methods, bank details, and transaction IDs for all money sent',
    required: true,
    icon: 'CreditCard'
  },
  {
    id: 'scammer-info',
    title: 'Record Scammer Information',
    description: 'Save names used, phone numbers, email addresses, social media profiles, website URLs, and any identifying details',
    required: true,
    icon: 'Search'
  },
  {
    id: 'timeline',
    title: 'Create a Timeline',
    description: 'Write a chronological sequence of events from first contact to the latest interaction',
    required: true,
    icon: 'Calendar'
  },
  {
    id: 'stop-contact',
    title: 'Stop All Contact',
    description: 'Cease communication with the scammer immediately. Do not engage further or accept "refund" offers',
    required: true,
    icon: 'Ban'
  },
  {
    id: 'secure-accounts',
    title: 'Secure Your Accounts',
    description: 'Change passwords, enable two-factor authentication, and monitor your bank accounts for suspicious activity',
    required: true,
    icon: 'Lock'
  },
  {
    id: 'inform-bank',
    title: 'Contact Your Bank',
    description: 'If money was transferred, immediately notify your bank or payment provider to attempt recovery',
    required: false,
    icon: 'Phone'
  },
  {
    id: 'witnesses',
    title: 'Identify Witnesses',
    description: 'Note anyone else who knows about the fraud or can support your case',
    required: false,
    icon: 'Users'
  }
];

// Helper to get fraud type by ID
export function getFraudTypeById(id: string): FraudType | undefined {
  return FRAUD_TYPES.find(type => type.id === id);
}

// Helper to get fraud types by urgency
export function getFraudTypesByUrgency(urgency: FraudType['urgency']): FraudType[] {
  return FRAUD_TYPES.filter(type => type.urgency === urgency);
}