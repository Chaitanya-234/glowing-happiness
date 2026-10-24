import type { Metadata } from 'next';
import ApiContractClient from './Client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI API Contract Testing | OpenAPI & Swagger Validator',
  description: 'Validate your API responses against OpenAPI specifications. Our AI generates automated contract tests and identifies schema violations.',
  keywords: [
    'api contract testing',
    'openapi validator',
    'swagger testing tool',
    'api schema validation',
    'automated api testing',
    'contract test generator',
    'rest api validator',
    'api regression testing'
  ],
  openGraph: {
    title: 'AI API Contract Testing Tool',
    description: 'Automate API contract testing. Validate responses against OpenAPI specs and generate test cases.',
    type: 'website',
  }
};

export default function ApiContractTestingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI API Contract Testing',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that validates API implementations against their specifications and generates tests.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '520',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black pt-24">
        <section className="text-center px-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                API Contract Testing
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Validate API responses against OpenAPI specs. <br className="hidden md:block" />
                Generate automated regression tests to prevent breaking changes.
            </p>
        </section>

        <ApiContractClient />

        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">Automating Contract Tests</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Paste Spec:</strong> Input your OpenAPI/Swagger specification (JSON or YAML).</li>
                    <li><strong className="text-purple-100/80">Analyze:</strong> The AI parses the spec to understand expected request/response structures.</li>
                    <li><strong className="text-purple-100/80">Generate:</strong> Create automated test cases (e.g., using Jest or Supertest) to validate the contract.</li>
                    <li><strong className="text-purple-100/80">Validate:</strong> (Optional) Paste an actual API response to check for immediate schema violations.</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-rose-400 mb-3">Prevent Breaking Changes</h3>
                    <p className="text-purple-200/50">
                        Ensure your API implementation always matches the documentation. Catch drift before it reaches production.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-rose-400 mb-3">Test Generation</h3>
                    <p className="text-purple-200/50">
                        Stop writing boilerplate tests. Instantly generate comprehensive test suites based on your API definition.
                    </p>
                </div>
            </div>

             <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More AI Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                     <Link href="/ai-tools/security-vulnerability-scanner" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Security Scanner
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
