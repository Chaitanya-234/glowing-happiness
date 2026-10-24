'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SENTENCE = "The quick brown fox jumps over the lazy dog";

export default function ToolPage() {
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (text.length === 1 && startTime === 0) setStartTime(Date.now());
    if (text === SENTENCE) {
        const time = (Date.now() - startTime) / 1000 / 60; // minutes
        const words = SENTENCE.split(' ').length;
        setWpm(Math.round(words / time));
        setFinished(true);
    }
  }, [text, startTime]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
         <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">Typing Speed Test</h1>

         <div className="bg-purple-900/10 p-8 rounded-xl border border-purple-500/20 mb-8">
            <p className="text-2xl text-purple-100 mb-6 font-mono select-none">{SENTENCE}</p>
            <input
               type="text"
               value={text}
               onChange={(e) => setText(e.target.value)}
               disabled={finished}
               className="w-full bg-black/50 border border-purple-500/30 rounded p-4 text-center text-xl text-white focus:outline-none focus:border-purple-500"
               placeholder="Type the sentence above..."
            />
         </div>

         {finished && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl font-bold text-green-400">
               {wpm} WPM
               <button onClick={() => {setText(''); setStartTime(0); setFinished(false);}} className="block mx-auto mt-4 text-sm bg-purple-600 text-white px-4 py-2 rounded">Retry</button>
            </motion.div>
         )}
      </div>
    </div>
  );
}
