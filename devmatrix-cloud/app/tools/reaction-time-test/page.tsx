'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ToolPage() {
  const [state, setState] = useState<'waiting' | 'ready' | 'now' | 'result'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState(0);

  const handleClick = () => {
    if (state === 'waiting' || state === 'result') {
        setState('ready');
        setTimeout(() => {
            setState('now');
            setStartTime(Date.now());
        }, 2000 + Math.random() * 3000);
    } else if (state === 'ready') {
        setState('waiting'); // Too early
        alert('Too early!');
    } else if (state === 'now') {
        setResult(Date.now() - startTime);
        setState('result');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 select-none">
      <div
         onClick={handleClick}
         className={`max-w-4xl mx-auto h-[500px] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200
         ${state === 'waiting' || state === 'result' ? 'bg-purple-900/20 border-purple-500/20 hover:bg-purple-900/30' : ''}
         ${state === 'ready' ? 'bg-red-900/50 border-red-500' : ''}
         ${state === 'now' ? 'bg-green-500 border-green-400' : ''}
         border-2`}
      >
         {state === 'waiting' && <h2 className="text-3xl font-bold text-purple-100">Click to Start</h2>}
         {state === 'ready' && <h2 className="text-3xl font-bold text-red-100">Wait for Green...</h2>}
         {state === 'now' && <h2 className="text-6xl font-bold text-white">CLICK!</h2>}
         {state === 'result' && (
             <div className="text-center">
                 <h2 className="text-6xl font-bold text-white mb-4">{result} ms</h2>
                 <p className="text-purple-200">Click to try again</p>
             </div>
         )}
      </div>
    </div>
  );
}
