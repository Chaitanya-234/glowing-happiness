'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);
  const savings = (price * discount) / 100;
  const finalPrice = price - savings;


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60">
            Discount Calculator
          </h1>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-8 backdrop-blur-sm grid md:grid-cols-2 gap-12">
           <div className="space-y-6">

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Original Price ($)</label>
               <input
                 type="number"
                 value={price}
                 onChange={(e) => setPrice(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Discount (%)</label>
               <input
                 type="number"
                 value={discount}
                 onChange={(e) => setDiscount(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

           </div>

           <div className="bg-black/40 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-purple-500/20">

             <div className="space-y-6 w-full">
               <div>
                 <div className="text-sm text-purple-200/60">Final Price</div>
                 <div className="text-5xl font-bold text-green-400">${finalPrice.toFixed(2)}</div>
               </div>
               <div className="flex justify-between border-t border-white/10 pt-4">
                 <span className="text-purple-200/60">You Save</span>
                 <span className="text-purple-100">${savings.toFixed(2)}</span>
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
