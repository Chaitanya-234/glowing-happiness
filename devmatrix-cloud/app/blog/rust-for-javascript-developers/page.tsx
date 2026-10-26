'use client';
import { useTheme } from '@/components/providers/ThemeProvider';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    Box,
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code, Cpu,
    Menu,
    Settings,
    Shield,
    Terminal,
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

export default function RustForJsDevsGuide() {
  const { currentTheme: theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Terminal },
    { id: 'why-rust', title: 'Why Rust?', icon: Zap },
    { id: 'rust-concepts', title: 'Key Concepts', icon: Box },
    { id: 'wasm-setup', title: 'WASM Setup', icon: Settings },
    { id: 'integration', title: 'Next.js Integration', icon: Code },
    { id: 'backend-comparison', title: 'Rust vs Spring Boot', icon: Cpu },
    { id: 'security', title: 'Security', icon: Shield },
  ];

  const checklistItems: string[] = [
    'Install Rust and Cargo',
    'Install wasm-pack for WebAssembly compilation',
    'Create a new Rust library project',
    'Expose functions with #[wasm_bindgen]',
    'Build the WASM package',
    'Import the WASM module in Next.js',
    'Handle async loading of WASM',
    'Benchmark performance vs pure JS',
  ];

  const concepts: Concept[] = [
    {
      id: 'ownership',
      title: 'Ownership & Borrowing',
      icon: '🔐',
      description: 'Rust\'s unique memory management model. It ensures memory safety without a garbage collector by enforcing strict rules on how memory is accessed.',
      benefits: ['Memory safety', 'No GC pauses', 'Thread safety']
    },
    {
      id: 'wasm',
      title: 'WebAssembly (WASM)',
      icon: '🕸️',
      description: 'A binary instruction format for a stack-based virtual machine. It allows code written in languages like Rust to run in the browser at near-native speed.',
      benefits: ['High performance', 'Language agnostic', 'Secure sandbox']
    },
    {
      id: 'types',
      title: 'Type System',
      icon: '🛡️',
      description: 'Rust has a strong, static type system with type inference. It prevents many classes of bugs at compile time.',
      benefits: ['Reliability', 'Refactoring safety', 'Zero-cost abstractions']
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
        headline="Rust for JavaScript Developers: Integrating WASM in 2025"
        description="Learn how to supercharge your web applications by integrating Rust and WebAssembly (WASM) into your Next.js workflow. A practical guide for JS devs."
        datePublished="2025-11-22"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/rust-for-javascript-developers"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1  z-[100]">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-orange-600 hover:bg-orange-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full /95 backdrop-blur-sm border-r border-orange-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-orange-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-orange-600 text-white'
                        : 'text-orange-300 hover:bg-orange-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-orange-900/30 rounded-lg">
            <div className="text-sm text-orange-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2  rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-orange-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 leading-tight mb-4 lg:mb-6">
              Rust for JavaScript Developers: Integrating WASM in 2025
            </h1>
            <p className="text-orange-200/90 text-base lg:text-lg mb-4">
              Unlock native performance in your web apps. Learn how to bridge the gap between JavaScript and Rust using WebAssembly.
            </p>
            <div className="flex flex-wrap gap-3 text-orange-400 text-xs sm:text-sm">
              <span>📅 November 22, 2025</span>
              <span>•</span>
              <span>⏱️ 35 min read</span>
              <span>•</span>
              <span>🏷️ Systems Programming</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-orange-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-orange-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-orange-200/80">
                <p>
                  JavaScript is the language of the web, but sometimes it hits a performance ceiling. Heavy computations like image processing, complex algorithms, or cryptography can bog down the main thread.
                </p>
                <p>
                  Enter <strong className="text-orange-400">Rust</strong>. With its memory safety guarantees and blistering speed, it's the perfect companion to JavaScript via <strong className="text-orange-400">WebAssembly (WASM)</strong>. In 2025, the tooling is mature, making it easier than ever to drop Rust modules into your Next.js apps.
                </p>
                <div className="bg-orange-800/20 border-l-4 border-orange-500 p-4 rounded mt-6">
                  <p className="text-sm text-orange-300">
                    💡 <strong>Why This Matters:</strong> You don't have to rewrite your whole app. You can surgically replace performance bottlenecks with Rust.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section id="rust-concepts" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-orange-900/30 border border-orange-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Box className="text-orange-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-orange-300">Key Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-orange-800/30 hover:bg-orange-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-orange-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="/50 p-4 rounded-b-lg border-t-0 border border-orange-500/20 mt-0">
                      <p className="text-orange-200/80 mb-3">{concept.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {concept.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-red-900/30 text-red-300 px-3 py-1 rounded-full">
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

          {/* WASM Setup Section */}
          <section id="wasm-setup" className="mb-12 lg:mb-16">
            <div className="/50 border border-orange-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-orange-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-orange-300">Setting Up Rust for WASM</h2>
              </div>

              <div className="space-y-4 text-orange-200/80 mb-6">
                <p>We'll create a simple Rust function to calculate the Fibonacci sequence recursively—a classic CPU-bound task.</p>
              </div>

              <div className=" rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-orange-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-orange-300 font-mono">src/lib.rs</span>
                  <Code size={16} className="text-orange-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-orange-400">{`use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! This is Rust talking.", name)
}`}</code>
                </pre>
              </div>

              <p className="mt-4 text-orange-200/80">
                  Build this with <code className="text-orange-300">wasm-pack build --target web</code> to generate the necessary glue code.
              </p>
            </div>
          </section>

          {/* Next.js Integration Section */}
          <section id="integration" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-orange-900/30 to-gray-800/50 border border-orange-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-orange-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-orange-300">Integration with Next.js</h2>
              </div>

              <p className="text-orange-200/80 mb-6">
                Now, let's load this WASM module in a Next.js component. We'll use dynamic imports to load the module asynchronously.
              </p>

              <div className=" rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-orange-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-orange-300 font-mono">components/RustCalculator.tsx</span>
                  <Code size={16} className="text-orange-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-blue-400">{`'use client';
import { useEffect, useState } from 'react';
import init, { fibonacci } from '@/pkg/my_rust_lib';

export default function RustCalculator() {
  const [result, setResult] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    init().then(() => setIsReady(true));
  }, []);

  const calculate = () => {
    if (!isReady) return;
    const start = performance.now();
    const res = fibonacci(40);
    const end = performance.now();
    console.log(\`Calculation took \${end - start}ms\`);
    setResult(res);
  };

  return (
    <div>
      <button
        onClick={calculate}
        disabled={!isReady}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Calculate Fib(40) in Rust
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Spring Boot Comparison */}
           <section id="backend-comparison" className="mb-12 lg:mb-16">
            <div className="/50 border border-orange-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="text-orange-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-orange-300">Rust vs Spring Boot</h2>
              </div>

              <div className="space-y-4 text-orange-200/80 mb-6">
                <p>It's important to know when to use what. While Rust via WASM is great for client-side compute, <strong className="text-green-400">Spring Boot</strong> remains the king of enterprise backend services.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
                    <h3 className="font-bold text-orange-300 mb-2">Rust (WASM)</h3>
                    <ul className="list-disc pl-5 text-sm text-orange-200/70 space-y-2">
                        <li>Runs in the browser (Client-side)</li>
                        <li>Zero latency (no network call)</li>
                        <li>Best for image editing, crypto, compression</li>
                        <li>Offloads work from the server</li>
                    </ul>
                </div>
                <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                    <h3 className="font-bold text-green-300 mb-2">Spring Boot (Java)</h3>
                    <ul className="list-disc pl-5 text-sm text-green-200/70 space-y-2">
                        <li>Runs on the server (Backend)</li>
                        <li>Access to databases and private APIs</li>
                        <li>Best for complex business logic, transactions</li>
                        <li>Secure environment for sensitive data</li>
                    </ul>
                </div>
              </div>

              <div className=" rounded-lg overflow-hidden border border-gray-700 mt-6">
                <div className="bg-green-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-green-300 font-mono">Spring Boot Controller (The Traditional Way)</span>
                  <Code size={16} className="text-green-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`@GetMapping("/fibonacci/{n}")
public int getFibonacci(@PathVariable int n) {
    // This runs on the server, adding latency for the network round trip
    return fibService.calculate(n);
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-orange-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security Considerations</h2>
              </div>

              <p className="text-orange-200/80 mb-6">
                WASM is sandboxed, but that doesn't mean it's invulnerable.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Sandboxing', desc: 'WASM cannot access the DOM or network directly; it must go through JS glue code.' },
                  { title: 'Memory Safety', desc: 'Rust prevents buffer overflows, a common vulnerability in C/C++ WASM modules.' },
                  { title: 'Supply Chain', desc: 'Audit your Rust crates just like you audit npm packages.' },
                  { title: 'Side Channels', desc: 'Be aware of timing attacks if performing crypto operations in WASM.' },
                ].map((practice, idx) => (
                  <div key={idx} className="/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-orange-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-2">
                ✅ Rust Integration Checklist
              </h3>
              <p className="text-orange-200/80 mb-6">
                Ready to deploy your first WASM module?
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 /50 hover:/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-orange-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-orange-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-orange-300 line-through' : 'text-orange-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-orange-300 mb-2">
                  Measure Performance
                </h3>
                <p className="text-orange-200/80 mb-0 max-w-xl">
                    Compare your new WASM modules against standard JS. Use our tools to visualize the difference.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
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
             <h2 className="text-2xl font-bold text-orange-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/web-performance-optimization" className="block p-4 bg-orange-900/10 border border-orange-500/20 rounded-lg hover:bg-orange-800/20 transition-all group">
                    <h3 className="font-bold text-orange-200 group-hover:text-white transition-colors">Web Performance</h3>
                    <p className="text-sm text-orange-400/60 mt-2">Optimization strategies beyond WASM.</p>
                </Link>
                <Link href="/blog/typescript-advanced-patterns" className="block p-4 bg-orange-900/10 border border-orange-500/20 rounded-lg hover:bg-orange-800/20 transition-all group">
                    <h3 className="font-bold text-orange-200 group-hover:text-white transition-colors">TypeScript Patterns</h3>
                    <p className="text-sm text-orange-400/60 mt-2">Write better JavaScript code.</p>
                </Link>
                 <Link href="/blog/javascript-async-patterns" className="block p-4 bg-orange-900/10 border border-orange-500/20 rounded-lg hover:bg-orange-800/20 transition-all group">
                    <h3 className="font-bold text-orange-200 group-hover:text-white transition-colors">Async Patterns</h3>
                    <p className="text-sm text-orange-400/60 mt-2">Mastering promises and async/await.</p>
                </Link>
                <Link href="/blog/web-security-essentials" className="block p-4 bg-orange-900/10 border border-orange-500/20 rounded-lg hover:bg-orange-800/20 transition-all group">
                    <h3 className="font-bold text-orange-200 group-hover:text-white transition-colors">Web Security</h3>
                    <p className="text-sm text-orange-400/60 mt-2">Secure your web applications.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="/50 border border-orange-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-orange-300 mb-4">Conclusion</h2>
              <p className="text-orange-200/80 mb-4">
                Rust and WASM are not here to replace JavaScript, but to augment it. By identifying the CPU-intensive parts of your application and moving them to Rust, you can achieve <strong className="text-red-400">performance gains that were previously impossible</strong> in the browser.
              </p>
              <p className="text-orange-200/80">
                Start small. Pick one function, one algorithm, and rewrite it in Rust. The results will speak for themselves.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
