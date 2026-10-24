'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // Simple beep
      audio.play().catch(() => {});
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 via-purple-100/60 to-purple-200/80">
            Pomodoro Timer
          </h1>
          <p className="text-lg text-purple-200/50">
            Boost productivity with focus intervals.
          </p>
        </motion.div>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-full p-12 w-64 h-64 mx-auto flex items-center justify-center mb-8 relative">
           <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
             <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="2" />
             <circle
                cx="50" cy="50" r="45" fill="none" stroke="#a855f7" strokeWidth="4"
                strokeDasharray="283"
                strokeDashoffset={283 - (timeLeft / (mode === 'focus' ? 1500 : 300)) * 283}
                className="transition-all duration-1000 ease-linear"
             />
           </svg>
           <div className="text-5xl font-mono text-purple-100 font-bold z-10">
             {formatTime(timeLeft)}
           </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
           <button onClick={() => switchMode('focus')} className={`px-4 py-2 rounded-full ${mode === 'focus' ? 'bg-purple-600 text-white' : 'bg-purple-900/20 text-purple-300'}`}>Focus</button>
           <button onClick={() => switchMode('break')} className={`px-4 py-2 rounded-full ${mode === 'break' ? 'bg-purple-600 text-white' : 'bg-purple-900/20 text-purple-300'}`}>Break</button>
        </div>

        <div className="flex justify-center gap-4">
           <button onClick={toggleTimer} className="px-8 py-3 bg-purple-100 text-purple-900 rounded-lg font-bold hover:bg-purple-200 transition-colors">
             {isActive ? 'Pause' : 'Start'}
           </button>
           <button onClick={resetTimer} className="px-8 py-3 bg-purple-900/30 text-purple-100 rounded-lg font-bold hover:bg-purple-800/50 transition-colors border border-purple-500/30">
             Reset
           </button>
        </div>
      </div>
    </div>
  );
}
