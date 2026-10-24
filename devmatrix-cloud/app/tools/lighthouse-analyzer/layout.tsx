import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Lighthouse Analyzer | Web Performance Optimization | DevMetrix',
  description: 'Free AI-powered Lighthouse report analyzer for Next.js. Upload your Lighthouse JSON report and get prioritized, actionable optimization recommendations. Improve performance, accessibility, SEO scores with Next.js-specific guidance. Instant analysis powered by Gemini AI.',
  keywords: [
    'lighthouse report analyzer',
    'lighthouse optimization tool',
    'ai lighthouse analyzer',
    'web performance analyzer',
    'lighthouse score improvement',
    'core web vitals optimization',
    'next.js performance optimization',
    'next.js lighthouse score',
    'web accessibility checker',
    'technical seo audit'
  ],
  openGraph: {
    title: 'AI Lighthouse Report Analyzer - Optimize Your Web Performance',
    description: 'Upload your Lighthouse report and get AI-powered analysis with prioritized fixes. Improve performance, accessibility, SEO scores with Next.js-specific recommendations.',
    url: 'https://devmetrix.com/tools/lighthouse-analyzer',
    siteName: 'DevMetrix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Lighthouse Analyzer | DevMetrix',
    description: 'AI-powered Lighthouse report analysis. Get prioritized optimization recommendations for performance, accessibility, and SEO.',
    creator: '@devmetrix',
  }
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'AI Lighthouse Report Analyzer',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'AI-powered Lighthouse Analysis',
              'Next.js Optimization Recommendations',
              'Core Web Vitals Deep Dive',
              'Accessibility Compliance Check',
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
