'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [tl, setTl] = useState(0);
  const [tr, setTr] = useState(0);
  const [br, setBr] = useState(0);
  const [bl, setBl] = useState(0);
  const [all, setAll] = useState(0);

  const handleAllChange = (val: number) => {
    setAll(val);
    setTl(val);
    setTr(val);
    setBr(val);
    setBl(val);
  };

  const code = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 via-purple-100/60 to-purple-200/80">
            Border Radius Generator
          </h1>
          <p className="text-lg text-purple-200/50 max-w-2xl mx-auto">
            Generate advanced CSS border-radius shapes. Control all 4 corners individually or create complex organic shapes.
          </p>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-900/10 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              <div
                className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 transition-all duration-200 border-2 border-purple-300/30"
                style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
              ></div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-purple-200/60 text-sm font-bold">All Corners: {all}px</label>
                 <input type="range" min="0" max="100" value={all} onChange={(e) => handleAllChange(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-purple-200/60 text-xs">Top Left: {tl}px</label>
                    <input type="range" min="0" max="100" value={tl} onChange={(e) => setTl(Number(e.target.value))} className="w-full accent-purple-500" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-purple-200/60 text-xs">Top Right: {tr}px</label>
                    <input type="range" min="0" max="100" value={tr} onChange={(e) => setTr(Number(e.target.value))} className="w-full accent-purple-500" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-purple-200/60 text-xs">Bottom Right: {br}px</label>
                    <input type="range" min="0" max="100" value={br} onChange={(e) => setBr(Number(e.target.value))} className="w-full accent-purple-500" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-purple-200/60 text-xs">Bottom Left: {bl}px</label>
                    <input type="range" min="0" max="100" value={bl} onChange={(e) => setBl(Number(e.target.value))} className="w-full accent-purple-500" />
                 </div>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-black/40 p-4 rounded-lg relative">
            <code className="text-purple-300">{code}</code>
            <button onClick={() => navigator.clipboard.writeText(code)} className="absolute top-2 right-2 text-xs bg-purple-600/30 px-2 py-1 rounded hover:bg-purple-600/50 transition-colors">Copy</button>
          </div>

        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert prose-purple max-w-none">
          <h2 className="text-2xl font-bold text-purple-100/70 mb-4">About Border Radius Generator</h2>
          <p className="text-purple-200/50">
            The Border Radius Generator is a free online utility designed for developers, designers, and digital professionals.
            It allows you to generate advanced css border-radius shapes. control all 4 corners individually or create complex organic shapes. quickly and efficiently directly in your browser without installing any software.
          </p>
          <h3 className="text-xl font-bold text-purple-100/70 mt-6 mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200/50">
             <li>8-point Control</li>
<li>Visual Preview</li>
<li>CSS Copy</li>
<li>Simple UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
