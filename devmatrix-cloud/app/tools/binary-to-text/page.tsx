'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!input) {
        setOutput('');
        return;
    }
    try {
        const res = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        setOutput(res);
    } catch (e) {
        setOutput('Error converting');
    }
  }, [input]);


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 via-purple-100/60 to-purple-200/80">
            Binary to Text Converter
          </h1>
          <p className="text-lg text-purple-200/50 max-w-2xl mx-auto">
            Decode binary strings back into readable text. Handles standard 8-bit binary sequences.
          </p>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Input</label>
               <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-64 bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50 font-mono text-sm" placeholder="Type here..."></textarea>
            </div>
            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Output</label>
               <div className="relative">
                  <textarea readOnly value={output} className="w-full h-64 bg-black/40 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none font-mono text-sm"></textarea>
                  <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 text-xs bg-purple-600/30 px-2 py-1 rounded hover:bg-purple-600/50 transition-colors">Copy</button>
               </div>
            </div>
          </div>

        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert prose-purple max-w-none">
          <h2 className="text-2xl font-bold text-purple-100/70 mb-4">About Binary to Text Converter</h2>
          <p className="text-purple-200/50">
            The Binary to Text Converter is a free online utility designed for developers, designers, and digital professionals.
            It allows you to decode binary strings back into readable text. handles standard 8-bit binary sequences. quickly and efficiently directly in your browser without installing any software.
          </p>
          <h3 className="text-xl font-bold text-purple-100/70 mt-6 mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200/50">
             <li>Binary to Text</li>
<li>Error Detection</li>
<li>Copy Result</li>
<li>Instant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
