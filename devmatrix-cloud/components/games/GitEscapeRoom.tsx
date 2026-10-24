'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CheckCircle2, AlertCircle, GitGraph, ArrowRight } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  description: string;
  objective: string;
  initialFiles: Record<string, string>;
  solutionCheck: (history: string[], files: Record<string, string>, branch: string) => boolean;
  hints: string[];
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Init & Commit',
    description: 'You are in a new project directory. Initialize a git repository and commit the "index.js" file.',
    objective: 'Run git init, git add, and git commit.',
    initialFiles: { 'index.js': 'console.log("Hello World");' },
    solutionCheck: (history, files, branch) => {
      const hasInit = history.some(c => c.includes('git init'));
      const hasAdd = history.some(c => c.includes('git add index.js') || c.includes('git add .'));
      const hasCommit = history.some(c => c.includes('git commit'));
      return hasInit && hasAdd && hasCommit;
    },
    hints: ['Start with `git init`', 'Add the file using `git add index.js`', 'Commit using `git commit -m "message"`']
  },
  {
    id: 2,
    name: 'New Branch',
    description: 'We need a new feature. Create a branch named "feature-login" and switch to it.',
    objective: 'Create and checkout a new branch.',
    initialFiles: { 'index.js': 'console.log("App running");' },
    solutionCheck: (history, files, branch) => {
        return branch === 'feature-login';
    },
    hints: ['Use `git checkout -b feature-login` or `git branch` then `git checkout`']
  },
  {
    id: 3,
    name: 'Merge Conflict (Simulation)',
    description: 'Merge "feature-login" into "main". (For this simulation, just run the merge command).',
    objective: 'Switch to main and merge feature-login.',
    initialFiles: { 'index.js': 'console.log("App running");' },
    solutionCheck: (history, files, branch) => {
       const onMain = branch === 'main';
       const merged = history.some(c => c.includes('git merge feature-login'));
       return onMain && merged;
    },
    hints: ['`git checkout main`', '`git merge feature-login`']
  }
];

// Simple Commit Type
interface CommitNode {
    id: string;
    branch: string;
    message: string;
    parents: string[];
    x: number;
    y: number;
}

const GitEscapeRoom = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [branch, setBranch] = useState('main');
  const [levelComplete, setLevelComplete] = useState(false);

  // Graph State
  const [commits, setCommits] = useState<CommitNode[]>([]);
  const [repoInitialized, setRepoInitialized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentLevel = LEVELS[currentLevelIndex];

  useEffect(() => {
    resetLevel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const resetLevel = () => {
    setFiles({ ...currentLevel.initialFiles });
    setHistory([`Welcome to Level ${currentLevel.id}: ${currentLevel.name}`, currentLevel.description, 'Objective: ' + currentLevel.objective]);
    setCmdHistory([]);
    setBranch('main');
    setLevelComplete(false);
    setCommand('');

    // Reset Graph - Start blank or with initial commit depending on level?
    // Level 1 starts blank. Level 2 starts with 1 commit.
    if (currentLevel.id === 1) {
        setCommits([]);
        setRepoInitialized(false);
    } else {
        setRepoInitialized(true);
        setCommits([{ id: 'c1', branch: 'main', message: 'Initial commit', parents: [], x: 50, y: 50 }]);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.trim();
    setHistory(prev => [...prev, `$ ${cmd}`]);
    setCmdHistory(prev => [...prev, cmd]);
    setCommand('');

    processCommand(cmd);
  };

  const processCommand = (cmd: string) => {
    const parts = cmd.split(' ');

    if (parts[0] !== 'git' && parts[0] !== 'ls' && parts[0] !== 'clear' && parts[0] !== 'help') {
      setHistory(prev => [...prev, `bash: ${parts[0]}: command not found`]);
      return;
    }

    if (parts[0] === 'clear') {
        setHistory([]);
        return;
    }

    if (parts[0] === 'git') {
        const subCmd = parts[1];

        if (subCmd === 'init') {
            if (repoInitialized) {
                setHistory(prev => [...prev, 'Reinitialized existing Git repository']);
            } else {
                setHistory(prev => [...prev, 'Initialized empty Git repository in /app/.git/']);
                setRepoInitialized(true);
            }
        } else if (!repoInitialized) {
            setHistory(prev => [...prev, 'fatal: not a git repository (or any of the parent directories): .git']);
            return;
        }

        if (subCmd === 'commit') {
             if (!cmd.includes('-m')) {
                 setHistory(prev => [...prev, 'Aborting commit due to empty commit message.']);
             } else {
                 const msg = cmd.split('"')[1] || 'commit';
                 setHistory(prev => [...prev, `[${branch} ${Math.random().toString(16).substr(2, 7)}] ${msg}`]);

                 // Add to Graph
                 addCommitToGraph(msg);
             }
        } else if (subCmd === 'checkout') {
             if (parts[2] === '-b') {
                 if (parts[3]) {
                    setBranch(parts[3]);
                    setHistory(prev => [...prev, `Switched to a new branch '${parts[3]}'`]);
                 } else {
                     setHistory(prev => [...prev, `fatal: option '-b' requires a value`]);
                 }
             } else {
                 if(parts[2]) {
                    setBranch(parts[2]);
                    setHistory(prev => [...prev, `Switched to branch '${parts[2]}'`]);
                 } else {
                     setHistory(prev => [...prev, 'checkout what?']);
                 }
             }
        } else if (subCmd === 'merge') {
            const targetBranch = parts[2];
            setHistory(prev => [...prev, 'Merge successful.']);
            // Visual merge
            addMergeCommitToGraph(targetBranch);
        }
    }

    // Check Level Complete
    setTimeout(() => {
        if (currentLevel.solutionCheck([...cmdHistory, cmd], files, parts[0] === 'git' && parts[1] === 'checkout' && parts[2] !== '-b' ? parts[2] : (parts[1] === 'checkout' && parts[2] === '-b' ? parts[3] : branch))) {
            if(!levelComplete) {
                setLevelComplete(true);
                setHistory(prev => [...prev, '✅ LEVEL COMPLETE! Type "next" or click Next Level.']);
            }
        }
    }, 100);
  };

  const addCommitToGraph = (msg: string) => {
      setCommits(prev => {
          // Find parent (latest commit on current branch)
          // Simplified: Parent is the last commit added, unless we track HEAD per branch.
          // For this game, assuming linear or simple branching where we attach to the last commit visually for now, or last commit of 'branch'.

          const parent = prev.slice().reverse().find(c => c.branch === branch) || prev[prev.length - 1];

          const newY = parent ? parent.y + 60 : 50;
          const newX = branch === 'main' ? 50 : 150; // Simple visual separation for branches

          return [...prev, {
              id: Math.random().toString(36).substr(2, 7),
              branch,
              message: msg,
              parents: parent ? [parent.id] : [],
              x: newX,
              y: newY
          }];
      });
  };

  const addMergeCommitToGraph = (fromBranch: string) => {
       setCommits(prev => {
          const parent1 = prev.slice().reverse().find(c => c.branch === branch); // Current branch head
          const parent2 = prev.slice().reverse().find(c => c.branch === fromBranch); // Merge target head

          if (!parent1 || !parent2) return prev;

          const newY = Math.max(parent1.y, parent2.y) + 60;
          const newX = branch === 'main' ? 50 : 150;

          return [...prev, {
              id: Math.random().toString(36).substr(2, 7),
              branch,
              message: `Merge branch '${fromBranch}'`,
              parents: [parent1.id, parent2.id],
              x: newX,
              y: newY
          }];
       });
  }

  const nextLevel = () => {
      if(currentLevelIndex < LEVELS.length - 1) {
          setCurrentLevelIndex(prev => prev + 1);
      } else {
          setHistory(prev => [...prev, '🎉 ALL LEVELS COMPLETE! You are a Git Master.']);
      }
  }

  return (
    <div className="flex flex-col lg:flex-row h-[85vh] w-full max-w-7xl mx-auto gap-4 p-4">
      {/* Left Column: Terminal & Objective */}
      <div className="flex-1 flex flex-col gap-4 min-w-[50%]">
          {/* Objective Box */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                   <GitGraph size={100} />
               </div>
               <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    Level {currentLevel.id}: {currentLevel.name}
               </h2>
               <p className="text-gray-400 mb-4 text-sm">{currentLevel.description}</p>
               <div className="bg-blue-900/30 border border-blue-500/30 p-3 rounded-lg text-blue-200 text-sm font-mono flex gap-2">
                   <CheckCircle2 className="shrink-0 text-blue-400" size={18} />
                   Objective: {currentLevel.objective}
               </div>
          </div>

          {/* Terminal */}
          <div className="flex-1 bg-black border border-gray-800 rounded-xl overflow-hidden flex flex-col font-mono text-sm shadow-2xl relative">
                <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="ml-4 text-gray-400 text-xs flex-1 text-center">user@devmatrix:~/project ({branch})</div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex-1 p-4 overflow-y-auto space-y-1 text-gray-300"
                >
                    {history.map((line, i) => (
                        <div key={i} className={line.startsWith('$') ? 'text-white font-bold mt-2' : (line.includes('git: ') ? 'text-red-400' : (line.includes('COMPLETE') ? 'text-green-400 font-bold' : ''))}>
                            {line}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleCommand} className="p-4 bg-gray-900/50 border-t border-gray-800 flex items-center gap-2">
                    <span className="text-green-500 font-bold">➜</span>
                    <span className="text-blue-400 font-bold">{branch}</span>
                    <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0"
                        placeholder="Type git command..."
                        autoFocus
                        spellCheck={false}
                    />
                </form>

                 {levelComplete && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center animate-bounce-in">
                            <h3 className="text-3xl font-bold text-white mb-4">Level Complete!</h3>
                            <button
                                onClick={nextLevel}
                                className="px-8 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 flex items-center gap-2 mx-auto"
                            >
                                Next Challenge <ArrowRight />
                            </button>
                        </div>
                    </div>
                )}
          </div>
      </div>

      {/* Right Column: Visual Git Graph */}
      <div className="w-full lg:w-[400px] bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <span className="font-bold text-gray-700 flex items-center gap-2"><GitGraph size={18}/> Repository Visualizer</span>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">HEAD: {branch}</span>
          </div>
          <div className="flex-1 bg-gray-100 p-4 overflow-y-auto relative">
               {!repoInitialized && (
                   <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm text-center">
                       <AlertCircle size={48} className="mb-2 opacity-50" />
                       No Repository Found.<br/>Run `git init` to start.
                   </div>
               )}
               {repoInitialized && (
                   <svg className="w-full min-h-full">
                       {/* Edges */}
                       {commits.map(commit => commit.parents.map(parentId => {
                           const parent = commits.find(c => c.id === parentId);
                           if (!parent) return null;
                           return (
                               <line
                                   key={`${commit.id}-${parentId}`}
                                   x1={parent.x}
                                   y1={parent.y}
                                   x2={commit.x}
                                   y2={commit.y}
                                   stroke="#9ca3af"
                                   strokeWidth="3"
                               />
                           );
                       }))}

                       {/* Nodes */}
                       {commits.map(commit => (
                           <g key={commit.id}>
                               <circle
                                   cx={commit.x}
                                   cy={commit.y}
                                   r="8"
                                   fill={commit.branch === 'main' ? '#3b82f6' : '#a855f7'}
                                   stroke="white"
                                   strokeWidth="2"
                               />
                               <text x={commit.x + 15} y={commit.y + 4} className="text-[10px] font-mono fill-gray-600 font-bold">
                                   {commit.id.substring(0,4)}
                               </text>
                               <text x={commit.x + 50} y={commit.y + 4} className="text-[10px] fill-gray-500">
                                   {commit.message}
                               </text>
                           </g>
                       ))}

                       {/* HEAD Indicator */}
                       {commits.length > 0 && (() => {
                           const lastCommit = commits.slice().reverse().find(c => c.branch === branch);
                           if (lastCommit) {
                               return (
                                   <g transform={`translate(${lastCommit.x - 25}, ${lastCommit.y - 5})`}>
                                       <rect width="20" height="10" rx="2" fill="#ef4444" />
                                       <text x="2" y="7" fontSize="6" fill="white" fontWeight="bold">HEAD</text>
                                   </g>
                               );
                           }
                           return null;
                       })()}
                   </svg>
               )}
          </div>
      </div>
    </div>
  );
};

export default GitEscapeRoom;
