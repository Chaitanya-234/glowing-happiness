// app/tools/toon-converter/ToonConverterClient.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Simple TOON conversion function (example)
// TOON here means removing quotes from keys and values where possible, removing commas/braces redundancy
// This is a sample minimal implementation; adjust according to real TOON spec
function jsonToToon(json: any): string {
  if (typeof json !== 'object' || json === null) {
    // For primitives, just return as string (no quotes on strings)
    if (typeof json === 'string') return json;
    return String(json);
  }
  if (Array.isArray(json)) {
    return `[${json.map(jsonToToon).join(' ')}]`;
  }
  // Object case - no quotes on keys, minimal separators
  return Object.entries(json)
    .map(([k, v]) => `${k} ${jsonToToon(v)}`)
    .join(' ');
}

export default function ToonConverterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convertToToon = () => {
    try {
      const parsed = JSON.parse(input);
      const toonStr = jsonToToon(parsed);
      setOutput(toonStr);
      setError('');
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500"
      >
        TOON Converter & Validator
      </motion.h1>
      <p className="text-center text-green-300/60 mb-12 max-w-2xl mx-auto">
        Convert your JSON data into the token-efficient TOON format for LLM optimization.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-green-300/60 mb-2 font-semibold">Input JSON:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 bg-green-900/10 text-green-100 p-4 rounded-lg border border-green-500/20 focus:border-green-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder='{"name": "DevMetrix", "tools": ["TOON", "JSON", "LLM"]}'
          />
        </div>

        <div>
          <label className="block text-green-300/60 mb-2 font-semibold">
            TOON Output:
            {error && <span className="text-red-400 ml-2 text-sm">✗ {error}</span>}
            {output && !error && <span className="text-green-400 ml-2 text-sm">✓ Valid Conversion</span>}
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-green-900/10 text-green-100 p-4 rounded-lg border border-green-500/20 font-mono text-sm resize-none"
            placeholder="TOON formatted output will appear here..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={convertToToon}
          className="px-8 py-3 bg-green-600/30 text-green-100 rounded-lg border border-green-500/30 hover:bg-green-500/40 transition-all font-semibold"
        >
          Convert to TOON
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-8 py-3 bg-transparent text-green-300/60 rounded-lg border border-green-600/20 hover:border-green-500/40 transition-all font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Copy
        </button>
        <button
          onClick={() => {
            setInput('');
            setOutput('');
            setError('');
          }}
          className="px-8 py-3 bg-transparent text-green-300/60 rounded-lg border border-green-600/20 hover:border-green-500/40 transition-all font-semibold"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
