// app/tools/glassmorphism-generator/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GlassmorphismGeneratorPage() {
  const [blur, setBlur] = useState(16);
  const [transparency, setTransparency] = useState(0.6);
  const [saturation, setSaturation] = useState(180);
  const [backgroundColor, setBackgroundColor] = useState('#1a1a1a');

  const rgbaColor = `rgba(255, 255, 255, ${transparency})`;
  const cssCode = `background: ${rgbaColor};
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid rgba(255, 255, 255, 0.125);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    alert('CSS copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Glassmorphism Generator
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Generate beautiful glassmorphism CSS effects for your user interface.
          Adjust blur, transparency, and saturation to create the perfect frosted glass look.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Controls */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-purple-100/80 mb-6">Configuration</h3>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-purple-200/60 font-semibold">Blur</label>
                  <span className="text-purple-400/60 font-mono">{blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={blur}
                  onChange={(e) => setBlur(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-900/40 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-purple-200/60 font-semibold">Transparency</label>
                  <span className="text-purple-400/60 font-mono">{transparency}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={transparency}
                  onChange={(e) => setTransparency(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-900/40 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-purple-200/60 font-semibold">Saturation</label>
                  <span className="text-purple-400/60 font-mono">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-900/40 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-purple-500/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-purple-100/70">CSS Code</h3>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-purple-600/20 text-purple-200/80 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all text-sm font-semibold"
                >
                  Copy CSS
                </button>
              </div>
              <div className="relative group">
                <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto border border-purple-500/10 text-purple-100/70 font-mono text-sm">
                  {cssCode}
                </pre>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
             <h3 className="text-xl font-bold text-purple-100/80 mb-6 lg:hidden">Preview</h3>
             <div
               className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-8 sm:p-16"
               style={{
                 background: 'linear-gradient(45deg, #4f46e5, #7e22ce)'
               }}
             >
               {/* Decorative background elements */}
               <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
               <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
               <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

               {/* The Glass Card */}
               <div
                 className="relative w-full h-64 rounded-xl flex flex-col items-center justify-center p-8 shadow-xl"
                 style={{
                   background: rgbaColor,
                   backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                   WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                   border: '1px solid rgba(255, 255, 255, 0.125)',
                 }}
               >
                 <h2 className="text-2xl font-bold text-white/90 mb-2">Glass Effect</h2>
                 <p className="text-white/70 text-center">
                   This is how your content will look on top of the glassmorphism effect.
                 </p>
               </div>
             </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-20 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">What is Glassmorphism?</h2>
          <p className="text-purple-200/50 leading-relaxed">
            Glassmorphism is a design trend in user interfaces that emphasizes light or dark objects,
            placed on top of colorful backgrounds. A background-blur is placed on the objects which allows
            the background to shine through, giving them the impression of frosted glass.
          </p>
          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Key Characteristics</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li><strong className="text-purple-200/60">Translucency:</strong> Background blur using `backdrop-filter`.</li>
            <li><strong className="text-purple-200/60">Multi-layered approach:</strong> Objects floating in space.</li>
            <li><strong className="text-purple-200/60">Vivid colors:</strong> To highlight the blurred transparency.</li>
            <li><strong className="text-purple-200/60">Subtle border:</strong> A semi-transparent white border simulates the glass edge.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
