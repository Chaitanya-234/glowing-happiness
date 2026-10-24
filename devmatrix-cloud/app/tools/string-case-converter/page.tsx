// app/tools/string-case-converter/page.tsx
import { Metadata } from 'next';
import StringCaseConverterClient from './StringCaseConverterClient';

export const metadata: Metadata = {
  title: 'String Case Converter - Camel, Snake, Kebab Case | DevMetrix',
  description: 'Convert text between different naming conventions: camelCase, snake_case, kebab-case, PascalCase, and more. Free online string manipulation tool for developers.',
  keywords: ['case converter', 'camelCase', 'snake_case', 'kebab-case', 'string manipulation', 'text converter', 'coding convention'],
};

export default function StringCaseConverterPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <StringCaseConverterClient />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About String Case Converter
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            The String Case Converter is a handy utility for developers who need to switch between different
            variable naming conventions. Quickly convert text to camelCase, snake_case, kebab-case, PascalCase,
            and other formats used in programming.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Supported Cases
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li><strong>camelCase:</strong> userIdentifier (JavaScript, Java)</li>
            <li><strong>snake_case:</strong> user_identifier (Python, Rust)</li>
            <li><strong>kebab-case:</strong> user-identifier (CSS, URLs)</li>
            <li><strong>PascalCase:</strong> UserIdentifier (C#, Classes)</li>
            <li><strong>UPPER_CASE:</strong> USER_IDENTIFIER (Constants)</li>
            <li><strong>Title Case:</strong> User Identifier (Headings)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            How to Use
          </h3>
          <ol className="list-decimal list-inside text-purple-200/40 space-y-2">
            <li>Type or paste your text into the input field.</li>
            <li>The tool instantly converts the text into all available formats.</li>
            <li>Click on any result to copy it to your clipboard.</li>
            <li>Use the "Clear" button to start over.</li>
          </ol>

           <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            FAQ
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-purple-100/60">Does it handle multiple words?</h4>
              <p className="text-purple-200/40">Yes, it intelligently parses spaces, underscores, and hyphens to identify words.</p>
            </div>
             <div>
              <h4 className="font-semibold text-purple-100/60">Is it free?</h4>
              <p className="text-purple-200/40">Yes, completely free and runs in your browser.</p>
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
            name: 'String Case Converter',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
             offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Convert text between camelCase, snake_case, kebab-case, and other naming conventions.',
          }),
        }}
      />
    </div>
  );
}
