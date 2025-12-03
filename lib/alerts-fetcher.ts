import Parser from 'rss-parser';

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  feedUrl?: string;
}

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'ScamShield/1.0',
  },
});

export const OFFICIAL_FEEDS = [
  // Cybersecurity & Scam Alerts
  { source: 'KrebsOnSecurity', url: 'https://krebsonsecurity.com/feed/' },
  { source: 'Scamwatch Australia', url: 'https://www.scamwatch.gov.au/news-alerts/rss.xml' },
  { source: 'US-CERT', url: 'https://www.cisa.gov/cybersecurity-advisories/feed' },

  // Anti-fraud agencies (working feeds)
  { source: 'Action Fraud UK', url: 'https://www.actionfraud.police.uk/rss.xml' },
  { source: 'Europol Alerts', url: 'https://www.europol.europa.eu/media-press/rss' },

  // General Cyber Threat Feeds (VERY active)
  { source: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/feed/' },
  { source: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' }
];


async function fetchFeed(feedUrl: string, sourceName: string): Promise<AlertItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    const items = (feed.items || []).map((it: any, idx: number) => {
      const pubDate = it.isoDate || it.pubDate || new Date().toISOString();
      return {
        id: `${sourceName}-${idx}-${new Date(pubDate).getTime()}`,
        title: (it.title || '').trim(),
        description: (it.contentSnippet || it.content || it.summary || '').trim(),
        link: it.link || it.guid || '',
        pubDate: new Date(pubDate).toISOString(),
        source: sourceName,
        feedUrl,
      } as AlertItem;
    });
    return items;
  } catch (err: any) {
    console.error(`Error fetching feed ${sourceName}:`, err?.message || err);
    return [];
  }
}

export async function fetchOfficialAlerts(feeds = OFFICIAL_FEEDS): Promise<AlertItem[]> {
  const promises = feeds.map((f) => fetchFeed(f.url, f.source));
  const settled = await Promise.allSettled(promises);

  const collected: AlertItem[] = [];
  settled.forEach((res) => {
    if (res.status === 'fulfilled') {
      collected.push(...res.value);
    }
  });

  const dedupeMap = new Map<string, AlertItem>();
  for (const item of collected) {
    const key = (item.link || item.title).trim();
    if (!key) continue;
    if (!dedupeMap.has(key)) {
      dedupeMap.set(key, item);
    } else {
      const existing = dedupeMap.get(key)!;
      if (new Date(item.pubDate).getTime() > new Date(existing.pubDate).getTime()) {
        dedupeMap.set(key, item);
      }
    }
  }

  const uniqueItems = Array.from(dedupeMap.values());
  uniqueItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return uniqueItems;
}