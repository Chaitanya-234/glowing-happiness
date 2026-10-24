'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code,
    GitGraph,
    Layers,
    Menu,
    Network,
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

export default function GraphQLFederationGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Network },
    { id: 'what-is-federation', title: 'What is Federation?', icon: Layers },
    { id: 'subgraph-setup', title: 'Building Subgraphs', icon: Code },
    { id: 'gateway-setup', title: 'The Gateway (Apollo)', icon: GitGraph },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'frontend-usage', title: 'Next.js Client', icon: Zap },
  ];

  const checklistItems: string[] = [
    'Define entities in schema (e.g., @key)',
    'Implement subgraph resolvers (Spring Boot / Node)',
    'Set up Apollo Router/Gateway',
    'Configure schema registry (Apollo Studio)',
    'Implement query depth limiting',
    'Set up authentication (JWT) on Gateway',
    'Optimize resolver performance (N+1 problem)',
    'Monitor latency per subgraph',
  ];

  const concepts: Concept[] = [
    {
      id: 'subgraph',
      title: 'Subgraph',
      icon: '📦',
      description: 'An individual GraphQL service that is part of the federated graph. It owns a specific domain (e.g., Users, Products).',
      benefits: ['Decoupling', 'Team autonomy', 'Scalability']
    },
    {
      id: 'supergraph',
      title: 'Supergraph',
      icon: '🌐',
      description: 'The unified graph composed of all subgraphs. Clients query this single endpoint, unaware of the underlying complexity.',
      benefits: ['Single endpoint', 'Unified schema', 'Simplified client']
    },
    {
      id: 'entity',
      title: 'Entity',
      icon: '🔑',
      description: 'A type that can be referenced across subgraphs. For example, a `User` entity defined in the Identity Service can be extended in the Reviews Service.',
      benefits: ['Data connection', 'Schema extension', 'Graph coherence']
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900/20 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="GraphQL Federation with Apollo: Scaling Graphs"
        description="Learn how to scale your API layer using GraphQL Federation. Combine Spring Boot and Node.js services into a unified supergraph."
        datePublished="2025-11-28"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/graphql-federation-apollo-guide"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-pink-600 hover:bg-pink-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-pink-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-pink-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-pink-600 text-white'
                        : 'text-pink-300 hover:bg-pink-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-pink-900/30 rounded-lg">
            <div className="text-sm text-pink-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-pink-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 leading-tight mb-4 lg:mb-6">
              GraphQL Federation with Apollo: Scaling Graphs
            </h1>
            <p className="text-pink-200/90 text-base lg:text-lg mb-4">
              Microservices are great, but managing their APIs can be a nightmare. Learn how Federation unites them into a single, cohesive graph.
            </p>
            <div className="flex flex-wrap gap-3 text-pink-400 text-xs sm:text-sm">
              <span>📅 November 28, 2025</span>
              <span>•</span>
              <span>⏱️ 28 min read</span>
              <span>•</span>
              <span>🏷️ API Design</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Network className="text-pink-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-pink-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-pink-200/80">
                <p>
                  In a monolithic architecture, a single GraphQL server handles everything. But as your team grows, this becomes a bottleneck. You split into microservices, but now your client has to query five different endpoints.
                </p>
                <p>
                  <strong className="text-pink-300">GraphQL Federation</strong> solves this. It allows you to build a distributed graph where each service (subgraph) owns a piece of the data, but they are all exposed via a single Gateway.
                </p>
                <div className="bg-pink-800/20 border-l-4 border-pink-500 p-4 rounded mt-6">
                  <p className="text-sm text-pink-300">
                    💡 <strong>Why This Matters:</strong> You get the organizational benefits of microservices with the simplicity of a monolithic API for the frontend.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section id="what-is-federation" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-pink-900/30 border border-pink-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-pink-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-pink-300">Key Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-pink-800/30 hover:bg-pink-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-pink-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="bg-gray-900/50 p-4 rounded-b-lg border-t-0 border border-pink-500/20 mt-0">
                      <p className="text-pink-200/80 mb-3">{concept.description}</p>
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

          {/* Subgraph Setup Section */}
          <section id="subgraph-setup" className="mb-12 lg:mb-16">
             <div className="bg-gray-800/50 border border-pink-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-pink-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-pink-300">Building a Subgraph</h2>
              </div>

              <p className="text-pink-200/80 mb-6">
                  Let's look at a Java (Spring Boot) subgraph using `dgs-framework` (Netflix's DGS).
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-pink-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-pink-300 font-mono">schema.graphqls</span>
                  <Code size={16} className="text-pink-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-pink-400">{`type User @key(fields: "id") {
  id: ID!
  username: String
  email: String
}

type Query {
  users: [User]
}`}</code>
                </pre>
              </div>

               <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-4">
                <div className="bg-pink-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-pink-300 font-mono">UserFetcher.java</span>
                  <Code size={16} className="text-pink-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-pink-400">{`@DgsComponent
public class UserFetcher {

    @DgsEntityFetcher(name = "User")
    public User user(Map<String, Object> values) {
        String id = (String) values.get("id");
        return userService.findById(id);
    }
}
`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Gateway Setup Section */}
          <section id="gateway-setup" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-pink-900/30 to-gray-800/50 border border-pink-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <GitGraph className="text-pink-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-pink-300">The Gateway (Apollo Router)</h2>
              </div>

              <p className="text-pink-200/80 mb-6">
                The gateway sits in front of your subgraphs. In 2025, the standard is the <strong className="text-pink-300">Apollo Router</strong>, a high-performance Rust binary.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">supergraph.yaml</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-purple-400">{`federation_version: 2.0
subgraphs:
  users:
    routing_url: http://users-service:8080/graphql
    schema:
      file: ./subgraphs/users.graphql
  reviews:
    routing_url: http://reviews-service:4000/graphql
    schema:
      file: ./subgraphs/reviews.graphql`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-pink-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security Considerations</h2>
              </div>

              <p className="text-pink-200/80 mb-6">
                Centralizing access points introduces risks.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Authentication', desc: 'Authenticate at the Gateway. Pass user context (e.g., headers) to subgraphs.' },
                  { title: 'Query Depth', desc: 'Limit query depth to prevent DoS attacks (nested queries).' },
                  { title: 'Introspection', desc: 'Disable introspection in production to hide schema details.' },
                  { title: 'Private Subgraphs', desc: 'Ensure subgraphs are not directly accessible from the public internet.' },
                ].map((practice, idx) => (
                  <div key={idx} className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-pink-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                ✅ Federation Checklist
              </h3>
              <p className="text-pink-200/80 mb-6">
                Ready to federate?
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-pink-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-pink-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-pink-300 line-through' : 'text-pink-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-pink-300 mb-2">
                  Test Your Queries
                </h3>
                <p className="text-pink-200/80 mb-0 max-w-xl">
                    Use our tools to format and validate your GraphQL queries.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
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
             <h2 className="text-2xl font-bold text-pink-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/graphql-vs-rest-comparison" className="block p-4 bg-pink-900/10 border border-pink-500/20 rounded-lg hover:bg-pink-800/20 transition-all group">
                    <h3 className="font-bold text-pink-200 group-hover:text-white transition-colors">GraphQL vs REST</h3>
                    <p className="text-sm text-pink-400/60 mt-2">The basics of GraphQL.</p>
                </Link>
                <Link href="/blog/microservices-architecture-guide" className="block p-4 bg-pink-900/10 border border-pink-500/20 rounded-lg hover:bg-pink-800/20 transition-all group">
                    <h3 className="font-bold text-pink-200 group-hover:text-white transition-colors">Microservices</h3>
                    <p className="text-sm text-pink-400/60 mt-2">Architecting for scale.</p>
                </Link>
                 <Link href="/blog/web-security-essentials" className="block p-4 bg-pink-900/10 border border-pink-500/20 rounded-lg hover:bg-pink-800/20 transition-all group">
                    <h3 className="font-bold text-pink-200 group-hover:text-white transition-colors">Web Security</h3>
                    <p className="text-sm text-pink-400/60 mt-2">Protecting your API.</p>
                </Link>
                <Link href="/blog/database-optimization-guide" className="block p-4 bg-pink-900/10 border border-pink-500/20 rounded-lg hover:bg-pink-800/20 transition-all group">
                    <h3 className="font-bold text-pink-200 group-hover:text-white transition-colors">Database Optimization</h3>
                    <p className="text-sm text-pink-400/60 mt-2">Solving the N+1 problem.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-gray-800/50 border border-pink-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-pink-300 mb-4">Conclusion</h2>
              <p className="text-pink-200/80 mb-4">
                GraphQL Federation is the architecture of choice for enterprise graphs. It enables teams to work independently while presenting a unified face to the client.
              </p>
              <p className="text-pink-200/80">
                While it adds operational complexity (maintaining a Gateway), the benefits in <strong className="text-purple-400">developer velocity and client simplicity</strong> are unmatched for large-scale systems.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
