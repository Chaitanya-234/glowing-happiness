'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Award, ChevronRight, CheckCircle2, XCircle, Flag } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  template: string;
  testCases: { input: any[]; expected: any }[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Reverse String',
    description: 'Return the reversed version of the input string.',
    template: 'function solve(str) {\n  // Your code here\n}',
    testCases: [
      { input: ['hello'], expected: 'olleh' },
      { input: ['world'], expected: 'dlrow' },
      { input: ['123'], expected: '321' }
    ],
    difficulty: 'Easy'
  },
  {
    id: 2,
    title: 'FizzBuzz',
    description: 'Return "Fizz" if n is divisible by 3, "Buzz" if by 5, "FizzBuzz" if both, else n.',
    template: 'function solve(n) {\n  // Your code here\n}',
    testCases: [
      { input: [3], expected: 'Fizz' },
      { input: [5], expected: 'Buzz' },
      { input: [15], expected: 'FizzBuzz' },
      { input: [2], expected: 2 }
    ],
    difficulty: 'Easy'
  },
  {
    id: 3,
    title: 'Is Palindrome',
    description: 'Check if the string is a palindrome (ignoring case/spaces).',
    template: 'function solve(str) {\n  // Your code here\n}',
    testCases: [
        { input: ['Race car'], expected: true },
        { input: ['hello'], expected: false },
    ],
    difficulty: 'Medium'
  }
];

const CodeGolf = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [code, setCode] = useState(CHALLENGES[0].template);
  const [output, setOutput] = useState<{ status: 'idle' | 'success' | 'failure'; message: string }>({ status: 'idle', message: '' });
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCode(selectedChallenge.template);
    setOutput({ status: 'idle', message: '' });
  }, [selectedChallenge]);

  useEffect(() => {
    setCharCount(code.replace(/\s/g, '').length); // Basic golf count: ignore whitespace? Usually golf counts bytes including whitespace, but let's be lenient or strict. Let's count all chars for standard golf.
    setCharCount(code.length);
  }, [code]);

  const runCode = () => {
    try {
      // Security note: eval is dangerous. In a real app, use a sandboxed iframe or a backend runner.
      // Since this is a client-side game for developers, we assume they won't XSS themselves,
      // but we should ideally wrap this. For this MVP, we use new Function() which is slightly safer than eval but still has access to globals.

      const userFunc = new Function('return ' + code)();

      if (typeof userFunc !== 'function') {
          throw new Error("Code must return a function named 'solve' or be an anonymous function expression.");
      }

      let allPassed = true;

      for (const test of selectedChallenge.testCases) {
          const result = userFunc(...test.input);
          if (JSON.stringify(result) !== JSON.stringify(test.expected)) {
              allPassed = false;
              setOutput({
                  status: 'failure',
                  message: `Failed: Input [${test.input}] => Expected ${JSON.stringify(test.expected)}, Got ${JSON.stringify(result)}`
              });
              break;
          }
      }

      if (allPassed) {
          setOutput({ status: 'success', message: 'All Test Cases Passed!' });
      }

    } catch (err: any) {
        setOutput({ status: 'failure', message: err.message });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen max-h-[900px] w-full max-w-7xl mx-auto gap-6 p-4">
       {/* Sidebar */}
       <div className="w-full lg:w-1/4 bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-2 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Flag className="text-neonBlue" /> Challenges
            </h2>
            {CHALLENGES.map(c => (
                <button
                    key={c.id}
                    onClick={() => setSelectedChallenge(c)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                        selectedChallenge.id === c.id
                        ? 'bg-neonBlue/20 border-neonBlue text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    <div className="font-bold flex justify-between">
                        {c.title}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {c.difficulty}
                        </span>
                    </div>
                </button>
            ))}
       </div>

       {/* Editor Area */}
       <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h1 className="text-2xl font-bold text-white mb-2">{selectedChallenge.title}</h1>
                <p className="text-gray-400 mb-4">{selectedChallenge.description}</p>
                <div className="flex gap-4 text-sm font-mono bg-black/30 p-3 rounded-lg border border-white/5">
                    <span className="text-gray-500">Target: Minimize Characters</span>
                    <span className="text-neonBlue font-bold">{charCount} chars</span>
                </div>
            </div>

            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300">Solution.js</span>
                    <div className="flex gap-2">
                         <button
                            onClick={() => setCode(selectedChallenge.template)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                            title="Reset"
                         >
                             <RotateCcw size={18} />
                         </button>
                         <button
                            onClick={runCode}
                            className="flex items-center gap-2 px-4 py-1.5 bg-neonBlue text-black font-bold rounded hover:bg-blue-400 transition-colors"
                         >
                             <Play size={16} /> Run Tests
                         </button>
                    </div>
                </div>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-black text-gray-300 font-mono p-4 resize-none focus:outline-none leading-relaxed"
                    spellCheck={false}
                />
            </div>

            {/* Output Console */}
            <div className={`h-32 rounded-xl border p-4 font-mono text-sm overflow-y-auto transition-colors ${
                output.status === 'idle' ? 'bg-gray-900 border-gray-800 text-gray-500' :
                output.status === 'success' ? 'bg-green-900/20 border-green-500/50 text-green-400' :
                'bg-red-900/20 border-red-500/50 text-red-400'
            }`}>
                {output.status === 'idle' && "Ready to run..."}
                {output.status === 'success' && (
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} /> {output.message}
                    </div>
                )}
                {output.status === 'failure' && (
                     <div className="flex items-start gap-2">
                        <XCircle size={18} className="mt-0.5" />
                        <span className="whitespace-pre-wrap">{output.message}</span>
                    </div>
                )}
            </div>
       </div>
    </div>
  );
};

export default CodeGolf;
