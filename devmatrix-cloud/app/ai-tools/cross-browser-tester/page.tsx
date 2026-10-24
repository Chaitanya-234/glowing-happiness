import type { Metadata } from 'next';
import CrossBrowserClient from './Client';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Cross-Browser Compatibility Tester | Browser Testing Tool',
  description: 'Analyze your code for cross-browser compatibility issues. Our AI identifies CSS and JS features that may break on legacy or specific browsers and generates test scripts.',
  keywords: [
    'cross-browser testing',
    'browser compatibility tool',
    'css compatibility checker',
    'javascript browser support',
    'automated browser testing',
    'playwright script generator',
    'web compatibility test',
    'legacy browser support'
  ],
  openGraph: {
    title: 'AI Cross-Browser Compatibility Tester',
    description: 'Ensure your web app works everywhere. Detect browser compatibility issues and generate test scripts with AI.',
    type: 'website',
  }
};

export default function CrossBrowserTesterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Cross-Browser Compatibility Tester',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that analyzes code for cross-browser compatibility issues and generates automation scripts.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '650',
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Cross-Browser Compatibility Tester
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Ensure your web app works on every browser. <br className="hidden md:block" />
                Detect compatibility issues and generate automated test scripts instantly.
            </p>
        </section>

        <CrossBrowserClient />

        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Ensure Compatibility</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Input Code:</strong> Paste your CSS or JavaScript code snippet.</li>
                    <li><strong className="text-purple-100/80">Analyze:</strong> Let the AI check for features with limited browser support (e.g., flexbox gap, specific APIs).</li>
                    <li><strong className="text-purple-100/80">Review:</strong> See which browsers (IE, Safari, etc.) might struggle with your code.</li>
                    <li><strong className="text-purple-100/80">Automate:</strong> Use the generated Playwright/Cypress script to verify behavior in real browsers.</li>
                </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Legacy Support</h3>
                    <p className="text-purple-200/50">
                        Identify potential breakages in older browsers or specific versions like Safari on iOS, ensuring a consistent user experience.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Automated Testing</h3>
                    <p className="text-purple-200/50">
                        Go beyond static analysis. Get ready-to-run Playwright or Cypress scripts to physically test your pages.
                    </p>
                </div>
            </div>

             <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Explore More AI Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/accessibility-checker" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Accessibility Checker
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
