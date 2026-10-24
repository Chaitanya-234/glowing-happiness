// app/tools/color-converter/page.tsx
import { Metadata } from 'next';
import ColorConverterClient from './ColorConverterClient';

export const metadata: Metadata = {
  title: 'Color Converter (HEX, RGB, HSL) - Free Online Tool | DevMetrix',
  description: 'Convert colors between HEX, RGB, HSL, and CMYK formats. Pick colors visually, adjust values, and copy color codes instantly. For web designers and developers.',
  keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter', 'color picker', 'cmyk converter', 'web colors'],
};

export default function ColorConverterPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <ColorConverterClient />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About Color Converter
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Our Color Converter is an essential tool for web designers and developers.
            Easily translate colors between different formats like HEX, RGB, HSL, and CMYK.
            Visualize your color choices and get the exact code you need for your CSS.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Convert between HEX, RGB, HSL, and CMYK</li>
            <li>Visual color picker</li>
            <li>Real-time preview</li>
            <li>One-click copy for all formats</li>
            <li>Parse various input formats automatically</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            How to Use
          </h3>
          <ol className="list-decimal list-inside text-purple-200/40 space-y-2">
            <li>Enter a color code (e.g., #FF5733, rgb(255, 87, 51)) in the input field.</li>
            <li>Or use the color picker to select a color visually.</li>
            <li>The tool automatically converts the color to all other formats.</li>
            <li>Click the copy icon next to any format to copy it to your clipboard.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Supported Formats
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li><strong>HEX:</strong> 6-digit hexadecimal codes (e.g., #FFFFFF)</li>
            <li><strong>RGB:</strong> Red, Green, Blue values (0-255)</li>
            <li><strong>HSL:</strong> Hue, Saturation, Lightness</li>
            <li><strong>CMYK:</strong> Cyan, Magenta, Yellow, Key (Black)</li>
          </ul>
        </article>
      </div>

       {/* Schema.org JSON-LD */}
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Color Converter',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Any',
             offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Convert colors between HEX, RGB, HSL, and CMYK formats instantly.',
          }),
        }}
      />
    </div>
  );
}
