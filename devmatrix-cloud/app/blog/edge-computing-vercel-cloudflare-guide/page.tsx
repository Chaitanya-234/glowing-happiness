'use client';
import { useTheme } from '@/components/providers/ThemeProvider';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code, Globe,
    Menu,
    Network,
    Server,
    Shield,
    X,
    Zap
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

export default function EdgeComputingGuide() {
  const { currentTheme: theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Globe },
    { id: 'vercel-middleware', title: 'Vercel Middleware', icon: Zap },
    { id: 'cloudflare-workers', title: 'Cloudflare Workers', icon: Network },
    { id: 'use-cases', title: 'Use Cases', icon: Code },
    { id: 'security', title: 'Edge Security', icon: Shield },
    { id: 'comparison', title: 'Edge vs Server', icon: Server },
  ];

  const checklistItems: string[] = [
    'Identify latency-sensitive routes',
    'Implement geolocation-based logic (Middleware)',
    'Set up A/B testing at the edge',
    'Configure caching headers (stale-while-revalidate)',
    'Deploy a Cloudflare Worker for image resizing',
    'Secure edge functions with authentication',
    'Monitor edge execution time and limits',
    'Test fallback strategies for edge failures',
  ];

  const concepts: Concept[] = [
    {
      id: 'latency',
      title: 'Latency Reduction',
      icon: '⚡',
      description: 'By running code physically closer to the user (at the "edge" of the network), you drastically reduce the time it takes for a request to travel.',
      benefits: ['Faster load times', 'Better UX', 'Reduced server load']
    },
    {
      id: 'middleware',
      title: 'Middleware',
      icon: '🛡️',
      description: 'Code that runs before a request completes. In Next.js, this happens at the edge, allowing you to modify requests/responses instantly.',
      benefits: ['Auth checks', 'Redirects', 'Header modification']
    },
    {
      id: 'cold-starts',
      title: 'No Cold Starts',
      icon: '🔥',
      description: 'Unlike traditional serverless functions (Lambdas), modern edge runtimes (like V8 isolates) have near-zero startup time.',
      benefits: ['Instant response', 'Consistent performance', 'Lower cost']
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
    <div className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="Edge Computing with Vercel Middleware & Cloudflare Workers"
        description="Optimize performance by moving logic to the edge. A comprehensive guide to Vercel Middleware and Cloudflare Workers for Next.js developers."
        datePublished="2025-11-27"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/edge-computing-vercel-cloudflare-guide"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1  z-[100]">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-teal-600 hover:bg-teal-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full /95 backdrop-blur-sm border-r border-teal-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-teal-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-teal-600 text-white'
                        : 'text-teal-300 hover:bg-teal-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-teal-900/30 rounded-lg">
            <div className="text-sm text-teal-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2  rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-green-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-teal-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-green-500 to-teal-400 leading-tight mb-4 lg:mb-6">
              Edge Computing with Vercel Middleware & Cloudflare Workers
            </h1>
            <p className="text-teal-200/90 text-base lg:text-lg mb-4">
              Speed matters. Learn how to push your logic to the edge of the network, reducing latency to milliseconds for your users worldwide.
            </p>
            <div className="flex flex-wrap gap-3 text-teal-400 text-xs sm:text-sm">
              <span>📅 November 27, 2025</span>
              <span>•</span>
              <span>⏱️ 26 min read</span>
              <span>•</span>
              <span>🏷️ Performance</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-teal-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-teal-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-teal-200/80">
                <p>
                  Traditional servers live in a specific location (e.g., `us-east-1`). If your user is in Tokyo, they have to wait for the signal to travel halfway across the world.
                </p>
                <p>
                  <strong className="text-teal-300">Edge Computing</strong> changes this paradigm. It distributes your code to hundreds of data centers globally. When a user makes a request, it's handled by the server nearest to them. In 2025, tools like <strong className="text-teal-300">Vercel Middleware</strong> and <strong className="text-teal-300">Cloudflare Workers</strong> make this incredibly easy.
                </p>
                <div className="bg-teal-800/20 border-l-4 border-teal-500 p-4 rounded mt-6">
                  <p className="text-sm text-teal-300">
                    💡 <strong>Why This Matters:</strong> Faster sites convert better. Edge computing is the easiest performance win you can implement today.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section id="concepts" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-teal-900/30 border border-teal-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-teal-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-teal-300">Key Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-teal-800/30 hover:bg-teal-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-teal-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="/50 p-4 rounded-b-lg border-t-0 border border-teal-500/20 mt-0">
                      <p className="text-teal-200/80 mb-3">{concept.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {concept.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-green-900/30 text-green-300 px-3 py-1 rounded-full">
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

          {/* Vercel Middleware Section */}
          <section id="vercel-middleware" className="mb-12 lg:mb-16">
             <div className="/50 border border-teal-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-teal-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-teal-300">Vercel Middleware</h2>
              </div>

              <p className="text-teal-200/80 mb-6">
                  Vercel Middleware runs before a request is processed on your site. It's perfect for auth, rewrites, and geolocation.
              </p>

              <div className=" rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-teal-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-teal-300 font-mono">middleware.ts</span>
                  <Code size={16} className="text-teal-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-teal-400">{`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Geolocation Logic
  const country = request.geo?.country || 'US';

  if (country === 'FR') {
    return NextResponse.rewrite(new URL('/fr', request.url));
  }

  // 2. Authentication Logic
  const token = request.cookies.get('token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Cloudflare Workers Section */}
          <section id="cloudflare-workers" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-teal-900/30 to-gray-800/50 border border-teal-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Network className="text-teal-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-teal-300">Cloudflare Workers</h2>
              </div>

              <p className="text-teal-200/80 mb-6">
                Cloudflare Workers are robust enough to run entire applications, not just middleware. They support KV storage and durable objects.
              </p>

              <div className=" rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-green-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-green-300 font-mono">worker.js</span>
                  <Code size={16} className="text-green-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Simple A/B Testing
    const cookie = request.headers.get('cookie');
    if (cookie && cookie.includes('experiment=true')) {
        return fetch('https://beta.mysite.com' + url.pathname);
    }

    // Return JSON response from the edge
    return new Response(JSON.stringify({
      message: "Hello from the Edge!",
      location: request.cf.city
    }), {
      headers: { 'content-type': 'application/json' },
    });
  },
};`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-teal-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Edge Security</h2>
              </div>

              <p className="text-teal-200/80 mb-6">
                Pushing security checks to the edge blocks malicious traffic before it ever hits your origin server.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'DDoS Protection', desc: 'Edge networks naturally absorb traffic spikes, protecting your core infrastructure.' },
                  { title: 'WAF', desc: 'Web Application Firewalls at the edge block SQLi and XSS attacks instantly.' },
                  { title: 'Geo Blocking', desc: 'Easily block traffic from embargoed or high-risk countries.' },
                  { title: 'Token Verification', desc: 'Verify JWTs at the edge to offload CPU from your main API.' },
                ].map((practice, idx) => (
                  <div key={idx} className="/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-teal-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-teal-300 mb-4 flex items-center gap-2">
                ✅ Edge Readiness Checklist
              </h3>
              <p className="text-teal-200/80 mb-6">
                Before you deploy:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 /50 hover:/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-teal-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-teal-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-teal-300 line-through' : 'text-teal-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-teal-300 mb-2">
                  Test Your Speed
                </h3>
                <p className="text-teal-200/80 mb-0 max-w-xl">
                    Use our tools to benchmark your API response times.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Explore Tools →
                </a>
                <Link
                    href="/blog"
                    className="inline-block  hover: px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Read More Blogs
                </Link>
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="mb-16">
             <h2 className="text-2xl font-bold text-teal-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/web-performance-optimization" className="block p-4 bg-teal-900/10 border border-teal-500/20 rounded-lg hover:bg-teal-800/20 transition-all group">
                    <h3 className="font-bold text-teal-200 group-hover:text-white transition-colors">Web Performance</h3>
                    <p className="text-sm text-teal-400/60 mt-2">Core Web Vitals.</p>
                </Link>
                <Link href="/blog/nextjs-15-server-actions-guide" className="block p-4 bg-teal-900/10 border border-teal-500/20 rounded-lg hover:bg-teal-800/20 transition-all group">
                    <h3 className="font-bold text-teal-200 group-hover:text-white transition-colors">Next.js 15</h3>
                    <p className="text-sm text-teal-400/60 mt-2">Server components.</p>
                </Link>
                 <Link href="/blog/web-security-essentials" className="block p-4 bg-teal-900/10 border border-teal-500/20 rounded-lg hover:bg-teal-800/20 transition-all group">
                    <h3 className="font-bold text-teal-200 group-hover:text-white transition-colors">Web Security</h3>
                    <p className="text-sm text-teal-400/60 mt-2">Protect your edge functions.</p>
                </Link>
                <Link href="/blog/rest-api-design-best-practice" className="block p-4 bg-teal-900/10 border border-teal-500/20 rounded-lg hover:bg-teal-800/20 transition-all group">
                    <h3 className="font-bold text-teal-200 group-hover:text-white transition-colors">API Design</h3>
                    <p className="text-sm text-teal-400/60 mt-2">Designing for cacheability.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="/50 border border-teal-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-teal-300 mb-4">Conclusion</h2>
              <p className="text-teal-200/80 mb-4">
                Edge computing is not a fad; it's the future of web architecture. It combines the performance of CDNs with the flexibility of server-side code.
              </p>
              <p className="text-teal-200/80">
                Whether you use Vercel for ease of use or Cloudflare for raw power, moving logic to the edge will provide a <strong className="text-green-400">tangible improvement in user experience</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
