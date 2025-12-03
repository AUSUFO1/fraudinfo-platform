import { NextResponse } from 'next/server';
import { fetchTrendingNewsFromProvider } from '../../../lib/rss-parser';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || 'fraud OR scam OR consumer alert';
    const pageSizeParam = parseInt(searchParams.get('pageSize') || '10', 10);
    const pageSize = Number.isNaN(pageSizeParam) ? 10 : Math.min(50, pageSizeParam);

    const GNEWS_KEY = process.env.GNEWS_API_KEY;
    if (!GNEWS_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'News service not configured', 
          userMessage: 'Unable to load news feed. Please check back later.',
          items: [] 
        },
        { status: 500 }
      );
    }

    // Fetch live news with timeout protection
    const items = await fetchTrendingNewsFromProvider(GNEWS_KEY, q, pageSize);

    console.log('Fetched items:', items.length); // Debug log

    return NextResponse.json({
      success: true,
      items,
      count: items.length,
      timestamp: new Date().toISOString(),
      query: q,
    });
  } catch (err: any) {
    console.error('RSS route (GNews) error:', err?.message || err);
    
    // Provide user-friendly error messages
    let userMessage = 'Unable to load news. Check back soon!';
    
    if (err?.message?.includes('timeout') || err?.message?.includes('fetch')) {
      userMessage = 'News feed is taking too long. Try again in a moment!';
    } else if (err?.message?.includes('limit reached')) {
      userMessage = 'Daily news limit reached. Back tomorrow!';
    } else if (err?.message?.includes('temporarily unavailable')) {
      userMessage = 'News service is down. We\'ll be back shortly!';
    }

    return NextResponse.json(
      { 
        success: false, 
        error: err?.message || 'Unknown error',
        userMessage,
        items: [] 
      },
      { status: 502 }
    );
  }
}