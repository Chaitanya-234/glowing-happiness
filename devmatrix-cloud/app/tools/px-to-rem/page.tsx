'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [px, setPx] = useState<string>('16');
  const [rem, setRem] = useState<string>('1');
  const [base, setBase] = useState<string>('16');

  const handlePxChange = (val: string) => {
    setPx(val);
    const p = parseFloat(val);
    const b = parseFloat(base);
    if (!isNaN(p) && !isNaN(b) && b !== 0) {
        setRem((p / b).toString());
    } else if (val === '') {
        setRem('');
    }
  };

  const handleBaseChange = (val: string) => {
    setBase(val);
    const b = parseFloat(val);
    const p = parseFloat(px);
    if (!isNaN(p) && !isNaN(b) && b !== 0) {
        setRem((p / b).toString());
    }
  };

  const handleRemChange = (val: string) => {
    setRem(val);
    const r = parseFloat(val);
    const b = parseFloat(base);
    if (!isNaN(r) && !isNaN(b)) {
        setPx((r * b).toString());
    } else if (val === '') {
        setPx('');
    }
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
            PX to REM Converter
          </h1>
          <p className="text-lg text-purple-200/50 max-w-2xl mx-auto">
            Convert pixels to REM and vice versa based on root font size. Essential for responsive web design.
          </p>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">

          <div className="grid md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Pixels (px)</label>
               <input type="number" value={px} onChange={(e) => handlePxChange(e.target.value)} className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50" />
            </div>
            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Base Size (px)</label>
               <input type="number" value={base} onChange={(e) => handleBaseChange(e.target.value)} className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50" />
            </div>
            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">REM</label>
               <input type="number" value={rem} onChange={(e) => handleRemChange(e.target.value)} className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50" />
            </div>
          </div>

        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert prose-purple max-w-none">
          <h2 className="text-2xl font-bold text-purple-100/70 mb-4">About PX to REM Converter</h2>
          <p className="text-purple-200/50">
            The PX to REM Converter is a free online utility designed for developers, designers, and digital professionals.
            It allows you to convert pixels to rem and vice versa based on root font size. essential for responsive web design. quickly and efficiently directly in your browser without installing any software.
          </p>
          <h3 className="text-xl font-bold text-purple-100/70 mt-6 mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200/50">
             <li>Bidirectional</li>
<li>Custom Base Size</li>
<li>Instant Calc</li>
<li>Clean UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
