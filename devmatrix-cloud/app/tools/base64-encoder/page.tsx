// app/tools/base64-encoder/page.tsx
import { Metadata } from 'next';
import Base64EncoderClient from './Base64EncoderClient';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder - Free Online Tool | DevMetrix',
  description: 'Encode and decode Base64 strings instantly. Support for text and files. URL-safe encoding available. 100% client-side processing.',
  keywords: ['base64 encoder', 'base64 decoder', 'encode base64', 'decode base64', 'base64 converter'],
};

export default function Base64EncoderPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <Base64EncoderClient />
      
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About Base64 Encoder/Decoder
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Base64 encoding converts binary data into ASCII string format using 64 printable characters. 
            This tool helps you encode and decode Base64 strings quickly and securely in your browser.
          </p>
          
          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Encode text to Base64 instantly</li>
            <li>Decode Base64 strings back to text</li>
            <li>URL-safe Base64 encoding option</li>
            <li>Copy encoded/decoded text with one click</li>
            <li>100% client-side - your data never leaves your device</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            What is Base64?
          </h3>
          <p className="text-purple-200/50 leading-relaxed">
            Base64 is an encoding scheme that converts binary data into an ASCII string format. 
            It's commonly used to encode data in emails, embed images in HTML/CSS, and transmit 
            binary data over text-based protocols. Base64 uses 64 characters: A-Z, a-z, 0-9, +, and /.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Common Use Cases
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Embedding images in HTML/CSS (data URIs)</li>
            <li>Encoding credentials for HTTP Basic Authentication</li>
            <li>Transmitting binary data over text-only channels</li>
            <li>Email attachments (MIME encoding)</li>
            <li>Storing binary data in JSON or XML</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
