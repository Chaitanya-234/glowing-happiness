import type { Metadata } from 'next';
import Link from 'next/link';
import CoverLetterGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Cover Letter Generator | Tailored & Professional',
  description: 'Create a professional, job-winning cover letter in seconds. Our AI tailors it to the specific job title, company, and your key skills.',
  keywords: [
    'ai cover letter generator',
    'free cover letter writer',
    'resume cover letter ai',
    'job application helper',
    'professional cover letter',
    'cover letter builder',
    'custom cover letter',
    'career tools'
  ],
  openGraph: {
    title: 'Instant AI Cover Letter Writer',
    description: 'Stop staring at a blank page. Generate a persuasive cover letter tailored to your dream job instantly.',
    type: 'website',
  }
};

export default function CoverLetterGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Cover Letter Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI tool that writes personalized cover letters based on your skills, experience, and the job you are applying for.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1100',
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
        name: 'AI Cover Letter Generator',
        item: 'https://devmetrix.in/ai-tools/cover-letter-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the cover letter unique?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the AI generates a unique letter based on the specific job title, company name, and skills you provide.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I edit the result?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We always recommend reviewing and adding your personal touch to the generated letter to make it truly yours.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is it ATS friendly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it uses standard professional formatting and keywords related to your skills, which helps with ATS compatibility.'
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
                AI Cover Letter Generator
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Create tailored, professional cover letters that get you hired. <br className="hidden md:block" />
                No more generic templates.
            </p>
        </section>

        {/* The Tool Interface */}
        <CoverLetterGeneratorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Write a Cover Letter Fast</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Job Details:</strong> Enter the Job Title and Company you are applying to.</li>
                    <li><strong className="text-purple-100/80">Your Skills:</strong> List your top relevant skills (e.g., "Python, Project Management").</li>
                    <li><strong className="text-purple-100/80">Highlights:</strong> Mention a key achievement or experience you want to feature.</li>
                    <li><strong className="text-purple-100/80">Generate:</strong> Get a fully written, professional letter ready to send.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Professional Tone</h3>
                    <p className="text-purple-200/50">
                        Strike the perfect balance between confident and respectful. Our AI uses industry-standard language.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Tailored Content</h3>
                    <p className="text-purple-200/50">
                        Recruiters hate generic letters. We weave your specific skills and the company name into the narrative for a custom feel.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">How long should a cover letter be?</h3>
                        <p className="text-purple-200/50">Ideally, it should be concise—about 3 to 4 paragraphs or half a page. Our tool generates letters within this optimal length.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can I use this for internships?</h3>
                        <p className="text-purple-200/50">Yes, simply enter "Intern" in the Job Title field and highlight your coursework or projects in the experience section.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Boost Your Career</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/resume-scanner" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Resume Scanner
                    </Link>
                    <Link href="/ai-tools/mock-interviewer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Mock Interviewer
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
