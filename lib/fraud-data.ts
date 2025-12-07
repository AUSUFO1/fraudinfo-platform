// All agencies, resources, and filter constants

import { Agency } from '@/types/fraud.types';
import { FraudResource } from './fraud-resources';

export const agencies: Agency[] = [
  {
    id: "efcc-ng",
    name: "Economic and Financial Crimes Commission (EFCC)",
    shortName: "EFCC",
    description: "Nigeria's apex anti-graft agency responsible for investigating financial crimes, economic crimes, and corruption. Handles cases of advance fee fraud, money laundering, cybercrime, and asset recovery.",
    category: "financial-fraud",
    region: "West Africa",
    country: "Nigeria",
    website: "https://efccnigeria.org",
    phone: "+234-1-7000-000",
    email: "info@efccnigeria.org",
    verified: true,
    languages: ["English"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "phone",
        value: "+234-1-7000-000",
        label: "EFCC Hotline",
        available24h: false
      },
      {
        type: "email",
        value: "info@efccnigeria.org",
        label: "Report via Email"
      }
    ],
    specialties: ["Advance Fee Fraud (419)", "Money Laundering", "Cybercrime", "Bank Fraud", "Asset Recovery"]
  },
  {
    id: "fbi-ic3",
    name: "FBI Internet Crime Complaint Center (IC3)",
    shortName: "IC3",
    description: "U.S. federal agency for reporting internet-facilitated criminal activity including online fraud, cybercrime, identity theft, and computer intrusions.",
    category: "cybercrime",
    region: "North America",
    country: "United States",
    website: "https://www.ic3.gov",
    verified: true,
    languages: ["English"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "website",
        value: "https://www.ic3.gov/Home/FileComplaint",
        label: "File a Complaint"
      }
    ],
    specialties: ["Internet Fraud", "Cybercrime", "Identity Theft", "Business Email Compromise", "Romance Scams"]
  },
  {
    id: "actionfraud-uk",
    name: "Action Fraud UK",
    shortName: "Action Fraud",
    description: "UK's national reporting centre for fraud and cybercrime operated by the City of London Police. Central hub for reporting all types of fraud.",
    category: "cybercrime",
    region: "Europe",
    country: "United Kingdom",
    website: "https://www.actionfraud.police.uk",
    phone: "0300 123 2040",
    verified: true,
    languages: ["English", "Welsh"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "phone",
        value: "0300 123 2040",
        label: "Report Fraud Hotline",
        available24h: false
      }
    ],
    specialties: ["All Types of Fraud", "Cybercrime", "Online Scams", "Identity Fraud"]
  },
  {
    id: "icpc-ng",
    name: "Independent Corrupt Practices and Other Related Offences Commission (ICPC)",
    shortName: "ICPC",
    description: "Nigerian anti-corruption agency established in 2000 to receive and investigate reports of corruption, prosecute offenders, examine and reform corruption-prone systems in public bodies, and educate the public against corruption. Works alongside EFCC to combat financial crimes and fraud.",
    category: "financial-fraud",
    region: "West Africa",
    country: "Nigeria",
    website: "https://icpc.gov.ng",
    phone: "+234-803-123-0280",
    email: "info@icpc.gov.ng",
    verified: true,
    languages: ["English"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "phone",
        value: "+234-803-123-0280",
        label: "ICPC Hotline 1",
        available24h: false
      },
      {
        type: "phone",
        value: "0800-2255-4272",
        label: "ICPC Toll-Free Line",
        available24h: false
      },
      {
        type: "email",
        value: "info@icpc.gov.ng",
        label: "Report via Email"
      },
      {
        type: "website",
        value: "https://icpc.gov.ng/petition-guidelines/",
        label: "Submit Petition Online"
      }
    ],
    specialties: ["Corruption Investigation", "Public Sector Fraud", "Bribery", "Embezzlement", "System Reform"]
  },
  {
    id: "ghana-police-cyber",
    name: "Ghana Police Service Cybercrime Unit",
    shortName: "GPS Cybercrime Unit",
    description: "Specialized unit within Ghana's Criminal Investigation Department handling cybercrime investigations and digital forensics. Recently reorganized and decentralized to all 25 regional commands across Ghana to bring services closer to the public.",
    category: "cybercrime",
    region: "West Africa",
    country: "Ghana",
    website: "https://police.gov.gh",
    email: "cybercrime.reports@police.gov.gh",
    verified: true,
    languages: ["English"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "email",
        value: "cybercrime.reports@police.gov.gh",
        label: "Cybercrime Reports Email"
      }
    ],
    specialties: ["Mobile Money Fraud", "Social Engineering", "Online Scams", "Bank Card Fraud", "Digital Forensics"]
  },
  {
    id: "csa-ghana",
    name: "Cyber Security Authority Ghana (CSA)",
    shortName: "CSA Ghana",
    description: "Ghana's national cybersecurity agency operating CERT-GH (Computer Emergency Response Team - Ghana) to handle cyber incidents and threats. Provides incident reporting, triaging, and investigation services to protect Ghana's cyberspace.",
    category: "cybercrime",
    region: "West Africa",
    country: "Ghana",
    website: "https://www.csa.gov.gh",
    email: "report@csa.gov.gh",
    phone: "292",
    verified: true,
    languages: ["English"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "email",
        value: "report@csa.gov.gh",
        label: "Report Cyber Incidents"
      },
      {
        type: "phone",
        value: "292",
        label: "SMS/Call Hotline",
        available24h: true
      },
      {
        type: "website",
        value: "https://www.csa.gov.gh/report",
        label: "Online Incident Reporting Form"
      }
    ],
    specialties: ["Cyber Incidents", "Data Breaches", "Malware", "Cyber Threat Intelligence", "Digital Infrastructure Protection"]
  },
  {
    id: "dci-kenya",
    name: "Directorate of Criminal Investigations Kenya - Cybercrime Unit",
    shortName: "DCI Kenya",
    description: "Kenya's national investigative agency with a specialized Cybercrime Unit handling digital fraud, cyber threats, and technology-enabled crimes. Part of the National Police Service working to combat cybercrime across Kenya.",
    category: "cybercrime",
    region: "East Africa",
    country: "Kenya",
    website: "https://www.dci.go.ke",
    verified: true,
    languages: ["English", "Swahili"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "website",
        value: "https://www.dci.go.ke",
        label: "Visit Nearest Police Station or DCI Office"
      }
    ],
    specialties: ["Cybercrime Investigation", "Digital Forensics", "Financial Fraud", "Identity Theft", "Cyber Incident Response"]
  },
  {
    id: "ke-cirt",
    name: "National Kenya Computer Incident Response Team (KE-CIRT/CC)",
    shortName: "KE-CIRT/CC",
    description: "Kenya's national multi-agency framework coordinating response to cybersecurity matters. Domiciled at the Communications Authority of Kenya, it detects, prevents, and responds to cyber threats targeting Kenya on a 24/7 basis.",
    category: "cybercrime",
    region: "East Africa",
    country: "Kenya",
    website: "https://ke-cirt.go.ke",
    verified: true,
    languages: ["English", "Swahili"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "website",
        value: "https://ke-cirt.go.ke",
        label: "Report Cyber Incidents",
        available24h: true
      }
    ],
    specialties: ["Cyber Threat Detection", "Incident Response", "Cybersecurity Coordination", "Threat Prevention", "24/7 Monitoring"]
  },
  {
    id: "nc4-kenya",
    name: "National Computer and Cybercrimes Coordination Committee Kenya (NC4)",
    shortName: "NC4 Kenya",
    description: "Multi-agency coordination body established under the Computer Misuse and Cybercrimes Act 2018 to coordinate Kenya's national response to cybercrime. Brings together law enforcement, intelligence, and regulatory agencies.",
    category: "cybercrime",
    region: "East Africa",
    country: "Kenya",
    website: "https://nc4.go.ke",
    phone: "+254-716-148341",
    email: "Info@nc4.go.ke",
    verified: true,
    languages: ["English", "Swahili"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "website",
        value: "https://nc4.go.ke/report-cybercrime-incident/",
        label: "Report Cybercrime Incident"
      },
      {
        type: "phone",
        value: "+254-716-148341",
        label: "NC4 Contact Line"
      },
      {
        type: "email",
        value: "Info@nc4.go.ke",
        label: "Email Reports"
      }
    ],
    specialties: ["Cybercrime Coordination", "Multi-Agency Response", "Policy Development", "Cybersecurity Standards", "Critical Infrastructure"]
  },
  {
    id: "saps-cyber-sa",
    name: "South African Police Service Cybercrime Unit",
    shortName: "SAPS Cybercrime",
    description: "South Africa's national police cybercrime investigation unit operating under the Cybercrimes Act 2020. Responsible for investigating cybercrimes, coordinating domestic and international cooperation, and maintaining a 24/7 point of contact for cybercrime reporting.",
    category: "cybercrime",
    region: "East Africa",
    country: "South Africa",
    website: "https://www.saps.gov.za",
    phone: "08600-10111",
    verified: true,
    languages: ["English", "Afrikaans", "Zulu", "Xhosa"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "phone",
        value: "08600-10111",
        label: "Crime Stop Hotline",
        available24h: true
      },
      {
        type: "website",
        value: "https://www.saps.gov.za",
        label: "Report at Nearest Police Station"
      }
    ],
    specialties: ["Cybercrime Investigation", "Electronic Crime", "Online Fraud", "Data Breaches", "International Cooperation"]
  },
  {
    id: "cybercrime-org-za",
    name: "Cybercrime.org.za",
    shortName: "Cybercrime.org.za",
    description: "South Africa's independent cybercrime awareness portal providing educational resources and reporting assistance. Part of a non-commercial initiative to address criminal exploitation of ICT in South Africa and Africa at large.",
    category: "cybercrime",
    region: "East Africa",
    country: "South Africa",
    website: "https://cybercrime.org.za",
    verified: true,
    languages: ["English"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "website",
        value: "https://cybercrime.org.za/reporting",
        label: "Online Reporting Portal"
      }
    ],
    specialties: ["Cybercrime Awareness", "Educational Resources", "Reporting Assistance", "Community Support", "ICT Crime Prevention"]
  },
  {
    id: "i4c-india",
    name: "Indian Cybercrime Coordination Centre (I4C)",
    shortName: "I4C",
    description: "Established by India's Ministry of Home Affairs as the nodal agency for cybercrime coordination. Operates the National Cybercrime Reporting Portal and 24/7 helpline (1930) to facilitate cybercrime reporting with special focus on crimes against women and children.",
    category: "cybercrime",
    region: "South Asia",
    country: "India",
    website: "https://cybercrime.gov.in",
    phone: "1930",
    verified: true,
    languages: ["English", "Hindi", "Multiple Regional Languages"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "website",
        value: "https://cybercrime.gov.in",
        label: "National Cyber Crime Reporting Portal",
        available24h: true
      },
      {
        type: "phone",
        value: "1930",
        label: "National Cyber Crime Helpline",
        available24h: true
      }
    ],
    specialties: ["Financial Fraud", "Women & Child Cybercrimes", "Online Harassment", "Identity Theft", "Phishing"]
  },
  {
    id: "scamshield-sg",
    name: "ScamShield Singapore",
    shortName: "ScamShield",
    description: "Singapore government's comprehensive anti-scam initiative jointly developed by Ministry of Home Affairs, Singapore Police Force, and National Crime Prevention Council. Provides 24/7 helpline, mobile app, and reporting portal to combat scams.",
    category: "consumer-protection",
    region: "Southeast Asia",
    country: "Singapore",
    website: "https://www.scamshield.gov.sg",
    phone: "1799",
    verified: true,
    languages: ["English", "Chinese", "Malay", "Tamil"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "phone",
        value: "1799",
        label: "ScamShield Helpline",
        available24h: true
      },
      {
        type: "phone",
        value: "1800-255-0000",
        label: "Police Hotline"
      },
      {
        type: "website",
        value: "https://www.scamshield.gov.sg",
        label: "Report Online"
      }
    ],
    specialties: ["All Scam Types", "E-commerce Scams", "Investment Scams", "Job Scams", "Phishing"]
  },
  {
    id: "singcert-sg",
    name: "Singapore Computer Emergency Response Team (SingCERT)",
    shortName: "SingCERT",
    description: "Singapore's national cybersecurity incident response team operated by the Cyber Security Agency. Handles cybersecurity incidents, provides alerts and advisories, and assists organizations in responding to cyber threats.",
    category: "cybercrime",
    region: "Southeast Asia",
    country: "Singapore",
    website: "https://www.csa.gov.sg",
    verified: true,
    languages: ["English"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "website",
        value: "https://www.csa.gov.sg/resources/singcert/cyber-aid/",
        label: "Report Cybersecurity Incidents"
      }
    ],
    specialties: ["Cybersecurity Incidents", "Malware", "Data Breaches", "Incident Response", "Threat Intelligence"]
  },
  {
    id: "acsc-australia",
    name: "Australian Cyber Security Centre (ACSC)",
    shortName: "ACSC",
    description: "Australia's national cyber threat and incident response authority operated by the Australian Signals Directorate. Provides cybercrime reporting through ReportCyber platform and 24/7 assistance to help Australians affected by cybercrime.",
    category: "cybercrime",
    region: "Oceania",
    country: "Australia",
    website: "https://www.cyber.gov.au",
    phone: "1300-292-371",
    verified: true,
    languages: ["English"],
    emergencyAvailable: true,
    reportingChannels: [
      {
        type: "website",
        value: "https://www.cyber.gov.au/report-and-recover/report",
        label: "ReportCyber Portal",
        available24h: true
      },
      {
        type: "phone",
        value: "1300-292-371",
        label: "Australian Cyber Security Hotline (1300 CYBER1)",
        available24h: true
      }
    ],
    specialties: ["Cybercrime", "Cyber Incidents", "Scams", "Identity Theft", "Business Email Compromise"]
  },
  {
    id: "afp-cyber",
    name: "Australian Federal Police - Cybercrime Operations",
    shortName: "AFP Cybercrime",
    description: "Australia's federal law enforcement agency combating cybercrime through the Joint Policing Cybercrime Coordination Centre (JPC3). Investigates serious cybercrimes including fraud, malware, phishing, and online exploitation.",
    category: "law-enforcement",
    region: "Oceania",
    country: "Australia",
    website: "https://www.afp.gov.au",
    verified: true,
    languages: ["English"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "website",
        value: "https://www.afp.gov.au/crimes/cybercrime",
        label: "AFP Cybercrime Information"
      }
    ],
    specialties: ["Cybercrime Investigation", "Dark Web Operations", "International Cooperation", "Organized Cybercrime", "Digital Evidence"]
  },
  {
    id: "cafc-canada",
    name: "Canadian Anti-Fraud Centre (CAFC)",
    shortName: "CAFC",
    description: "Canada's central repository for fraud and identity theft information operated by RCMP and partners. Collects data on fraud across Canada, assists police investigations, and provides prevention information through toll-free hotline and online reporting.",
    category: "financial-fraud",
    region: "North America",
    country: "Canada",
    website: "https://antifraudcentre-centreantifraude.ca",
    phone: "1-888-495-8501",
    verified: true,
    languages: ["English", "French"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "website",
        value: "https://reportcyberandfraud.canada.ca",
        label: "Report Cybercrime and Fraud",
        available24h: true
      },
      {
        type: "phone",
        value: "1-888-495-8501",
        label: "CAFC Toll-Free",
        available24h: false
      }
    ],
    specialties: ["Fraud", "Identity Theft", "Mass Marketing Fraud", "Cybercrime", "Scam Prevention"]
  },
  {
    id: "nc3-canada",
    name: "RCMP National Cybercrime Coordination Centre (NC3)",
    shortName: "NC3 Canada",
    description: "Royal Canadian Mounted Police's national cybercrime coordination centre working with Canadian law enforcement and international partners. Provides centralized guidance and support for addressing cybercrime across Canada.",
    category: "cybercrime",
    region: "North America",
    country: "Canada",
    website: "https://rcmp.ca",
    phone: "1-888-495-8501",
    verified: true,
    languages: ["English", "French"],
    emergencyAvailable: false,
    reportingChannels: [
      {
        type: "website",
        value: "https://reportcyberandfraud.canada.ca",
        label: "Report Cybercrime and Fraud Online",
        available24h: true
      },
      {
        type: "phone",
        value: "1-888-495-8501",
        label: "Report by Phone"
      }
    ],
    specialties: ["Cybercrime Coordination", "Law Enforcement Support", "International Cooperation", "Cybercrime Intelligence", "Digital Investigations"]
  }
];

export const fraudResources: FraudResource[] = [
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
    id: 'krebs-security',
    name: 'Krebs on Security',
    description: 'In-depth security news and investigation by Brian Krebs',
    url: 'https://krebsonsecurity.com',
    category: 'blog',
    verified: true,
    tags: ['Cybersecurity', 'Fraud News', 'Investigations'],
  },
  {
    id: 'urlscan-io',
    name: 'URLScan.io',
    description: 'Scan and analyze websites for phishing and malicious content with detailed page navigation data',
    url: 'https://urlscan.io',
    category: 'tool',
    verified: true,
    tags: ['URL Scanner', 'Phishing Detection', 'Website Analysis'],
  },
  {
    id: 'scamadviser',
    name: 'ScamAdviser',
    description: 'Check if a website is legitimate or a scam with trust scores and safety ratings',
    url: 'https://www.scamadviser.com',
    category: 'tool',
    verified: true,
    tags: ['Website Verification', 'Trust Score', 'Scam Detection'],
  },
  {
    id: 'phishtank',
    name: 'PhishTank',
    description: 'Community-powered phishing data clearinghouse for submitting and verifying phishing sites',
    url: 'https://phishtank.org',
    category: 'tool',
    verified: true,
    tags: ['Phishing Database', 'Community Reporting', 'URL Verification'],
  },
  {
    id: 'abuseipdb',
    name: 'AbuseIPDB',
    description: 'Crowdsourced IP address abuse database for checking and reporting malicious IP addresses',
    url: 'https://www.abuseipdb.com',
    category: 'tool',
    verified: true,
    tags: ['IP Reputation', 'Abuse Reporting', 'Threat Intelligence'],
  },
  {
    id: 'whois-lookup',
    name: 'WHOIS Domain Lookup',
    description: 'Look up domain registration information to verify website ownership and legitimacy',
    url: 'https://lookup.icann.org',
    category: 'tool',
    verified: true,
    tags: ['Domain Research', 'Registration Check', 'Ownership Verification'],
  },
  {
    id: 'talos-intelligence',
    name: 'Cisco Talos Intelligence',
    description: 'Comprehensive threat intelligence and IP/domain reputation checking from Cisco',
    url: 'https://talosintelligence.com',
    category: 'tool',
    verified: true,
    tags: ['Threat Intelligence', 'Reputation Check', 'Security Research'],
  },
  {
    id: 'checkphish',
    name: 'CheckPhish',
    description: 'Real-time URL scanning service that detects phishing sites and malicious links',
    url: 'https://checkphish.ai',
    category: 'tool',
    verified: true,
    tags: ['URL Scanner', 'Phishing Detection', 'Real-time Analysis'],
  },
  {
    id: 'google-safe-browsing',
    name: 'Google Safe Browsing',
    description: 'Check if a website is on Google\'s list of unsafe web resources',
    url: 'https://transparencyreport.google.com/safe-browsing',
    category: 'tool',
    verified: true,
    tags: ['Safe Browsing', 'URL Safety', 'Malware Detection'],
  },
  {
    id: 'hybrid-analysis',
    name: 'Hybrid Analysis',
    description: 'Free malware analysis service for analyzing suspicious files and URLs',
    url: 'https://www.hybrid-analysis.com',
    category: 'tool',
    verified: true,
    tags: ['Malware Analysis', 'File Scanner', 'Threat Detection'],
  },
  {
    id: 'shodan',
    name: 'Shodan',
    description: 'Search engine for Internet-connected devices to research infrastructure security',
    url: 'https://www.shodan.io',
    category: 'tool',
    verified: true,
    tags: ['IoT Security', 'Device Search', 'Infrastructure Research'],
  },
  {
    id: 'social-catfish',
    name: 'Social Catfish',
    description: 'Online identity verification and reverse search tool for detecting romance scams',
    url: 'https://socialcatfish.com',
    category: 'tool',
    verified: true,
    tags: ['Identity Verification', 'Romance Scam Detection', 'Reverse Image Search'],
  },
  {
    id: 'bleeping-computer',
    name: 'Bleeping Computer',
    description: 'Technology news and computer help website covering cybersecurity and fraud trends',
    url: 'https://www.bleepingcomputer.com',
    category: 'blog',
    verified: true,
    tags: ['Cybersecurity News', 'Tech Support', 'Threat Analysis'],
  },
  {
    id: 'threatpost',
    name: 'Threatpost',
    description: 'Independent cybersecurity news site covering latest threats and vulnerabilities',
    url: 'https://threatpost.com',
    category: 'blog',
    verified: true,
    tags: ['Security News', 'Threat Intelligence', 'Vulnerability Reports'],
  },
  {
    id: 'dark-reading',
    name: 'Dark Reading',
    description: 'Cybersecurity news and analysis for information security professionals',
    url: 'https://www.darkreading.com',
    category: 'blog',
    verified: true,
    tags: ['InfoSec News', 'Cyber Threats', 'Security Analysis'],
  },
  {
    id: 'naked-security',
    name: 'Naked Security by Sophos',
    description: 'Computer security news, advice, and research from Sophos security experts',
    url: 'https://nakedsecurity.sophos.com',
    category: 'blog',
    verified: true,
    tags: ['Security News', 'Scam Alerts', 'Privacy Tips'],
  }
];

export const QUICK_SEARCH_TERMS = [
  'Cybercrime',
  'Investment Fraud',
  'Nigeria',
  'Phishing',
  'Identity Theft',
  'Romance Scams'
] as const;

export const AGENCY_CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'financial-fraud', label: 'Financial Fraud' },
  { value: 'cybercrime', label: 'Cybercrime' },
  { value: 'consumer-protection', label: 'Consumer Protection' },
  { value: 'law-enforcement', label: 'Law Enforcement' },
  { value: 'telecom-fraud', label: 'Telecom Fraud' },
  { value: 'international', label: 'International' }
] as const;

export const REGIONS = [
  { value: 'all', label: 'All Regions' },
  { value: 'West Africa', label: 'West Africa' },
  { value: 'North America', label: 'North America' },
  { value: 'Europe', label: 'Europe' },
  { value: 'East Asia', label: 'East Asia' },
  { value: 'Southeast Asia', label: 'Southeast Asia' },
  { value: 'South Asia', label: 'South Asia' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Middle East', label: 'Middle East' }
] as const;

export const RESOURCE_TYPES = [
  { value: 'all', label: 'All Resources' },
  { value: 'tool', label: 'Fighting Tools' },
  { value: 'blog', label: 'Blogs & News' },
  { value: 'social', label: 'Social Media' }
] as const;