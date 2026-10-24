// app/tools/lorem-ipsum-generator/page.tsx
import { Metadata } from 'next';
import LoremIpsumGeneratorClient from './LoremIpsumGeneratorClient';

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Dummy Text Generator | DevMetrix',
  description: 'Generate placeholder text for your designs and mockups. Customizable paragraph length, word count, and HTML tag options. Free Lorem Ipsum generator.',
  keywords: ['lorem ipsum generator', 'dummy text', 'placeholder text', 'lipsum', 'text generator', 'web design tools'],
};

export default function LoremIpsumGeneratorPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <LoremIpsumGeneratorClient />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About Lorem Ipsum Generator
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Our Lorem Ipsum Generator helps designers and developers create placeholder text for
            mockups, prototypes, and web designs. Quickly generate paragraphs, sentences, or words
            of standard Lorem Ipsum text to fill your layouts.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Generate paragraphs, sentences, or words</li>
            <li>Adjust count and length</li>
            <li>Option to start with "Lorem ipsum dolor sit amet"</li>
            <li>Copy to clipboard with one click</li>
            <li>Simple and fast interface</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            What is Lorem Ipsum?
          </h3>
          <p className="text-purple-200/50 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been
            the industry's standard dummy text ever since the 1500s. It looks like reasonable text
            but has no meaning, allowing the viewer to focus on the graphical elements of a design.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            FAQ
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-purple-100/60">Is this text copyright free?</h4>
              <p className="text-purple-200/40">Yes, Lorem Ipsum text is in the public domain.</p>
            </div>
             <div>
              <h4 className="font-semibold text-purple-100/60">Why use dummy text?</h4>
              <p className="text-purple-200/40">Using dummy text prevents people from focusing on the text content instead of the design layout.</p>
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
            name: 'Lorem Ipsum Generator',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Any',
             offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Generate placeholder text for your designs and mockups.',
          }),
        }}
      />
    </div>
  );
}
