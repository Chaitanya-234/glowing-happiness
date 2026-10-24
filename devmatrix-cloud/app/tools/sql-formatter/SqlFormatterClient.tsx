// app/tools/sql-formatter/SqlFormatterClient.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'sql-formatter';

const dialects = [
  'sql',
  'mysql',
  'postgresql',
  'sqlite',
  'mariadb',
  'transactsql',
  'plsql',
];

export default function SqlFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [dialect, setDialect] = useState('sql');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const formatted = format(input, {
        language: dialect as any,
        tabWidth: 2,
        keywordCase: 'upper',
      });
      setOutput(formatted);
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        SQL Formatter
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Format and beautify your SQL queries instantly. Supports multiple dialects.
      </p>

      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4">
          <label className="text-purple-200/60 font-semibold">Dialect:</label>
          <select
            value={dialect}
            onChange={(e) => setDialect(e.target.value)}
            className="bg-purple-900/20 text-purple-100/80 border border-purple-500/20 rounded px-3 py-1 focus:outline-none focus:border-purple-400/40"
          >
            {dialects.map((d) => (
              <option key={d} value={d}>
                {d.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">Input SQL:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none placeholder-purple-300/20"
            placeholder="SELECT * FROM users WHERE id = 1"
          />
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">
            Formatted SQL:
            {error && <span className="text-red-400 ml-2 text-sm">✗ Error</span>}
            {output && !error && <span className="text-green-400 ml-2 text-sm">✓ Formatted</span>}
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
            placeholder="Formatted SQL will appear here..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleFormat}
          className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
        >
          Format SQL
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Copy
        </button>
        <button
          onClick={() => {
            setInput('');
            setOutput('');
            setError('');
          }}
          className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
