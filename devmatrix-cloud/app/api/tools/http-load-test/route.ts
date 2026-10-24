import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Reusing SSRF check logic from app/api/proxy-request/route.ts
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
  const encoder = new TextEncoder();

  // Create a TransformStream for SSE
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const write = async (data: any) => {
    try {
      await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    } catch (e) {
      // Writer might be closed if client disconnected
    }
  };

  // Parse body
  let config;
  try {
    config = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { url, method = 'GET', headers = {}, body, concurrency = 1, duration = 10 } = config;

  // Validation
  if (!url || isPrivateIP(url)) {
    return NextResponse.json({ error: 'Invalid or forbidden URL. Private IPs and localhost are not allowed.' }, { status: 400 });
  }

  const safeConcurrency = Math.min(Math.max(1, Number(concurrency)), 50); // Max 50 threads
  const safeDuration = Math.min(Math.max(1, Number(duration)), 60); // Max 60 seconds

  // Start processing in background (but we need to keep connection open)
  // In Next.js App Router, returning a response with a readable stream keeps it open.

  (async () => {
    try {
      const startTime = Date.now();
      const endTime = startTime + (safeDuration * 1000);
      let activeRequests = 0;
      let totalRequests = 0;
      let shouldStop = false;

      // We use a shared boolean to signal stop if writer fails (client disconnect)

      const makeRequest = async () => {
        if (shouldStop || Date.now() >= endTime) return;

        activeRequests++;
        const reqStart = Date.now();
        try {
           const fetchOptions: RequestInit = {
            method,
            headers,
            // Only send body for methods that support it
            body: ['GET', 'HEAD'].includes(method.toUpperCase()) ? undefined : (typeof body === 'object' ? JSON.stringify(body) : body),
            signal: AbortSignal.timeout(10000), // 10s timeout per request
          };

          const res = await fetch(url, fetchOptions);
          const reqDuration = Date.now() - reqStart;

          // Optimization: only send summary if high throughput?
          // For now, sending every request result might be heavy if RPS is high.
          // But for max 50 concurrency, it should be manageable via SSE.

          await write({
            type: 'result',
            data: {
              status: res.status,
              duration: reqDuration,
              timestamp: Date.now()
            }
          });

        } catch (error: any) {
          await write({
            type: 'result',
            data: {
              error: error.message || 'Unknown error',
              duration: Date.now() - reqStart,
              timestamp: Date.now(),
              status: 0
            }
          });
        } finally {
          activeRequests--;
          totalRequests++;
          // If time remains, schedule next
          if (Date.now() < endTime && !shouldStop) {
             // Use minimal delay to avoid blocking event loop completely
             // setImmediate is not standard in all envs, queueMicrotask is faster
             // but we want to yield to IO.
             // Recursive call is fine.
             makeRequest();
          } else if (activeRequests === 0) {
             // All done
             await write({ type: 'done' });
             try {
               await writer.close();
             } catch(e) {}
             shouldStop = true;
          }
        }
      };

      // Initial batch
      for (let i = 0; i < safeConcurrency; i++) {
        makeRequest();
      }

      // Safety timeout to close writer if something hangs
      setTimeout(async () => {
         shouldStop = true;
         try { await writer.close(); } catch(e) {}
      }, (safeDuration + 15) * 1000);

    } catch (err) {
       console.error('Load test error:', err);
       try { await writer.close(); } catch(e) {}
    }
  })();

  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
