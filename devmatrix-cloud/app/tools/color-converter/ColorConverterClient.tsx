// app/tools/color-converter/ColorConverterClient.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { colord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import namesPlugin from 'colord/plugins/names';

extend([cmykPlugin, namesPlugin]);

export default function ColorConverterClient() {
  const [color, setColor] = useState('#6d28d9');
  const [input, setInput] = useState('#6d28d9');

  const updateColor = (newColor: string) => {
    setInput(newColor);
    if (colord(newColor).isValid()) {
      setColor(newColor);
    }
  };

  const c = colord(color);

  const formats = [
    { label: 'HEX', value: c.toHex() },
    { label: 'RGB', value: c.toRgbString() },
    { label: 'HSL', value: c.toHslString() },
    { label: 'CMYK', value: c.toCmykString() },
    { label: 'Name', value: c.toName({ closest: true }) || 'Unknown' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        Color Converter
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Convert colors between HEX, RGB, HSL, and more.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* Input Section */}
        <div className="space-y-6">
           <div>
             <label className="block text-purple-200/60 mb-2 font-semibold">Color Input</label>
             <div className="flex gap-4">
               <input
                 type="text"
                 value={input}
                 onChange={(e) => updateColor(e.target.value)}
                 className="flex-1 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
                 placeholder="#6d28d9 or rgb(109, 40, 217)"
               />
               <input
                 type="color"
                 value={c.toHex()}
                 onChange={(e) => updateColor(e.target.value)}
                 className="h-14 w-14 bg-transparent border-0 cursor-pointer"
               />
             </div>
           </div>

           <div className="h-48 rounded-xl shadow-inner border border-purple-500/20" style={{ backgroundColor: color }}></div>
        </div>

        {/* Output Section */}
        <div className="bg-purple-900/10 rounded-xl border border-purple-500/20 p-6 space-y-4">
          <h3 className="text-xl font-bold text-purple-100/70 mb-4">Converted Formats</h3>
          {formats.map((fmt) => (
            <div key={fmt.label} className="group relative">
               <label className="text-xs text-purple-300/40 uppercase font-bold tracking-wider mb-1 block">{fmt.label}</label>
               <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-purple-500/10 group-hover:border-purple-500/30 transition-all">
                  <code className="text-purple-100/90 font-mono text-sm">{fmt.value}</code>
                  <button
                    onClick={() => copyToClipboard(fmt.value)}
                    className="text-purple-400/60 hover:text-purple-200 transition-colors p-1"
                    title="Copy"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
