import type { Metadata } from 'next';
import Link from 'next/link';
import IntegrationTestBuilderClient from './Client';

export const metadata: Metadata = {
  title: 'AI Integration Test Builder | API Testing Automation',
  description: 'Automatically generate integration tests for your APIs. Supports Postman, Supertest, RestAssured, and more. Validate endpoints, data flow, and error handling.',
  keywords: [
    'ai integration testing',
    'api test generator',
    'integration test automation',
    'postman test script',
    'supertest generator',
    'restassured builder',
    'api qa tool',
    'endpoint testing'
  ],
  openGraph: {
    title: 'AI Integration Test Builder | Automate API Testing',
    description: 'Build robust integration test suites for your REST or GraphQL APIs in seconds using AI.',
    type: 'website',
  }
};

export default function IntegrationTestBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Integration Test Builder',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI tool that generates integration test scenarios and code for APIs based on specifications or descriptions.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      ratingCount: '890',
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
        name: 'Integration Test Builder',
        item: 'https://devmetrix.in/ai-tools/integration-test-builder',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What input does it need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can provide an OpenAPI (Swagger) spec snippet, a curl command, or a plain English description of your API endpoints.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can it generate Postman scripts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it can generate test scripts compatible with Postman, as well as code-based tests using Supertest (Node.js) or RestAssured (Java).'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it handle authentication?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It includes placeholders and setup logic for authentication tokens or API keys in the generated test code.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                AI Integration Test Builder
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Turn API specs into robust integration tests instantly. <br className="hidden md:block" />
                Validate your endpoints, data integrity, and error states with AI-generated scenarios.
            </p>
        </section>

        {/* The Tool Interface */}
        <IntegrationTestBuilderClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">Streamline Your API Testing</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Describe API:</strong> Paste your OpenAPI spec, curl command, or text description.</li>
                    <li><strong className="text-purple-100/80">Choose Tool:</strong> Select Supertest, Postman, RestAssured, or Python Requests.</li>
                    <li><strong className="text-purple-100/80">Build:</strong> Let the AI construct a complete test suite with scenarios.</li>
                    <li><strong className="text-purple-100/80">Implement:</strong> Add the tests to your CI/CD pipeline.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-green-400 mb-3">Comprehensive Scenarios</h3>
                    <p className="text-purple-200/50">
                        Goes beyond status 200. We generate tests for invalid inputs, missing auth, and boundary conditions.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-green-400 mb-3">Multi-Language Support</h3>
                    <p className="text-purple-200/50">
                        Whether you are a Node.js developer, a Java engineer, or a Pythonista, we have the right test library for you.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can I use this for microservices?</h3>
                        <p className="text-purple-200/50">Yes, it's perfect for testing interactions between microservices by verifying API contracts.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is it compatible with CI/CD?</h3>
                        <p className="text-purple-200/50">Absolutely. The generated code is standard testing code that runs in any CI environment.</p>
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
                    <Link href="/ai-tools/e2e-test-scenario-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        E2E Scenario Generator
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-green-600/20 border border-green-500/30 rounded-full text-green-300 hover:bg-green-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
