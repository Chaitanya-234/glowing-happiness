'use client';

import AdContainer from '@/components/AdContainer';
import JsonLdArticle from '@/components/JsonLdArticle';
import {
    Braces,
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code,
    GitBranch,
    Menu,
    Shield,
    Type,
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

export default function AdvancedTsGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Type },
    { id: 'generics', title: 'Generics Deep Dive', icon: Code },
    { id: 'conditional-types', title: 'Conditional Types', icon: GitBranch },
    { id: 'mapped-types', title: 'Mapped Types', icon: Braces },
    { id: 'template-literals', title: 'Template Literals', icon: Type },
    { id: 'backend-types', title: 'Java Interop', icon: Zap },
    { id: 'security', title: 'Type Safety & Security', icon: Shield },
  ];

  const checklistItems: string[] = [
    'Enable strict mode in tsconfig.json',
    'Replace any use of "any" with "unknown" or specific types',
    'Use utility types (Pick, Omit, Partial)',
    'Implement type guards for runtime validation',
    'Use Zod for schema validation at I/O boundaries',
    'Generate types from backend (OpenAPI/Swagger)',
    'Use discriminated unions for state management',
    'Audit third-party type definitions',
  ];

  const concepts: Concept[] = [
    {
      id: 'inference',
      title: 'Type Inference',
      icon: '🧠',
      description: 'TypeScript is smart enough to deduce types from context. You don\'t always need to annotate everything.',
      benefits: ['Cleaner code', 'Less boilerplate', 'Safety maintained']
    },
    {
      id: 'narrowing',
      title: 'Type Narrowing',
      icon: '🔎',
      description: 'The process of refining a broader type (like `string | null`) into a more specific one (like `string`) using control flow analysis.',
      benefits: ['Runtime safety', 'Precise logic', 'Bug prevention']
    },
    {
      id: 'brands',
      title: 'Branded Types',
      icon: '🏷️',
      description: 'A technique to create nominal typing in TypeScript\'s structural type system, ensuring that two strings with different meanings (e.g., UserId vs OrderId) cannot be mixed.',
      benefits: ['Domain safety', 'Intent clarity', 'Bug prevention']
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="Advanced TypeScript Patterns: Conditional Types & More"
        description="Level up your TypeScript skills with advanced patterns. Master conditional types, mapped types, and learn how to type-safe your full stack."
        datePublished="2025-11-25"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/advanced-typescript-patterns-conditional-types"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-blue-600 hover:bg-blue-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-blue-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-blue-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-300 hover:bg-blue-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-blue-900/30 rounded-lg">
            <div className="text-sm text-blue-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-blue-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 leading-tight mb-4 lg:mb-6">
              Advanced TypeScript Patterns: Conditional Types & More
            </h1>
            <p className="text-blue-200/90 text-base lg:text-lg mb-4">
              Stop fighting the compiler and start making it work for you. Discover the power of TypeScript's advanced type system features.
            </p>
            <div className="flex flex-wrap gap-3 text-blue-400 text-xs sm:text-sm">
              <span>📅 November 25, 2025</span>
              <span>•</span>
              <span>⏱️ 25 min read</span>
              <span>•</span>
              <span>🏷️ TypeScript</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Type className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-blue-200/80">
                <p>
                  Most developers use TypeScript for basic type checking: `string`, `number`, `interface`. But TypeScript is a Turing-complete language in its own right—at the type level.
                </p>
                <p>
                  In 2025, libraries like Next.js, Zod, and tRPC rely heavily on advanced patterns to provide that "magic" developer experience. Understanding <strong className="text-blue-300">conditional types</strong>, <strong className="text-blue-300">mapped types</strong>, and <strong className="text-blue-300">generics</strong> will take you from a user of tools to a creator of them.
                </p>
                <div className="bg-blue-800/20 border-l-4 border-blue-500 p-4 rounded mt-6">
                  <p className="text-sm text-blue-300">
                    💡 <strong>Why This Matters:</strong> Better types mean fewer bugs, better autocomplete, and more maintainable codebases.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section id="generics" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Key Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-blue-800/30 hover:bg-blue-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-blue-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="bg-gray-900/50 p-4 rounded-b-lg border-t-0 border border-blue-500/20 mt-0">
                      <p className="text-blue-200/80 mb-3">{concept.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {concept.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full">
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
          <AdContainer
                  slot="5535154789"
                  format="horizontal"
                  label="Advertisement"
                  className="max-w-7xl mx-auto px-4 pt-8"
                />

          {/* Conditional Types */}
          <section id="conditional-types" className="mb-12 lg:mb-16">
             <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Conditional Types</h2>
              </div>

              <p className="text-blue-200/80 mb-6">
                  Think of this as a ternary operator for types: `T extends U ? X : Y`.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-blue-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-blue-300 font-mono">example.ts</span>
                  <Code size={16} className="text-blue-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-indigo-400">{`type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Utility: Extract the return type of a function
// (This is how the built-in ReturnType works!)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "Alice" };
}

type User = MyReturnType<typeof getUser>;
// User is { id: number; name: string; }`}</code>
                </pre>
              </div>
            </div>
          </section>

          <AdContainer
                  slot="5535154789"
                  format="horizontal"
                  label="Advertisement"
                  className="max-w-7xl mx-auto px-4 pt-8"
                />

          {/* Mapped Types */}
          <section id="mapped-types" className="mb-12 lg:mb-16">
             <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Braces className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Mapped Types</h2>
              </div>

              <p className="text-blue-200/80 mb-6">
                  Mapped types allow you to create new types by iterating over properties of an existing type.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-blue-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-blue-300 font-mono">mapped.ts</span>
                  <Code size={16} className="text-blue-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-indigo-400">{`type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

// Result: { darkMode: boolean; newUserProfile: boolean; }
type FeatureOptions = OptionsFlags<FeatureFlags>;

// Modifiers: Removes 'readonly' and '?'
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property];
};`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Backend Interop */}
          <section id="backend-types" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-blue-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-300">Backend Interoperability</h2>
              </div>

              <p className="text-blue-200/80 mb-6">
                TypeScript works best when it mirrors your backend data structures accurately. When working with <strong className="text-green-400">Spring Boot</strong>, use tools like Swagger Codegen to generate interfaces.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-green-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-green-300 font-mono">Spring Boot DTO (Java)</span>
                  <Code size={16} className="text-green-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`public class ApiResponse<T> {
    private T data;
    private String error;
    private boolean success;
    // ...
}`}</code>
                </pre>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-4">
                <div className="bg-blue-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-blue-300 font-mono">Matching TypeScript Interface</span>
                  <Code size={16} className="text-blue-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-indigo-400">{`// Generic Wrapper
interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}

interface User {
  id: number;
  name: string;
}

// Usage
async function fetchUser(): Promise<ApiResponse<User>> {
   // ...
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-blue-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security & Type Safety</h2>
              </div>

              <p className="text-blue-200/80 mb-6">
                Types are removed at runtime, so they don't provide security by themselves. You must validate data at runtime.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Runtime Validation', desc: 'Use libraries like Zod or Yup to validate API responses against expected types.' },
                  { title: 'Type Guards', desc: 'Write functions that check types at runtime to narrow unions safely.' },
                  { title: 'No Implicit Any', desc: 'Ensure "noImplicitAny" is true in tsconfig to catch type holes.' },
                  { title: 'Sanitization', desc: 'Types don\'t stop XSS. Always sanitize user input before rendering.' },
                ].map((practice, idx) => (
                  <div key={idx} className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-blue-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <AdContainer
                  slot="9445539624"
                  format="horizontal"
                  label="Advertisement"
                  className="max-w-7xl mx-auto px-4 pt-8"
                />
          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                ✅ Type Safety Checklist
              </h3>
              <p className="text-blue-200/80 mb-6">
                Audit your codebase:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-blue-300 line-through' : 'text-blue-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-blue-300 mb-2">
                  Test Your Types
                </h3>
                <p className="text-blue-200/80 mb-0 max-w-xl">
                    Use our tools to validate JSON schemas or generate types from data.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
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
          <AdContainer
                  slot="5535154789"
                  format="horizontal"
                  label="Advertisement"
                  className="max-w-7xl mx-auto px-4 pt-8"
                />
             <h2 className="text-2xl font-bold text-blue-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/typescript-advanced-patterns" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">More TS Patterns</h3>
                    <p className="text-sm text-blue-400/60 mt-2">Continue your learning journey.</p>
                </Link>
                <Link href="/blog/complete-guide-json-validation" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">JSON Validation</h3>
                    <p className="text-sm text-blue-400/60 mt-2">Validating data structures.</p>
                </Link>
                 <Link href="/blog/nextjs-15-server-actions-guide" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">Next.js 15</h3>
                    <p className="text-sm text-blue-400/60 mt-2">Using types in Server Actions.</p>
                </Link>
                <Link href="/blog/web-security-essentials" className="block p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg hover:bg-blue-800/20 transition-all group">
                    <h3 className="font-bold text-blue-200 group-hover:text-white transition-colors">Web Security</h3>
                    <p className="text-sm text-blue-400/60 mt-2">Security beyond types.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-gray-800/50 border border-blue-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-blue-300 mb-4">Conclusion</h2>
              <p className="text-blue-200/80 mb-4">
                Advanced TypeScript features might look intimidating at first, but they are powerful tools for building robust, self-documenting codebases.
              </p>
              <p className="text-blue-200/80">
                By investing time in learning these patterns, you enable your team to catch bugs earlier and iterate faster. <strong className="text-indigo-400">Type safety is a spectrum—aim for the high end.</strong>
              </p>
            </div>
          </section>
          <AdContainer
                            slot="9445539624"
                            format="horizontal"
                            label="Advertisement"
                            className="max-w-7xl mx-auto px-4 pt-8"
                          />
        </div>
      </main>
    </div>
  );
}
