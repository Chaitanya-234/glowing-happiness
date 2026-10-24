// app/tools/json-formatter/JSONFormatterClient.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function JSONFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
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
        JSON Formatter & Validator
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Format, validate, and beautify your JSON data instantly. Works offline in your browser.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">Input JSON:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder='{"name": "DevMetrix", "tools": ["JSON", "API", "Regex"]}'
          />
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">
            Formatted Output:
            {error && <span className="text-red-400 ml-2 text-sm">✗ {error}</span>}
            {output && !error && <span className="text-green-400 ml-2 text-sm">✓ Valid JSON</span>}
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={formatJSON}
          className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
        >
          Beautify
        </button>
        <button
          onClick={minifyJSON}
          className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
        >
          Minify
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
