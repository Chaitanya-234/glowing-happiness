import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Cache Strategy Optimizer | Design Caching Architecture | DevMetrix',
  description: 'Free AI-powered cache strategy optimizer. Analyze your application, get multi-tier caching architecture with Redis, CDN, and application cache recommendations. Includes implementation code, performance estimates, and monitoring setup.',
  keywords: [
    'cache strategy optimizer',
    'caching architecture tool',
    'ai cache designer',
    'redis cache strategy',
    'cdn caching tool',
    'distributed caching',
    'cache invalidation strategy',
    'redis caching',
    'cdn optimization',
    'application cache',
    'memory cache',
    'database query cache',
    'full page cache',
    'cache hit rate',
    'latency optimization',
    'performance optimization',
    'api caching',
    'web performance',
    'cache implementation',
    'redis setup',
    'cache configuration',
    'caching code generator',
    'next.js caching',
    'node.js cache',
    'react cache',
    'redis cache',
    'memcached',
    'cloudflare cache',
    'cloudfront caching'
  ],
  openGraph: {
    title: 'AI Cache Strategy Optimizer - Design Multi-Tier Caching',
    description: 'Analyze your app and get production-ready caching architecture. AI recommends Redis, CDN, and application cache strategies with code.',
    type: 'website',
    url: 'https://devmetrix.in/tools/cache-optimizer',
    siteName: 'DevMetrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Cache Strategy Optimizer | DevMetrix',
    description: 'Design optimal caching architecture with AI. Get Redis, CDN, and app cache strategies with implementation code. Free tool.',
    creator: '@devmetrix',
  },
};

export default function CacheOptimizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
