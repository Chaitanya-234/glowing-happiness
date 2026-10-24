// app/tools/regex-playground/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RegexPlaygroundPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex);

      if (found) {
        setMatches(found);
        setError('');
      } else {
        setMatches([]);
        setError('No matches found');
      }
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'URL', pattern: 'https?://[^\\s]+' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { name: 'Hex Color', pattern: '#[0-9a-fA-F]{6}' },
    { name: 'IP Address', pattern: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Regex Playground
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Build and test regular expressions with live pattern matching and highlighting.
        </p>

        {/* Pattern Input */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-3">
            <label className="block text-purple-200/60 mb-2 font-semibold">Regular Expression Pattern:</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono"
              placeholder="\d{3}-\d{3}-\d{4}"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Flags:</label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono"
              placeholder="g, i, m"
            />
          </div>
        </div>

        {/* Common Patterns */}
        <div className="mb-6">
          <label className="block text-purple-200/60 mb-2 font-semibold">Common Patterns:</label>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((item) => (
              <button
                key={item.name}
                onClick={() => setPattern(item.pattern)}
                className="px-4 py-2 bg-purple-900/20 text-purple-200/60 rounded-lg border border-purple-500/20 hover:bg-purple-800/30 hover:border-purple-400/40 transition-all text-sm"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Test String */}
        <div className="mb-6">
          <label className="block text-purple-200/60 mb-2 font-semibold">Test String:</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full h-32 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder="Enter text to test against your regex pattern..."
          />
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={testRegex}
            className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
          >
            Test Pattern
          </button>
          <button
            onClick={() => {
              setPattern('');
              setTestString('');
              setMatches([]);
              setError('');
            }}
            className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        {error && <p className="text-red-400 mb-4">✗ {error}</p>}

        {matches.length > 0 && (
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-100/70 mb-4">
              Matches Found: {matches.length}
            </h3>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="bg-purple-800/20 px-4 py-2 rounded border border-purple-500/10">
                  <span className="text-purple-200/60 text-sm mr-2">Match {index + 1}:</span>
                  <span className="text-purple-100/80 font-mono">{match}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">About Regex Playground</h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Regular expressions (regex) are powerful patterns used for matching character combinations
            in strings. This playground helps you build, test, and debug regex patterns with instant
            visual feedback.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Common Regex Syntax</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li><code>\d</code> - Matches any digit (0-9)</li>
            <li><code>\w</code> - Matches any word character (a-z, A-Z, 0-9, _)</li>
            <li><code>\s</code> - Matches any whitespace character</li>
            <li><code>.</code> - Matches any character except newline</li>
            <li><code>*</code> - Matches 0 or more occurrences</li>
            <li><code>+</code> - Matches 1 or more occurrences</li>
            <li><code>?</code> - Matches 0 or 1 occurrence</li>
            <li><code>{'{n}'}</code> - Matches exactly n occurrences</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Regex Flags</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li><strong>g</strong> - Global search (find all matches)</li>
            <li><strong>i</strong> - Case-insensitive search</li>
            <li><strong>m</strong> - Multi-line search</li>
            <li><strong>s</strong> - Dot matches newline characters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
