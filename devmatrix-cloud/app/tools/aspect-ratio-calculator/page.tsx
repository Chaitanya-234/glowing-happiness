'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(width, height);
  const ratioW = width / divisor;
  const ratioH = height / divisor;


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60">
            Aspect Ratio Calculator
          </h1>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-8 backdrop-blur-sm grid md:grid-cols-2 gap-12">
           <div className="space-y-6">

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Width</label>
               <input
                 type="number"
                 value={width}
                 onChange={(e) => setWidth(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Height</label>
               <input
                 type="number"
                 value={height}
                 onChange={(e) => setHeight(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

           </div>

           <div className="bg-black/40 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-purple-500/20">

             <div className="space-y-8">
               <div>
                  <div className="text-sm text-purple-200/60 mb-2">Aspect Ratio</div>
                  <div className="text-5xl font-bold text-purple-100">{ratioW}:{ratioH}</div>
               </div>

               <div className="w-full h-32 bg-black/50 rounded flex items-center justify-center border border-white/10">
                 <div
                    className="bg-purple-500/50 border border-purple-500"
                    style={{
                      aspectRatio: `${width}/${height}`,
                      height: '80%',
                    }}
                 ></div>
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
