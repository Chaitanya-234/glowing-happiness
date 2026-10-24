import { NextRequest, NextResponse } from 'next/server';

function isPrivateIP(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    const hostname = url.hostname;

    // Check for localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return true;
    }

    // Simple IP regex check (not exhaustive but covers common cases)
    // 10.x.x.x
    if (hostname.startsWith('10.')) return true;
    // 192.168.x.x
    if (hostname.startsWith('192.168.')) return true;
    // 172.16.x.x - 172.31.x.x
    if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)) return true;

    // AWS Metadata service
    if (hostname === '169.254.169.254') return true;

    return false;
  } catch (e) {
    return true; // If URL is invalid, treat as unsafe
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, method, headers, body } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }

    if (isPrivateIP(url)) {
      return NextResponse.json({ error: 'Forbidden: Cannot proxy to private/local networks.' }, { status: 403 });
    }

    const start = Date.now();

    const fetchOptions: RequestInit = {
      method: method || 'POST',
      headers: headers || {},
      body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
    };

    const response = await fetch(url, fetchOptions);
    const duration = Date.now() - start;

    const responseBody = await response.text();

    // Convert Headers to plain object
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
      duration
    });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 0,
      duration: 0
    }, { status: 500 });
  }
}
