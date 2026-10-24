'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [text, setText] = useState('');

  const stats = {
    chars: text.length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    sentences: text.trim() === '' ? 0 : text.split(/[.!?]+/).length - 1,
    paragraphs: text.trim() === '' ? 0 : text.split(/\n+/).length
  };


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 via-purple-100/60 to-purple-200/80">
            Word & Character Counter
          </h1>
          <p className="text-lg text-purple-200/50 max-w-2xl mx-auto">
            Count words, characters, sentences, and paragraphs in your text. Real-time analysis for writers.
          </p>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">

          <div className="space-y-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-100">{stats.words}</div>
                  <div className="text-xs text-purple-300/60">Words</div>
               </div>
               <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-100">{stats.chars}</div>
                  <div className="text-xs text-purple-300/60">Characters</div>
               </div>
               <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-100">{stats.sentences}</div>
                  <div className="text-xs text-purple-300/60">Sentences</div>
               </div>
               <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-100">{stats.paragraphs}</div>
                  <div className="text-xs text-purple-300/60">Paragraphs</div>
               </div>
             </div>
             <textarea
               value={text}
               onChange={(e) => setText(e.target.value)}
               className="w-full h-64 bg-purple-900/10 border border-purple-500/20 rounded p-4 text-purple-100 focus:outline-none focus:border-purple-500/50 font-mono"
               placeholder="Start typing or paste your text here..."
             ></textarea>
          </div>

        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert prose-purple max-w-none">
          <h2 className="text-2xl font-bold text-purple-100/70 mb-4">About Word & Character Counter</h2>
          <p className="text-purple-200/50">
            The Word & Character Counter is a free online utility designed for developers, designers, and digital professionals.
            It allows you to count words, characters, sentences, and paragraphs in your text. real-time analysis for writers. quickly and efficiently directly in your browser without installing any software.
          </p>
          <h3 className="text-xl font-bold text-purple-100/70 mt-6 mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200/50">
             <li>Word Count</li>
<li>Char Count</li>
<li>Sentence Count</li>
<li>Reading Time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
