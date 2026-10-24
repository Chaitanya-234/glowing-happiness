// app/privacy-policy/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | DevMetrix.cloud',
  description: 'Privacy policy for DevMetrix.cloud developer tools platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple">
        <h1 className="text-4xl font-bold text-purple-100/80 mb-6">Privacy Policy</h1>
        <p className="text-purple-200/50 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold text-purple-100/70 mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-purple-200/50">
          DevMetrix.cloud is committed to protecting your privacy. Our developer tools process data 
          entirely in your browser. We do not collect, store, or transmit your tool inputs to our servers.
        </p>

        <h2 className="text-2xl font-semibold text-purple-100/70 mt-8 mb-4">2. Cookies and Tracking</h2>
        <p className="text-purple-200/50">
          We use cookies only for essential site functionality and analytics. We use Google Analytics 
          to understand how visitors use our site and Google AdSense to display advertisements.
        </p>

        <h2 className="text-2xl font-semibold text-purple-100/70 mt-8 mb-4">3. Third-Party Services</h2>
        <ul className="text-purple-200/50 list-disc list-inside">
          <li>Google Analytics - for website analytics</li>
          <li>Google AdSense - for advertisements</li>
        </ul>

        <h2 className="text-2xl font-semibold text-purple-100/70 mt-8 mb-4">4. Your Data Security</h2>
        <p className="text-purple-200/50">
          All tool processing happens client-side in your browser. Your data never leaves your device 
          when using our developer tools.
        </p>

        <h2 className="text-2xl font-semibold text-purple-100/70 mt-8 mb-4">5. Contact Us</h2>
        <p className="text-purple-200/50">
          If you have questions about this Privacy Policy, contact us at: privacy@devmetrix.cloud
        </p>
      </div>
    </div>
  );
}
