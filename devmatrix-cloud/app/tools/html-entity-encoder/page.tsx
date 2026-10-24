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
        const res = input.replace(/[ -香<>&]/g, function(i) { return '&#'+i.charCodeAt(0)+';'; });
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
            HTML Entity Encoder
          </h1>
          <p className="text-lg text-purple-200/50 max-w-2xl mx-auto">
            Encode text to HTML entities to safely display special characters in web pages.
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
          <h2 className="text-2xl font-bold text-purple-100/70 mb-4">About HTML Entity Encoder</h2>
          <p className="text-purple-200/50">
            The HTML Entity Encoder is a free online utility designed for developers, designers, and digital professionals.
            It allows you to encode text to html entities to safely display special characters in web pages. quickly and efficiently directly in your browser without installing any software.
          </p>
          <h3 className="text-xl font-bold text-purple-100/70 mt-6 mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200/50">
             <li>Encode/Decode</li>
<li>Special Chars</li>
<li>Safe HTML</li>
<li>Copy All</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
