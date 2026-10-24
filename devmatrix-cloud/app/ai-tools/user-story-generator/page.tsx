import type { Metadata } from 'next';
import Link from 'next/link';
import UserStoryGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI User Story Generator | Jira & Gherkin ACs',
  description: 'Turn simple ideas into professional User Stories with Acceptance Criteria (Gherkin) and Technical Notes. Perfect for Product Managers and Agile teams.',
  keywords: [
    'ai user story generator',
    'jira ticket generator',
    'gherkin acceptance criteria',
    'agile user stories',
    'product management ai',
    'scrum master tools',
    'requirement gathering ai',
    'user story format'
  ],
  openGraph: {
    title: 'Instant Agile User Story Generator',
    description: 'Create Jira-ready user stories with proper acceptance criteria in seconds. Streamline your sprint planning.',
    type: 'website',
  }
};

export default function UserStoryGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI User Story Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI tool that converts feature ideas into structured Agile user stories with acceptance criteria and technical notes.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '520',
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
        name: 'AI User Story Generator',
        item: 'https://devmetrix.in/ai-tools/user-story-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What format does it use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It generates stories in the standard "As a [role], I want [feature], so that [benefit]" format.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is Gherkin syntax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gherkin is a structured language for describing behavior (Given/When/Then), often used for automated testing (BDD).'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I copy directly to Jira?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the output is formatted to be easily copied and pasted into Jira, Trello, or any other project management tool.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                User Story Generator
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                From idea to Jira ticket in seconds. <br className="hidden md:block" />
                Generate professional Agile artifacts powered by AI.
            </p>
        </section>

        {/* The Tool Interface */}
        <UserStoryGeneratorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Write Better User Stories</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Describe the Feature:</strong> Simply type what you want to build (e.g., "Dark mode toggle").</li>
                    <li><strong className="text-purple-100/80">Identify Persona:</strong> (Optional) Who is this for? Admin? New user?</li>
                    <li><strong className="text-purple-100/80">Generate:</strong> Our AI structures it into a formal requirement.</li>
                    <li><strong className="text-purple-100/80">Refine & Export:</strong> Copy the text directly into your backlog.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Save Time</h3>
                    <p className="text-purple-200/50">
                        Stop spending hours formatting tickets. Let AI handle the boilerplate structure while you focus on the product logic.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Clear Requirements</h3>
                    <p className="text-purple-200/50">
                        Ambiguous requirements cause bugs. Our tool forces a structured "Given/When/Then" format to clarify expectations.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is this tool suitable for Scrum?</h3>
                        <p className="text-purple-200/50">Absolutely. It's designed specifically for Agile frameworks like Scrum and Kanban.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Does it include edge cases?</h3>
                        <p className="text-purple-200/50">The AI attempts to include common edge cases in the Acceptance Criteria, but you should always review them with your QA team.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More Productivity Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/study-planner" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        AI Study Planner
                    </Link>
                    <Link href="/ai-tools/social-media-post-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Social Media Generator
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-cyan-600/20 border border-cyan-500/30 rounded-full text-cyan-300 hover:bg-cyan-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
