'use client';
import { useTheme } from '@/components/providers/ThemeProvider';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    ArrowRight,
    BookOpen,
    CheckCircle, Circle,
    Cpu,
    Globe,
    Layers,
    Menu,
    Network,
    Search,
    Target,
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

const sections: Section[] = [
  { id: 'intro', title: 'Introduction', icon: Search },
  { id: 'shift', title: 'Retrieval to Synthesis', icon: Network },
  { id: 'theoretical-framework', title: 'Theoretical Framework', icon: BookOpen },
  { id: 'geo', title: 'What is GEO?', icon: Target },
  { id: 'architecture', title: 'Search Engine Architecture', icon: Layers },
  { id: 'comparison', title: 'Model Comparison', icon: CheckCircle },
  { id: 'ecosystem', title: 'Web Ecosystem Impact', icon: Globe },
  { id: 'future', title: 'Future of Search', icon: Cpu },
];

const checklistItems: string[] = [
  'Audit content for "Answer Engine" readiness (Direct answers)',
  'Implement structured data (Schema.org) rigorously',
  'Optimize for "Zero-Click" searches (Brand visibility)',
  'Focus on "Information Gain" not just keyword density',
  'Monitor traffic from AI referrers (Perplexity, ChatGPT)',
  'Diversify traffic sources beyond Google Search',
  'Build a strong brand entity in Knowledge Graphs',
  'Test content against RAG retrieval (Vector similarity)',
];

export default function AiSearchGuide() {
  const { currentTheme: theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
  }, []);

  const toggleChecklist = (index: number): void => {
    setChecklist(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;

  return (
    <div className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="The Death of SEO: Rise of AI Search Engines (Perplexity, SearchGPT)"
        description="Google is no longer the only gatekeeper. Explore how AI Search Engines, RAG, and GEO are rewriting the rules of the web."
        datePublished="2026-01-20"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/ai-search-engines-perplexity-searchgpt-seo-death"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1  z-[100]">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-orange-500 transition-all duration-300"
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
      <nav className={`fixed top-0 left-0 h-full /95 backdrop-blur-sm border-r border-purple-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
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
            <div className="text-sm text-purple-300 mb-2">Optimization Score</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2  rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-orange-500 transition-all duration-300"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-6 border border-purple-500/30">
              <Search size={16} />
              <span>The End of &quot;10 Blue Links&quot;</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-orange-400 to-red-400 leading-tight mb-4 lg:mb-6">
              The Death of SEO: Rise of AI Search Engines (Perplexity, SearchGPT)
            </h1>
            <p className="text-purple-200/90 text-base lg:text-lg mb-8 leading-relaxed max-w-2xl">
              For 25 years, we optimized for keywords and backlinks. Now, we must optimize for embeddings and attention. Discover the technical architecture of Perplexity and SearchGPT, and why &quot;SEO&quot; is becoming &quot;GEO&quot; (Generative Engine Optimization).
            </p>
            <div className="flex flex-wrap gap-4 text-purple-400 text-xs sm:text-sm border-t border-purple-500/20 pt-6">
              <span className="flex items-center gap-1"><Zap size={14}/> Published: January 20, 2026</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><Target size={14}/> 60 min read</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><Cpu size={14}/> Search & RAG</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="prose prose-lg prose-invert max-w-none text-gray-300">
              <p className="lead text-xl text-purple-100/90">
                The internet is undergoing its most significant structural shift since the invention of the search engine. For two decades, the contract was simple: Google crawls your content, indexes it, and in exchange for your data, sends you traffic. It was a symbiosis.
              </p>
              <p>
                That contract is broken.
              </p>
              <p>
                The rise of <strong>AI Search Engines</strong>—like Perplexity, OpenAI&apos;s SearchGPT, and Google&apos;s own AI Overviews—has replaced &quot;Retrieval&quot; with &quot;Synthesis.&quot; Users no longer want a list of links to hunt through; they want an answer.
              </p>
              <p>
                This isn&apos;t just a UI change. It is a fundamental architectural shift in how information is discovered, processed, and consumed. When an LLM reads your website and synthesizes the answer for the user directly on the search results page (SERP), the click—the lifeblood of the open web—disappears.
              </p>
            </div>
          </section>

          {/* Shift */}
          <section id="shift" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-gradient-to-r from-purple-900/40 to-orange-900/40 border border-purple-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Network className="text-purple-400" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white m-0">Retrieval to Synthesis</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p>
                  Traditional search is a <strong>Retrieval</strong> problem. Given a query <code>q</code> and a document set <code>D</code>, find the subset <code>d &isin; D</code> that is most relevant. The cognitive load of extracting the answer is placed on the user.
                </p>
                <p>
                  AI Search is a <strong>Synthesis</strong> problem. Given a query <code>q</code>, retrieval is just the first step (the context). The real work is <strong>Generation</strong>: <code>Answer = LLM(q, Retrieved_Docs)</code>. The cognitive load is offloaded to the AI.
                </p>

                <h3 className="text-xl font-semibold text-purple-300">The New Funnel</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                   <div className="/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-orange-400 block mb-2">Old SEO Funnel</strong>
                    <p className="text-sm">Search Query &rarr; 10 Blue Links &rarr; User Clicks &rarr; User Reads &rarr; Conversion.</p>
                  </div>
                  <div className="/50 p-4 rounded-xl border border-gray-700">
                    <strong className="text-orange-400 block mb-2">New AI Funnel</strong>
                    <p className="text-sm">Search Query &rarr; AI Synthesis (Zero Click) &rarr; Citation (Maybe) &rarr; User Clicks (Rarely).</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Theoretical Framework */}
           <section id="theoretical-framework" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-purple-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Theoretical Framework</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6">
                <p>
                  To survive in this new ecosystem, developers and marketers must understand the engineering under the hood. AI Search engines are essentially massive, web-scale <strong>RAG (Retrieval-Augmented Generation)</strong> applications.
                </p>

                <h3 className="text-2xl text-purple-200 mt-8">1. The Answer Engine Pipeline</h3>
                <p>
                  The architecture of a system like Perplexity differs significantly from Google&apos;s PageRank.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Query Understanding:</strong> The user&apos;s query is not just matched against keywords. It is re-written and decomposed. A query like &quot;best running shoes for flat feet under $100&quot; might be broken into sub-queries: &quot;running shoes for flat feet,&quot; &quot;running shoes under $100,&quot; &quot;reviews 2025.&quot;</li>
                    <li><strong>Hybrid Retrieval:</strong> The system performs two types of searches simultaneously:
                        <ul className="list-circle pl-6 mt-1 text-sm text-gray-400">
                            <li><strong>Dense Retrieval:</strong> Using vector embeddings (like OpenAI&apos;s `text-embedding-3-small` or bespoke models) to find conceptually related content.</li>
                            <li><strong>Sparse Retrieval:</strong> Traditional BM25 keyword matching to find exact terms (like specific product names).</li>
                        </ul>
                    </li>
                    <li><strong>Re-Ranking:</strong> The retrieved documents (often hundreds) are passed through a Cross-Encoder Re-ranker (like BERT) to score them by relevance to the specific question. Only the top N (e.g., top 10) are passed to the context window.</li>
                    <li><strong>Generation & Citation:</strong> The LLM generates the answer, but with a constraint: it must cite its sources. This is often enforced via <strong>constrained decoding</strong> or specialized fine-tuning that penalizes uncited claims.</li>
                </ul>

                <h3 className="text-2xl text-purple-200 mt-8">2. Vector Space vs. Inverted Index</h3>
                <p>
                  Traditional SEO optimized for the <strong>Inverted Index</strong>. If you wanted to rank for &quot;best pizza,&quot; you put &quot;best pizza&quot; in your title tag.
                </p>
                <p>
                  AI Search optimizes for <strong>Vector Space</strong>. Your content is converted into a high-dimensional vector <code>v</code>. When a user queries, their query is also converted to a vector <code>q</code>. The system finds documents where <code>CosineSimilarity(v, q)</code> is high.
                </p>
                <p>
                  <strong>Theoretical implication:</strong> Keywords matter less. <strong>Semantic density</strong> matters more. If your article is &quot;fluff&quot; (lots of words, little meaning), its vector representation will be &quot;diluted.&quot; Dense, information-rich content creates &quot;sharper&quot; vectors that are more likely to be retrieved as relevant context.
                </p>

                <h3 className="text-2xl text-purple-200 mt-8">3. Attention Mechanisms in Search</h3>
                <p>
                  Once your content is retrieved and placed in the LLM&apos;s context window, it faces the <strong>Attention Mechanism</strong>.
                </p>
                <p>
                  <code>Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V</code>
                </p>
                <p>
                  The LLM decides which parts of your content to &quot;attend&quot; to when generating the answer.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Position Bias:</strong> LLMs often pay more attention to the beginning and end of the provided context (&quot;Lost in the Middle&quot;).</li>
                    <li><strong>Format Bias:</strong> LLMs find it easier to extract facts from structured data (tables, lists, JSON-LD) than from long, winding prose.</li>
                </ul>
                <p>
                  This gives rise to a new optimization strategy: <strong>Structuring content for machine readability.</strong> Using bullet points, clear headings, and direct answers at the top of the page increases the probability that the Attention heads will &quot;attend&quot; to your content and cite it.
                </p>

                <h3 className="text-2xl text-purple-200 mt-8">4. Hallucination Rates & Factuality</h3>
                <p>
                  The Achilles&apos; heel of AI Search is hallucination. A &quot;confident&quot; answer is not necessarily a correct one.
                </p>
                <p>
                   Search engines are combatting this with <strong>RAG-Verification</strong>. After generating a sentence, the model performs a &quot;fact-check&quot; loop—querying its own context to see if the sentence is supported by the retrieved documents. If not, it discards or rewrites it.
                </p>
                <p>
                   For content creators, this means <strong>accuracy is a ranking factor</strong>. If your content contradicts the consensus of other high-authority sources, the &quot;Verifier&quot; model might discard your content as hallucination-inducing, effectively &quot;de-ranking&quot; you in the synthesis process.
                </p>
              </div>
          </section>

          {/* GEO */}
          <section id="geo" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="/30 border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-orange-400" size={28} />
                <h2 className="text-3xl font-bold text-white">What is GEO?</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                <p>
                  <strong>Generative Engine Optimization (GEO)</strong> is the successor to SEO. It is the art and science of optimizing content to be selected as a source for AI-generated answers.
                </p>

                <h3 className="text-xl font-bold text-orange-300 mt-6">The GEO Playbook</h3>
                <ul className="list-disc pl-6 space-y-4 mt-2">
                    <li><strong>Quote-ability:</strong> AI models look for concise, definitive statements. Instead of &quot;It depends,&quot; write &quot;The best framework for X is Y because Z.&quot;</li>
                    <li><strong>Authority & Trust (E-E-A-T):</strong> AI engines heavily weight the source&apos;s domain authority. They are biased towards established brands and academic sources to minimize liability.</li>
                    <li><strong>Data-Driven Content:</strong> Unique data points (benchmarks, survey results, original research) are highly cited because they represent &quot;new knowledge&quot; that the LLM doesn&apos;t have in its training set.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Layers className="text-purple-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Search Engine Architecture</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6">
                <p>
                  The infrastructure required to run an AI Search Engine is orders of magnitude more expensive than a traditional one.
                </p>
                <div className="/50 p-4 rounded-lg border border-gray-700 my-4 font-mono text-sm">
                  {`User Query -> [Classifier] -> (Navigational vs Informational)
                                     |
                                     v
                  [Query Rewriter] -> (Generates 3-5 sub-queries)
                                     |
                                     v
                  [Search Index] <-> [Vector DB]
                                     |
                                     v
                  [Cross-Encoder Reranker] -> (Top 10 Docs)
                                     |
                                     v
                  [LLM (e.g. GPT-4o / Llama 3)] -> (Streaming Answer)
                                     |
                                     v
                  [Citation Injector] -> (Links to sources)`}
                </div>
                <p>
                   <strong>The Latency Challenge:</strong> A traditional search takes 50-100ms. An LLM token generation takes 10-50ms <em>per token</em>. Generating a full answer can take 2-5 seconds.
                </p>
                <p>
                   To solve this, engines use <strong>Streaming UI</strong> (showing text as it generates) and <strong>Speculative Decoding</strong> (using a small model to draft and a large model to verify) to reduce perceived latency.
                </p>
              </div>
          </section>

          {/* Comparison */}
          <section id="comparison" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="text-purple-400" size={28} />
              <h2 className="text-3xl font-bold text-white">The Great Model Wars: A Comparative Analysis</h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6">
              <p>
                Not all AI search engines are created equal. They differ fundamentally in their underlying models, retrieval strategies, and &quot;personality&quot; parameters. Understanding these nuances is critical for GEO, as optimizing for Perplexity requires a slightly different approach than optimizing for Google&apos;s AI Overviews.
              </p>

              <div className="overflow-x-auto my-8">
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-purple-900/50 text-purple-200">
                      <th className="p-4 border-b border-purple-800">Feature</th>
                      <th className="p-4 border-b border-purple-800">Perplexity Pro</th>
                      <th className="p-4 border-b border-purple-800">OpenAI SearchGPT</th>
                      <th className="p-4 border-b border-purple-800">Google AI Overviews</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="/30 hover:/50">
                      <td className="p-4 border-b border-gray-700 font-bold text-gray-200">Base Model</td>
                      <td className="p-4 border-b border-gray-700">GPT-4o / Claude 3.5 Sonnet / Llama 3 (User Selectable)</td>
                      <td className="p-4 border-b border-gray-700">Modified GPT-4o with real-time browser tool</td>
                      <td className="p-4 border-b border-gray-700">Gemini 1.5 Pro / Flash</td>
                    </tr>
                    <tr className="/30 hover:/50">
                      <td className="p-4 border-b border-gray-700 font-bold text-gray-200">Index Freshness</td>
                      <td className="p-4 border-b border-gray-700">Near Real-time (partnerships with Yelp, TripAdvisor)</td>
                      <td className="p-4 border-b border-gray-700">Real-time Bing Index integration</td>
                      <td className="p-4 border-b border-gray-700">Real-time (The Google Index)</td>
                    </tr>
                    <tr className="/30 hover:/50">
                      <td className="p-4 border-b border-gray-700 font-bold text-gray-200">Citation Style</td>
                      <td className="p-4 border-b border-gray-700">Aggressive numerical citations inline.</td>
                      <td className="p-4 border-b border-gray-700">Sidebar source list + inline text links.</td>
                      <td className="p-4 border-b border-gray-700">Carousel of cards at top + drop-down arrows.</td>
                    </tr>
                     <tr className="/30 hover:/50">
                      <td className="p-4 border-b border-gray-700 font-bold text-gray-200">Bias</td>
                      <td className="p-4 border-b border-gray-700">Academic / Technical bias. Prefers Reddit & Papers.</td>
                      <td className="p-4 border-b border-gray-700">Conversational bias. Prefers news & mainstream media.</td>
                      <td className="p-4 border-b border-gray-700">Commercial bias. Heavily weighted to shopping/Youtube.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl text-purple-200 mt-8">The &quot;Citation Algorithm&quot; Unveiled</h3>
              <p>
                The most guarded secret in the AI industry right now is not the model weights—it&apos;s the <strong>Citation Algorithm</strong>. Why does Perplexity link to <em>Forbes</em> for one query and a random Reddit thread for another?
              </p>
              <p>
                Based on reverse-engineering efforts and white papers, we believe the Citation Value ($C_v$) is calculated as a function of three variables:
              </p>
              <div className=" p-6 rounded-lg border-l-4 border-orange-500 font-mono text-sm my-6">
                {'$$ C_v = w_1 \\cdot \\text{SemanticMatch} + w_2 \\cdot \\text{InformationDensity} + w_3 \\cdot \\text{DomainTrust} $$'}
              </div>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Semantic Match ($w_1$):</strong> Does the vector embedding of your paragraph closely align with the specific <em>sub-claim</em> being generated? This is why &quot;long-tail&quot; content wins. If you have a specific paragraph about &quot;pairing Pinot Noir with Spicy Tuna Rolls,&quot; you will win the citation over a generic &quot;Wine Guide&quot; article, because the vector distance is shorter for that specific query.
                </li>
                <li>
                  <strong>Information Density ($w_2$):</strong> LLMs have a &quot;context window cost.&quot; They prefer sources that provide high entropy (new information) in fewer tokens. Fluffy introductions (&quot;In today&apos;s fast-paced digital world...&quot;) lower your information density score. To win $w_2$, start your sentences with facts.
                </li>
                <li>
                  <strong>Domain Trust ($w_3$):</strong> This is the legacy SEO component. Backlinks still matter here, but they act as a &quot;validity gate.&quot; If your Domain Authority is below a certain threshold, you might not even make it into the candidate generation phase, regardless of how good your content is.
                </li>
              </ul>
            </div>
          </section>

          {/* Ecosystem */}
          <section id="ecosystem" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Globe className="text-purple-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Impact on the Web Ecosystem</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="/40 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2">The Publisher Crisis</h3>
                  <p className="text-gray-400 text-sm">
                    If the AI answers the question, why click? This &quot;Zero-Click&quot; future threatens ad-supported business models. We are seeing a shift toward paywalls and &quot;human-only&quot; communities that AI cannot scrape.
                  </p>
                </div>

                <div className="/40 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2">The Rise of APIs</h3>
                  <p className="text-gray-400 text-sm">
                    Websites are becoming APIs. Instead of rendering HTML for humans, savvy businesses are exposing JSON APIs for AI agents to consume directly, monetizing the <em>data</em> access rather than the <em>eyeball</em>.
                  </p>
                </div>
              </div>
          </section>

           {/* Future */}
          <section id="future" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-blue-900/10 border border-blue-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-blue-400" size={28} />
                <h2 className="text-3xl font-bold text-white">The Future: Agentic Search</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>
                   The next phase is not just answering questions but <strong>doing tasks</strong>.
                </p>
                <p>
                   Current: &quot;Find me a flight to Tokyo.&quot; (Returns a list or a summary).
                   <br/>Future: &quot;Book me the flight to Tokyo.&quot; (Agentic Search).
                </p>
                <p>
                   This moves search from an information retrieval tool to an operating system for the web. Optimizing for this future means ensuring your booking system, reservation API, or purchase flow is accessible to AI agents.
                </p>

                <h3 className="text-xl font-bold text-blue-300 mt-6">Personalized Local LLMs</h3>
                <p>
                  We are also moving toward <strong>&quot;Personal Search.&quot;</strong> In 2026, your search engine won&apos;t just know the web; it will know <em>you</em>. Apple Intelligence and on-device models (like Gemini Nano) will index your emails, Slack messages, and local files.
                </p>
                <p>
                  The query &quot;What was that marketing plan we discussed?&quot; will perform RAG over your local data. This creates a &quot;Walled Garden&quot; of data where traditional SEO cannot reach. The only way to penetrate this circle is to produce content that users explicitly <em>save</em> or <em>download</em> to their personal knowledge bases.
                </p>
                <p>
                  <strong>Strategic Pivot:</strong> Move from &quot;Traffic Acquisition&quot; to &quot;Resource Provision.&quot; Create PDFs, whitepapers, and tools that users download. Once your content is on their hard drive, it becomes part of their personal LLM&apos;s training context.
                </p>
              </div>
            </div>
          </section>

          {/* Checklist */}
           <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-purple-900/20 to-orange-900/20 border border-purple-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                ✅ GEO Readiness Checklist
              </h3>
              <p className="text-purple-200/80 mb-6">
                Is your site ready for the AI crawler era?
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 /50 hover:/70 p-4 rounded-lg transition-all text-left group"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-orange-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-gray-500 group-hover:text-orange-400 flex-shrink-0 mt-0.5 transition-colors" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-orange-300 line-through' : 'text-gray-300'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16 border-t border-gray-800 pt-12">
            <div className="/50 border border-purple-500/30 rounded-xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Adapt or Die</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                SEO is not dead; it is evolving. The era of keyword stuffing is over. The era of semantic authority has begun.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                 <Link
                    href="/tools/seo-analyzer"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-bold transition-all text-white shadow-lg shadow-purple-900/50"
                >
                    <Target size={20} />
                    Analyze Your GEO Score
                </Link>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2  hover: px-8 py-4 rounded-full font-bold transition-all text-white"
                >
                    Read More Articles <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
