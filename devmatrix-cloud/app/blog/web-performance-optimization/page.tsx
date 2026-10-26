'use client';
// app/blog/web-performance-optimization/page.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: 'Web Performance Optimization: Core Web Vitals and Beyond | DevMetrix',
  description: 'Boost your website speed with lazy loading, code splitting, caching strategies, and Core Web Vitals optimization. Security implications included.',
  keywords: ['web performance', 'core web vitals', 'page speed', 'lazy loading', 'code splitting', 'performance security'],
  authors: [{ name: 'DevMetrix Performance Team', url: 'https://devmetrix.in/about' }],
  openGraph: {
    title: 'Web Performance Optimization: Complete Guide',
    description: 'Master web performance with proven optimization techniques',
    type: 'article',
    publishedTime: '2025-10-12T00:00:00.000Z',
  },
};

export default function WebPerformanceGuide() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="Web Performance Optimization: Core Web Vitals and Beyond"
        description="Boost your website speed with lazy loading, code splitting, caching strategies, and Core Web Vitals optimization."
        datePublished="2025-10-12"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/web-performance-optimization"
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-yellow-500 to-orange-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full mb-4 border border-green-500/30">
              ⚡ Performance
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-yellow-200 to-orange-200 mb-4 leading-tight">
              Web Performance Optimization: Core Web Vitals and Beyond
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 12, 2025</span>
              <span>•</span>
              <span>⏱️ 16 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix Performance Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Reviewed by performance engineers</p>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="sticky top-16 z-40 mb-8 bg-green-900/20 backdrop-blur-sm border border-green-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-green-200/60 overflow-x-auto">
            <span className="whitespace-nowrap">🗺️ Jump to:</span>
            <a href="#metrics" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Metrics</a>
            <a href="#optimization" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Optimization</a>
            <a href="#security" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Security</a>
            <a href="#monitoring" className="px-2 py-1 bg-green-800/30 rounded hover:bg-green-700/40 transition-colors whitespace-nowrap">Monitoring</a>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          {/* Intro */}
          <div className="bg-gradient-to-br from-green-900/20 via-yellow-900/20 to-orange-900/20 border-2 border-green-500/30 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">⚡</div>
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4 relative z-10">
              Every 100ms of delay costs you money. Amazon found that every 100ms of latency cost them 1% in sales.
              Google discovered that 53% of mobile users abandon sites that take over 3 seconds to load. Performance
              isn't just a nice-to-have anymore - it directly impacts your bottom line, SEO rankings, and user retention.
            </p>
            <p className="text-base text-purple-200/60 relative z-10">
              I've optimized sites from 8-second load times down to under 1 second. The difference? Users stayed longer,
              converted more, and Google ranked them higher. This guide covers the techniques that actually move the
              needle, not just theoretical best practices. Plus, we'll discuss critical security implications of
              performance optimizations that most developers completely miss.
            </p>
          </div>

          {/* Performance Impact Scale */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-xs font-semibold text-green-300">Excellent</div>
              <div className="text-xs text-green-200/50 mt-1">&lt; 1s load</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">👍</div>
              <div className="text-xs font-semibold text-yellow-300">Good</div>
              <div className="text-xs text-yellow-200/50 mt-1">1s - 3s</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">😐</div>
              <div className="text-xs font-semibold text-orange-300">Needs Work</div>
              <div className="text-xs text-orange-200/50 mt-1">3s - 5s</div>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💀</div>
              <div className="text-xs font-semibold text-red-300">Poor</div>
              <div className="text-xs text-red-200/50 mt-1">&gt; 5s</div>
            </div>
          </div>

          <h2 id="metrics" className="text-3xl font-bold text-green-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">📊</span>
            Core Web Vitals: What Actually Matters
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed mb-6">
            Google's Core Web Vitals are now ranking factors. Ignore them at your peril. These three metrics determine
            if your site feels fast to users:
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-blue-200/80 mb-2">LCP</h3>
              <p className="text-sm text-blue-200/60 mb-3">Largest Contentful Paint</p>
              <div className="text-xs text-blue-200/50 space-y-1">
                <div>✓ Good: &lt; 2.5s</div>
                <div>⚠ Needs work: 2.5s - 4s</div>
                <div>✗ Poor: &gt; 4s</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🖱️</div>
              <h3 className="text-lg font-bold text-yellow-200/80 mb-2">FID</h3>
              <p className="text-sm text-yellow-200/60 mb-3">First Input Delay</p>
              <div className="text-xs text-yellow-200/50 space-y-1">
                <div>✓ Good: &lt; 100ms</div>
                <div>⚠ Needs work: 100ms - 300ms</div>
                <div>✗ Poor: &gt; 300ms</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">📐</div>
              <h3 className="text-lg font-bold text-green-200/80 mb-2">CLS</h3>
              <p className="text-sm text-green-200/60 mb-3">Cumulative Layout Shift</p>
              <div className="text-xs text-green-200/50 space-y-1">
                <div>✓ Good: &lt; 0.1</div>
                <div>⚠ Needs work: 0.1 - 0.25</div>
                <div>✗ Poor: &gt; 0.25</div>
              </div>
            </div>
          </div>

          <h2 id="optimization" className="text-3xl font-bold text-yellow-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🔧</span>
            Optimization Techniques That Work
          </h2>

          <div className="space-y-8 my-10">
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-2 border-green-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-200/80 mb-4">1. Code Splitting & Lazy Loading</h3>
              <p className="text-sm text-green-200/60 mb-4">
                Don't load everything upfront. Split your code and load components only when needed.
              </p>
              <pre className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs mb-4">
                <code className="text-green-100/80">{`// React lazy loading
import { lazy, Suspense } from 'react';

// Instead of: import HeavyComponent from './HeavyComponent';
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Next.js dynamic imports
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Don't render on server
});

// Webpack code splitting
const loadDashboard = () => import(
  /* webpackChunkName: "dashboard" */
  './Dashboard'
);`}</code>
              </pre>
              <div className="bg-blue-900/20 p-3 rounded text-xs text-blue-200/60">
                <strong>Impact:</strong> Reduced initial bundle from 2MB to 300KB. Load time dropped from 5s to 1.2s.
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-2 border-yellow-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-yellow-200/80 mb-4">2. Image Optimization</h3>
              <p className="text-sm text-yellow-200/60 mb-4">
                Images are usually the biggest performance killer. Optimize them properly.
              </p>
              <pre className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30 overflow-x-auto text-xs">
                <code className="text-yellow-100/80">{`// Next.js Image component (automatic optimization)
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  priority // Load immediately for above-fold images
  placeholder="blur" // Show blur while loading
/>

// Lazy load images below the fold
<Image
  src="/product.jpg"
  width={400}
  height={300}
  alt="Product"
  loading="lazy" // Browser-native lazy loading
/>

// Modern formats with fallbacks
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Fallback" />
</picture>`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-2 border-orange-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-orange-200/80 mb-4">3. Caching Strategies</h3>
              <pre className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30 overflow-x-auto text-xs">
                <code className="text-orange-100/80">{`// Service Worker caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch new
      return response || fetch(event.request).then((response) => {
        // Cache the new response
        return caches.open('v1').then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// HTTP caching headers
app.use((req, res, next) => {
  // Cache static assets for 1 year
  if (req.url.match(/\\.(js|css|png|jpg|jpeg|gif|svg)$/)) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

// Redis caching for API responses
const cachedData = await redis.get(\`api:\${key}\`);
if (cachedData) {
  return JSON.parse(cachedData);
}

const freshData = await fetchFromDatabase();
await redis.setex(\`api:\${key}\`, 300, JSON.stringify(freshData));
return freshData;`}</code>
              </pre>
            </div>
          </div>

          <h2 id="security" className="text-3xl font-bold text-red-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🔒</span>
            Performance Optimization Security Risks
          </h2>

          <div className="bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 border-2 border-red-500/30 rounded-xl p-6 md:p-8 mb-12">
            <p className="text-base md:text-lg text-red-100/80 leading-relaxed mb-4">
              Here's something most performance guides won't tell you: aggressive optimization can introduce serious
              security vulnerabilities. I've audited sites where performance "improvements" created XSS vulnerabilities,
              exposed sensitive data through caching, and opened timing attack vectors. The rush to optimize often bypasses
              security reviews, and that's dangerous.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              Content Delivery Networks (CDNs) are a perfect example. Everyone knows CDNs improve performance by caching
              content closer to users. But here's what happens in practice: developers cache everything including authenticated
              API responses, session data, and user-specific content. I've personally seen a major e-commerce site accidentally
              cache user account pages on their CDN, exposing customer data to anyone who visited the same URL. One user's
              order history, payment methods, and personal information was served to random visitors for hours before someone
              noticed.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              The problem compounds with shared caching. When you use a public CDN like Cloudflare or CloudFront, your content
              sits on servers shared with thousands of other sites. Misconfigure your cache headers, and sensitive data becomes
              accessible not just to your users but potentially to anyone probing the CDN. Cache poisoning attacks exploit this -
              attackers inject malicious content into the CDN cache, and suddenly you're serving malware from your "trusted"
              domain.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              Lazy loading and code splitting introduce their own risks. When you dynamically import JavaScript, you're loading
              code from a URL at runtime. If an attacker compromises your CDN or performs a man-in-the-middle attack, they can
              inject malicious code into those dynamic imports. Your users trust your domain, so their browsers execute the
              malicious code without question. Subresource Integrity (SRI) tags don't work with dynamic imports, leaving you
              vulnerable.
            </p>

            <h3 className="text-xl font-bold text-orange-200/80 mt-6 mb-4">CDN Security: What You Must Do</h3>

            <p className="text-sm text-orange-200/60 leading-relaxed mb-4">
              First, understand that CDN caching is not content-aware. The CDN doesn't know if a response contains sensitive
              data - it just follows your Cache-Control headers blindly. You must explicitly tell the CDN what's safe to cache
              and what's not:
            </p>

            <pre className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30 overflow-x-auto text-xs mb-6">
              <code className="text-orange-100/80">{`// NEVER cache authenticated responses
app.use((req, res, next) => {
  if (req.headers.authorization || req.cookies.session) {
    // Explicitly prevent caching
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  next();
});

// Safe caching for public assets only
app.use('/public', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=31536000, immutable');
  next();
});

// Vary header for user-specific content
app.get('/api/user/preferences', (req, res) => {
  // Tell CDN this varies by Cookie
  res.set('Vary', 'Cookie, Authorization');
  res.set('Cache-Control', 'private, max-age=300');
  // Now CDN caches separately per user
  res.json(getUserPreferences(req.user.id));
});`}</code>
            </pre>

            <h3 className="text-xl font-bold text-yellow-200/80 mt-6 mb-4">Timing Attacks: The Hidden Danger</h3>

            <p className="text-sm text-yellow-200/60 leading-relaxed mb-4">
              Performance optimizations make timing attacks easier. When you cache database queries, the response time
              difference between cached and uncached requests reveals whether data exists. Attackers use this to enumerate
              users, guess email addresses, or map your database structure. I've seen systems where checking if a username
              exists took 500ms (database lookup) versus 5ms (cache hit). Attackers scripted this to enumerate millions of
              valid usernames in hours.
            </p>

            <pre className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30 overflow-x-auto text-xs mb-6">
              <code className="text-yellow-100/80">{`// VULNERABLE: Timing reveals if user exists
app.post('/api/check-username', async (req, res) => {
  const user = await db.users.findOne({
    username: req.body.username
  });

  if (user) {
    return res.json({ available: false }); // Fast response
  }

  return res.json({ available: true }); // Slow response reveals it doesn't exist
});

// SECURE: Constant-time responses
app.post('/api/check-username', async (req, res) => {
  const startTime = Date.now();

  const user = await db.users.findOne({
    username: req.body.username
  });

  // Always take minimum 200ms
  const elapsed = Date.now() - startTime;
  if (elapsed < 200) {
    await sleep(200 - elapsed);
  }

  return res.json({ available: !user });
});`}</code>
            </pre>

            <h3 className="text-xl font-bold text-green-200/80 mt-6 mb-4">Content Security Policy for Performance Assets</h3>

            <p className="text-sm text-green-200/60 leading-relaxed mb-4">
              When you load scripts from CDNs for performance, you must restrict where scripts can come from. Without CSP,
              an attacker who compromises any script on your page can inject additional malicious scripts:
            </p>

            <pre className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs">
              <code className="text-green-100/80">{`// Strict CSP that allows performance optimizations safely
app.use((req, res, next) => {
  res.set('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' https://cdn.trusted.com", // Only trusted CDN
    "style-src 'self' https://cdn.trusted.com 'unsafe-inline'",
    "img-src 'self' data: https:", // Allow optimized images
    "connect-src 'self' https://api.yoursite.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));
  next();
});

// Use Subresource Integrity for external scripts
<script
  src="https://cdn.trusted.com/lib.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
  crossorigin="anonymous"
></script>`}</code>
            </pre>

            <p className="text-sm text-blue-200/60 leading-relaxed mt-4">
              Performance and security aren't opposites - they're complementary when done right. But you can't bolt on security
              after optimizing. Every caching decision, every CDN configuration, every dynamic import needs security review.
              The fastest site is useless if it's leaking user data or serving malware. Test your cache headers, implement CSP,
              use SRI tags, and always assume your CDN could be compromised. Defense in depth matters for performance infrastructure
              just as much as application code.
            </p>
          </div>

          <h2 id="monitoring" className="text-3xl font-bold text-blue-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">📈</span>
            Monitoring and Measurement
          </h2>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`// Performance monitoring with Web Vitals
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = '/api/analytics';

  // Use \`navigator.sendBeacon()\` if available, falling back to \`fetch()\`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);

// Real User Monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.duration}ms\`);
    sendToAnalytics({
      name: entry.name,
      duration: entry.duration,
      startTime: entry.startTime
    });
  }
});

observer.observe({ entryTypes: ['measure', 'navigation'] });`}</code>
          </pre>

          {/* Checklist */}
          <div className="my-12 bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-2 border-green-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-100/80 mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              Performance Optimization Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Implement code splitting</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Lazy load images and components</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Optimize images (WebP/AVIF)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Set up CDN with proper headers</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Enable compression (Gzip/Brotli)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Implement service worker caching</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Configure secure cache headers</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Add SRI tags for external scripts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Implement Content Security Policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Monitor Core Web Vitals</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Test on real devices</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Set performance budgets</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 bg-green-900/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-200/80 mb-4">🎯 The Bottom Line</h3>
            <p className="text-sm text-green-200/60 leading-relaxed">
              Performance optimization is an ongoing process, not a one-time fix. Measure first, optimize based on data,
              and always consider security implications. The fastest site means nothing if it's leaking data or serving
              malware. Start with the low-hanging fruit - image optimization, code splitting, and proper caching - then
              move to advanced techniques. And remember: real users care about perceived performance more than raw numbers.
              A 2-second load that feels instant beats a 1-second load that feels slow.
            </p>
          </div>

          {/* Author Box */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-green-900/20 to-yellow-900/20 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h3 className="text-lg font-semibold text-green-100/80 mb-2">About the Team</h3>
                <p className="text-sm text-green-200/60 leading-relaxed mb-3">
                  Written by DevMetrix's performance engineering team with experience optimizing applications serving
                  millions of users. We've reduced load times by 80%+ across dozens of production sites.
                </p>
                <p className="text-xs text-green-300/40">
                  ✓ Performance experts • ✓ Updated October 2025 • ✓ Security-reviewed practices
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-2 border-green-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-green-100/80 mb-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              Test Your Site Performance
            </h3>
            <p className="text-sm text-green-200/60 mb-4 leading-relaxed">
              Use our API tester to measure response times and identify slow endpoints. Optimize what matters most to your users.
            </p>
            <Link
              href="/tools/api-tester"
              className="inline-block px-6 py-3 bg-green-600/30 text-green-100 rounded-lg border border-green-500/30 hover:bg-green-500/40 transition-all font-semibold no-underline text-sm"
            >
              Try API Tester →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
