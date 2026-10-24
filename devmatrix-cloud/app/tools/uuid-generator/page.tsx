// app/tools/uuid-generator/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          UUID Generator
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Generate unique identifiers (UUIDs) for your applications. Version 4 (random) UUIDs.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-purple-200/60 mb-2 font-semibold">Number of UUIDs:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold mb-6"
          >
            Generate UUIDs
          </button>

          {uuids.length > 0 && (
            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-purple-100/70">Generated UUIDs:</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(uuids.join('\n'))}
                  className="px-4 py-2 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all text-sm"
                >
                  Copy All
                </button>
              </div>
              <div className="space-y-2">
                {uuids.map((uuid, index) => (
                  <div key={index} className="flex items-center gap-2 bg-purple-800/20 px-4 py-3 rounded border border-purple-500/10">
                    <code className="flex-1 text-purple-100/80 font-mono text-sm">{uuid}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(uuid)}
                      className="text-purple-400/60 hover:text-purple-300/80 transition-colors text-sm"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">What is a UUID?</h2>
          <p className="text-purple-200/50 leading-relaxed">
            A UUID (Universally Unique Identifier) is a 128-bit number used to identify information
            in computer systems. Version 4 UUIDs are randomly generated and have extremely low
            probability of collision.
          </p>
        </div>
      </div>
    </div>
  );
}
