// app/tools/diff-viewer/page.tsx
import { Metadata } from 'next';
import DiffViewerClient from './DiffViewerClient';

export const metadata: Metadata = {
  title: 'Text Diff Viewer - Compare Text Online | DevMetrix',
  description: 'Compare two text files or snippets side-by-side. Highlight differences, added lines, and removed lines instantly. Free online diff checker tool.',
  keywords: ['diff viewer', 'text compare', 'diff checker', 'online diff tool', 'compare text', 'file comparison', 'code diff'],
};

export default function DiffViewerPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <DiffViewerClient />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About Text Diff Viewer
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Our Text Diff Viewer is a powerful tool for comparing two pieces of text, code, or configuration files.
            It highlights differences, additions, and deletions, making it easy to spot changes between versions.
            Essential for code reviews, debugging, and content comparison.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Key Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Side-by-side or unified comparison view</li>
            <li>Highlight line-by-line differences</li>
            <li>Support for large text blocks</li>
            <li>Color-coded additions (green) and deletions (red)</li>
            <li>Instant result as you type</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            How to Use
          </h3>
          <ol className="list-decimal list-inside text-purple-200/40 space-y-2">
            <li>Paste the original text in the left (Original) box.</li>
            <li>Paste the modified text in the right (Modified) box.</li>
            <li>The tool automatically computes and displays the differences.</li>
            <li>Review the highlighted changes below.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            FAQ
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-purple-100/60">Can I compare code files?</h4>
              <p className="text-purple-200/40">Yes, you can paste code from any programming language.</p>
            </div>
             <div>
              <h4 className="font-semibold text-purple-100/60">Is my data private?</h4>
              <p className="text-purple-200/40">Absolutely. The comparison happens entirely in your browser.</p>
            </div>
          </div>
        </article>
      </div>

       {/* Schema.org JSON-LD */}
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Text Diff Viewer',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
             offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Compare two text files or snippets side-by-side. Highlight differences instantly.',
          }),
        }}
      />
    </div>
  );
}
