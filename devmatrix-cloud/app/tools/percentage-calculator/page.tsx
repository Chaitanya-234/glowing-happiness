'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [percent, setPercent] = useState(10);
  const [value, setValue] = useState(100);
  const result = (percent / 100) * value;


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60">
            Percentage Calculator
          </h1>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-8 backdrop-blur-sm grid md:grid-cols-2 gap-12">
           <div className="space-y-6">

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">What is ... %</label>
               <input
                 type="number"
                 value={percent}
                 onChange={(e) => setPercent(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">of ... ?</label>
               <input
                 type="number"
                 value={value}
                 onChange={(e) => setValue(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

           </div>

           <div className="bg-black/40 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-purple-500/20">

             <div className="text-sm text-purple-200/60 mb-2">Result</div>
             <div className="text-5xl font-bold text-purple-100 mb-2">{result.toLocaleString()}</div>
             <div className="text-sm text-purple-200/40">{percent}% of {value} is {result}</div>

           </div>
        </div>
      </div>
    </div>
  );
}
