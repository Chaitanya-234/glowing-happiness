'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  const bmi = height > 0 ? weight / ((height / 100) ** 2) : 0;

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-yellow-400' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-400' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-400' };
    return { text: 'Obese', color: 'text-red-400' };
  };

  const category = getCategory(bmi);


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60">
            BMI Calculator
          </h1>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-8 backdrop-blur-sm grid md:grid-cols-2 gap-12">
           <div className="space-y-6">

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Weight (kg)</label>
               <input
                 type="number"
                 value={weight}
                 onChange={(e) => setWeight(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

            <div className="space-y-2">
               <label className="text-purple-200/60 text-sm">Height (cm)</label>
               <input
                 type="number"
                 value={height}
                 onChange={(e) => setHeight(Number(e.target.value))}
                 className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-3 text-purple-100 focus:outline-none focus:border-purple-500/50"
               />
            </div>

           </div>

           <div className="bg-black/40 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-purple-500/20">

             <div className="text-sm text-purple-200/60 mb-2">Your BMI Score</div>
             <div className="text-6xl font-bold text-purple-100 mb-4">{bmi.toFixed(1)}</div>
             <div className={`text-xl font-semibold ${category.color}`}>{category.text}</div>

           </div>
        </div>
      </div>
    </div>
  );
}
