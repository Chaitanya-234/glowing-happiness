'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const [ua, setUa] = useState('');

  useEffect(() => {
    setUa(navigator.userAgent);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">User Agent Parser</h1>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 break-all font-mono text-purple-200/80 mb-8">
           {ua}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
           <div className="bg-black/40 p-4 rounded border border-purple-500/10">
             <div className="text-xs text-purple-500">Browser</div>
             <div className="text-lg text-purple-100">{ua.includes('Chrome') ? 'Chrome' : ua.includes('Firefox') ? 'Firefox' : 'Other'}</div>
           </div>
           <div className="bg-black/40 p-4 rounded border border-purple-500/10">
             <div className="text-xs text-purple-500">OS</div>
             <div className="text-lg text-purple-100">{ua.includes('Mac') ? 'macOS' : ua.includes('Win') ? 'Windows' : ua.includes('Linux') ? 'Linux' : 'Other'}</div>
           </div>
           <div className="bg-black/40 p-4 rounded border border-purple-500/10">
             <div className="text-xs text-purple-500">Mobile</div>
             <div className="text-lg text-purple-100">{/Mobi|Android/i.test(ua) ? 'Yes' : 'No'}</div>
           </div>
        </div>
      </div>
    </div>
  );
}
