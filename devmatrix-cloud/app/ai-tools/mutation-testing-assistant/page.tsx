import type { Metadata } from 'next';
import MutationTestingClient from './Client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Mutation Testing Assistant | Test Quality Evaluator',
  description: 'Evaluate the effectiveness of your test suite. Our AI generates code mutations to check if your tests catch bugs, ensuring high test quality.',
  keywords: [
    'mutation testing',
    'test quality analysis',
    'code mutation tool',
    'test suite effectiveness',
    'automated testing tool',
    'quality assurance ai',
    'unit test validator',
    'software testing ai'
  ],
  openGraph: {
    title: 'AI Mutation Testing Assistant',
    description: 'Test your tests. Use AI to introduce mutations and verify if your test suite catches them.',
    type: 'website',
  }
};

export default function MutationTestingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Mutation Testing Assistant',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that performs mutation testing to evaluate test suite quality.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '410',
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Mutation Testing Assistant
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Test your tests. <br className="hidden md:block" />
                Generate mutants to evaluate if your test suite truly catches bugs.
            </p>
        </section>

        <MutationTestingClient />

        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How Mutation Testing Works</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Paste Code:</strong> Input the source code you want to test.</li>
                    <li><strong className="text-purple-100/80">Mutate:</strong> The AI introduces small changes ("mutants") like flipping operators or removing logic.</li>
                    <li><strong className="text-purple-100/80">Evaluate:</strong> Review where the mutants were created.</li>
                    <li><strong className="text-purple-100/80">Improve:</strong> If your current tests wouldn't fail for these mutants, add new tests to kill them.</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-3">Better Coverage</h3>
                    <p className="text-purple-200/50">
                        Code coverage only tells you what executed. Mutation testing tells you if your tests actually assert the correct behavior.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-3">Find Hidden Bugs</h3>
                    <p className="text-purple-200/50">
                        Discover logic paths that are "tested" but not actually verified, preventing regression bugs.
                    </p>
                </div>
            </div>

             <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More AI Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                     <Link href="/ai-tools/api-contract-tester" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        API Contract Tester
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
