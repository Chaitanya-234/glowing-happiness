'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const [cc, setCc] = useState('');

  const luhnCheck = (val: string) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = val.length - 1; i >= 0; i--) {
      let digit = parseInt(val.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  const clean = cc.replace(/[^0-9]/g, '');
  const isValid = clean.length > 12 && luhnCheck(clean);
  const type = /^4/.test(clean) ? 'Visa' : /^5/.test(clean) ? 'MasterCard' : /^3/.test(clean) ? 'Amex' : 'Unknown';

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
       <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-100">Credit Card Validator</h1>
          <input
             value={cc}
             onChange={(e) => setCc(e.target.value)}
             placeholder="Enter card number..."
             className="w-full bg-purple-900/10 border border-purple-500/20 rounded p-4 text-purple-100 text-xl mb-8 focus:outline-none focus:border-purple-500"
          />

          <div className="flex items-center justify-center gap-4 mb-8">
             <div className={`text-2xl font-bold ${isValid ? 'text-green-400' : 'text-red-400'}`}>
                {clean.length > 0 ? (isValid ? 'Valid' : 'Invalid') : 'Enter Number'}
             </div>
             {isValid && <div className="text-purple-200 bg-purple-900/40 px-3 py-1 rounded">{type}</div>}
          </div>
       </div>
    </div>
  );
}
