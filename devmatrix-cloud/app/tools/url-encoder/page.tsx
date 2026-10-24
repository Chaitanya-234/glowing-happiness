// app/tools/url-encoder/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function URLEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    try {
      const result = encodeURIComponent(input);
      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid input');
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeURIComponent(input);
      setOutput(result);
    } catch (error) {
      setOutput('Error: Invalid encoded URL');
    }
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          URL Encoder/Decoder
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Encode or decode URLs for safe transmission. Convert special characters to percent-encoded format.
        </p>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('encode')}
            className={`px-8 py-3 rounded-lg border transition-all font-semibold ${
              mode === 'encode'
                ? 'bg-purple-600/30 text-purple-100 border-purple-500/30'
                : 'bg-transparent text-purple-200/60 border-purple-600/20 hover:border-purple-500/40'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-8 py-3 rounded-lg border transition-all font-semibold ${
              mode === 'decode'
                ? 'bg-purple-600/30 text-purple-100 border-purple-500/30'
                : 'bg-transparent text-purple-200/60 border-purple-600/20 hover:border-purple-500/40'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Input:</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
              placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world' : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'}
            />
          </div>

          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Output:</label>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
              placeholder="Result will appear here..."
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={handleProcess}
            className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
          >
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            disabled={!output}
            className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold disabled:opacity-30"
          >
            Copy Result
          </button>
          <button
            onClick={() => {
              setInput('');
              setOutput('');
            }}
            className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
          >
            Clear
          </button>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">About URL Encoding</h2>
          <p className="text-purple-200/50 leading-relaxed">
            URL encoding converts characters into a format that can be transmitted over the Internet.
            Special characters are replaced with a percent sign (%) followed by two hexadecimal digits.
          </p>
        </div>
      </div>
    </div>
  );
}
