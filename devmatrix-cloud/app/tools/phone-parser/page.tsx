'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const [phone, setPhone] = useState('');

  // Fake parsing logic
  const clean = phone.replace(/[^0-9+]/g, '');
  const country = clean.startsWith('+1') ? 'USA/Canada' : clean.startsWith('+44') ? 'UK' : clean.startsWith('+91') ? 'India' : 'Unknown';

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
       <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-100">Phone Number Parser</h1>
          <input
             value={phone}
             onChange={(e) => setPhone(e.target.value)}
             placeholder="+1 555 123 4567"
             className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-4 text-purple-100 text-xl mb-8 focus:outline-none focus:border-purple-500"
          />

          <div className="bg-purple-900/5 p-6 rounded-lg border border-purple-500/10 space-y-4">
             <div className="flex justify-between">
                <span className="text-purple-200/50">Clean Format</span>
                <span className="text-purple-100 font-mono">{clean}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-purple-200/50">Country Code</span>
                <span className="text-purple-100 font-mono">{country}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-purple-200/50">Length</span>
                <span className="text-purple-100 font-mono">{clean.length} digits</span>
             </div>
          </div>
       </div>
    </div>
  );
}
