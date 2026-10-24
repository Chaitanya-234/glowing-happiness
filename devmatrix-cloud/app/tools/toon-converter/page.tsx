// app/tools/toon-converter/page.tsx
import { Metadata } from 'next';
import ToonConverterClient from './ToonConverterClient';

export const metadata: Metadata = {
  title: 'TOON Converter - Optimize JSON for LLM Token Efficiency | DevMetrix',
  description:
    'Convert your JSON datasets into TOON, a token-efficient format designed to reduce large language model token costs. Fast, simple, and secure.',
  keywords: ['TOON converter', 'JSON to TOON', 'token efficient format', 'LLM optimization', 'data conversion'],
};

export default function ToonConverterPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <ToonConverterClient />

      {/* Informational Content */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-green max-w-none">
          <h2 className="text-3xl font-bold text-green-300 mb-6">About TOON Converter</h2>
          <p className="text-green-200/70 leading-relaxed mb-4">
            The TOON Converter tool helps developers transform verbose JSON data into the compact, token-efficient TOON format.
            TOON reduces costly token overhead huge large language model prompts face when parsing standard JSON.
          </p>

          <h3 className="text-2xl font-semibold text-green-300 mt-8 mb-4">Key Features</h3>
          <ul className="list-disc list-inside text-green-300/60 space-y-2">
            <li>Instant JSON to TOON conversion with real-time validation</li>
            <li>Minimizes tokens by removing redundant quotes and braces</li>
            <li>Client-side processing – your data stays private</li>
            <li>Optimized for developer workflows working with LLMs</li>
          </ul>

          <h3 className="text-2xl font-semibold text-green-300 mt-8 mb-4">How to Use</h3>
          <ol className="list-decimal list-inside text-green-300/60 space-y-2">
            <li>Paste your JSON data into the input box.</li>
            <li>Click “Convert to TOON” to transform your data.</li>
            <li>Review converted output and copy as needed.</li>
            <li>Use the TOON output to feed into your LLM models for efficient token usage.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-green-300 mt-8 mb-4">About TOON</h3>
          <p className="text-green-200/70 leading-relaxed">
            TOON is a data format built for the modern challenge of keeping large language model token counts lean and affordable.
            Unlike JSON, TOON cuts out token bloat like quotes, braces, and commas to make AI data ingestion cheaper and faster.
          </p>

          <h3 className="text-2xl font-semibold text-green-300 mt-8 mb-4">Who Should Use This Tool?</h3>
          <p className="text-green-200/70 leading-relaxed">
            Developers working with LLMs who want to optimize prompt size, reduce token costs, or streamline data workflows will benefit from this converter.
          </p>
        </article>
      </div>
    </div>
  );
}
