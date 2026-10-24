'use client';

import React, { useState, useEffect } from 'react';
import { Bug, Check, X, RefreshCw, Clock, Heart, Skull } from 'lucide-react';

interface BugLevel {
  id: number;
  title: string;
  description: string;
  code: string;
  solution: string; // Simplified check
  bugType: string;
  hint: string;
}

const LEVELS: BugLevel[] = [
  {
    id: 1,
    title: 'The Infinite Loop',
    description: 'This loop never ends! Fix the condition.',
    code: `function countToTen() {
  let i = 0;
  while (i < 10) {
    console.log(i);
    // Missing increment?
  }
}`,
    solution: 'i++',
    bugType: 'Runtime Error',
    hint: 'You need to increment `i` inside the loop.'
  },
  {
    id: 2,
    title: 'Undefined Variable',
    description: 'We are trying to access a variable that is out of scope or undefined.',
    code: `function getName() {
  if (true) {
    let name = "Alice";
  }
  return name;
}`,
    solution: 'var name', // or move let outside
    bugType: 'Scope Error',
    hint: '`let` is block-scoped. `name` is not accessible outside the `if` block.'
  },
  {
    id: 3,
    title: 'Type Coercion Chaos',
    description: 'The addition is not working as expected. We want 30, not "1020".',
    code: `function add() {
  const a = "10";
  const b = 20;
  return a + b;
}`,
    solution: 'Number(a)',
    bugType: 'Logic Error',
    hint: 'Convert the string to a number before adding.'
  }
];

const BugHunt = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [userCode, setUserCode] = useState(LEVELS[0].code);
  const [status, setStatus] = useState<'playing' | 'success' | 'failed' | 'gameover'>('playing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60); // 60s per level

  const level = LEVELS[currentLevelIndex];

  useEffect(() => {
    setUserCode(level.code);
    setStatus('playing');
    setTimeLeft(60);
  }, [currentLevelIndex, level]);

  useEffect(() => {
    if (status !== 'playing') return;

    const timer = setInterval(() => {
        setTimeLeft(t => {
            if (t <= 1) {
                handleTimeOut();
                return 0;
            }
            return t - 1;
        });
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleTimeOut = () => {
      setLives(l => l - 1);
      if (lives <= 1) {
          setStatus('gameover');
      } else {
          setStatus('failed');
      }
  };

  const checkSolution = () => {
      // Very basic check logic for this game
      if (userCode.includes(level.solution) || (level.id === 2 && !userCode.includes('let name') && userCode.includes('return "Alice"'))) {
          setStatus('success');
          setScore(s => s + 100 + timeLeft); // Bonus for speed
      } else {
          setLives(l => l - 1);
          if (lives <= 1) {
              setStatus('gameover');
          } else {
              setStatus('failed');
          }
      }
  }

  const nextLevel = () => {
      if (currentLevelIndex < LEVELS.length - 1) {
          setCurrentLevelIndex(prev => prev + 1);
      } else {
          alert("You found all bugs! Total Score: " + score);
      }
  }

  const resetGame = () => {
      setCurrentLevelIndex(0);
      setScore(0);
      setLives(3);
      setStatus('playing');
  }

  return (
    <div className="flex flex-col lg:flex-row h-[80vh] w-full max-w-6xl mx-auto gap-6 p-4">
       <div className="w-full lg:w-1/3 flex flex-col gap-4">
           {/* Stats Board */}
           <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col gap-4">
               <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
                       <Heart fill={lives > 0 ? "currentColor" : "none"} /> {lives}
                   </div>
                   <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
                       <Clock /> {timeLeft}s
                   </div>
               </div>
               <div className="text-center">
                   <span className="text-gray-500 text-xs uppercase font-bold">Current Score</span>
                   <div className="text-4xl font-mono font-bold text-neonBlue">{score}</div>
               </div>
           </div>

           <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex-1">
               <div className="flex justify-between items-center mb-4">
                   <h2 className="text-xl font-bold text-white flex items-center gap-2"><Bug className="text-purple-400"/> Level {level.id}</h2>
               </div>
               <h3 className="text-lg font-bold text-gray-200 mb-2">{level.title}</h3>
               <p className="text-gray-400 mb-4 text-sm leading-relaxed">{level.description}</p>
               <div className="bg-red-900/20 text-red-300 text-xs px-3 py-1 rounded-full w-fit mb-4 border border-red-500/20">
                   Type: {level.bugType}
               </div>

               <div className="bg-gray-800 p-4 rounded-lg mt-auto">
                   <h4 className="font-bold text-sm text-gray-400 mb-2">Hint</h4>
                   <p className="text-sm text-gray-500 italic">{level.hint}</p>
               </div>
           </div>

           {status === 'success' && (
               <div className="bg-green-900/50 border border-green-500 p-6 rounded-xl text-center animate-bounce-in">
                   <Check className="w-12 h-12 text-green-400 mx-auto mb-2" />
                   <h3 className="text-xl font-bold text-white mb-2">Bug Squashed!</h3>
                   <button onClick={nextLevel} className="bg-green-500 text-black font-bold px-6 py-2 rounded-lg hover:bg-green-400 w-full">Next Bug</button>
               </div>
           )}

            {status === 'failed' && (
               <div className="bg-red-900/50 border border-red-500 p-6 rounded-xl text-center">
                   <X className="w-12 h-12 text-red-400 mx-auto mb-2" />
                   <h3 className="text-xl font-bold text-white mb-2">Wrong Fix!</h3>
                   <p className="text-red-200 text-sm mb-4">You lost a life.</p>
                   <button onClick={() => setStatus('playing')} className="bg-gray-700 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-600 w-full">Try Again</button>
               </div>
           )}

           {status === 'gameover' && (
               <div className="bg-red-950 border border-red-600 p-6 rounded-xl text-center">
                   <Skull className="w-12 h-12 text-red-500 mx-auto mb-2" />
                   <h3 className="text-2xl font-bold text-white mb-2">GAME OVER</h3>
                   <p className="text-red-200 text-sm mb-4">The bugs took over production.</p>
                   <button onClick={resetGame} className="bg-white text-red-900 font-bold px-6 py-2 rounded-lg hover:bg-gray-200 w-full">Restart Career</button>
               </div>
           )}
       </div>

       <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
           <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
               <span className="font-mono text-sm text-gray-400">buggy_code.js</span>
               <button onClick={() => setUserCode(level.code)} className="text-gray-400 hover:text-white" title="Reset Code"><RefreshCw size={16}/></button>
           </div>

           {/* Code Editor Area */}
           <div className="relative flex-1 bg-black">
                <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="absolute inset-0 w-full h-full bg-transparent text-gray-300 font-mono p-6 resize-none focus:outline-none text-lg leading-relaxed z-10"
                        spellCheck={false}
                />
                {/* Syntax Highlighting Overlay (Simple) */}
                <pre className="absolute inset-0 w-full h-full font-mono p-6 text-lg leading-relaxed pointer-events-none opacity-50">
                    <code dangerouslySetInnerHTML={{
                        __html: userCode
                            .replace(/function/g, '<span class="text-purple-400">function</span>')
                            .replace(/return/g, '<span class="text-pink-400">return</span>')
                            .replace(/const|let|var/g, '<span class="text-blue-400">const</span>')
                            .replace(/if|while|for/g, '<span class="text-yellow-400">if</span>')
                    }} />
                </pre>
           </div>

           <div className="p-4 border-t border-gray-800 bg-gray-900">
               <button
                onClick={checkSolution}
                disabled={status !== 'playing'}
                className="w-full bg-neonBlue text-black font-bold py-3 rounded-lg hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/20"
               >
                   Deploy Fix
               </button>
           </div>
       </div>
    </div>
  );
};

export default BugHunt;
