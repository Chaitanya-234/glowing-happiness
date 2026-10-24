'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    Brain,
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code,
    Cpu,
    Database,
    Layout,
    Menu,
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

export default function AiAgentsGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  const sections: Section[] = [
    { id: 'intro', title: 'Introduction', icon: Brain },
    { id: 'agent-architecture', title: 'Agent Architecture', icon: Layout },
    { id: 'langchain-setup', title: 'LangChain Setup', icon: Code },
    { id: 'spring-boot-tools', title: 'Spring Boot Tools', icon: Database },
    { id: 'memory-context', title: 'Memory & Context', icon: Cpu },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'future', title: 'The Future of Agents', icon: Zap },
  ];

  const checklistItems: string[] = [
    'Define agent scope and capabilities',
    'Set up OpenAI/Anthropic API keys securely',
    'Initialize LangChain in Next.js',
    'Build backend tools in Spring Boot',
    'Implement vector database for memory',
    'Test prompt effectiveness (Prompt Engineering)',
    'Implement rate limiting and cost tracking',
    'Add guardrails for output validation',
  ];

  const concepts: Concept[] = [
    {
      id: 'autonomy',
      title: 'Autonomy vs. Automation',
      icon: '🤖',
      description: 'Unlike traditional automation scripts that follow a rigid path, autonomous agents can reason, plan, and adapt to new information to achieve a goal.',
      benefits: ['Adaptability', 'Complex problem solving', 'Reduced human oversight']
    },
    {
      id: 'rag',
      title: 'RAG (Retrieval-Augmented Generation)',
      icon: '📚',
      description: 'Agents use RAG to fetch relevant data from your knowledge base, ensuring responses are accurate, up-to-date, and context-aware.',
      benefits: ['Reduced hallucinations', 'Private data access', 'Contextual relevance']
    },
    {
      id: 'tools',
      title: 'Tool Use (Function Calling)',
      icon: '🛠️',
      description: 'Agents can interact with the outside world (APIs, databases, file systems) by calling defined functions or "tools" to perform actions.',
      benefits: ['Real-world interaction', 'API integration', 'Action execution']
    },
    {
      id: 'memory',
      title: 'Long-term Memory',
      icon: '🧠',
      description: 'Vector databases allow agents to store and retrieve past interactions, enabling them to "remember" user preferences and previous tasks.',
      benefits: ['Personalization', 'Context retention', 'Continuous learning']
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="Building Autonomous AI Agents with LangChain & Next.js"
        description="Learn how to build powerful autonomous AI agents using LangChain, Next.js, and Spring Boot. A complete guide for 2025."
        datePublished="2025-11-20"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/building-ai-agents-langchain-nextjs"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-purple-600 hover:bg-purple-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-purple-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-purple-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-300 hover:bg-purple-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-purple-900/30 rounded-lg">
            <div className="text-sm text-purple-300 mb-2">Checklist Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-green-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-purple-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 leading-tight mb-4 lg:mb-6">
              Building Autonomous AI Agents with LangChain & Next.js
            </h1>
            <p className="text-purple-300/90 text-base lg:text-lg mb-4">
              Step into the future of software development by building intelligent agents that can plan, reason, and execute tasks autonomously.
            </p>
            <div className="flex flex-wrap gap-3 text-purple-400 text-xs sm:text-sm">
              <span>📅 November 20, 2025</span>
              <span>•</span>
              <span>⏱️ 25 min read</span>
              <span>•</span>
              <span>🏷️ AI & Automation</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Introduction</h2>
              </div>
              <div className="space-y-4 text-purple-200/80">
                <p>
                  It's 2025, and the era of static chatbots is over. We are now in the age of <strong className="text-purple-300">Autonomous AI Agents</strong>—systems that don't just talk, but <em>do</em>. From booking flights to debugging code, agents are rewriting the rules of software interaction.
                </p>
                <p>
                  In this guide, we'll build a production-ready AI agent using <strong className="text-green-400">Next.js 16</strong> for the frontend and <strong className="text-green-400">LangChain</strong> for the cognitive architecture, backed by robust <strong className="text-green-400">Spring Boot</strong> microservices.
                </p>
                <div className="bg-purple-800/20 border-l-4 border-purple-500 p-4 rounded mt-6">
                  <p className="text-sm text-purple-300">
                    💡 <strong>Why This Matters:</strong> By combining the reactivity of Next.js with the enterprise stability of Spring Boot, you can create agents that are both user-friendly and incredibly powerful.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section id="agent-architecture" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Layout className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Core Concepts</h2>
              </div>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-purple-800/30 hover:bg-purple-800/50 p-4 rounded-lg transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{concept.icon}</span>
                      <span className="font-semibold text-purple-300">{concept.title}</span>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="bg-gray-900/50 p-4 rounded-b-lg border-t-0 border border-purple-500/20 mt-0">
                      <p className="text-purple-200/80 mb-3">{concept.description}</p>
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

          {/* LangChain Setup Section */}
          <section id="langchain-setup" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Setting Up LangChain in Next.js</h2>
              </div>

              <div className="space-y-4 text-purple-200/80 mb-6">
                <p>First, let's initialize our agent in a Next.js API route. We'll use the <code>langchain</code> library to create an executor that can use tools.</p>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">app/api/agent/route.ts</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`import { ChatOpenAI } from '@langchain/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { SerpAPI } from '@langchain/community/tools/serpapi';
import { Calculator } from 'langchain/tools/calculator';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-4-turbo'
  });

  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY),
    new Calculator(),
  ];

  const executor = await initializeAgentExecutorWithOptions(
    tools,
    model,
    {
      agentType: 'openai-functions',
      verbose: true,
    }
  );

  const result = await executor.call({ input: prompt });

  return Response.json({ output: result.output });
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Spring Boot Tools Section */}
          <section id="spring-boot-tools" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-purple-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-purple-300">Backend Tools with Spring Boot</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                Real-world agents need access to business logic. Here's how to expose a Spring Boot service as a tool for your AI agent.
              </p>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-purple-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-mono">CustomerService.java</span>
                  <Code size={16} className="text-purple-400" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-green-400">{`@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, String>> getCustomerStatus(@PathVariable String id) {
        // AI Agent will call this endpoint
        String status = customerService.getStatus(id);

        return ResponseEntity.ok(Map.of(
            "customerId", id,
            "status", status,
            "lastActive", LocalDateTime.now().toString()
        ));
    }
}

// Ensure you document this endpoint with OpenAPI/Swagger
// so LangChain can automatically ingest the tool definition!`}</code>
                </pre>
              </div>

              <div className="mt-6 bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-green-300">
                  💡 <strong>Pro Tip:</strong> Use Spring Boot's actuator endpoints to monitor how often your AI agents are querying your backend services to prevent overload.
                </p>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-red-900/20 to-purple-900/30 border border-red-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-red-300">Security: Protecting Your Agents</h2>
              </div>

              <p className="text-purple-200/80 mb-6">
                Giving an AI autonomy comes with risks. Prompt injection and data leakage are real threats.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Prompt Injection Defense', desc: 'Validate all user inputs. Treat LLM output as untrusted.' },
                  { title: 'Rate Limiting', desc: 'Prevent abuse by limiting requests per user via Redis or API Gateway.' },
                  { title: 'Human-in-the-Loop', desc: 'Require human approval for high-stakes actions (e.g., deleting data).' },
                  { title: 'Secret Management', desc: 'Never hardcode API keys. Use environment variables.' },
                ].map((practice, idx) => (
                  <div key={idx} className="bg-gray-900/50 p-4 rounded-lg border border-red-500/20">
                    <h3 className="font-semibold text-red-300 mb-2">🔒 {practice.title}</h3>
                    <p className="text-sm text-purple-200/70">{practice.desc}</p>
                  </div>
                ))}
              </div>

               <div className="mt-6 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-red-900/30 px-4 py-2 flex items-center justify-between">
                  <span className="text-sm text-red-300 font-mono">Insecure vs Secure</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 border-r border-gray-700">
                        <h4 className="text-red-400 font-bold mb-2">❌ Insecure</h4>
                        <code className="text-xs text-gray-400">
                            const result = await agent.run(userInput);<br/>
                            // No validation, direct execution
                        </code>
                    </div>
                    <div className="p-4">
                        <h4 className="text-green-400 font-bold mb-2">✅ Secure</h4>
                        <code className="text-xs text-gray-400">
                            if (containsMaliciousContent(userInput)) throw Error;<br/>
                            const result = await agent.run(userInput);
                        </code>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-green-900/30 to-purple-900/30 border border-green-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
                ✅ Agent Readiness Checklist
              </h3>
              <p className="text-purple-200/80 mb-6">
                Ensure your AI agent is ready for production:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-green-300 line-through' : 'text-purple-200'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-900/30 to-green-900/30 border border-purple-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-2">
                  Ready to Supercharge Your Workflow?
                </h3>
                <p className="text-purple-200/80 mb-0 max-w-xl">
                    Explore our suite of developer tools designed to help you build, test, and deploy faster. From regex testing to format conversion, we have you covered.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                    href="/tools"
                    className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
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
             <h2 className="text-2xl font-bold text-purple-300 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/autonomous-ai-agents-2025-business-life" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">Business Impact of AI Agents</h3>
                    <p className="text-sm text-purple-400/60 mt-2">How agents are changing the business landscape in 2025.</p>
                </Link>
                <Link href="/blog/ai-powered-code-review-spring-boot-openai" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">AI Code Reviews</h3>
                    <p className="text-sm text-purple-400/60 mt-2">Building automated code review systems with Spring Boot.</p>
                </Link>
                 <Link href="/blog/zero-downtime-springboot-aws-eb" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">Zero Downtime Deployment</h3>
                    <p className="text-sm text-purple-400/60 mt-2">Deploying your backend services reliability.</p>
                </Link>
                <Link href="/blog/web-security-essentials" className="block p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 transition-all group">
                    <h3 className="font-bold text-purple-200 group-hover:text-white transition-colors">Web Security Essentials</h3>
                    <p className="text-sm text-purple-400/60 mt-2">Protecting your AI agents and applications.</p>
                </Link>
             </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-purple-300 mb-4">Conclusion</h2>
              <p className="text-purple-200/80 mb-4">
                Building autonomous agents with LangChain, Next.js, and Spring Boot is not just a technical exercise—it's a gateway to the next generation of software.
              </p>
              <p className="text-purple-200/80">
                By following this guide, you've learned the architecture, setup, and security considerations needed to deploy agents that create real value. As we move further into 2025, the ability to build and manage these agents will be a <strong className="text-green-400">critical skill for every full-stack developer</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
