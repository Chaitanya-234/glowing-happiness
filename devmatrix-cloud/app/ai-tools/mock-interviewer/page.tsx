import type { Metadata } from 'next';
import Link from 'next/link';
import MockInterviewerClient from './Client';

export const metadata: Metadata = {
  title: 'AI Mock Interviewer | Practice Tech & Behavioral Questions',
  description: 'Master your job interview with our free AI Mock Interviewer. Generate personalized technical and behavioral questions with ideal answers and expert tips.',
  keywords: [
    'ai mock interview',
    'practice interview questions',
    'technical interview prep',
    'behavioral interview ai',
    'system design interview',
    'frontend interview questions',
    'backend interview prep',
    'coding interview practice'
  ],
  openGraph: {
    title: 'AI Mock Interviewer | Ace Your Next Job Interview',
    description: 'Simulate real interview scenarios with AI. Get questions, answers, and feedback tailored to your role and tech stack.',
    type: 'website',
  }
};

export default function MockInterviewerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Mock Interviewer',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that simulates job interviews, providing questions, ideal answers, and performance tips.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '850',
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
        name: 'AI Mock Interviewer',
        item: 'https://devmetrix.in/ai-tools/mock-interviewer',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the AI Mock Interviewer work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The tool uses Google Gemini AI to generate role-specific interview questions based on your inputs (Job Role, Experience, Tech Stack). It then provides ideal answers and pro tips for each question.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this tool free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our AI Mock Interviewer is completely free to use to help you prepare for your dream job.'
        }
      },
      {
        '@type': 'Question',
        name: 'What types of questions does it ask?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It generates a mix of Technical questions (coding, concepts), Behavioral questions (STAR method), and System Design scenarios appropriate for your experience level.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                AI Mock Interviewer
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Master your next interview with personalized AI-generated questions and feedback. <br className="hidden md:block" />
                Tailored to your role, experience level, and tech stack.
            </p>
        </section>

        {/* The Tool Interface */}
        <MockInterviewerClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Use the Mock Interviewer</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Enter Job Role:</strong> Specify the position you are applying for (e.g., "Frontend Engineer").</li>
                    <li><strong className="text-purple-100/80">Select Experience:</strong> Choose your level from Intern to Principal to get appropriate difficulty.</li>
                    <li><strong className="text-purple-100/80">Add Tech Stack:</strong> (Optional) List specific technologies (e.g., "React, AWS") for targeted technical questions.</li>
                    <li><strong className="text-purple-100/80">Start Session:</strong> Click "Start Interview" to receive your personalized question set.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Targeted Practice</h3>
                    <p className="text-purple-200/50">
                        Don't waste time on generic questions. Get scenarios that match exactly what you'll face in your specific interview loop.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Model Answers</h3>
                    <p className="text-purple-200/50">
                        Unsure how to answer? Reveal the "Ideal Answer" to learn the key points and structure that interviewers are looking for.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can I use this for non-tech roles?</h3>
                        <p className="text-purple-200/50">Yes! While optimized for tech, you can enter roles like "Product Manager" or "Marketing Specialist" to get relevant behavioral and situational questions.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Do you save my interview data?</h3>
                        <p className="text-purple-200/50">No, your session data is processed specifically for that request and is not stored or shared.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">More Career Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/resume-scanner" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Resume Scanner
                    </Link>
                    <Link href="/ai-tools/cover-letter-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Cover Letter Generator
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
