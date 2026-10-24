import { tools } from '@/lib/tools-data';
import type { Metadata } from 'next';
import AiToolsClient from './AiToolsClient';

export const metadata: Metadata = {
  title: 'Free AI Developer Tools | Code, Resume, & Concept Generators',
  description: 'Boost your productivity with our free AI tools for developers. Includes AI Code Explainer, Resume Scanner, Mock Interviewer, and more. Powered by Gemini AI.',
  keywords: [
    'ai developer tools',
    'ai code explainer',
    'ai resume scanner',
    'ai mock interview',
    'ai concept explainer',
    'free ai tools for coding',
    'gemini ai tools',
    'developer productivity ai',
    'code refactoring ai',
    'ai study planner'
  ],
  openGraph: {
    title: 'Free AI Developer Tools | Devmetrix.in',
    description: 'Collection of free AI-powered tools for developers. Code explanation, resume optimization, interview prep, and more.',
    type: 'website',
  }
};

export default function AiToolsPage() {
  const aiTools = tools.filter(t => t.category === 'AI');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Developer Tools',
    description: 'A collection of AI-powered tools to help developers code faster, learn concepts, and advance their careers.',
    url: 'https://devmetrix.in/ai-tools',
    hasPart: aiTools.map(tool => ({
      '@type': 'SoftwareApplication',
      name: tool.name,
      description: tool.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: `https://devmetrix.in${tool.link}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-200 to-purple-500">
              AI-Powered Developer Tools
            </h1>
            <p className="text-xl text-purple-200/50 mb-8 max-w-3xl mx-auto leading-relaxed">
              Supercharge your development workflow with our suite of free AI tools.
              From code analysis to career prep, we use advanced LLMs to help you ship faster.
            </p>
        </section>

        {/* Tools Grid - Client Component */}
        <AiToolsClient tools={aiTools} />

        {/* SEO Content Section */}
        <section className="py-20 px-4 bg-purple-900/5">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Intro */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-purple-100/80">Why Use AI Developer Tools?</h2>
              <p className="text-purple-200/60 leading-relaxed text-lg">
                In the modern software landscape, speed and accuracy are paramount. AI tools act as your
                intelligent pair programmer, available 24/7. Whether you're debugging legacy code,
                preparing for a FAANG interview, or optimizing your resume for ATS systems, our specialized
                AI agents provide instant, high-quality assistance without the cost of premium subscriptions.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                <h3 className="text-xl font-semibold text-green-400 mb-3">Accelerate Learning</h3>
                <p className="text-purple-200/50">
                  Break down complex concepts like dynamic programming or system design into simple,
                  digestible analogies using the Feynman technique.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                <h3 className="text-xl font-semibold text-green-400 mb-3">Clean Code Guarantee</h3>
                <p className="text-purple-200/50">
                  Refactor spaghetti code automatically. Our tools suggest best practices,
                  security improvements, and performance optimizations.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                <h3 className="text-xl font-semibold text-green-400 mb-3">Career Advancement</h3>
                <p className="text-purple-200/50">
                  From resume scanning to mock interviews, get actionable feedback to land your dream job
                  in the tech industry.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                <h3 className="text-xl font-semibold text-green-400 mb-3">Free & Private</h3>
                <p className="text-purple-200/50">
                  No credit card required. We prioritize privacy and ensure your data is processed securely.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-purple-100/80">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-100/70 mb-2">Are these AI tools really free?</h3>
                  <p className="text-purple-200/50">Yes, we provide free access to our AI tools to support the developer community. We believe in democratizing access to advanced coding assistants.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-100/70 mb-2">Which AI model do you use?</h3>
                  <p className="text-purple-200/50">We utilize advanced models like Google's Gemini Pro and Flash to ensure high-quality, up-to-date, and context-aware responses for code and text generation.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-100/70 mb-2">Can I trust the code explanations?</h3>
                  <p className="text-purple-200/50">While our AI is highly accurate, we always recommend verifying critical code or security suggestions. Think of it as a smart assistant that helps you spot issues you might miss.</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
