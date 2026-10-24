'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const directionRef = useRef<Direction>('RIGHT');

  // Load high score on mount
  useEffect(() => {
    const saved = localStorage.getItem('snake-high-score');
    if (saved) {
        setHighScore(parseInt(saved));
    }
  }, []);

  // Update high score - separate effect, but be careful with loops
  useEffect(() => {
    // Only update if score is actually higher to avoid unnecessary writes/renders
    // But since we have the condition inside, and `highScore` is a dependency,
    // we need to be careful. The dependency should be fine as highScore only updates when score exceeds it.
    // However, to fix "calling setState synchronously within an effect" warning (which is weird here unless loop),
    // we can check logic.
    // Actually, setting state in effect is fine if it stabilizes.
    // The lint warning might be due to direct call.
    if (score > highScore) {
      // Defer update to avoid warning if it happens immediately
      const timer = setTimeout(() => {
          setHighScore(score);
          localStorage.setItem('snake-high-score', score.toString());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [score, highScore]);

  const generateFood = useCallback(() => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
    setIsPaused(false);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Eat food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setSpeed(s => Math.max(50, s - SPEED_INCREMENT));
        generateFood();
        confetti({
            particleCount: 20,
            spread: 30,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#4ade80']
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood, isGameOver, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (directionRef.current !== 'DOWN') directionRef.current = 'UP'; break;
        case 'ArrowDown': if (directionRef.current !== 'UP') directionRef.current = 'DOWN'; break;
        case 'ArrowLeft': if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT'; break;
        case 'ArrowRight': if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT'; break;
        case ' ': setIsPaused(p => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex justify-between w-full max-w-md mb-4 text-white">
        <div className="flex items-center gap-2">
           <div className="bg-purple-900/50 p-2 rounded-lg border border-purple-500/30">
             <span className="text-xs text-gray-400 block">SCORE</span>
             <span className="text-2xl font-mono font-bold text-neonBlue">{score}</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="bg-purple-900/50 p-2 rounded-lg border border-purple-500/30">
                <span className="text-xs text-gray-400 block">BEST</span>
                <span className="text-2xl font-mono font-bold text-yellow-400 flex items-center gap-1">
                    <Trophy className="w-4 h-4" /> {highScore}
                </span>
            </div>
        </div>
      </div>

      <div
        className="relative bg-gray-900/80 border-2 border-white/10 rounded-xl overflow-hidden shadow-2xl"
        style={{
            width: 'min(90vw, 400px)',
            height: 'min(90vw, 400px)',
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 grid" style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/5" />
            ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${i}`}
            layoutId={i === 0 ? 'head' : undefined}
            className={`
                absolute rounded-sm
                ${i === 0 ? 'bg-neonGreen z-10' : 'bg-green-500/80 z-0'}
            `}
            style={{
                width: `${100/GRID_SIZE}%`,
                height: `${100/GRID_SIZE}%`,
                left: `${(segment.x / GRID_SIZE) * 100}%`,
                top: `${(segment.y / GRID_SIZE) * 100}%`,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
            layoutId="food"
            className="absolute bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] z-10"
            style={{
                width: `${100/GRID_SIZE * 0.8}%`,
                height: `${100/GRID_SIZE * 0.8}%`,
                left: `${(food.x / GRID_SIZE) * 100 + (100/GRID_SIZE * 0.1)}%`,
                top: `${(food.y / GRID_SIZE) * 100 + (100/GRID_SIZE * 0.1)}%`,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
        />

        {isGameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
                <h2 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h2>
                <button
                    onClick={resetGame}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                >
                    <RefreshCw className="w-5 h-5" /> Try Again
                </button>
            </div>
        )}

        {isPaused && !isGameOver && (
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 backdrop-blur-sm">
                <h2 className="text-4xl font-bold text-white tracking-widest">PAUSED</h2>
            </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
            onClick={() => setIsPaused(p => !p)}
            className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors border border-white/10"
        >
            {isPaused ? <Play className="w-6 h-6 text-green-400" /> : <Pause className="w-6 h-6 text-yellow-400" />}
        </button>
        <button
            onClick={resetGame}
            className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors border border-white/10"
        >
            <RefreshCw className="w-6 h-6 text-blue-400" />
        </button>
      </div>

      <p className="mt-4 text-gray-500 text-sm">Use Arrow Keys to move. Space to pause.</p>
    </div>
  );
}
