'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [bill, setBill] = useState(100);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);

  const tipAmount = (bill * tip) / 100;
  const total = bill + tipAmount;
  const perPerson = people > 0 ? total / people : 0;


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60">
            Tip Calculator
          </h1>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-8 backdrop-blur-sm grid md:grid-cols-2 gap-12">
           <div className="space-y-6">

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Bill Amount ($)</label>
               <input
                 type="number"
                 value={bill}
                 onChange={(e) => setBill(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Tip Percentage (%)</label>
               <input
                 type="number"
                 value={tip}
                 onChange={(e) => setTip(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Number of People</label>
               <input
                 type="number"
                 value={people}
                 onChange={(e) => setPeople(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

           </div>

           <div className="bg-black/40 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-purple-500/20">

             <div className="space-y-6 w-full text-left">
               <div className="bg-purple-900/20 p-4 rounded-lg flex justify-between items-end">
                 <div>
                   <div className="text-xs text-purple-200/60">Tip Amount</div>
                   <div className="text-2xl font-bold text-purple-100">${tipAmount.toFixed(2)}</div>
                 </div>
                 <div className="text-right">
                   <div className="text-xs text-purple-200/60">Total Bill</div>
                   <div className="text-2xl font-bold text-purple-100">${total.toFixed(2)}</div>
                 </div>
               </div>

               <div className="text-center pt-4">
                 <div className="text-sm text-purple-200/60 mb-1">Total Per Person</div>
                 <div className="text-5xl font-bold text-purple-100">${perPerson.toFixed(2)}</div>
               </div>
             </div>

           </div>
        </div>
      </div>
    </div>
  );
}
