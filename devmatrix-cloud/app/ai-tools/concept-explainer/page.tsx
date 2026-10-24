import type { Metadata } from 'next';
import Link from 'next/link';
import ConceptExplainerClient from './Client';

export const metadata: Metadata = {
  title: 'Feynman Concept Explainer | Learn Faster with AI Analogies',
  description: 'Master complex topics quickly using the Feynman Technique. Our AI breaks down hard concepts into simple analogies, fun facts, and quizzes.',
  keywords: [
    'feynman technique ai',
    'concept explainer',
    'learn complex topics',
    'study aid ai',
    'educational ai tool',
    'simplify concepts',
    'learning assistant',
    'explain like i am 5'
  ],
  openGraph: {
    title: 'Feynman Concept Explainer | Learn Anything Fast',
    description: 'Use the power of AI to simplify complex ideas into easy-to-understand analogies and quizzes.',
    type: 'website',
  }
};

export default function ConceptExplainerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Feynman Concept Explainer',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI learning tool that uses the Feynman Technique to simplify complex topics with analogies and quizzes.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1500',
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
        name: 'Feynman Concept Explainer',
        item: 'https://devmetrix.in/ai-tools/concept-explainer',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Feynman Technique?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Feynman Technique is a learning model named after physicist Richard Feynman. It involves simplifying a concept by explaining it in plain language (as if to a child) to ensure deep understanding.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I choose the difficulty level?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can choose to have concepts explained like you are a 5-year-old, a high school student, or an expert peer.'
        }
      },
      {
        '@type': 'Question',
        name: 'What topics can it explain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It can explain almost anything—from Quantum Physics and Blockchain to Economic Inflation and Biological Processes.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
                Feynman Concept Explainer
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                &quot;If you can&apos;t explain it simply, you don&apos;t understand it well enough.&quot; <br className="hidden md:block" />
                Learn any topic fast with simple analogies and AI-powered quizzes.
            </p>
        </section>

        {/* The Tool Interface */}
        <ConceptExplainerClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Use the Feynman Explainer</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Enter a Topic:</strong> Type in the concept you are struggling with (e.g., "Black Holes").</li>
                    <li><strong className="text-purple-100/80">Select Difficulty:</strong> Choose "5-year-old" for super simple, or "Expert" for technical depth.</li>
                    <li><strong className="text-purple-100/80">Learn:</strong> Read the analogy and plain English explanation.</li>
                    <li><strong className="text-purple-100/80">Test Yourself:</strong> Take the quick quiz to confirm your understanding.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Active Recall</h3>
                    <p className="text-purple-200/50">
                        The included quiz forces you to actively recall information, a proven method for moving knowledge into long-term memory.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Mental Models</h3>
                    <p className="text-purple-200/50">
                        We use analogies to connect new concepts to things you already understand, building robust mental models faster.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is this better than reading a textbook?</h3>
                        <p className="text-purple-200/50">It's a great companion. Textbooks provide depth, but our tool provides the "Aha!" moment that makes the details stick.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is it accurate?</h3>
                        <p className="text-purple-200/50">Yes, our AI is trained on vast amounts of educational data. However, for highly specialized academic research, always cross-reference.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More Learning Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/study-planner" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Study Planner
                    </Link>
                    <Link href="/ai-tools/code-explainer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Code Explainer
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
