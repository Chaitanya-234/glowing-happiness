import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Gatling Load Testing Tool | Script Generator | DevMetrix',
  description: 'Free AI-powered Gatling load testing tool. Generate Scala DSL scripts for load, stress, spike, and endurance tests. Analyze Gatling reports with AI-powered bottleneck detection and optimization recommendations.',
  keywords: [
    'gatling load testing tool',
    'gatling script generator',
    'gatling report analyzer',
    'ai gatling tool',
    'gatling scala dsl generator',
    'gatling simulation',
    'gatling scenario builder',
    'load testing tool',
    'performance testing tool',
    'stress testing tool',
    'api load testing',
    'concurrent user testing'
  ],
  openGraph: {
    title: 'AI Gatling Load Testing Tool - Generate Scripts & Analyze Reports',
    description: 'Generate production-ready Gatling Scala scripts and analyze load test reports with AI. Detect bottlenecks, optimize performance, plan capacity.',
    type: 'website',
    url: 'https://devmetrix.com/tools/gatling-tool',
    siteName: 'DevMetrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Gatling Tool | DevMetrix',
    description: 'Generate Gatling load test scripts and analyze reports with AI. Bottleneck detection, optimization, capacity planning.',
    creator: '@devmetrix',
  },
};

export default function GatlingToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
