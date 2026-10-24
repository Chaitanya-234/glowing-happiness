// app/tools/base64-encoder/Base64EncoderClient.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Base64EncoderClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      setOutput('Error: Invalid input for encoding');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      setOutput('Error: Invalid Base64 string');
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
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        Base64 Encoder/Decoder
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Encode or decode Base64 strings instantly. Your data stays in your browser.
      </p>

      {/* Mode selector */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode('encode')}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            mode === 'encode'
              ? 'bg-purple-600/30 text-purple-100 border border-purple-500/30'
              : 'bg-transparent text-purple-200/60 border border-purple-600/20'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            mode === 'decode'
              ? 'bg-purple-600/30 text-purple-100 border border-purple-500/30'
              : 'bg-transparent text-purple-200/60 border border-purple-600/20'
          }`}
        >
          Decode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">
            {mode === 'encode' ? 'Text to Encode:' : 'Base64 to Decode:'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
          />
        </div>

        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">
            {mode === 'encode' ? 'Encoded Result:' : 'Decoded Result:'}
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
            placeholder="Result will appear here..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleProcess}
          className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
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
    </div>
  );
}
