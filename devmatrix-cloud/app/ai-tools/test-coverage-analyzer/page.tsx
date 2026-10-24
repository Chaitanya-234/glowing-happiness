import type { Metadata } from 'next';
import Link from 'next/link';
import TestCoverageAnalyzerClient from './Client';

export const metadata: Metadata = {
  title: 'AI Test Coverage Analyzer | Find Untested Code',
  description: 'Instantly analyze your code to find uncovered paths and generate missing tests. Improve your test coverage and reduce bugs with AI.',
  keywords: [
    'test coverage analyzer',
    'code coverage tool',
    'untested code finder',
    'generate missing tests',
    'ai qa tool',
    'software testing metrics',
    'code quality analysis'
  ],
  openGraph: {
    title: 'AI Test Coverage Analyzer | Maximize Code Coverage',
    description: 'Identify untested logic and generate the exact test cases needed to reach 100% coverage.',
    type: 'website',
  }
};

export default function TestCoverageAnalyzerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Test Coverage Analyzer',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that estimates test coverage, identifies untested code paths, and generates tests to fill the gaps.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '760',
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
        name: 'Test Coverage Analyzer',
        item: 'https://devmetrix.in/ai-tools/test-coverage-analyzer',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How accurate is the coverage estimate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It provides a static analysis estimate based on logical branches. For precise execution metrics, run a tool like Istanbul or Jacoco, then use this tool to fill the gaps.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can it generate tests for complex logic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it excels at finding edge cases in complex nested conditions (if/else, loops) that are often missed.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it support all languages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It supports any text-based programming language, with optimization for JavaScript, Python, Java, and C#.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">
                AI Test Coverage Analyzer
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Find the gaps in your tests before bugs do. <br className="hidden md:block" />
                Identify untested paths and generate the missing cases instantly.
            </p>
        </section>

        {/* The Tool Interface */}
        <TestCoverageAnalyzerClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">Close the Gaps</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Input Code:</strong> Paste the source code you want to analyze.</li>
                    <li><strong className="text-purple-100/80">Analyze:</strong> The AI scans for logical branches and conditions.</li>
                    <li><strong className="text-purple-100/80">Review Risk:</strong> See which parts are risky and uncovered.</li>
                    <li><strong className="text-purple-100/80">Generate Tests:</strong> Get the exact test code needed to cover those lines.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Static Analysis</h3>
                    <p className="text-purple-200/50">
                        Get immediate feedback on potential blind spots without running a full CI pipeline.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Risk Assessment</h3>
                    <p className="text-purple-200/50">
                        Not all code is equal. We flag high-risk logic that absolutely needs testing.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Should I aim for 100% coverage?</h3>
                        <p className="text-purple-200/50">While 100% is ideal, it's often better to focus on high-risk, complex logic first. This tool helps you prioritize.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More QA Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/unit-test-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Unit Test Generator
                    </Link>
                    <Link href="/ai-tools/code-refactor" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Code Refactor
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-pink-600/20 border border-pink-500/30 rounded-full text-pink-300 hover:bg-pink-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
