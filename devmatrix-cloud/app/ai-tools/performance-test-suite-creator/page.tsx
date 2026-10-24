import type { Metadata } from 'next';
import Link from 'next/link';
import PerformanceTestCreatorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Performance Test Creator | JMeter, k6, Gatling',
  description: 'Generate load testing scripts for JMeter, k6, or Gatling instantly. Simulate high traffic, stress test APIs, and ensure application scalability.',
  keywords: [
    'ai performance testing',
    'load test generator',
    'jmeter script builder',
    'k6 test creator',
    'gatling automation',
    'stress testing tool',
    'api load testing',
    'scalability testing'
  ],
  openGraph: {
    title: 'AI Performance Test Suite Creator | Load Test Instantly',
    description: 'Create ready-to-run performance test scripts for JMeter and k6 to validate your application\'s scalability.',
    type: 'website',
  }
};

export default function PerformanceTestCreatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Performance Test Suite Creator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that generates performance and load testing scripts for tools like JMeter and k6 based on API definitions.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '540',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://devmetrix.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Tools',
        item: 'https://devmetrix.in/ai-tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Performance Test Creator',
        item: 'https://devmetrix.in/ai-tools/performance-test-suite-creator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I define user load profiles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can specify the number of virtual users (VUs), ramp-up periods, and test duration in the configuration.'
        }
      },
      {
        '@type': 'Question',
        name: 'What output formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We primarily support JMeter (.jmx XML structure) and k6 (JavaScript) scripts, as well as Gatling (Scala/Java).'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it handle dynamic data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The AI can include logic for random data generation (like random IDs or payloads) within the scripts.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-black pt-24">
        {/* Semantic Header Section */}
        <section className="text-center px-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                AI Performance Test Creator
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Prepare for High Traffic. <br className="hidden md:block" />
                Generate JMeter and k6 scripts instantly to stress test your APIs.
            </p>
        </section>

        {/* The Tool Interface */}
        <PerformanceTestCreatorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">Stress Test in Seconds</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Define Target:</strong> Enter your API endpoints or curl commands.</li>
                    <li><strong className="text-purple-100/80">Configure Load:</strong> Set virtual users, duration, and ramp-up time.</li>
                    <li><strong className="text-purple-100/80">Select Tool:</strong> Choose between JMeter (XML) or k6 (JS).</li>
                    <li><strong className="text-purple-100/80">Download:</strong> Get the script and run it in your load testing environment.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-red-500 mb-3">Scalability Assurance</h3>
                    <p className="text-purple-200/50">
                        Don't wait for Black Friday. Validate your system's capacity now with realistic load patterns.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-red-500 mb-3">CI/CD Ready</h3>
                    <p className="text-purple-200/50">
                        The generated k6 scripts are perfect for automated performance gates in your deployment pipeline.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Do I need to install JMeter/k6?</h3>
                        <p className="text-purple-200/50">Yes, this tool generates the configuration scripts. You will need the respective tool installed locally or in your CI to execute them.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More QA Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/integration-test-builder" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Integration Builder
                    </Link>
                    <Link href="/ai-tools/test-coverage-analyzer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Coverage Analyzer
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-red-600/20 border border-red-500/30 rounded-full text-red-300 hover:bg-red-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
