// app/tools/qr-code-generator/page.tsx
import { Metadata } from 'next';
import QrCodeGeneratorClient from './QrCodeGeneratorClient';

export const metadata: Metadata = {
  title: 'QR Code Generator - Free Online Tool | DevMetrix',
  description: 'Generate high-quality QR codes for URLs, text, Wi-Fi, email, and more. Customize colors and size. Download as PNG or SVG.',
  keywords: ['qr code generator', 'create qr code', 'online qr code', 'free qr generator', 'custom qr code', 'wifi qr code'],
};

export default function QrCodeGeneratorPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <QrCodeGeneratorClient />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About QR Code Generator
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Create custom QR codes instantly with our free online QR Code Generator.
            Perfect for sharing websites, contact information, Wi-Fi credentials, and more.
            Customize the colors, size, and error correction level to suit your needs.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Generate QR codes for URLs, Text, Email, Wi-Fi, etc.</li>
            <li>Customize foreground and background colors</li>
            <li>Adjust size and error correction level</li>
            <li>Download as PNG or SVG</li>
            <li>Instant preview</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            How to Use
          </h3>
          <ol className="list-decimal list-inside text-purple-200/40 space-y-2">
            <li>Enter your text or URL in the input field.</li>
            <li>Adjust colors and settings if desired.</li>
            <li>View the generated QR code instantly.</li>
            <li>Click "Download" to save the image.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            FAQ
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-purple-100/60">Is it free?</h4>
              <p className="text-purple-200/40">Yes, this tool is 100% free to use.</p>
            </div>
             <div>
              <h4 className="font-semibold text-purple-100/60">Do QR codes expire?</h4>
              <p className="text-purple-200/40">No, the QR codes generated here are static and do not expire.</p>
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
            name: 'QR Code Generator',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Any',
             offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Generate high-quality QR codes for URLs, text, Wi-Fi, email, and more.',
          }),
        }}
      />
    </div>
  );
}
