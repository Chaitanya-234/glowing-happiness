'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setTime((t) => t + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const lap = () => setLaps([time, ...laps]);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">Stopwatch</h1>
        </motion.div>

        <div className="text-7xl font-mono text-center text-purple-100 font-bold mb-12 tracking-wider">
           {formatTime(time)}
        </div>

        <div className="flex justify-center gap-4 mb-12">
           <button onClick={() => setIsRunning(!isRunning)} className={`w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold border-4 transition-all ${isRunning ? 'border-red-500/50 text-red-400 bg-red-900/10' : 'border-green-500/50 text-green-400 bg-green-900/10'}`}>
             {isRunning ? 'Stop' : 'Start'}
           </button>
           <button onClick={lap} disabled={!isRunning} className="w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold border-4 border-purple-500/30 text-purple-200 bg-purple-900/10 disabled:opacity-50">
             Lap
           </button>
           <button onClick={reset} className="w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold border-4 border-gray-500/30 text-gray-300 bg-gray-900/10">
             Reset
           </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
           {laps.map((lapTime, i) => (
             <div key={i} className="flex justify-between items-center p-3 bg-purple-900/10 border border-purple-500/10 rounded">
                <span className="text-purple-200/50">Lap {laps.length - i}</span>
                <span className="font-mono text-purple-100">{formatTime(lapTime)}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
