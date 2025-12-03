import { NextResponse } from 'next/server';
import { fetchOfficialAlerts } from '../../../lib/alerts-fetcher';
import { getCache, setCache } from '../../../lib/cloudflare-kv';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CACHE_KEY = 'fraudinfo_official_alerts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = Math.min(50, Number(searchParams.get('pageSize') || '25'));
    const refresh = searchParams.get('refresh') === '1';

    if (!refresh) {
      const cached = await getCache<any>(CACHE_KEY);
      if (cached && cached.items && Array.isArray(cached.items)) {
        console.log('Returning cached alerts');
        const trimmed = cached.items.slice(0, pageSize);
        return NextResponse.json({
          success: true,
          items: trimmed,
          fromCache: true,
          timestamp: cached.timestamp,
          count: trimmed.length,
        });
      }
    }

    console.log('Fetching fresh alerts from feeds');
    const items = await fetchOfficialAlerts();

    const toCache = { items, timestamp: new Date().toISOString() };
    await setCache(CACHE_KEY, toCache);

    return NextResponse.json({
      success: true,
      items: items.slice(0, pageSize),
      fromCache: false,
      timestamp: toCache.timestamp,
      count: Math.min(items.length, pageSize),
    });
  } catch (err: any) {
    console.error('API /api/alerts error:', err?.message || err);
    return NextResponse.json(
      { 
        success: false, 
        error: err?.message || 'Unknown error',
        userMessage: 'Unable to load alerts. Check back soon.',
        items: [] 
      },
      { status: 502 }
    );
  }
}