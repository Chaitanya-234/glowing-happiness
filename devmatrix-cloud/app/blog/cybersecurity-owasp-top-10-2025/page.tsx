'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    AlertTriangle, Bug,
    CheckCircle, Circle,
    Code,
    Eye, FileText,
    Lock,
    Menu,
    Shield,
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

// Defining aliases before they are used in sections array
const Key = Lock;
const Settings = AlertTriangle;

export default function OwaspGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Shield },
    { id: 'broken-access', title: 'Broken Access Control', icon: Lock },
    { id: 'crypto-failures', title: 'Crypto Failures', icon: Key },
    { id: 'injection', title: 'Injection', icon: Bug },
    { id: 'insecure-design', title: 'Insecure Design', icon: FileText },
    { id: 'security-misconfig', title: 'Security Misconfig', icon: Settings },
    { id: 'prevention', title: 'Prevention Strategy', icon: Eye },
  ];

  const checklistItems: string[] = [
    'Enforce least privilege access (RBAC)',
    'Use parameterized queries (Prepared Statements)',
    'Encrypt sensitive data at rest and in transit',
    'Validate all inputs (Server-side)',
    'Update dependencies regularly (SCA)',
    'Implement proper error handling (No stack traces)',
    'Enable MFA for all users',
    'Perform regular penetration testing',
  ];

  const concepts: Concept[] = [
    {
      id: 'access-control',
      title: 'Access Control',
      icon: '🚪',
      description: 'Ensuring users can only act on resources they are permitted to. Broken access control is the #1 vulnerability.',
      benefits: ['Data privacy', 'Integrity', 'Compliance']
    },
    {
      id: 'sanitization',
      title: 'Input Sanitization',
      icon: '🧹',
      description: 'Cleaning user input to prevent malicious code injection (XSS, SQLi). Never trust input from the client.',
      benefits: ['Prevention', 'Robustness', 'Safety']
    },
    {
      id: 'encryption',
      title: 'Encryption',
      icon: '🔒',
      description: 'Encoding data so that only authorized parties can access it. Essential for passwords (hashing) and PII.',
      benefits: ['Confidentiality', 'Data protection', 'Trust']
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="Cybersecurity 2025: OWASP Top 10 Prevention"
        description="Stay ahead of hackers. A deep dive into the OWASP Top 10 vulnerabilities in 2025 and how to prevent them in Spring Boot and Next.js."
        datePublished="2025-11-29"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/cybersecurity-owasp-top-10-2025"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-red-600 hover:bg-red-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-red-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-red-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-red-600 text-white'
                        : 'text-red-300 hover:bg-red-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-red-900/30 rounded-lg">
            <div className="text-sm text-red-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-red-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-red-400 leading-tight mb-4 lg:mb-6">
              Cybersecurity 2025: OWASP Top 10 Prevention
            </h1>
            <p className="text-red-200/90 text-base lg:text-lg mb-4">
              Security is not a feature; it's a foundation. Learn how to protect your applications from the most critical risks of 2025.
            </p>
            <div className="flex flex-wrap gap-3 text-red-400 text-xs sm:text-sm">
              <span>📅 November 29, 2025</span>
              <span>•</span>
              <span>⏱️ 35 min read</span>
              <span>•</span>
              <span>🏷️ Cybersecurity</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-red-200/80">
                <p>
                  The OWASP Top 10 is the standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.
                </p>
                <p>
                  In 2025, risks like <strong className="text-red-300">Broken Access Control</strong> and <strong className="text-red-300">Insecure Design</strong> continue to dominate. We will explore how to fix these in a modern stack using <strong className="text-red-300">Spring Boot</strong> and <strong className="text-red-300">Next.js</strong>.
                </p>
                <div className="bg-red-800/20 border-l-4 border-red-500 p-4 rounded mt-6">
                  <p className="text-sm text-red-300">
                    💡 <strong>Why This Matters:</strong> A single vulnerability can lead to data breaches, massive fines, and loss of user trust.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Broken Access Control */}
          <section id="broken-access" className="mb-12 lg:mb-16">
             <div className="bg-gray-800/50 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">A01: Broken Access Control</h2>
              </div>

              <p className="text-red-200/80 mb-6">
                  Occurs when restrictions on what authenticated users are allowed to do are not properly enforced.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-red-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-red-300 font-mono">Vulnerable Code (Java)</span>
                  <Code size={16} className="text-red-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-red-400">{`// Vulnerable: Relies on ID from URL without checking ownership
@GetMapping("/account/{id}")
public Account getAccount(@PathVariable Long id) {
    return accountRepository.findById(id);
}`}</code>
                </pre>
              </div>

               <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-4">
                <div className="bg-green-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-green-300 font-mono">Secure Code (Java)</span>
                  <Code size={16} className="text-green-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`@GetMapping("/account/{id}")
@PreAuthorize("@securityService.isOwner(#id, authentication.name)")
public Account getAccount(@PathVariable Long id) {
    return accountRepository.findById(id);
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Injection */}
          <section id="injection" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/30 to-gray-800/50 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Bug className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">A03: Injection (SQLi)</h2>
              </div>

              <p className="text-red-200/80 mb-6">
                User-supplied data is not validated, filtered, or sanitized by the application.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-red-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-red-300 font-mono">Vulnerable Code (Java)</span>
                  <Code size={16} className="text-red-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-red-400">{`String query = "SELECT * FROM users WHERE name = '" + name + "'";
Statement statement = connection.createStatement();
ResultSet resultSet = statement.executeQuery(query);`}</code>
                </pre>
              </div>

               <div className="mt-4 bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-green-300">
                  💡 <strong>Fix:</strong> Use JPA Repositories or Prepared Statements which handle escaping automatically.
                </p>
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-red-300 mb-4 flex items-center gap-2">
                ✅ Security Checklist
              </h3>
              <p className="text-red-200/80 mb-6">
                Verify your defenses:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-red-300 line-through' : 'text-red-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-red-300 mb-2">
                  Secure Your Data
                </h3>
                <p className="text-red-200/80 mb-0 max-w-xl">
                    Use our tools to generate secure hashes and validate inputs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
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
             <h2 className="text-2xl font-bold text-red-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/web-security-essentials" className="block p-4 bg-red-900/10 border border-red-500/20 rounded-lg hover:bg-red-800/20 transition-all group">
                    <h3 className="font-bold text-red-200 group-hover:text-white transition-colors">Web Security Essentials</h3>
                    <p className="text-sm text-red-400/60 mt-2">The basics of web security.</p>
                </Link>
                <Link href="/blog/jwt-authentication-complete-guide" className="block p-4 bg-red-900/10 border border-red-500/20 rounded-lg hover:bg-red-800/20 transition-all group">
                    <h3 className="font-bold text-red-200 group-hover:text-white transition-colors">JWT Authentication</h3>
                    <p className="text-sm text-red-400/60 mt-2">Secure token handling.</p>
                </Link>
                 <Link href="/blog/nextjs-15-server-actions-guide" className="block p-4 bg-red-900/10 border border-red-500/20 rounded-lg hover:bg-red-800/20 transition-all group">
                    <h3 className="font-bold text-red-200 group-hover:text-white transition-colors">Next.js 15</h3>
                    <p className="text-sm text-red-400/60 mt-2">Secure server actions.</p>
                </Link>
                <Link href="/blog/microservices-architecture-guide" className="block p-4 bg-red-900/10 border border-red-500/20 rounded-lg hover:bg-red-800/20 transition-all group">
                    <h3 className="font-bold text-red-200 group-hover:text-white transition-colors">Microservices</h3>
                    <p className="text-sm text-red-400/60 mt-2">Securing distributed systems.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-gray-800/50 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-red-300 mb-4">Conclusion</h2>
              <p className="text-red-200/80 mb-4">
                Security is an ongoing process, not a one-time fix. The OWASP Top 10 provides a roadmap, but you must be vigilant.
              </p>
              <p className="text-red-200/80">
                By integrating security checks into your CI/CD pipeline and following secure coding practices in Spring Boot and Next.js, you can build applications that are <strong className="text-orange-400">resilient by design</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
