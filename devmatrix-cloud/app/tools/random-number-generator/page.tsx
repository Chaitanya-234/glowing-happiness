'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    const nums = [];
    for(let i=0; i<count; i++) {
        nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setNumbers(nums);
  };

  useEffect(() => {
    generate();
  }, []); // Run once on mount


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60">
            Random Number Generator
          </h1>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-8 backdrop-blur-sm grid md:grid-cols-2 gap-12">
           <div className="space-y-6">

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Min Value</label>
               <input
                 type="number"
                 value={min}
                 onChange={(e) => setMin(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Max Value</label>
               <input
                 type="number"
                 value={max}
                 onChange={(e) => setMax(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Count</label>
               <input
                 type="number"
                 value={count}
                 onChange={(e) => setCount(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

           </div>

           <div className="bg-black/40 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-purple-500/20">

             <div className="w-full">
               <button onClick={generate} className="mb-6 px-6 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-500 transition-all">Generate New</button>
               <div className="flex flex-wrap gap-3 justify-center max-h-60 overflow-y-auto">
                 {numbers.map((n, i) => (
                    <span key={i} className="text-2xl font-mono bg-purple-900/30 px-3 py-1 rounded text-purple-100 border border-purple-500/20">{n}</span>
                 ))}
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
