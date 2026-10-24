'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';

const GRID_SIZE = 4; // 15 Puzzle is 4x4

export default function SlidingPuzzleGame() {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  // Helper to check if solvable
  const checkSolvable = (puzzle: number[]) => {
    let inversions = 0;
    for (let i = 0; i < puzzle.length - 1; i++) {
      for (let j = i + 1; j < puzzle.length; j++) {
        if (puzzle[i] !== 0 && puzzle[j] !== 0 && puzzle[i] > puzzle[j]) {
          inversions++;
        }
      }
    }
    const emptyRowFromBottom = GRID_SIZE - Math.floor(puzzle.indexOf(0) / GRID_SIZE);

    if (GRID_SIZE % 2 === 1) return inversions % 2 === 0;
    if (emptyRowFromBottom % 2 === 0) return inversions % 2 === 1;
    return inversions % 2 === 0;
  };

  const checkSorted = (arr: number[]) => {
      // 0 should be at the end for "solved" in some versions,
      // but standard is 1..15 then 0.
      for(let i=0; i < arr.length - 1; i++) {
          if(arr[i] !== i + 1) return false;
      }
      return arr[arr.length-1] === 0;
  };

  useEffect(() => {
    // Initial shuffle in useEffect to avoid hydration mismatch/impure render
    const generatePuzzle = () => {
        let newTiles;
        do {
          newTiles = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i); // 0 to 15
          // Fisher-Yates shuffle
          for (let i = newTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
          }
        } while (!checkSolvable(newTiles) || checkSorted(newTiles));
        setTiles(newTiles);
        setMoves(0);
        setIsSolved(false);
    };
    generatePuzzle();
  }, []);

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(m => m + 1);

      if (checkSorted(newTiles)) {
        setIsSolved(true);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
      }
    }
  };

  const manualShuffle = () => {
    let newTiles;
    do {
        newTiles = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
        for (let i = newTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newTiles[i], newTiles[j]] = [newTiles[j], newTiles[i]];
        }
    } while (!checkSolvable(newTiles) || checkSorted(newTiles));

    setTiles(newTiles);
    setMoves(0);
    setIsSolved(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-8 mb-8">
        <div className="text-center">
            <span className="text-gray-400 text-sm uppercase block">Moves</span>
            <span className="text-3xl font-mono font-bold text-white">{moves}</span>
        </div>
      </div>

      <div
        className="grid gap-1 bg-gray-800 p-2 rounded-xl border border-white/10 shadow-2xl"
        style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(90vw, 400px)',
            height: 'min(90vw, 400px)'
        }}
      >
        {tiles.map((tile, index) => {
            if (tile === 0) return <div key="empty" className="rounded-lg" />;

            return (
                <motion.button
                    layout
                    key={tile}
                    onClick={() => handleTileClick(index)}
                    className="flex items-center justify-center rounded-lg font-bold text-2xl text-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 hover:brightness-110 active:scale-95 transition-all"
                >
                    {tile}
                </motion.button>
            );
        })}
      </div>

      {isSolved && (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-green-400 font-bold text-xl flex items-center gap-2"
        >
            <Trophy className="w-6 h-6" /> Puzzle Solved!
        </motion.div>
      )}

      <div className="mt-8">
        <button
            onClick={manualShuffle}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors border border-white/10"
        >
            <RefreshCw className="w-5 h-5" /> Shuffle
        </button>
      </div>
    </div>
  );
}
