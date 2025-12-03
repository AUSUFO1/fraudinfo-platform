
export interface FraudResource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'tool' | 'blog' | 'social' | 'agency';
  verified: boolean;
  icon?: string;
  tags: string[];
  platform?: 'Twitter' | 'LinkedIn' | 'YouTube' | 'Instagram' | 'Facebook';
}

export const fraudResources: FraudResource[] = [
  // FRAUD FIGHTING TOOLS
  {
    id: 'haveibeenpwned',
    name: 'Have I Been Pwned',
    description: 'Check if your email or phone has been compromised in a data breach',
    url: 'https://haveibeenpwned.com',
    category: 'tool',
    verified: true,
    tags: ['Data Breach', 'Email Security', 'Password Safety'],
  },
  {
    id: 'virustotal',
    name: 'VirusTotal',
    description: 'Analyze suspicious files, URLs, domains, and IP addresses for malware',
    url: 'https://www.virustotal.com',
    category: 'tool',
    verified: true,
    tags: ['Malware', 'URL Scanner', 'File Analysis'],
  },
  {
    id: 'urlscan',
    name: 'URLScan.io',
    description: 'Scan and analyze websites for phishing and malicious content',
    url: 'https://urlscan.io',
    category: 'tool',
    verified: true,
    tags: ['Phishing', 'URL Scanner', 'Website Safety'],
  },
  {
    id: 'scamadviser',
    name: 'ScamAdviser',
    description: 'Check if a website is legitimate or a scam before you buy',
    url: 'https://www.scamadviser.com',
    category: 'tool',
    verified: true,
    tags: ['Website Checker', 'Shopping Safety', 'Reviews'],
  },
  {
    id: 'whois',
    name: 'WHOIS Lookup',
    description: 'Find out who owns a domain and when it was registered',
    url: 'https://who.is',
    category: 'tool',
    verified: true,
    tags: ['Domain Research', 'Website Owner', 'Registration'],
  },
  {
    id: 'google-safebrowsing',
    name: 'Google Safe Browsing',
    description: 'Check if a site is on Google list of unsafe web resources',
    url: 'https://transparencyreport.google.com/safe-browsing',
    category: 'tool',
    verified: true,
    tags: ['Safe Browsing', 'Malware Detection', 'Google'],
  },

  // FRAUD FIGHTING BLOGS & WEBSITES
  {
    id: 'krebs-security',
    name: 'Krebs on Security',
    description: 'In-depth security news and investigation by Brian Krebs',
    url: 'https://krebsonsecurity.com',
    category: 'blog',
    verified: true,
    tags: ['Cybersecurity', 'Fraud News', 'Investigations'],
  },
  {
    id: 'ftc-consumer-blog',
    name: 'FTC Consumer Blog',
    description: 'Official fraud alerts and scam warnings from the FTC',
    url: 'https://consumer.ftc.gov/consumer-alerts',
    category: 'blog',
    verified: true,
    tags: ['FTC', 'Consumer Protection', 'Official Alerts'],
  },
  {
    id: 'aarp-fraud-watch',
    name: 'AARP Fraud Watch Network',
    description: 'Resources to help spot and avoid scams targeting all ages',
    url: 'https://www.aarp.org/money/scams-fraud/',
    category: 'blog',
    verified: true,
    tags: ['Scam Prevention', 'Elder Fraud', 'Resources'],
  },
  {
    id: 'scamwatch-au',
    name: 'Scamwatch (Australia)',
    description: 'Australian government scam reporting and education',
    url: 'https://www.scamwatch.gov.au',
    category: 'blog',
    verified: true,
    tags: ['Australia', 'Scam Reports', 'Government'],
  },

  // VERIFIED SOCIAL MEDIA ACCOUNTS
  {
    id: 'ftc-twitter',
    name: 'FTC (@FTC)',
    description: 'Official Federal Trade Commission updates on consumer protection',
    url: 'https://twitter.com/FTC',
    category: 'social',
    platform: 'Twitter',
    verified: true,
    tags: ['FTC', 'Official', 'Consumer Protection'],
  },
  {
    id: 'fbi-twitter',
    name: 'FBI (@FBI)',
    description: 'Official FBI news, safety tips, and crime alerts',
    url: 'https://twitter.com/FBI',
    category: 'social',
    platform: 'Twitter',
    verified: true,
    tags: ['FBI', 'Crime Alerts', 'Safety Tips'],
  },
  {
    id: 'ic3-twitter',
    name: 'FBI IC3 (@IC3gov)',
    description: 'Internet Crime Complaint Center - report cybercrime',
    url: 'https://twitter.com/IC3gov',
    category: 'social',
    platform: 'Twitter',
    verified: true,
    tags: ['Cybercrime', 'Reporting', 'FBI'],
  },
  {
    id: 'efcc-twitter',
    name: 'EFCC Nigeria (@officialEFCC)',
    description: 'Economic and Financial Crimes Commission of Nigeria',
    url: 'https://twitter.com/officialEFCC',
    category: 'social',
    platform: 'Twitter',
    verified: true,
    tags: ['EFCC', 'Nigeria', 'Financial Crime'],
  },
  {
    id: 'actionfraud-twitter',
    name: 'Action Fraud (@actionfrauduk)',
    description: 'UK national fraud and cybercrime reporting centre',
    url: 'https://twitter.com/actionfrauduk',
    category: 'social',
    platform: 'Twitter',
    verified: true,
    tags: ['UK', 'Fraud Reporting', 'Cybercrime'],
  },
  {
    id: 'krebs-twitter',
    name: 'Brian Krebs (@briankrebs)',
    description: 'Investigative journalist covering cybersecurity and fraud',
    url: 'https://twitter.com/briankrebs',
    category: 'social',
    platform: 'Twitter',
    verified: true,
    tags: ['Journalism', 'Cybersecurity', 'Investigations'],
  },

  // GOVERNMENT AGENCIES
  {
    id: 'ftc-agency',
    name: 'Federal Trade Commission',
    description: 'US consumer protection agency - report fraud and get help',
    url: 'https://reportfraud.ftc.gov',
    category: 'agency',
    verified: true,
    tags: ['USA', 'Government', 'Reporting'],
  },
  {
    id: 'fbi-ic3',
    name: 'FBI Internet Crime Complaint Center',
    description: 'Report internet-facilitated crimes to the FBI',
    url: 'https://www.ic3.gov',
    category: 'agency',
    verified: true,
    tags: ['USA', 'FBI', 'Cybercrime'],
  },
  {
    id: 'efcc-agency',
    name: 'EFCC Nigeria',
    description: 'Report economic and financial crimes in Nigeria',
    url: 'https://efccnigeria.org',
    category: 'agency',
    verified: true,
    tags: ['Nigeria', 'EFCC', 'Financial Crime'],
  },
  {
    id: 'actionfraud-uk',
    name: 'Action Fraud UK',
    description: 'UK national fraud and cybercrime reporting service',
    url: 'https://www.actionfraud.police.uk',
    category: 'agency',
    verified: true,
    tags: ['UK', 'Police', 'Reporting'],
  },
];

export const resourceCategories = [
  { id: 'all', label: 'All Resources', icon: 'Grid' },
  { id: 'tool', label: 'Fighting Tools', icon: 'Wrench' },
  { id: 'blog', label: 'Blogs & News', icon: 'Newspaper' },
  { id: 'social', label: 'Social Media', icon: 'Share2' },
  { id: 'agency', label: 'Agencies', icon: 'Shield' },
];