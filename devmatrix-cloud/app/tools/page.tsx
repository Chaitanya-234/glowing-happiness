// app/tools/page.tsx
import AdContainer from '@/components/AdContainer';
import { Metadata } from 'next';
import ToolsPageClient from './ToolsPageClient';

export const metadata: Metadata = {
  title: 'Free Developer Tools - JSON, API, Regex & More | DevMetrix',
  description: 'Free online developer tools including JSON formatter, API tester, JWT decoder, regex playground, and more. No signup required. Privacy-focused tools for developers.',
  keywords: ['developer tools', 'json formatter', 'api tester', 'regex tester', 'jwt decoder', 'base64 encoder', 'free online tools'],
  openGraph: {
    title: 'Developer Tools - DevMetrix.cloud',
    description: 'Free online developer tools for modern web development',
    url: 'https://devmetrix.in/tools',
    type: 'website',
  },
};

const benefits = [
  { title: '100% Free Forever', text: 'All core tools are completely free with no hidden fees or premium walls' },
  { title: 'Privacy First', text: 'All tools process data client-side in your browser - your data never leaves your device' },
  { title: 'No Signup Required', text: 'Start using tools immediately without creating an account' },
  { title: 'Lightning Fast', text: 'Optimized performance with instant results' },
  { title: 'Mobile Friendly', text: 'Responsive design works perfectly on all devices' },
  { title: 'Regular Updates', text: 'New tools and features added frequently' },
];

const popularTools = [
  { name: 'JSON Formatter & Validator', text: 'Format, validate, and beautify JSON data with syntax highlighting. Perfect for debugging API responses and configuration files.' },
  { name: 'API Tester', text: 'Test REST APIs with custom headers, authentication, and request bodies. A lightweight alternative to Postman for quick API testing.' },
  { name: 'JWT Decoder', text: 'Decode and inspect JSON Web Tokens (JWT) to view header, payload, and signature components. Essential for debugging authentication issues.' },
  { name: 'Regex Playground', text: 'Build and test regular expressions with live pattern matching and visual highlighting. Includes common regex patterns library.' },
  { name: 'Base64 Encoder/Decoder', text: 'Encode and decode Base64 strings instantly. Supports URL-safe encoding and handles large files efficiently.' },
];

const faqs = [
  { q: 'Are these tools really free?', a: 'Yes! All our developer tools are completely free to use with no limitations on basic features. No credit card required.' },
  { q: 'Do I need to create an account?', a: 'No signup required. You can start using all tools immediately without creating an account.' },
  { q: 'Is my data secure?', a: 'Absolutely. All tools process data entirely in your browser using JavaScript. Your sensitive data never leaves your device or gets sent to our servers.' },
  { q: 'Can I use these tools offline?', a: 'Yes! Once the page is loaded, most tools work completely offline since all processing happens in your browser.' },
];

const adProps = {
  slot: '6465093078',
  format: 'horizontal' as const,
  label: 'Advertisement',
  className: 'max-w-7xl mx-auto px-4 my-12',
};

export default function ToolsPage() {
  return (
    <>
      <ToolsPageClient />

      {/* SEO Content Section */}
      <div className="px-4 pb-20">
        <AdContainer {...adProps} />

        <article className="glass max-w-4xl mx-auto rounded-3xl p-6 md:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
            Free Developer Tools for Modern Development
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            DevMetrix.cloud provides a comprehensive suite of free developer tools designed to
            streamline your workflow and boost productivity. Whether you&apos;re a frontend developer,
            backend engineer, DevOps specialist, or full-stack developer, our tools help you
            solve common programming challenges quickly and efficiently.
          </p>

          <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Why Choose Our Developer Tools?</h3>
          <ul className="space-y-2 mb-6 text-muted">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-2">
                <span aria-hidden="true" className="text-accent font-bold">→</span>
                <span>
                  <strong className="text-foreground">{b.title}:</strong> {b.text}
                </span>
              </li>
            ))}
          </ul>

          <AdContainer {...adProps} />

          <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Popular Developer Tools</h3>
          <div className="space-y-5 text-muted">
            {popularTools.map((t) => (
              <div key={t.name}>
                <h4 className="text-lg font-semibold text-foreground mb-1">{t.name}</h4>
                <p>{t.text}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Tools for Every Developer</h3>
          <p className="text-muted leading-relaxed mb-4">
            Our tools are designed for developers of all skill levels, from beginners learning to code
            to experienced engineers working on production systems. Each tool is carefully crafted to
            solve specific problems you encounter in daily development work.
          </p>

          <AdContainer {...adProps} />

          <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-5 text-muted">
            {faqs.map((f) => (
              <div key={f.q}>
                <h4 className="text-lg font-semibold text-foreground mb-1">{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>

          <AdContainer {...adProps} />
        </article>
      </div>
    </>
  );
}