'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCw, Undo2 } from 'lucide-react';

const SIZE = 4;

type Grid = number[][];

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(Array(SIZE).fill(0).map(() => Array(SIZE).fill(0)));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<{grid: Grid, score: number}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('2048-high-score');
    if (saved) setHighScore(parseInt(saved));

    // Initial setup inside effect to avoid 'use before declare' and hydration mismatch
    const init = () => {
        const newGrid = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));

        // Helper inline to avoid scope issues in init
        const addTile = (g: Grid) => {
            const emptyCells = [];
            for (let r = 0; r < SIZE; r++) {
                for (let c = 0; c < SIZE; c++) {
                    if (g[r][c] === 0) emptyCells.push({ r, c });
                }
            }
            if (emptyCells.length > 0) {
                const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                g[r][c] = Math.random() < 0.9 ? 2 : 4;
            }
        };

        addTile(newGrid);
        addTile(newGrid);
        setGrid(newGrid);
        setScore(0);
        setGameOver(false);
        setHistory([]);
    };
    init();
  }, []);

  useEffect(() => {
    if (score > highScore) {
      // Defer update
      const timer = setTimeout(() => {
          setHighScore(score);
          localStorage.setItem('2048-high-score', score.toString());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [score, highScore]);

  const addNewTile = (currentGrid: Grid) => {
    const emptyCells = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (currentGrid[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length > 0) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const initGame = () => {
    const newGrid = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
    addNewTile(newGrid);
    addNewTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setHistory([]);
  };

  const move = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (gameOver) return;

    setHistory(prev => [...prev, { grid: grid.map(row => [...row]), score }]);

    let newGrid = grid.map(row => [...row]);
    let moved = false;
    let gainedScore = 0;

    const rotate = (matrix: Grid) => matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
    const rotateLeft = (matrix: Grid) => matrix[0].map((val, index) => matrix.map(row => row[row.length - 1 - index]));

    if (direction === 'UP') newGrid = rotateLeft(newGrid);
    if (direction === 'DOWN') newGrid = rotate(newGrid);
    if (direction === 'RIGHT') newGrid = newGrid.map(row => row.reverse());

    // Merge logic
    for (let r = 0; r < SIZE; r++) {
        const row = newGrid[r].filter(val => val !== 0);
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                gainedScore += row[i];
                row.splice(i + 1, 1);
            }
        }
        while (row.length < SIZE) row.push(0);
        if (newGrid[r].join(',') !== row.join(',')) moved = true;
        newGrid[r] = row;
    }

    if (direction === 'UP') newGrid = rotate(newGrid);
    if (direction === 'DOWN') newGrid = rotateLeft(newGrid);
    if (direction === 'RIGHT') newGrid = newGrid.map(row => row.reverse());

    if (moved) {
        addNewTile(newGrid);
        setGrid(newGrid);
        setScore(s => s + gainedScore);

        // Check game over
        let canMove = false;
        // Check if any empty or merge possible
        for(let r=0; r<SIZE; r++) {
            for(let c=0; c<SIZE; c++) {
                if(newGrid[r][c] === 0) canMove = true;
                if(r < SIZE-1 && newGrid[r][c] === newGrid[r+1][c]) canMove = true;
                if(c < SIZE-1 && newGrid[r][c] === newGrid[r][c+1]) canMove = true;
            }
        }
        if(!canMove) setGameOver(true);
    } else {
        setHistory(prev => prev.slice(0, -1)); // Undo history push if no move
    }
  }, [grid, gameOver, score]);

  const undo = () => {
      if(history.length === 0) return;
      const lastState = history[history.length - 1];
      setGrid(lastState.grid);
      setScore(lastState.score);
      setHistory(prev => prev.slice(0, -1));
      setGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': move('UP'); break;
        case 'ArrowDown': move('DOWN'); break;
        case 'ArrowLeft': move('LEFT'); break;
        case 'ArrowRight': move('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const getCellColor = (value: number) => {
      const colors: {[key: number]: string} = {
          0: 'bg-white/5',
          2: 'bg-gray-200 text-gray-800',
          4: 'bg-gray-300 text-gray-800',
          8: 'bg-orange-300 text-white',
          16: 'bg-orange-400 text-white',
          32: 'bg-orange-500 text-white',
          64: 'bg-orange-600 text-white',
          128: 'bg-yellow-400 text-white',
          256: 'bg-yellow-500 text-white',
          512: 'bg-yellow-600 text-white',
          1024: 'bg-yellow-700 text-white',
          2048: 'bg-yellow-800 text-white shadow-[0_0_15px_rgba(234,179,8,0.6)]',
      };
      return colors[value] || 'bg-black text-white';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex justify-between w-full max-w-sm mb-6">
        <div className="bg-gray-800 p-3 rounded-lg text-center min-w-[80px]">
            <div className="text-xs text-gray-400">SCORE</div>
            <div className="text-xl font-bold text-white">{score}</div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg text-center min-w-[80px]">
            <div className="text-xs text-gray-400">BEST</div>
            <div className="text-xl font-bold text-yellow-400">{highScore}</div>
        </div>
      </div>

      <div className="bg-gray-800 p-2 rounded-xl border border-white/10 relative">
        <div className="grid grid-cols-4 gap-2">
            {grid.map((row, r) => row.map((val, c) => (
                <div key={`${r}-${c}`} className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-lg relative">
                    <AnimatePresence mode='popLayout'>
                        {val !== 0 && (
                            <motion.div
                                key={`${r}-${c}-${val}`} // Key by val to trigger animation on change
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`absolute inset-0 flex items-center justify-center rounded-lg font-bold text-2xl ${getCellColor(val)}`}
                            >
                                {val}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )))}
        </div>

        {gameOver && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-20">
                <h2 className="text-4xl font-bold text-white mb-4">Game Over</h2>
                <button onClick={initGame} className="px-6 py-2 bg-neonBlue text-black font-bold rounded-full hover:scale-105 transition-transform">
                    Try Again
                </button>
            </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={undo} disabled={history.length === 0} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 transition-colors">
            <Undo2 className="w-6 h-6 text-blue-400" />
        </button>
        <button onClick={initGame} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <RefreshCw className="w-6 h-6 text-green-400" />
        </button>
      </div>

      <p className="mt-4 text-gray-500 text-sm">Use Arrow Keys to combine tiles.</p>
    </div>
  );
}
