'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, RotateCcw, Brain, Monitor, User } from 'lucide-react';
import { Chess, Square, Move } from 'chess.js';
import { getBestMove, getHint } from '@/lib/chess-engine';

// Map chess.js piece types to unicode symbols
const PIECE_UNICODE: Record<string, string> = {
  'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚', // Black
  'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'  // White
};

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [selected, setSelected] = useState<Square | null>(null);
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [lastMove, setLastMove] = useState<{from: Square, to: Square} | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);

  // New features state
  const [playVsComputer, setPlayVsComputer] = useState(false);
  const [difficulty, setDifficulty] = useState(2); // Depth
  const [computerThinking, setComputerThinking] = useState(false);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [hint, setHint] = useState<string | null>(null);

  // Update local board state when game state changes
  // We don't need to put these in useEffect if we update them whenever we setGame
  // However, since `game` is a mutable object in chess.js, but we are creating new instances on setGame,
  // we can just derive state during render or use effects carefully.
  // The linter complains about setBoard inside useEffect([game]).

  // Let's rely on derived state for rendering where possible, or update state where we update game.
  // But updating strictly on `game` change is cleaner if allowed.
  // The error says "Calling setState synchronously within an effect".
  // `setBoard` is a state setter.
  // It seems the linter thinks this will cause a loop if `game` changes often.
  // But we only setGame on user action.

  // Let's try to update board and turn immediately where we update game, or ignore the rule if it's safe.
  // A better way is to wrap `setGame` to also `setBoard` and `setTurn`.

  function updateGame(newGame: Chess) {
    setGame(newGame);
    setBoard(newGame.board());
    setTurn(newGame.turn() === 'w' ? 'white' : 'black');

    if (newGame.isCheckmate()) {
      setGameStatus(`Checkmate! ${newGame.turn() === 'w' ? 'Black' : 'White'} wins!`);
    } else if (newGame.isDraw()) {
      setGameStatus('Draw!');
    } else if (newGame.isCheck()) {
      setGameStatus('Check!');
    } else {
      setGameStatus('');
    }
  }

  const makeComputerMove = useCallback(async () => {
    setComputerThinking(true);
    // Small delay to allow UI to render
    setTimeout(() => {
        const bestMove = getBestMove(game, difficulty);
        if (bestMove) {
            try {
                game.move(bestMove);
                // Create new instance to trigger re-render
                const newGame = new Chess(game.fen());
                updateGame(newGame);
                setLastMove({ from: bestMove.from, to: bestMove.to });
            } catch (e) {
                console.error("AI tried invalid move", e);
            }
        }
        setComputerThinking(false);
    }, 500);
  }, [game, difficulty]);

    // AI Move trigger
    useEffect(() => {
      if (playVsComputer && game.turn() === 'b' && !game.isGameOver() && !computerThinking) {
          const timer = setTimeout(() => {
             makeComputerMove();
          }, 100);
          return () => clearTimeout(timer);
      }
    }, [game, playVsComputer, makeComputerMove, computerThinking]);

  const getPieceSymbol = (piece: { type: string, color: string } | null) => {
    if (!piece) return '';
    const key = piece.color === 'w' ? piece.type.toUpperCase() : piece.type;
    return PIECE_UNICODE[key] || '';
  };

  const handleSquareClick = (r: number, c: number) => {
    if (playVsComputer && game.turn() === 'b') return; // Don't allow click during computer turn
    if (game.isGameOver()) return;

    const square = String.fromCharCode(97 + c) + (8 - r) as Square;
    const piece = game.get(square);

    // If already selected, try to move
    if (selected) {
      if (selected === square) {
        setSelected(null);
        setPossibleMoves([]);
        return;
      }

      try {
        const move = game.move({
          from: selected,
          to: square,
          promotion: 'q'
        });

        if (move) {
          updateGame(new Chess(game.fen()));
          setLastMove({ from: selected, to: square });
          setSelected(null);
          setPossibleMoves([]);
          setHint(null); // Clear hint on move
          return;
        }
      } catch (e) {
        // Invalid move
      }

      if (piece && piece.color === game.turn()) {
        setSelected(square);
        const moves = game.moves({ square, verbose: true }).map(m => m.to);
        setPossibleMoves(moves);
        return;
      }

      setSelected(null);
      setPossibleMoves([]);

    } else {
      if (piece && piece.color === game.turn()) {
        setSelected(square);
        const moves = game.moves({ square, verbose: true }).map(m => m.to);
        setPossibleMoves(moves);
      }
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    updateGame(newGame);
    setSelected(null);
    setLastMove(null);
    setPossibleMoves([]);
    setGameStatus('');
    setHint(null);
  };

  const undoMove = () => {
    game.undo();
    if (playVsComputer) {
        // If vs computer, undo twice to go back to player turn
        game.undo();
    }
    updateGame(new Chess(game.fen()));
    setLastMove(null);
    setSelected(null);
    setPossibleMoves([]);
    setHint(null);
  };

  const showHint = () => {
    const hintMove = getHint(game.fen());
    if (hintMove) {
        setHint(`Try: ${hintMove}`);
    } else {
        setHint("No hint available.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Controls & Status */}
      <div className="w-full max-w-md mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setPlayVsComputer(!playVsComputer)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${playVsComputer ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                    {playVsComputer ? <Monitor className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    {playVsComputer ? 'Vs Computer' : 'Vs Friend'}
                </button>
            </div>
            {playVsComputer && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Difficulty:</span>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(Number(e.target.value))}
                        className="bg-gray-800 border border-gray-600 rounded px-1"
                    >
                        <option value={1}>Easy</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Hard</option>
                    </select>
                </div>
            )}
        </div>

        {gameStatus && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-center font-bold animate-pulse">
                {gameStatus}
            </div>
        )}

        {hint && (
            <div className="bg-blue-500/20 border border-blue-500/50 text-blue-200 px-4 py-2 rounded-lg text-center text-sm">
                💡 {hint}
            </div>
        )}
      </div>

      <div className="flex justify-between w-full max-w-md mb-4 items-center">
        <div className={`px-4 py-2 rounded-lg font-bold border transition-all ${turn === 'white' ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
            White
        </div>
        <div className="text-gray-400 font-mono text-sm flex flex-col items-center">
            <span>VS</span>
            {computerThinking && <span className="text-[10px] text-purple-400 animate-pulse">AI Thinking...</span>}
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold border transition-all ${turn === 'black' ? 'bg-black text-white border-gray-600 shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
            Black
        </div>
      </div>

      <div className="bg-gray-800 p-1 rounded-sm border-4 border-gray-700 shadow-2xl relative">
        <div className="grid grid-cols-8 grid-rows-8 w-[min(90vw,400px)] h-[min(90vw,400px)] border-2 border-gray-600">
            {board.map((row, r) => row.map((piece, c) => {
                const square = String.fromCharCode(97 + c) + (8 - r) as Square;
                const isBlackSquare = (r + c) % 2 === 1;
                const isSelected = selected === square;
                const isLastMoveFrom = lastMove?.from === square;
                const isLastMoveTo = lastMove?.to === square;
                const isPossibleMove = possibleMoves.includes(square);

                const highlight = isSelected ? 'bg-yellow-500/50' :
                                  (isLastMoveFrom || isLastMoveTo) ? 'bg-yellow-200/30' :
                                  isBlackSquare ? 'bg-slate-600' : 'bg-slate-300';

                return (
                    <div
                        key={square}
                        onClick={() => handleSquareClick(r, c)}
                        className={`
                            ${highlight}
                            flex items-center justify-center
                            text-3xl sm:text-4xl cursor-pointer select-none
                            relative
                        `}
                    >
                         {/* Coordinate labels */}
                        {c === 0 && <span className={`absolute left-0.5 top-0 text-[8px] sm:text-[10px] ${isBlackSquare ? 'text-slate-300' : 'text-slate-600'}`}>{8-r}</span>}
                        {r === 7 && <span className={`absolute right-0.5 bottom-0 text-[8px] sm:text-[10px] ${isBlackSquare ? 'text-slate-300' : 'text-slate-600'}`}>{String.fromCharCode(97+c)}</span>}

                        {/* Possible move indicator */}
                        {isPossibleMove && (
                          <div className={`absolute w-3 h-3 rounded-full ${piece ? 'border-2 border-black/30' : 'bg-black/20'}`} />
                        )}

                        <span className={`
                            transform transition-transform hover:scale-110
                            ${piece?.color === 'w' ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)]'}
                        `}>
                            {getPieceSymbol(piece)}
                        </span>
                    </div>
                );
            }))}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors border border-white/10"
        >
            <RefreshCw className="w-5 h-5" /> Reset
        </button>

        <button
            onClick={undoMove}
            disabled={game.history().length === 0 || (playVsComputer && game.history().length < 2)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <RotateCcw className="w-5 h-5" /> Undo
        </button>

        <button
            onClick={showHint}
            disabled={game.isGameOver()}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors border border-white/10 disabled:opacity-50"
        >
            <Brain className="w-5 h-5" /> Hint
        </button>
      </div>

      <p className="mt-4 text-gray-500 text-sm max-w-xs text-center">
        Powered by Chess.js & Minimax AI
      </p>
    </div>
  );
}
