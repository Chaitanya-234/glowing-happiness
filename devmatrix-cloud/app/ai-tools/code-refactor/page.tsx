import type { Metadata } from 'next';
import Link from 'next/link';
import CodeRefactorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Code Refactor | Clean Code & Security Auditor',
  description: 'Refactor spaghetti code and find security vulnerabilities instantly. Our AI tool improves readability, performance, and security for JS, Python, Java, and more.',
  keywords: [
    'ai code refactor',
    'clean code tool',
    'security audit ai',
    'code quality checker',
    'refactoring assistant',
    'optimize code',
    'vulnerability scanner',
    'technical debt reducer'
  ],
  openGraph: {
    title: 'AI Code Refactor & Security Auditor',
    description: 'Instantly clean up your code and patch security holes with our advanced AI assistant.',
    type: 'website',
  }
};

export default function CodeRefactorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Code Refactor & Auditor',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that refactors code for better performance and readability while detecting security vulnerabilities.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '980',
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
        name: 'AI Code Refactor',
        item: 'https://devmetrix.in/ai-tools/code-refactor',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does it support all languages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It supports major languages like JavaScript, TypeScript, Python, Java, Go, Rust, C#, and PHP.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the security audit work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The AI scans your code for common vulnerability patterns (like SQL injection, XSS, or hardcoded secrets) and suggests secure alternatives.'
        }
      },
      {
        '@type': 'Question',
        name: 'Will it change the logic of my code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It aims to preserve the original logic while improving structure and efficiency. However, always review the changes before deploying.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Code Refactor & Auditor
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Clean up spaghetti code and patch security holes instantly. <br className="hidden md:block" />
                Improve readability, performance, and security with one click.
            </p>
        </section>

        {/* The Tool Interface */}
        <CodeRefactorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Refactor Your Code</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Paste Code:</strong> Insert your existing code snippet into the left panel.</li>
                    <li><strong className="text-purple-100/80">Select Language:</strong> Choose the programming language (e.g., JavaScript, Python) to ensure accurate parsing.</li>
                    <li><strong className="text-purple-100/80">Refactor:</strong> Click "Refactor Code" to start the analysis.</li>
                    <li><strong className="text-purple-100/80">Review:</strong> Check the cleaner code on the right and read the improvement/security report below.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">Security First</h3>
                    <p className="text-purple-200/50">
                        Don't let vulnerabilities slip through. Our AI identifies potential risks like XSS, injections, and insecure configurations.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-orange-400 mb-3">Readable Code</h3>
                    <p className="text-purple-200/50">
                        Turn "spaghetti code" into clean, maintainable, and idiomatic code that your team will actually enjoy reading.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can it handle large files?</h3>
                        <p className="text-purple-200/50">We recommend refactoring specific functions or modules (up to 500 lines) at a time for the best accuracy.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Does it improve performance?</h3>
                        <p className="text-purple-200/50">Yes, it often suggests algorithmic improvements (e.g., O(n^2) to O(n)) where applicable.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More AI Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/code-explainer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Code Explainer
                    </Link>
                    <Link href="/ai-tools/mock-interviewer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Mock Interviewer
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
