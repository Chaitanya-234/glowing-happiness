import type { Metadata } from 'next';
import Link from 'next/link';
import AICodeExplainerClient from './Client';

export const metadata: Metadata = {
  title: 'AI Code Explainer | Free Code Analysis & Debugging Tool',
  description: 'Instantly explain complex code snippets in Python, JavaScript, Java, C++, and more. Get line-by-line breakdowns, logic summaries, and improvement suggestions with our free AI tool.',
  keywords: [
    'ai code explainer',
    'explain code ai',
    'code analysis tool',
    'python code explainer',
    'javascript code explainer',
    'debug code with ai',
    'understand complex code',
    'code summarizer',
    'gemini code assistant'
  ],
  openGraph: {
    title: 'AI Code Explainer | Understand Any Code Instantly',
    description: 'Paste your code and get a clear, human-readable explanation. Perfect for learning, debugging, and code reviews.',
    type: 'website',
  }
};

export default function AiCodeExplainerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Code Explainer',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'A free AI tool that explains code snippets line-by-line, detects bugs, and suggests improvements.',
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
        name: 'AI Code Explainer',
        item: 'https://devmetrix.in/ai-tools/code-explainer',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the AI Code Explainer work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The tool uses Google Gemini Pro AI to analyze the syntax and logic of your code. It breaks down the code structure and provides a natural language summary and detailed explanation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this code explainer free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the AI Code Explainer is completely free to use for developers, students, and educators.'
        }
      },
      {
        '@type': 'Question',
        name: 'What programming languages are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support all major programming languages including Python, JavaScript, TypeScript, Java, C++, Go, Rust, Ruby, PHP, and SQL.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">
                AI Code Explainer
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Paste any code snippet and get a clear, line-by-line explanation. <br className="hidden md:block" />
                Perfect for debugging, learning new languages, and code reviews.
            </p>
        </section>

        {/* The Tool Interface */}
        <AICodeExplainerClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Use the Code Explainer</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Paste your code:</strong> Copy code from your IDE or GitHub and paste it into the editor.</li>
                    <li><strong className="text-purple-100/80">Select Language (Optional):</strong> The AI usually auto-detects it, but you can specify Python, JS, etc.</li>
                    <li><strong className="text-purple-100/80">Choose Detail Level:</strong> Pick "Detailed" for deep dives or "ELI5" for simple analogies.</li>
                    <li><strong className="text-purple-100/80">Get Explanation:</strong> Click "Explain Code" to receive a structured analysis instantly.</li>
                </ol>
            </div>

            {/* Use Cases */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-green-400">For Beginners</h3>
                    <p className="text-purple-200/50 leading-relaxed">
                        Learning to code? Don't get stuck on syntax you don't understand.
                        Use our tool to translate cryptic code into plain English explanations, helping you grasp logic faster.
                    </p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-green-400">For Experienced Devs</h3>
                    <p className="text-purple-200/50 leading-relaxed">
                        Inherited a legacy codebase? Quickly decipher complex functions or obfuscated scripts without spending hours tracing execution manually.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is my code private?</h3>
                        <p className="text-purple-200/50">Yes. We process your code to generate the explanation and do not store it permanently. Avoid pasting sensitive keys or passwords.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can it find bugs?</h3>
                        <p className="text-purple-200/50">Absolutely. The AI often spots syntax errors, potential runtime exceptions, and logic flaws, offering suggestions on how to fix them.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More AI Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/code-refactor" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        AI Code Refactor
                    </Link>
                    <Link href="/ai-tools/resume-scanner" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Resume Scanner
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
