'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    Box,
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code,
    Database,
    LayoutGrid,
    Menu,
    Shield,
    Split,
    X
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface Concept {
  id: string;
  title: string;
  icon: string;
  description: string;
  benefits: string[];
}

export default function MicroFrontendsGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: LayoutGrid },
    { id: 'module-federation', title: 'Module Federation', icon: Box },
    { id: 'implementation', title: 'Next.js Implementation', icon: Code },
    { id: 'backend-bff', title: 'The Backend (BFF)', icon: Database },
    { id: 'state-management', title: 'Shared State', icon: Split },
    { id: 'security', title: 'Security', icon: Shield },
  ];

  const checklistItems: string[] = [
    'Define clear boundaries for each micro-frontend',
    'Configure Module Federation plugin',
    'Set up shared dependencies to avoid duplication',
    'Implement error boundaries for remote modules',
    'Standardize styling (Tailwind) across apps',
    'Set up CI/CD for independent deployments',
    'Implement version control for shared libraries',
    'Monitor performance impacts',
  ];

  const concepts: Concept[] = [
    {
      id: 'independence',
      title: 'Team Independence',
      icon: '👥',
      description: 'Different teams can work on different parts of the application (e.g., Checkout, Search, Profile) and deploy them independently.',
      benefits: ['Faster release cycles', 'Autonomous teams', 'Tech stack flexibility']
    },
    {
      id: 'composition',
      title: 'Runtime Composition',
      icon: '🧩',
      description: 'Micro-frontends are stitched together in the user\'s browser at runtime, allowing for a seamless single-page application experience.',
      benefits: ['Seamless UX', 'Lazy loading', 'Reduced bundle size']
    },
    {
      id: 'sharing',
      title: 'Dependency Sharing',
      icon: '🔗',
      description: 'Module Federation allows applications to share common libraries (like React or Lodash) so the user doesn\'t download them twice.',
      benefits: ['Performance', 'Consistency', 'Bandwidth saving']
    }
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);

      const sectionElements = sections.map(s => document.getElementById(s.id));
      const currentSection = sectionElements.findIndex((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });

      if (currentSection !== -1) {
        setActiveSection(sections[currentSection].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const toggleChecklist = (index: number): void => {
    setChecklist(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleSection = (id: string): void => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="Micro-Frontends with Module Federation: Scaling Teams in 2025"
        description="Learn how to scale your frontend development by breaking monoliths into micro-frontends using Webpack Module Federation and Next.js."
        datePublished="2025-11-23"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/micro-frontends-module-federation-2025"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-indigo-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-indigo-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-indigo-300 hover:bg-indigo-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-indigo-900/30 rounded-lg">
            <div className="text-sm text-indigo-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-indigo-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-400 leading-tight mb-4 lg:mb-6">
              Micro-Frontends with Module Federation: Scaling Teams in 2025
            </h1>
            <p className="text-indigo-200/90 text-base lg:text-lg mb-4">
              Stop fighting the monolith. Discover how to split your frontend into independent, deployable apps that work together seamlessly.
            </p>
            <div className="flex flex-wrap gap-3 text-indigo-400 text-xs sm:text-sm">
              <span>📅 November 23, 2025</span>
              <span>•</span>
              <span>⏱️ 32 min read</span>
              <span>•</span>
              <span>🏷️ Architecture</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <LayoutGrid className="text-indigo-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-indigo-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-indigo-200/80">
                <p>
                  As applications grow, so does the complexity of the codebase. A single "monolithic" frontend can become a bottleneck where build times skyrocket and teams step on each other's toes.
                </p>
                <p>
                  <strong className="text-indigo-300">Micro-frontends</strong> solve this by applying the microservices pattern to the frontend. And in 2025, <strong className="text-indigo-300">Module Federation</strong> (originally from Webpack 5) is the gold standard for implementing them, enabling runtime integration of separately built applications.
                </p>
                <div className="bg-indigo-800/20 border-l-4 border-indigo-500 p-4 rounded mt-6">
                  <p className="text-sm text-indigo-300">
                    💡 <strong>Why This Matters:</strong> Scalability isn't just about handling more traffic; it's about handling more developers and features without slowing down.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section id="module-federation" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-indigo-900/30 border border-indigo-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Box className="text-indigo-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-indigo-300">Key Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-indigo-800/30 hover:bg-indigo-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-indigo-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="bg-gray-900/50 p-4 rounded-b-lg border-t-0 border border-indigo-500/20 mt-0">
                      <p className="text-indigo-200/80 mb-3">{concept.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {concept.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">
                            ✓ {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Section */}
          <section id="implementation" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-indigo-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-indigo-300">Next.js Implementation</h2>
              </div>

              <div className="space-y-4 text-indigo-200/80 mb-6">
                <p>We'll configure two Next.js apps: a <strong>Host</strong> (Shell) and a <strong>Remote</strong> (e.g., Shop). We use the <code>@module-federation/nextjs-mf</code> plugin.</p>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-indigo-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-indigo-300 font-mono">next.config.js (Host)</span>
                  <Code size={16} className="text-indigo-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-indigo-400">{`const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            shop: 'shop@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          },
          exposes: {},
          shared: {},
        })
      );
    }
    return config;
  },
};`}</code>
                </pre>
              </div>

              <p className="mt-4 mb-2 text-indigo-200/80">Then, importing the remote component in the Host:</p>

               <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-indigo-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-indigo-300 font-mono">pages/index.tsx (Host)</span>
                  <Code size={16} className="text-indigo-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-indigo-400">{`import dynamic from 'next/dynamic';

const RemoteProductList = dynamic(
  () => import('shop/ProductList'),
  { ssr: false, loading: () => <p>Loading Shop...</p> }
);

export default function Home() {
  return (
    <div>
        <h1>Host Application</h1>
        <RemoteProductList />
    </div>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Backend Integration */}
           <section id="backend-bff" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-indigo-900/30 to-gray-800/50 border border-indigo-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-indigo-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-indigo-300">The Backend for Frontend (BFF)</h2>
              </div>

              <div className="space-y-4 text-indigo-200/80 mb-6">
                <p>Micro-frontends usually need to talk to microservices. A common pattern is to have a <strong className="text-green-400">Spring Boot</strong> BFF for each domain.</p>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-green-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-green-300 font-mono">ProductController.java (Shop BFF)</span>
                  <Code size={16} className="text-green-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow Host App
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getProducts() {
        // Fetches data for the 'Shop' micro-frontend
        return productService.findAll();
    }
}
`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-indigo-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security Considerations</h2>
              </div>

              <p className="text-indigo-200/80 mb-6">
                Distributed frontends introduce new attack vectors.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'CORS', desc: 'Strictly configure CORS on your backend to allow only trusted hosts (the shell app).' },
                  { title: 'Content Security Policy (CSP)', desc: 'Update CSP headers to allow loading scripts from remote domains.' },
                  { title: 'Authentication', desc: 'Share auth tokens (JWT) securely between micro-frontends (e.g., via cookies or window events).' },
                  { title: 'Dependency Isolation', desc: 'Ensure one vulnerable dependency in a remote app doesn\'t compromise the host.' },
                ].map((practice, idx) => (
                  <div key={idx} className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-indigo-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                ✅ Micro-Frontend Checklist
              </h3>
              <p className="text-indigo-200/80 mb-6">
                Before you split your app:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-indigo-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-indigo-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-indigo-300 line-through' : 'text-indigo-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-indigo-300 mb-2">
                  Visualize Your Architecture
                </h3>
                <p className="text-indigo-200/80 mb-0 max-w-xl">
                    Use our tools to diagram your microservices and micro-frontends interactions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Explore Tools →
                </a>
                <Link
                    href="/blog"
                    className="inline-block bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Read More Blogs
                </Link>
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="mb-16">
             <h2 className="text-2xl font-bold text-indigo-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/microservices-architecture-guide" className="block p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg hover:bg-indigo-800/20 transition-all group">
                    <h3 className="font-bold text-indigo-200 group-hover:text-white transition-colors">Microservices</h3>
                    <p className="text-sm text-indigo-400/60 mt-2">The backend counterpart to micro-frontends.</p>
                </Link>
                <Link href="/blog/nextjs-15-server-actions-guide" className="block p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg hover:bg-indigo-800/20 transition-all group">
                    <h3 className="font-bold text-indigo-200 group-hover:text-white transition-colors">Next.js 15</h3>
                    <p className="text-sm text-indigo-400/60 mt-2">Deep dive into the framework.</p>
                </Link>
                 <Link href="/blog/web-performance-optimization" className="block p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg hover:bg-indigo-800/20 transition-all group">
                    <h3 className="font-bold text-indigo-200 group-hover:text-white transition-colors">Web Performance</h3>
                    <p className="text-sm text-indigo-400/60 mt-2">Optimizing loading of multiple bundles.</p>
                </Link>
                <Link href="/blog/web-security-essentials" className="block p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg hover:bg-indigo-800/20 transition-all group">
                    <h3 className="font-bold text-indigo-200 group-hover:text-white transition-colors">Web Security</h3>
                    <p className="text-sm text-indigo-400/60 mt-2">Securing your distributed app.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-gray-800/50 border border-indigo-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-indigo-300 mb-4">Conclusion</h2>
              <p className="text-indigo-200/80 mb-4">
                Micro-frontends with Module Federation provide the ultimate flexibility for large organizations. They allow teams to move fast, choose the right tools for their specific domain, and deploy without fear of breaking the entire application.
              </p>
              <p className="text-indigo-200/80">
                While they introduce complexity in build and deployment, the trade-off is often worth it for <strong className="text-indigo-400">scalability and team autonomy</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
