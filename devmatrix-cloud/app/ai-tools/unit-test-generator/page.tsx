import type { Metadata } from 'next';
import Link from 'next/link';
import UnitTestGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Unit Test Generator | Jest, JUnit, PyTest Automation',
  description: 'Instantly generate comprehensive unit tests with edge cases and mocks for JavaScript, Python, Java, and more. Boost code coverage and reliability effortlessly.',
  keywords: [
    'ai unit test generator',
    'automated testing tool',
    'jest test generator',
    'junit test builder',
    'pytest automation',
    'code coverage booster',
    'mock object generator',
    'software quality assurance'
  ],
  openGraph: {
    title: 'AI Unit Test Generator | Automate Your QA',
    description: 'Create robust unit tests in seconds. Supports Jest, Mocha, JUnit, PyTest, and more with intelligent mocking and edge case detection.',
    type: 'website',
  }
};

export default function UnitTestGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Unit Test Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that automatically generates unit test suites, including setup, teardown, and edge cases, for multiple programming languages.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
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
        name: 'Unit Test Generator',
        item: 'https://devmetrix.in/ai-tools/unit-test-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which testing frameworks are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support major frameworks like Jest, Mocha, Jasmine (JavaScript/TypeScript), PyTest, Unittest (Python), JUnit, TestNG (Java), and more.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it handle mocking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the AI detects external dependencies and generates appropriate mock objects and setup code to isolate the unit under test.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I generate tests for edge cases?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. The tool is designed to identify potential edge cases and error scenarios, generating specific tests to cover them.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                AI Unit Test Generator
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Generate comprehensive test suites with mocks, setup/teardown logic, and edge case coverage in seconds.
            </p>
        </section>

        {/* The Tool Interface */}
        <UnitTestGeneratorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Generate Unit Tests</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Paste Your Code:</strong> Input the function or class you want to test.</li>
                    <li><strong className="text-purple-100/80">Select Framework:</strong> Choose your preferred testing library (e.g., Jest, PyTest).</li>
                    <li><strong className="text-purple-100/80">Generate:</strong> Click the button to create a full test suite.</li>
                    <li><strong className="text-purple-100/80">Review & Run:</strong> Copy the generated code into your test file and run it.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">100% Logic Coverage</h3>
                    <p className="text-purple-200/50">
                        Stop guessing what to test. Our AI analyzes every branch and condition to ensure your code is robust.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Intelligent Mocking</h3>
                    <p className="text-purple-200/50">
                        Automatically detects external calls and generates the necessary mocks, stubs, and spies.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is the generated code ready to run?</h3>
                        <p className="text-purple-200/50">In most cases, yes. However, complex dependencies might require minor manual adjustments to import paths.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can it handle asynchronous code?</h3>
                        <p className="text-purple-200/50">Yes, it correctly handles async/await patterns and generates appropriate asynchronous tests.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More QA Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/test-coverage-analyzer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Coverage Analyzer
                    </Link>
                    <Link href="/ai-tools/integration-test-builder" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Integration Builder
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 hover:bg-blue-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
