
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;


export async function kvGet(key: string): Promise<any | null> {
  if (!ACCOUNT_ID || !API_TOKEN || !NAMESPACE_ID) {
    console.error('Missing Cloudflare KV credentials');
    return null;
  }

  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${key}`;
    
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`KV GET failed: ${res.status}`);
    }

    const text = await res.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (err: any) {
    console.error('kvGet error:', err.message);
    return null;
  }
}


export async function kvSet(
  key: string, 
  value: any, 
  ttlSeconds?: number
): Promise<boolean> {
  if (!ACCOUNT_ID || !API_TOKEN || !NAMESPACE_ID) {
    console.error('Missing Cloudflare KV credentials');
    return false;
  }

  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${key}`;
    
    const body = typeof value === 'string' ? value : JSON.stringify(value);
    
    const params = new URLSearchParams();
    if (ttlSeconds) {
      params.set('expiration_ttl', String(ttlSeconds));
    }
    
    const finalUrl = ttlSeconds ? `${url}?${params.toString()}` : url;

    const res = await fetch(finalUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      throw new Error(`KV SET failed: ${res.status}`);
    }

    return true;
  } catch (err: any) {
    console.error('kvSet error:', err.message);
    return false;
  }
}


export async function kvDelete(key: string): Promise<boolean> {
  if (!ACCOUNT_ID || !API_TOKEN || !NAMESPACE_ID) {
    console.error('Missing Cloudflare KV credentials');
    return false;
  }

  try {
    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${key}`;
    
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error(`KV DELETE failed: ${res.status}`);
    }

    return true;
  } catch (err: any) {
    console.error('kvDelete error:', err.message);
    return false;
  }
}

// Generic cache helpers using KV
export async function getCache<T>(key: string): Promise<T | null> {
  return await kvGet(key);
}

export async function setCache(key: string, value: any, ttlSeconds?: number): Promise<void> {
  const ttl = ttlSeconds || parseInt(process.env.CACHE_TTL_SECONDS || '300', 10);
  await kvSet(key, value, ttl);
}