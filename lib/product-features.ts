export interface TriageQuestion {
  id: string;
  prompt: string;
  options: {
    label: string;
    value: string;
    next?: string;
    fraudTypeId?: string;
    guidance?: string;
  }[];
}

export interface ScamPattern {
  id: string;
  title: string;
  category: string;
  summary: string;
  redFlags: string[];
  whatToDo: string[];
  channels: string[];
  urgency: "low" | "medium" | "high" | "critical";
}

export interface RegionalSignal {
  region: string;
  intensity: "elevated" | "high" | "critical";
  signal: string;
  focus: string[];
}

export interface CheckerProvider {
  id: string;
  name: string;
  description: string;
  buildUrl: (value: string) => string;
  tags: string[];
}

export const TRIAGE_QUESTIONS: TriageQuestion[] = [
  {
    id: "entry",
    prompt: "What best matches the incident?",
    options: [
      {
        label: "I clicked a suspicious link or site",
        value: "suspicious-site",
        next: "site-impact",
      },
      {
        label: "I sent money or payment details",
        value: "money-sent",
        next: "payment-impact",
      },
      {
        label: "Someone online is building trust and asking for money",
        value: "trust-request",
        fraudTypeId: "romance-scam",
        guidance: "Preserve messages, stop contact, and report quickly.",
      },
      {
        label: "A fake job, support, or investment offer targeted me",
        value: "offer-scam",
        next: "offer-type",
      },
    ],
  },
  {
    id: "site-impact",
    prompt: "What happened after the interaction?",
    options: [
      {
        label: "I only visited the page",
        value: "visited-only",
        fraudTypeId: "phishing",
        guidance: "Run link checks, monitor accounts, and avoid revisiting the page.",
      },
      {
        label: "I entered login or personal details",
        value: "entered-details",
        fraudTypeId: "phishing",
        guidance: "Change credentials immediately and secure affected accounts.",
      },
      {
        label: "I downloaded something or granted remote access",
        value: "downloaded-file",
        fraudTypeId: "tech-support",
        guidance: "Disconnect the device, scan it, and rotate passwords from a safe device.",
      },
    ],
  },
  {
    id: "payment-impact",
    prompt: "What kind of payment problem occurred?",
    options: [
      {
        label: "Unauthorized bank or card activity",
        value: "unauthorized-payment",
        fraudTypeId: "bank-fraud",
        guidance: "Contact your bank first, then report to a matched agency.",
      },
      {
        label: "I paid a fake store or seller",
        value: "fake-store",
        fraudTypeId: "online-shopping",
        guidance: "Save receipts, order messages, and dispute the charge quickly.",
      },
      {
        label: "I invested or transferred money expecting returns",
        value: "investment-loss",
        fraudTypeId: "investment-fraud",
        guidance: "Preserve wallet addresses, chats, and transaction IDs for reporting.",
      },
    ],
  },
  {
    id: "offer-type",
    prompt: "Which type of offer was it?",
    options: [
      {
        label: "Job or work-from-home offer",
        value: "job-offer",
        fraudTypeId: "employment",
        guidance: "Keep offer letters, chat history, and payment requests.",
      },
      {
        label: "Tech support or device warning",
        value: "tech-warning",
        fraudTypeId: "tech-support",
        guidance: "End remote access, uninstall suspicious software, and secure the device.",
      },
      {
        label: "Advance fee, prize, or inheritance claim",
        value: "advance-fee",
        fraudTypeId: "advance-fee",
        guidance: "Stop all contact and document every request for money or fees.",
      },
    ],
  },
];

export const SCAM_PATTERNS: ScamPattern[] = [
  {
    id: "bank-reset-phishing",
    title: "Bank reset phishing",
    category: "Credential theft",
    summary: "Attackers impersonate a bank and push urgent password-reset or verification links.",
    redFlags: [
      "Urgent login reset message with a link",
      "Sender address or domain is slightly wrong",
      "Page asks for OTP, BVN, card PIN, or full credentials",
    ],
    whatToDo: [
      "Do not log in from the link",
      "Visit the institution directly from a known URL",
      "Change passwords and notify the bank if credentials were entered",
    ],
    channels: ["Email", "SMS", "Messaging apps"],
    urgency: "high",
  },
  {
    id: "fake-investment-dash",
    title: "Fake investment dashboard",
    category: "Investment fraud",
    summary: "Victims are shown fake growth charts and withdrawal screens to build confidence before larger deposits.",
    redFlags: [
      "Guaranteed returns or daily profit promises",
      "Pressure to add more funds before withdrawal",
      "Platform avoids regulated exchange or brokerage details",
    ],
    whatToDo: [
      "Preserve wallet addresses, account IDs, and chat logs",
      "Stop sending money immediately",
      "Report to financial-fraud and cybercrime agencies",
    ],
    channels: ["Telegram", "WhatsApp", "Web dashboards"],
    urgency: "critical",
  },
  {
    id: "romance-escalation",
    title: "Romance escalation scam",
    category: "Social engineering",
    summary: "The attacker builds emotional trust, then creates a crisis that requires money, gift cards, or account access.",
    redFlags: [
      "Relationship accelerates unusually fast",
      "Repeated emergencies requiring payment",
      "Excuses to avoid video calls or in-person meetings",
    ],
    whatToDo: [
      "Stop contact and do not send more money",
      "Save the full conversation history",
      "Report to platform moderators and relevant agencies",
    ],
    channels: ["Dating apps", "Instagram", "Facebook"],
    urgency: "high",
  },
  {
    id: "job-onboarding-fraud",
    title: "Job onboarding fraud",
    category: "Employment fraud",
    summary: "A fake recruiter requests fees, identity documents, or equipment purchases during onboarding.",
    redFlags: [
      "Requests for payment before employment begins",
      "Interview process happens only over chat",
      "Recruiter uses free email or inconsistent company details",
    ],
    whatToDo: [
      "Verify the company from its official website",
      "Do not share bank login details or pay setup fees",
      "Preserve job post, messages, and payment instructions",
    ],
    channels: ["Job boards", "Email", "WhatsApp"],
    urgency: "medium",
  },
  {
    id: "support-takeover",
    title: "Remote support takeover",
    category: "Tech support scam",
    summary: "A fake warning pushes the victim to call or chat with 'support' and grant device access.",
    redFlags: [
      "Browser pop-up says device is infected",
      "Caller claims to be Microsoft, Apple, or bank support",
      "You are told not to close the page or disconnect",
    ],
    whatToDo: [
      "Disconnect the device from the internet if remote access was granted",
      "Remove remote tools and run a scan from a trusted source",
      "Reset credentials from a clean device",
    ],
    channels: ["Browser pop-ups", "Phone calls"],
    urgency: "high",
  },
  {
    id: "marketplace-non-delivery",
    title: "Marketplace non-delivery",
    category: "E-commerce fraud",
    summary: "The seller pushes a fast payment off-platform, then delays or disappears after receiving money.",
    redFlags: [
      "Seller refuses escrow or official checkout",
      "Price is far below normal market rate",
      "Tracking proof is vague or manipulated",
    ],
    whatToDo: [
      "Keep receipts, screenshots, and seller profiles",
      "Dispute the payment if possible",
      "Report both to the platform and the appropriate agency",
    ],
    channels: ["Instagram", "Facebook Marketplace", "Classified sites"],
    urgency: "medium",
  },
];

export const REGIONAL_SIGNALS: RegionalSignal[] = [
  {
    region: "West Africa",
    intensity: "critical",
    signal: "Bank credential phishing and social-payment fraud remain elevated.",
    focus: ["Bank reset lures", "Account takeovers", "Advance-fee rebrands"],
  },
  {
    region: "North America",
    intensity: "high",
    signal: "Impersonation and investment scams are driving high-value losses.",
    focus: ["Crypto dashboards", "Romance escalation", "Government impersonation"],
  },
  {
    region: "Europe",
    intensity: "high",
    signal: "Marketplace fraud and banking phishing continue to scale.",
    focus: ["Payment request scams", "Card/account takeover", "Parcel delivery phishing"],
  },
  {
    region: "South Asia",
    intensity: "elevated",
    signal: "Employment fraud and tech-support abuse remain common entry points.",
    focus: ["Job onboarding scams", "Fake support calls", "KYC update phishing"],
  },
];

export const CHECKER_PROVIDERS: CheckerProvider[] = [
  {
    id: "urlscan",
    name: "URLScan",
    description: "Render the page and inspect redirects, assets, and suspicious behavior.",
    buildUrl: (value) => `https://urlscan.io/search/#domain:${encodeURIComponent(value)}`,
    tags: ["Page rendering", "Infrastructure", "Suspicious behavior"],
  },
  {
    id: "virustotal",
    name: "VirusTotal",
    description: "Check domains and URLs across multiple security engines.",
    buildUrl: (value) => `https://www.virustotal.com/gui/search/${encodeURIComponent(value)}`,
    tags: ["Multi-engine scan", "Domain reputation"],
  },
  {
    id: "safebrowsing",
    name: "Google Safe Browsing",
    description: "Check if the destination is flagged by Google as unsafe.",
    buildUrl: () => "https://transparencyreport.google.com/safe-browsing/search",
    tags: ["Unsafe-site signal", "Google data"],
  },
  {
    id: "whois",
    name: "ICANN Lookup",
    description: "Review domain registration date, registrar, and ownership clues.",
    buildUrl: (value) => `https://lookup.icann.org/en/lookup?q=${encodeURIComponent(value)}`,
    tags: ["Registration age", "Ownership clues"],
  },
  {
    id: "scamadviser",
    name: "ScamAdviser",
    description: "Check trust signals and public reputation data.",
    buildUrl: (value) => `https://www.scamadviser.com/check-website/${encodeURIComponent(value)}`,
    tags: ["Trust score", "User reputation"],
  },
];
