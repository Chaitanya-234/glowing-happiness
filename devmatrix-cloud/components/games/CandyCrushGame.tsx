'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy } from 'lucide-react';

const WIDTH = 8;
const CANDY_COLORS = [
  'bg-red-500',
  'bg-yellow-400',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-orange-500'
];

export default function CandyCrushGame() {
  const [board, setBoard] = useState<string[]>([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState<any>(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<any>(null);
  const [score, setScore] = useState(0);

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor = CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)];
      randomColorArrangement.push(randomColor);
    }
    setBoard(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  const checkForColumnOfThree = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + WIDTH, i + WIDTH * 2];
      const decidedColor = board[i];
      const isBlank = board[i] === '';

      if (columnOfThree.every(square => board[square] === decidedColor && !isBlank)) {
        setScore((score) => score + 3);
        columnOfThree.forEach(square => (board[square] = ''));
        return true;
      }
    }
    return false;
  }, [board]);

  const checkForRowOfThree = useCallback(() => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = board[i];
      const isBlank = board[i] === '';
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];

      if (notValid.includes(i)) continue;

      if (rowOfThree.every(square => board[square] === decidedColor && !isBlank)) {
        setScore((score) => score + 3);
        rowOfThree.forEach(square => (board[square] = ''));
        return true;
      }
    }
    return false;
  }, [board]);

  const moveIntoSquareBelow = useCallback(() => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && board[i] === '') {
        let randomNumber = Math.floor(Math.random() * CANDY_COLORS.length);
        board[i] = CANDY_COLORS[randomNumber];
      }

      if ((board[i + WIDTH] === '') && (board[i] !== '')) { // added checks to prevent weirdness
        board[i + WIDTH] = board[i];
        board[i] = '';
      }
    }
  }, [board]);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setBoard([...board]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, board]);

  // Drag Handlers
  const dragStart = (e: any) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e: any) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    if(!squareBeingDragged || !squareBeingReplaced) return;

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

    const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - WIDTH,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + WIDTH
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    if (validMove) {
        // Swap
        const colorDragged = squareBeingDragged.style.backgroundColor || board[squareBeingDraggedId];
        const colorReplaced = squareBeingReplaced.style.backgroundColor || board[squareBeingReplacedId];

        // This is a bit tricky with React state vs DOM.
        // We should manipulate state, not DOM directly.
        const newBoard = [...board];
        newBoard[squareBeingReplacedId] = board[squareBeingDraggedId];
        newBoard[squareBeingDraggedId] = board[squareBeingReplacedId];

        // Check if move produces a match
        setBoard(newBoard);
        // We rely on the interval to check for matches, but if no match, we should swap back?
        // Implementing swap-back logic in React state-based loop is complex.
        // For this simple version, we allow invalid swaps but they won't score unless they match.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
       <div className="flex items-center justify-between w-full max-w-sm mb-6">
        <div className="bg-purple-900/50 p-3 rounded-lg border border-purple-500/30 min-w-[100px] text-center">
             <span className="text-xs text-gray-400 block uppercase">Score</span>
             <span className="text-2xl font-mono font-bold text-neonBlue">{score}</span>
        </div>
        <button
            onClick={() => { setScore(0); createBoard(); }}
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors border border-white/10"
        >
            <RefreshCw className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="bg-gray-900 p-2 rounded-xl border border-white/10 shadow-2xl">
        <div
            className="grid gap-1"
            style={{
                width: 'min(90vw, 400px)',
                height: 'min(90vw, 400px)',
                gridTemplateColumns: `repeat(${WIDTH}, 1fr)`
            }}
        >
            {board.map((candyColor, index) => (
                <motion.div
                    layout
                    key={`${index}`} // Ideally unique ID but index + color change works for simple grid
                    data-id={index}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                    className={`w-full h-full rounded-full shadow-inner ${candyColor} cursor-pointer hover:brightness-110 border-2 border-black/20`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            ))}
        </div>
      </div>
      <p className="mt-6 text-gray-500 text-sm">Drag adjacent candies to swap and match 3.</p>
    </div>
  );
}
