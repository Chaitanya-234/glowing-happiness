'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    const update = () => {
        setInfo({
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.devicePixelRatio,
            orientation: window.screen.orientation?.type || 'unknown',
            colorDepth: window.screen.colorDepth,
            touch: 'ontouchstart' in window,
            cores: navigator.hardwareConcurrency
        });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
         <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">Device Information</h1>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(info).map(([key, val]) => (
                <div key={key} className="bg-purple-900/10 border border-purple-500/20 p-6 rounded-lg">
                    <div className="text-sm text-purple-400 uppercase tracking-wider mb-2">{key}</div>
                    <div className="text-2xl font-bold text-purple-100">{String(val)}</div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
