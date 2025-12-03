import Parser from 'rss-parser';

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  feedUrl?: string;
  category?: 'fraud' | 'scam' | 'phishing' | 'cybersecurity';
}

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
  customFields: {
    item: ['category', 'keywords'],
  },
});

// FRAUD/SCAM-SPECIFIC KEYWORDS for filtering
const FRAUD_KEYWORDS = [
  'scam', 'fraud', 'phishing', 'ransomware', 'identity theft',
  'financial fraud', 'romance scam', 'investment scam', 'cryptocurrency fraud',
  'social engineering', 'impersonation', 'fake', 'counterfeit', 'stolen credentials'
];

// UPDATED WORKING FEEDS
export const OFFICIAL_FEEDS = [
  // General Cyber News (WORKING - filtering for fraud keywords)
  { 
    source: 'Bleeping Computer', 
    url: 'https://www.bleepingcomputer.com/feed/',
    filterByKeywords: true 
  },
  { 
    source: 'The Hacker News', 
    url: 'https://feeds.feedburner.com/TheHackersNews',
    filterByKeywords: true 
  },
  { 
    source: 'KrebsOnSecurity', 
    url: 'https://krebsonsecurity.com/feed/',
    filterByKeywords: true 
  },
  
  // FRAUD-SPECIFIC FEEDS
  { 
    source: 'FTC Consumer Blog', 
    url: 'https://consumer.ftc.gov/blog/rss',
    filterByKeywords: false
  },
];

// Filter function to check if content is fraud-related
function isFraudRelated(title: string, description: string): boolean {
  const combined = `${title} ${description}`.toLowerCase();
  return FRAUD_KEYWORDS.some(keyword => combined.includes(keyword));
}

async function fetchFeed(
  feedUrl: string, 
  sourceName: string,
  filterByKeywords = false
): Promise<AlertItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    const items = (feed.items || []).map((it: any, idx: number) => {
      const pubDate = it.isoDate || it.pubDate || new Date().toISOString();
      const title = (it.title || '').trim();
      const description = (it.contentSnippet || it.content || it.summary || '').trim();
      
      return {
        id: `${sourceName}-${idx}-${new Date(pubDate).getTime()}`,
        title,
        description,
        link: it.link || it.guid || '',
        pubDate: new Date(pubDate).toISOString(),
        source: sourceName,
        feedUrl,
      } as AlertItem;
    });

    // Apply fraud keyword filter if enabled
    if (filterByKeywords) {
      return items.filter(item => isFraudRelated(item.title, item.description));
    }

    return items;
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    
    // Log specific error types
    if (errorMsg.includes('403')) {
      console.error(`Error ${sourceName}: Access Forbidden (403) - Feed may require authentication`);
    } else if (errorMsg.includes('404')) {
      console.error(`Error ${sourceName}: Feed not found (404) - URL may have changed`);
    } else if (errorMsg.includes('timeout')) {
      console.error(`Error ${sourceName}: Request timeout - Feed server too slow`);
    } else {
      console.error(`Error ${sourceName}:`, errorMsg);
    }
    
    return [];
  }
}

export async function fetchOfficialAlerts(feeds = OFFICIAL_FEEDS): Promise<AlertItem[]> {
  console.log('Fetching fraud alerts from feeds...');
  
  const promises = feeds.map((f) => 
    fetchFeed(f.url, f.source, f.filterByKeywords)
  );
  
  const settled = await Promise.allSettled(promises);

  const collected: AlertItem[] = [];
  let successCount = 0;
  
  settled.forEach((res, idx) => {
    if (res.status === 'fulfilled' && res.value.length > 0) {
      collected.push(...res.value);
      successCount++;
      console.log(`Success ${feeds[idx].source}: ${res.value.length} alerts`);
    }
  });

  console.log(`Successfully fetched from ${successCount}/${feeds.length} feeds`);

  // Deduplicate
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
  uniqueItems.sort((a, b) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  console.log(`Returning ${uniqueItems.length} unique alerts`);
  return uniqueItems;
}