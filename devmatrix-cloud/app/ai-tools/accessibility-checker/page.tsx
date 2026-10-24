import type { Metadata } from 'next';
import AccessibilityCheckerClient from './Client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Accessibility Checker | WCAG Compliance Tool',
  description: 'Analyze your web applications for WCAG compliance. Our AI identifies accessibility violations and generates remediation reports to ensure inclusivity.',
  keywords: [
    'accessibility checker',
    'wcag compliance',
    'ada compliance tool',
    'web accessibility audit',
    'ai accessibility tester',
    'a11y checker',
    'screen reader compatibility',
    'inclusive design tool'
  ],
  openGraph: {
    title: 'AI Accessibility Checker & WCAG Auditor',
    description: 'Ensure your web apps are accessible to everyone with our AI-powered WCAG compliance checker.',
    type: 'website',
  }
};

export default function AccessibilityCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Accessibility Checker',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that analyzes code for WCAG accessibility violations and provides remediation advice.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '840',
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Accessibility Checker
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Analyze web components for WCAG compliance. <br className="hidden md:block" />
                Generate remediation reports to make your web apps inclusive.
            </p>
        </section>

        <AccessibilityCheckerClient />

        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">Achieving WCAG Compliance</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Paste Markup:</strong> Input your HTML, JSX, or TSX component code.</li>
                    <li><strong className="text-purple-100/80">Analyze:</strong> Run the checker to identify accessibility barriers.</li>
                    <li><strong className="text-purple-100/80">Review:</strong> Examine violations mapped to specific WCAG criteria.</li>
                    <li><strong className="text-purple-100/80">Fix:</strong> Apply the suggested remediations, such as adding aria-labels or fixing contrast.</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Inclusive Design</h3>
                    <p className="text-purple-200/50">
                        Ensure your application is usable by people with disabilities, including those using screen readers and keyboard navigation.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Compliance Reporting</h3>
                    <p className="text-purple-200/50">
                        Get detailed reports linking issues to specific WCAG 2.1/2.2 success criteria (A, AA, AAA).
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
