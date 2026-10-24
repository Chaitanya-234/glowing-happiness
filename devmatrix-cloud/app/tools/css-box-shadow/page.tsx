'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.5);
  const [inset, setInset] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;

  const code = `box-shadow: ${shadowValue};`;


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 via-purple-100/60 to-purple-200/80">
            CSS Box Shadow Generator
          </h1>
          <p className="text-lg text-purple-200/50 max-w-2xl mx-auto">
            Visual generator for CSS box-shadow property. Adjust offsets, blur, spread, and color with real-time preview.
          </p>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              <div
                className="w-40 h-40 bg-purple-500 rounded-lg transition-all duration-200"
                style={{ boxShadow: shadowValue }}
              ></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-purple-200/60 text-sm">Horizontal Offset: {hOffset}px</label>
                <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <div className="space-y-2">
                <label className="text-purple-200/60 text-sm">Vertical Offset: {vOffset}px</label>
                <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <div className="space-y-2">
                <label className="text-purple-200/60 text-sm">Blur Radius: {blur}px</label>
                <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <div className="space-y-2">
                <label className="text-purple-200/60 text-sm">Spread Radius: {spread}px</label>
                <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <div className="space-y-2">
                <label className="text-purple-200/60 text-sm">Opacity: {opacity}</label>
                <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-purple-500" />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="accent-purple-500" />
                    <span className="text-purple-200/60 text-sm">Inset</span>
                </label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="bg-transparent border-none w-8 h-8 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-6 bg-black/40 p-4 rounded-lg relative group">
            <code className="text-purple-300 break-all">{code}</code>
            <button onClick={() => navigator.clipboard.writeText(code)} className="absolute top-2 right-2 text-xs bg-purple-600/30 px-2 py-1 rounded hover:bg-purple-600/50 transition-colors">Copy</button>
          </div>

        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert prose-purple max-w-none">
          <h2 className="text-2xl font-bold text-purple-100/70 mb-4">About CSS Box Shadow Generator</h2>
          <p className="text-purple-200/50">
            The CSS Box Shadow Generator is a free online utility designed for developers, designers, and digital professionals.
            It allows you to visual generator for css box-shadow property. adjust offsets, blur, spread, and color with real-time preview. quickly and efficiently directly in your browser without installing any software.
          </p>
          <h3 className="text-xl font-bold text-purple-100/70 mt-6 mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200/50">
             <li>Visual Editor</li>
<li>Real-time Preview</li>
<li>CSS Code</li>
<li>Layer Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
