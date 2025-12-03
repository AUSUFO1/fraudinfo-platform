export interface RSSItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string; // ISO string
  source: string;
}

/*
 Fetch trending scam/fraud articles using GNews.io
 */
export async function fetchTrendingNewsFromProvider(
  apiKey: string,
  query = 'fraud OR scam OR consumer alert',
  pageSize = 10
): Promise<RSSItem[]> {
  if (!apiKey) {
    throw new Error('Missing GNEWS_API_KEY');
  }

  // GNews API endpoint
  const url = new URL('https://gnews.io/api/v4/search');
  url.searchParams.set('q', query);
  url.searchParams.set('lang', 'en');
  url.searchParams.set('country', 'us'); 
  url.searchParams.set('max', String(Math.min(pageSize, 10))); // GNews free tier max is 10
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set('sortby', 'publishedAt');

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
    // timeout to prevent hanging
    signal: AbortSignal.timeout(30000), // 30 second timeout
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    
    // Handle specific GNews errors
    if (res.status === 403) {
      throw new Error('API key invalid or expired');
    }
    if (res.status === 429) {
      throw new Error('Daily request limit reached');
    }
    if (res.status >= 500) {
      throw new Error('News service temporarily unavailable');
    }
    
    throw new Error(`News API error ${res.status}: ${txt}`);
  }

  const data = await res.json();

  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error('Invalid news response format');
  }

  // Map GNews articles to my format
  const items: RSSItem[] = data.articles.map((a: any, idx: number) => {
    const publishedAt = a.publishedAt || new Date().toISOString();
    const timestamp = new Date(publishedAt).getTime();
    
    return {
      // Create truly unique IDs using URL hash + timestamp + index
      id: `gnews-${timestamp}-${idx}-${a.url?.slice(-8) || Math.random().toString(36).slice(2)}`,
      title: (a.title || 'No title').trim(),
      description: (a.description || a.content || '').trim(),
      link: a.url || '',
      pubDate: publishedAt,
      source: a.source?.name || 'GNews',
    };
  });

  // Sort newest first
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Remove duplicates by title (in case API returns dupes)
  const uniqueItems = items.filter((item, index, self) => 
    index === self.findIndex((t) => t.title === item.title)
  );

  return uniqueItems.slice(0, pageSize);
}