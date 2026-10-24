// app/tools/hash-generator/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');

  // Simple hash functions (for demo - use crypto library in production)
  const generateHash = async () => {
    if (!input) return;

    // Using Web Crypto API for SHA hashes
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256Array = Array.from(new Uint8Array(sha256Buffer));
    const sha256 = sha256Array.map(b => b.toString(16).padStart(2, '0')).join('');
    setSha256Hash(sha256);

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha1Array = Array.from(new Uint8Array(sha1Buffer));
    const sha1 = sha1Array.map(b => b.toString(16).padStart(2, '0')).join('');
    setSha1Hash(sha1);

    // Note: MD5 would require a separate library - showing placeholder
    setMd5Hash('MD5 requires additional library - use SHA-256 instead');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Hash Generator
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Generate cryptographic hashes (SHA-1, SHA-256) for your text.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <label className="block text-purple-200/60 mb-2 font-semibold">Input Text:</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
              placeholder="Enter text to hash..."
            />
          </div>

          <button
            onClick={generateHash}
            className="w-full px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold mb-8"
          >
            Generate Hashes
          </button>

          {sha256Hash && (
            <div className="space-y-4">
              <HashResult title="SHA-256" hash={sha256Hash} />
              <HashResult title="SHA-1" hash={sha1Hash} />
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">About Cryptographic Hashing</h2>
          <p className="text-purple-200/50 leading-relaxed">
            Cryptographic hash functions generate fixed-size outputs from variable-size inputs.
            They're used for data integrity verification, password storage, and digital signatures.
          </p>
        </div>
      </div>
    </div>
  );
}

function HashResult({ title, hash }: { title: string; hash: string }) {
  return (
    <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-purple-100/70">{title}:</h3>
        <button
          onClick={() => navigator.clipboard.writeText(hash)}
          className="px-4 py-2 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all text-sm"
        >
          Copy
        </button>
      </div>
      <code className="block text-purple-100/80 font-mono text-sm break-all bg-purple-800/20 p-3 rounded">
        {hash}
      </code>
    </div>
  );
}
