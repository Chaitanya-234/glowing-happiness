'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const [num, setNum] = useState(2024);

  const toRoman = (num: number) => {
    const lookup: any = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '';
    for (let i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
         <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">Roman Numeral Converter</h1>

         <input
            type="number"
            value={num}
            onChange={(e) => setNum(Number(Number(e.target.value)))}
            className="w-full max-w-xs bg-purple-900/10 border border-purple-500/20 rounded p-4 text-center text-2xl text-purple-100 mb-12 focus:outline-none focus:border-purple-500"
         />

         <div className="text-7xl font-serif text-purple-100 font-bold tracking-widest break-all">
            {toRoman(num)}
         </div>
      </div>
    </div>
  );
}
