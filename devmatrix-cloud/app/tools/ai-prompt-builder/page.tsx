// app/tools/ai-prompt-builder/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AIPromptBuilderPage() {
  const [role, setRole] = useState('Senior Software Engineer');
  const [task, setTask] = useState('Write a Python script to scrape a website');
  const [context, setContext] = useState('Using BeautifulSoup and Requests library');
  const [constraints, setConstraints] = useState('Must handle errors and respect robots.txt');
  const [format, setFormat] = useState('Code block with comments');

  const generatedPrompt = `Act as a ${role}.
Your task is to: ${task}.

Context:
${context}

Constraints & Guidelines:
${constraints}

Output Format:
${format}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          AI Prompt Builder
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Craft structured, high-quality prompts for LLMs like ChatGPT, Claude, and Gemini.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm space-y-6">
            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Role / Persona</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Task</label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none h-24"
                placeholder="What should the AI do?"
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Context</label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none h-24"
                placeholder="Background information..."
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Constraints</label>
              <input
                type="text"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
                placeholder="e.g. No external libraries"
              />
            </div>

            <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Output Format</label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-3 bg-purple-900/20 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
                placeholder="e.g. Markdown table"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-semibold text-purple-100/70">Generated Prompt</h3>
               <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
                >
                  Copy Prompt
                </button>
            </div>
            <div className="bg-black/40 border border-purple-500/20 rounded-xl p-6 h-full min-h-[500px] overflow-auto">
               <pre className="whitespace-pre-wrap text-purple-100/80 font-mono text-sm">
                 {generatedPrompt}
               </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
