import React from 'react';
import { Metadata } from 'next';
import DependencyScannerClient from './components/DependencyScannerClient';

export const metadata: Metadata = {
  title: 'Silent Dependency Risk Scanner | DevMetrix',
  description: 'AI-powered scanner for nested dependencies. Find hidden vulnerabilities, maintenance risks, and supply chain threats in your package-lock.json or yarn.lock.',
  keywords: ['dependency scanner', 'npm audit', 'security vulnerabilities', 'yarn audit', 'supply chain security', 'nested dependencies', 'devmatrix'],
  openGraph: {
    title: 'Silent Dependency Risk Scanner | DevMetrix',
    description: 'Find hidden vulnerabilities in your nested dependencies with AI.',
    type: 'website',
  }
};

export default function DependencyScannerPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] pt-24 pb-12">
      <DependencyScannerClient />

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-gray-400">
        <h2 className="text-2xl font-bold text-white mb-6">Why Standard Scanners Aren't Enough</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">The "Silent" Threat</h3>
            <p className="text-sm leading-relaxed mb-4">
              Modern applications rely on thousands of dependencies. While you might directly install 50 packages, those packages install hundreds more. These "transitive" or nested dependencies account for <span className="text-cyan-400 font-semibold">over 95%</span> of your total dependency tree and often go unchecked.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">AI-Powered Deep Analysis</h3>
            <p className="text-sm leading-relaxed mb-4">
              Unlike standard tools that just match versions against a CVE database, our AI engine analyzes the context, maintenance health, and supply chain signals of your deep dependencies. It spots abandoned packages, suspicious ownership changes, and license conflicts that traditional scanners miss.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-800">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
            <li>Export your dependency tree by locating your <code className="text-cyan-400">package-lock.json</code>, <code className="text-cyan-400">yarn.lock</code>, or <code className="text-cyan-400">pnpm-lock.yaml</code>.</li>
            <li>Upload the file to the scanner above.</li>
            <li>Wait 30-60 seconds for the AI to reconstruct and analyze the full dependency graph.</li>
            <li>Review the risk score and follow the prioritized remediation steps to secure your application.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
