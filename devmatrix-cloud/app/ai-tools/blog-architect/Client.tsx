'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, PenTool, Hash, Layout, Terminal, HelpCircle, Copy, Check } from 'lucide-react';

type BlogOutline = {
  title: string;
  seoMeta: {
    description: string;
    keywords: string[];
  };
  outline: {
    heading: string;
    subpoints: string[];
  }[];
  codeSnippets: {
    language: string;
    code: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

export default function BlogArchitectClient() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlogOutline | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setResult(null);

    try {
      const prompt = `Create a comprehensive blog post outline for: "${topic}".
      Tone: ${tone}.
      Target Keywords: ${keywords || 'SEO optimized'}.
      Include practical code snippets if technical, and a FAQ section.`;

      const data = await generateStructuredContent(prompt, 'blog_architect');
      setResult(data as BlogOutline);
    } catch (err) {
      console.error(err);
      // In production, show a toast
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-4"
          >
            <PenTool className="w-8 h-8 text-pink-400" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Smart Blog Architect
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Draft SEO-optimized technical blog posts 10x faster.
            Get outlines, metadata, and code snippets instantly.
          </p>
        </div>

        {/* Input Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent p-[1px]"
        >
          <div className="md:col-span-3 bg-black/80 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Blog Topic / Title Idea</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. How to use React Server Components effectively"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="Professional">Professional</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Humorous">Humorous</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">SEO Keywords (Optional)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="nextjs, react, seo..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500/50 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 font-bold text-lg hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-900/20 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Layout className="w-5 h-5" />}
              Generate Structure
            </button>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {/* Main Content Column */}
              <div className="md:col-span-2 space-y-6">

                {/* Title & Outline */}
                <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                  <div className="border-b border-white/10 pb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{result.title}</h2>
                    <p className="text-gray-400">{result.seoMeta.description}</p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2">
                      <Layout className="w-5 h-5" /> Outline
                    </h3>
                    <div className="space-y-4">
                      {result.outline.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-lg font-semibold text-gray-200">
                            <span className="text-pink-500/50 mr-2">{idx + 1}.</span>
                            {section.heading}
                          </h4>
                          <ul className="pl-8 list-disc text-gray-400 space-y-1">
                            {section.subpoints.map((point, pIdx) => (
                              <li key={pIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Code Snippets */}
                {result.codeSnippets.length > 0 && (
                  <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                    <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                      <Terminal className="w-5 h-5" /> Code Examples
                    </h3>
                    {result.codeSnippets.map((snip, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden bg-black border border-white/10">
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                          <span className="text-xs font-mono text-gray-400">{snip.language}</span>
                          <button
                            onClick={() => copyToClipboard(snip.code, `code-${idx}`)}
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            {copied === `code-${idx}` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                          {snip.code}
                        </div>
                        <div className="px-4 py-2 bg-blue-900/10 text-xs text-blue-300 border-t border-white/5">
                          {snip.description}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Column */}
              <div className="space-y-6">

                {/* SEO Card */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
                    <Hash className="w-5 h-5" /> SEO Meta
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.seoMeta.keywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FAQ Card */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" /> FAQ
                  </h3>
                  <div className="space-y-4">
                    {result.faq.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="font-medium text-gray-200 text-sm">{item.question}</p>
                        <p className="text-xs text-gray-500">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
