import { NextResponse } from 'next/server';
import { getCache, setCache } from '../../../lib/cloudflare-kv';
import { fetchTrendingNewsFromProvider } from '../../../lib/rss-parser';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const CACHE_KEY_PREFIX = 'fraudinfo_trending_news';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'fraud';
  const pageSizeParam = parseInt(searchParams.get('pageSize') || '10', 10);
  const pageSize = Number.isNaN(pageSizeParam) ? 10 : Math.min(50, pageSizeParam);
  const refresh = searchParams.get('refresh') === '1';
  const cacheKey = `${CACHE_KEY_PREFIX}:${q.toLowerCase()}`;

  try {
    if (!refresh) {
      const cached = await getCache<any>(cacheKey);
      if (cached && Array.isArray(cached.items) && cached.items.length > 0) {
        return NextResponse.json({
          success: true,
          items: cached.items.slice(0, pageSize),
          count: Math.min(cached.items.length, pageSize),
          timestamp: cached.timestamp,
          query: q,
          fromCache: true,
        });
      }
    }

    const GNEWS_KEY = process.env.GNEWS_API_KEY;
    if (!GNEWS_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'News service not configured',
          userMessage: 'Unable to load news feed. Please check back later.',
          items: [],
        },
        { status: 500 },
      );
    }

    const items = await fetchTrendingNewsFromProvider(GNEWS_KEY, q, pageSize);
    const toCache = {
      items,
      timestamp: new Date().toISOString(),
    };

    await setCache(cacheKey, toCache, 1800);

    return NextResponse.json({
      success: true,
      items,
      count: items.length,
      timestamp: toCache.timestamp,
      query: q,
      fromCache: false,
    });
  } catch (err: any) {
    console.error('RSS route (GNews) error:', err?.message || err);

    const cached = await getCache<any>(cacheKey);
    if (cached && Array.isArray(cached.items) && cached.items.length > 0) {
      return NextResponse.json({
        success: true,
        items: cached.items.slice(0, pageSize),
        count: Math.min(cached.items.length, pageSize),
        timestamp: cached.timestamp,
        query: q,
        fromCache: true,
        stale: true,
      });
    }

    let userMessage = 'Unable to load news. Check back soon!';

    if (err?.message?.includes('timeout') || err?.message?.includes('fetch')) {
      userMessage = 'News feed is taking too long. Try again in a moment!';
    } else if (err?.message?.includes('limit reached')) {
      userMessage = 'Daily news limit reached. Back tomorrow!';
    } else if (err?.message?.includes('temporarily unavailable')) {
      userMessage = 'News service is down. We will be back shortly!';
    }

    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Unknown error',
        userMessage,
        items: [],
      },
      { status: 502 },
    );
  }
}
