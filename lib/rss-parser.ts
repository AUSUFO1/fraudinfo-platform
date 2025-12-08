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
 All errors are FRIENDLY and do NOT leak technical details.
*/
export async function fetchTrendingNewsFromProvider(
  apiKey: string,
  query = "fraud",
  pageSize = 10
): Promise<RSSItem[]> {
  if (!apiKey) {
    throw new Error("Unable to load news at the moment.");
  }

  const url = new URL("https://gnews.io/api/v4/search");
  url.searchParams.set("q", query);
  url.searchParams.set("lang", "en");
  url.searchParams.set("country", "us");
  url.searchParams.set("max", String(Math.min(pageSize, 10)));
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("sortby", "publishedAt");

  let res: Response;

  try {
    res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(30000), // 30s timeout
    });
  } catch (err) {
    console.error("GNews request failed:", err);
    throw new Error("Unable to fetch news from our providers.");
  }

  // Handle HTTP errors gracefully
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("News service is temporarily restricted.");
    }
    if (res.status === 429) {
      throw new Error("Too many requests — news will refresh shortly.");
    }
    if (res.status >= 500) {
      throw new Error("News provider is currently unavailable.");
    }

    throw new Error("Unable to load news at this time.");
  }

  let data: any;

  try {
    data = await res.json();
  } catch {
    throw new Error("Received invalid data from news provider.");
  }

  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error("News provider returned an unexpected format.");
  }

  // Map GNews articles to unified RSSItem format
  const items: RSSItem[] = data.articles.map((a: any, idx: number) => {
    const publishedAt = a.publishedAt || new Date().toISOString();
    const timestamp = new Date(publishedAt).getTime();

    return {
      id: `gnews-${timestamp}-${idx}-${a.url?.slice(-8) || Math.random().toString(36).slice(2)}`,
      title: (a.title || "Untitled Article").trim(),
      description: (a.description || a.content || "No description available.").trim(),
      link: a.url || "",
      pubDate: publishedAt,
      source: a.source?.name || "GNews",
    };
  });

  // Sort newest first
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // Remove duplicates by title
  const uniqueItems = items.filter(
    (item, index, self) => index === self.findIndex((t) => t.title === item.title)
  );

  return uniqueItems.slice(0, pageSize);
}
