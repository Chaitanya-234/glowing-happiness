'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const [seed, setSeed] = useState(Date.now());
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);

  const url = `https://picsum.photos/${w}/${h}?random=${seed}`;

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
         <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">Random Image Generator</h1>

         <div className="flex justify-center gap-4 mb-8">
            <input type="number" value={w} onChange={(e) => setW(Number(Number(e.target.value)))} className="w-24 bg-purple-900/10 border border-purple-500/20 rounded p-2 text-white" />
            <span className="text-purple-200/50 pt-2">x</span>
            <input type="number" value={h} onChange={(e) => setH(Number(Number(e.target.value)))} className="w-24 bg-purple-900/10 border border-purple-500/20 rounded p-2 text-white" />
            <button onClick={() => setSeed(Date.now())} className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-500 text-white">Refresh</button>
         </div>

         <div className="bg-purple-900/10 p-4 rounded-xl border border-purple-500/20 inline-block">
            <img src={url} alt="Random" className="max-w-full h-auto rounded-lg shadow-2xl shadow-purple-900/20" />
         </div>

         <div className="mt-8 flex justify-center gap-4">
             <input readOnly value={url} className="w-96 bg-black/40 border border-purple-500/20 rounded px-4 py-2 text-purple-300 text-sm font-mono" />
             <button onClick={() => navigator.clipboard.writeText(url)} className="text-purple-400 text-sm hover:text-purple-200">Copy URL</button>
         </div>
      </div>
    </div>
  );
}
