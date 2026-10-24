import type { Metadata } from 'next';
import Link from 'next/link';
import E2ETestScenarioGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI E2E Test Generator | Cypress, Playwright, Selenium',
  description: 'Convert user stories into end-to-end test scripts automatically. Generate Cypress, Playwright, or Selenium code from plain English requirements.',
  keywords: [
    'ai e2e testing',
    'cypress test generator',
    'playwright script builder',
    'selenium automation ai',
    'user story to test',
    'gherkin generator',
    'qa automation tool',
    'browser testing ai'
  ],
  openGraph: {
    title: 'AI E2E Test Scenario Generator | Automate User Journeys',
    description: 'Transform user stories into executable end-to-end tests for Cypress, Playwright, and Selenium.',
    type: 'website',
  }
};

export default function E2ETestScenarioGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI E2E Test Scenario Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI tool that converts user stories and requirements into full end-to-end test scripts for modern testing frameworks.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '620',
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
        name: 'E2E Test Generator',
        item: 'https://devmetrix.in/ai-tools/e2e-test-scenario-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does it write selectors automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it attempts to infer best-practice selectors (like data-testid or accessible roles) based on the user story context.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I generate Gherkin syntax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Currently, it generates direct code scripts (e.g., spec files), but the steps output is very similar to Gherkin syntax.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which frameworks are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support Cypress, Playwright, and Selenium (Python & Java) as primary output formats.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                AI E2E Test Scenario Generator
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                From User Story to Test Script in seconds. <br className="hidden md:block" />
                Automate your browser testing with Cypress, Playwright, or Selenium.
            </p>
        </section>

        {/* The Tool Interface */}
        <E2ETestScenarioGeneratorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">Automate User Journeys</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Input Story:</strong> Paste your user story (e.g., "As a user, I want to login...").</li>
                    <li><strong className="text-purple-100/80">Select Framework:</strong> Choose Cypress, Playwright, or Selenium.</li>
                    <li><strong className="text-purple-100/80">Generate:</strong> Watch as AI converts English into executable code.</li>
                    <li><strong className="text-purple-100/80">Refine:</strong> Update selectors if needed and run the test.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">Behavior Driven</h3>
                    <p className="text-purple-200/50">
                        Ensures your tests actually verify the user value by directly translating requirements into assertions.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">Modern Best Practices</h3>
                    <p className="text-purple-200/50">
                        Generates code that follows modern patterns, like using `cy.intercept` or Playwright fixtures.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can it handle complex flows?</h3>
                        <p className="text-purple-200/50">Yes, you can describe multi-step flows like "Add item to cart, proceed to checkout, and pay," and it will generate the sequence.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More QA Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/user-story-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        User Story Generator
                    </Link>
                    <Link href="/ai-tools/integration-test-builder" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Integration Test Builder
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-orange-600/20 border border-orange-500/30 rounded-full text-orange-300 hover:bg-orange-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
