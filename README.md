# FraudInfo

FraudInfo is a fraud-response platform built with Next.js. It helps users investigate suspicious activity, check links and websites, understand scam patterns, find the right reporting agencies, and stay informed through curated alert feeds.

## What the product does

- Landing page with a premium fraud-tech experience, scanner visuals, and guided navigation
- Fraud reporting workflow with incident triage and agency recommendations
- Website checker workspace that routes users through trusted verification sources
- Scam pattern library with red flags, response guidance, and regional signal summaries
- Agency directory for verified reporting and support channels
- Prevention and fraud-resource pages for education and reference
- Live alert cards backed by server routes and cache-aware feed handling

## Main routes

- `/` - Product landing page
- `/report` - Triage and reporting guidance
- `/checker` - Website and link verification workspace
- `/library` - Scam pattern library and regional signal board
- `/agencies` - Verified agency directory
- `/prevention` - Prevention guidance
- `/infosearch` - Search across agencies and resources
- `/about` - Product/about page

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Lucide React
- Vercel Analytics
- Cloudflare KV for cached feed responses

## Backend behavior

This project includes backend logic through Next.js route handlers in `app/api`.

- `app/api/alerts/route.ts`
  Serves official alert content with cache support and stale-cache fallback
- `app/api/rss/route.ts`
  Serves trending news content with cache support and stale-cache fallback
- `app/api/contribute/route.ts`
  Handles contribution/contact style submissions

The app does not collect user fraud reports directly. It helps users understand incidents and route themselves to the right external agencies.

## Current product features

### 1. Reporting workflow

The report experience focuses on clarity and speed:

- Quick incident triage
- Fraud-type matching
- Optional location narrowing
- Ranked agency recommendations

### 2. Website checker

The checker is a practical verification workflow, not a fake scanner.

It currently helps users investigate a URL or domain through trusted external sources such as:

- URLScan
- VirusTotal
- Google Safe Browsing
- ICANN Lookup
- ScamAdviser

### 3. Scam pattern library

The library includes:

- Searchable scam scenarios
- Red flags
- Immediate next actions
- Channel patterns
- Regional signal summaries

### 4. Alert system

The homepage alert cards now behave more reliably:

- Client-side polling loops were removed
- Feed parsing was hardened
- Cached responses are returned when available
- Stale cached data is used when fresh providers fail

## Design direction

The current UI has been refactored toward a cleaner fraud-tech brand system:

- Dark technical surfaces
- Grid and graph-pattern treatments
- Scanner-inspired motion
- Subtle signal/scan effects across pages
- Responsive desktop and mobile navigation

## Project structure

- `app/`
  App Router pages and API routes
- `components/`
  Reusable UI sections, cards, navigation, and report components
- `lib/`
  Data utilities, feed logic, cache helpers, and product feature data
- `data/`
  Static structured data such as agencies

## Local development

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Environment variables

The project can run without every integration enabled, but these are relevant for full functionality:

- `GNEWS_API_KEY`
  Used by the trending news route
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_KV_NAMESPACE_ID`
- `CACHE_TTL_SECONDS`

If Cloudflare KV is configured, alert/news caching becomes more resilient.

## Notes

- Feed providers can fail or rate-limit. The app now falls back to cached content when possible.
- There is still an existing workspace-root warning during build because multiple lockfiles are detected outside this project folder.
- `baseline-browser-mapping` also reports an existing staleness warning during build.

## Status

The current app is in a strong presentation-ready state with:

- refined landing page
- stabilized feed behavior
- real checker workflow
- triage-driven reporting guidance
- scam library and regional signal board

## License

MIT
