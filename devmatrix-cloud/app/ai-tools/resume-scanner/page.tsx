import type { Metadata } from 'next';
import Link from 'next/link';
import ResumeScannerClient from './Client';

export const metadata: Metadata = {
  title: 'Free AI Resume Scanner | ATS Optimization & Keyword Check',
  description: 'Boost your resume\'s ATS score with our free AI Resume Scanner. Compare your resume against job descriptions to find missing keywords and improve your chances.',
  keywords: [
    'ai resume scanner',
    'ats resume checker',
    'free resume analysis',
    'resume optimizer',
    'ats keyword checker',
    'resume grader',
    'job match score',
    'resume gap analysis'
  ],
  openGraph: {
    title: 'Smart AI Resume Scanner | Beat the ATS',
    description: 'Get an instant ATS score and actionable feedback to optimize your resume for your dream job.',
    type: 'website',
  }
};

export default function ResumeScannerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Resume Scanner',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that analyzes resumes against job descriptions to provide ATS scores and optimization tips.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2100',
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
        name: 'Smart Resume Scanner',
        item: 'https://devmetrix.in/ai-tools/resume-scanner',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an ATS Score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An ATS (Applicant Tracking System) Score represents how well your resume matches a specific job description. A higher score increases the likelihood of your resume being seen by a human recruiter.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I use this scanner?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply paste your resume text and the job description into the respective fields. Our AI will analyze the match and provide a detailed report.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is my data secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we value your privacy. Your resume and job description data are processed in real-time to generate the report and are not stored on our servers.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                Smart Resume Scanner
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Beat the ATS bots. <br className="hidden md:block" />
                Paste your resume and job description to get a detailed gap analysis and optimization tips.
            </p>
        </section>

        {/* The Tool Interface */}
        <ResumeScannerClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Optimize Your Resume</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Paste Resume:</strong> Copy the text content of your resume/CV.</li>
                    <li><strong className="text-purple-100/80">Paste Job Description:</strong> Copy the full description of the job you're applying for.</li>
                    <li><strong className="text-purple-100/80">Analyze:</strong> Click "Scan Resume" to let our AI compare the two.</li>
                    <li><strong className="text-purple-100/80">Improve:</strong> Review missing keywords and critical feedback to tailor your application.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-3">Identify Keywords</h3>
                    <p className="text-purple-200/50">
                        ATS systems scan for specific hard skills and keywords. Our tool highlights exactly what you're missing so you can add them naturally.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-3">Gap Analysis</h3>
                    <p className="text-purple-200/50">
                        Understand if you're underqualified or if you just haven't articulated your experience correctly for the specific role.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Why does the ATS score matter?</h3>
                        <p className="text-purple-200/50">Most large companies use ATS software to filter candidates before a human sees them. A low match score means your resume might be auto-rejected.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can I paste a PDF?</h3>
                        <p className="text-purple-200/50">Currently, we support text input. Please copy and paste the text from your PDF or Word document into the text area.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">More Career Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/mock-interviewer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Mock Interviewer
                    </Link>
                    <Link href="/ai-tools/cover-letter-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Cover Letter Generator
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-300 hover:bg-emerald-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
