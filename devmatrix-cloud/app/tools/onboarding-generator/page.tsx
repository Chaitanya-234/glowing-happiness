import { Metadata } from 'next';
import OnboardingGeneratorClient from './components/OnboardingGeneratorClient';
import { BookOpen, Users, Clock, Zap } from 'lucide-react';
import React from 'react';

export const metadata: Metadata = {
  title: 'Onboarding Path Generator | DevMetrix - AI-Powered Developer Onboarding',
  description: 'Generate personalized onboarding learning paths for new developers. AI analyzes your codebase structure and creates step-by-step guides from simple to complex, reducing onboarding time by 40-60%.',
  keywords: [
    'developer onboarding',
    'onboarding path generator',
    'codebase learning path',
    'developer training',
    'team onboarding tool',
    'code learning sequence',
    'new developer guide',
    'engineering onboarding',
    'automated onboarding',
    'developer education',
    'code complexity analysis',
    'learning path creator',
    'technical onboarding',
    'software onboarding',
    'codebase tutorial generator',
  ],
  openGraph: {
    title: 'Onboarding Path Generator - AI-Powered Learning Paths',
    description: 'Upload your codebase and get a personalized, progressive learning path in minutes.',
    type: 'website',
    url: 'https://devmetrix.com/tools/onboarding-generator',
    images: [{
      url: '/og-onboarding-generator.png',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onboarding Path Generator | DevMetrix',
    description: 'Generate AI-powered learning paths for new developers.',
    images: ['/og-onboarding-generator.png'],
  },
  alternates: {
    canonical: '/tools/onboarding-generator',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OnboardingGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Zap size={16} />
              <span>AI-Powered Code Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Onboard Developers <span className="text-blue-600">Faster</span> with Personalized Learning Paths
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Stop drowning new hires in documentation. Upload your codebase and let our AI generate a structured, day-by-day learning journey tailored to your project.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Save Time</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reduce ramp-up time by 50%</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Structured Learning</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Step-by-step progressive path</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Better Experience</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Less frustration, more coding</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-24 relative z-10">
        <OnboardingGeneratorClient />
      </div>

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 prose prose-lg dark:prose-invert">
        <h2>What is Developer Onboarding?</h2>
        <p>
          Developer onboarding is the process of integrating a new software engineer into a team and codebase.
          Effective onboarding goes beyond HR paperwork; it involves understanding the project architecture,
          setting up the development environment, learning coding standards, and making the first meaningful contribution.
          A well-structured onboarding process is critical for productivity and retention.
        </p>

        <h2>Why Traditional Onboarding Fails</h2>
        <p>
          Most engineering teams struggle with onboarding because:
        </p>
        <ul>
          <li><strong>Documentation is outdated:</strong> Wikis and READMEs often lag behind the actual code.</li>
          <li><strong>Knowledge is tribal:</strong> Critical information lives in the heads of senior engineers, creating bottlenecks.</li>
          <li><strong>Information overload:</strong> New hires are dumped with too much information at once, leading to cognitive overwhelm.</li>
          <li><strong>Lack of structure:</strong> There is no clear path from "Hello World" to "Pull Request."</li>
        </ul>

        <h2>How Our AI-Powered Generator Works</h2>
        <p>
          DevMetrix uses advanced Large Language Models (LLMs) via the Gemini API to analyze your actual source code.
          Instead of relying on potentially stale documentation, it reads your file structure, `package.json` dependencies,
          and key source files to understand the reality of your project. It then constructs a pedagogical learning path
          that guides a developer from setting up the environment to mastering complex business logic.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li><strong>Context-Aware Analysis:</strong> Understands your specific tech stack (React, Node, Python, etc.).</li>
          <li><strong>Progressive Difficulty:</strong> Modules start easy (Foundation) and get harder (Mastery).</li>
          <li><strong>Interactive Checklists:</strong> Track progress through each phase.</li>
          <li><strong>Customized for Your Code:</strong> Suggests specific files to read and specific tasks to perform.</li>
        </ul>

        <h2>Who Should Use This Tool?</h2>
        <p>
          This tool is perfect for:
        </p>
        <ul>
          <li><strong>Engineering Managers:</strong> To create consistent onboarding plans for new hires.</li>
          <li><strong>Team Leads:</strong> To save time explaining the basics repeatedly.</li>
          <li><strong>New Developers:</strong> To self-start on an open-source project or new job.</li>
          <li><strong>Consultants/Freelancers:</strong> To quickly understand a client's legacy codebase.</li>
        </ul>

        <h2>Supported Project Types</h2>
        <p>
          The generator works best with modern web and software projects, including:
        </p>
        <ul>
          <li>JavaScript/TypeScript (Next.js, React, Node.js, Vue, Angular)</li>
          <li>Python (Django, Flask, FastAPI)</li>
          <li>Java/Kotlin (Spring Boot)</li>
          <li>Go, Rust, Ruby, and PHP projects</li>
        </ul>
        <p>
          Currently, it supports ZIP archives up to 50MB.
        </p>

        <h2>Best Practices for Onboarding</h2>
        <p>
          To maximize the effectiveness of this generated path:
        </p>
        <ol>
          <li><strong>Pair with a Buddy:</strong> Assign a mentor to answer questions that the AI path uncovers.</li>
          <li><strong>Update Documentation:</strong> Use the insights from the generator to update your `README.md`.</li>
          <li><strong>Encourage contribution:</strong> The path includes a "First Contribution" milestone—ensure there are good "first issue" tasks available.</li>
        </ol>

        <h2>Common Questions</h2>
        <h3>Is my code safe?</h3>
        <p>
          Yes. Your code is processed in-memory and sent to the Gemini API for analysis. We do not store your code on our servers.
          Once the session ends, the data is discarded.
        </p>
        <h3>Can I edit the path?</h3>
        <p>
          The output is standard Markdown. You can download it, edit it, and commit it to your repository as `ONBOARDING.md` for future use.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Onboarding Path Generator',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'AI-powered tool to generate personalized developer onboarding learning paths from codebase analysis.',
            featureList: 'Codebase Analysis, Learning Path Generation, Markdown Export, Progress Tracking',
          }),
        }}
      />
    </div>
  );
}
