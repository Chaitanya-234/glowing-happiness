// app/tools/string-case-converter/StringCaseConverterClient.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function StringCaseConverterClient() {
  const [input, setInput] = useState('hello world example');

  const toCamelCase = (str: string) => {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).replace(/^[A-Z]/, c => c.toLowerCase());
  };

  const toSnakeCase = (str: string) => {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
              ?.map(x => x.toLowerCase())
              .join('_') || '';
  };

  const toKebabCase = (str: string) => {
    return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
              ?.map(x => x.toLowerCase())
              .join('-') || '';
  };

  const toPascalCase = (str: string) => {
     return str.replace(/(\w)(\w*)/g, (g0,g1,g2) => g1.toUpperCase() + g2.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '');
  };

  // Robust conversion logic
  const getWords = (str: string) => {
      if (!str) return [];
      return str.replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase
                .replace(/[_-]/g, ' ') // split snake_case and kebab-case
                .trim()
                .split(/\s+/);
  };

  const words = getWords(input);

  const cases = [
    { label: 'camelCase', value: words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') },
    { label: 'PascalCase', value: words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') },
    { label: 'snake_case', value: words.map(w => w.toLowerCase()).join('_') },
    { label: 'kebab-case', value: words.map(w => w.toLowerCase()).join('-') },
    { label: 'UPPER_CASE', value: words.map(w => w.toUpperCase()).join('_') },
    { label: 'Title Case', value: words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') },
    { label: 'Sentence case', value: words.map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()).join(' ') },
    { label: 'dot.case', value: words.map(w => w.toLowerCase()).join('.') },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        String Case Converter
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Convert text between camelCase, snake_case, PascalCase, and more.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none resize-none placeholder-purple-300/20 text-lg"
            placeholder="Type your text here..."
          />
        </div>

        <div className="bg-purple-900/10 rounded-xl border border-purple-500/20 p-6 space-y-4 h-80 overflow-y-auto custom-scrollbar">
          <h3 className="text-xl font-bold text-purple-100/70 mb-4 sticky top-0 bg-[#0f0a1f] py-2 z-10">Conversions</h3>
          {cases.map((c) => (
            <div key={c.label} className="group relative">
               <label className="text-xs text-purple-300/40 uppercase font-bold tracking-wider mb-1 block">{c.label}</label>
               <button
                  onClick={() => copyToClipboard(c.value)}
                  className="w-full text-left flex items-center justify-between bg-black/20 p-3 rounded-lg border border-purple-500/10 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all group"
               >
                  <code className="text-purple-100/90 font-mono text-sm truncate mr-4">{c.value}</code>
                  <span className="text-purple-400/60 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold uppercase tracking-wide">
                    Copy
                  </span>
               </button>
            </div>
          ))}
        </div>
      </div>
       <div className="flex justify-center mt-8">
        <button
          onClick={() => setInput('')}
          className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
        >
          Clear Input
        </button>
      </div>
    </div>
  );
}
