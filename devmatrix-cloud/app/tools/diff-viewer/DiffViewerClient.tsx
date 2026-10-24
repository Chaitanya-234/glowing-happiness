// app/tools/diff-viewer/DiffViewerClient.tsx
'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { diffLines, Change } from 'diff';

export default function DiffViewerClient() {
  const [original, setOriginal] = useState('This is the original text.\nIt has two lines.');
  const [modified, setModified] = useState('This is the modified text.\nIt has three lines.\nThe third line is new.');

  const diffs = useMemo(() => diffLines(original, modified), [original, modified]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        Text Diff Viewer
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Compare two blocks of text and highlight the differences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">Original Text</label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="w-full h-48 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder="Paste original text here..."
          />
        </div>
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">Modified Text</label>
           <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="w-full h-48 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>

      <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl overflow-hidden">
        <div className="bg-purple-900/30 px-4 py-2 border-b border-purple-500/20 text-purple-200/60 font-semibold text-sm">
          Comparison Result
        </div>
        <div className="p-4 font-mono text-sm overflow-x-auto">
          {diffs.map((part, index) => {
             const color = part.added ? 'bg-green-900/40 text-green-100' :
                           part.removed ? 'bg-red-900/40 text-red-100' :
                           'text-purple-100/70';
             return (
               <span key={index} className={`${color} block w-full whitespace-pre-wrap`}>
                 {part.value}
               </span>
             );
          })}
        </div>
      </div>

       <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            setOriginal('');
            setModified('');
          }}
          className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
        >
          Clear All
        </button>
      </div>

    </div>
  );
}
