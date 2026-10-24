import type { Metadata } from 'next';
import Link from 'next/link';
import StudyPlannerClient from './Client';

export const metadata: Metadata = {
  title: 'AI Study Planner | Create Personalized Learning Roadmaps',
  description: 'Generate a custom week-by-week study plan for any subject. Our AI roadmap builder helps you learn faster with structured milestones and resource tips.',
  keywords: [
    'ai study planner',
    'learning roadmap generator',
    'study schedule maker',
    'personalized learning plan',
    'skill acquisition ai',
    'exam preparation tool',
    'self-learning assistant',
    'curriculum generator'
  ],
  openGraph: {
    title: 'Custom AI Study Roadmap Generator',
    description: 'Stop guessing what to learn next. Get a structured plan tailored to your current level and goals.',
    type: 'website',
  }
};

export default function StudyPlannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Study Planner',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that creates personalized study schedules and learning roadmaps based on your goals and timeframe.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '630',
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
        name: 'AI Study Planner',
        item: 'https://devmetrix.in/ai-tools/study-planner',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I use this for university exams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, simply enter your subject (e.g., "Organic Chemistry") and your timeframe (e.g., "2 Weeks") to get a cramming schedule.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it recommend resources?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the AI suggests types of resources (video tutorials, documentation, practice problems) relevant to each topic.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is it suitable for coding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It excels at technical skills. Try generating a roadmap for "React Native" or "System Design" to see a detailed breakdown.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
                AI Study Planner
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Generate a personalized learning roadmap for any subject. <br className="hidden md:block" />
                Stop procrastinating and start learning with a structured plan.
            </p>
        </section>

        {/* The Tool Interface */}
        <StudyPlannerClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Create a Study Plan</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Subject:</strong> What do you want to learn? (e.g., "Japanese Language").</li>
                    <li><strong className="text-purple-100/80">Level:</strong> Be honest about your starting point (Beginner vs Advanced).</li>
                    <li><strong className="text-purple-100/80">Timeframe:</strong> How long do you have? (e.g., "3 Months").</li>
                    <li><strong className="text-purple-100/80">Generate:</strong> Get a detailed roadmap broken down by milestones.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">Structured Learning</h3>
                    <p className="text-purple-200/50">
                        Avoid "tutorial hell" by following a logical progression of topics designed to build upon each other.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">Goal Oriented</h3>
                    <p className="text-purple-200/50">
                        Whether you want to build a project or pass an exam, the AI tailors the curriculum to hit your specific objective.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can I save the plan?</h3>
                        <p className="text-purple-200/50">You can copy the plan to your clipboard and paste it into Notion, Obsidian, or your favorite note-taking app.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is it free?</h3>
                        <p className="text-purple-200/50">Yes, generate as many study plans as you need for free.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More Learning Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/concept-explainer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Concept Explainer
                    </Link>
                    <Link href="/ai-tools/code-explainer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Code Explainer
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-yellow-600/20 border border-yellow-500/30 rounded-full text-yellow-300 hover:bg-yellow-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
