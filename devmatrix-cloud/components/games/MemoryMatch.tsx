'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom,
  Database,
  Server,
  Code,
  Terminal,
  Cloud,
  Lock,
  Smartphone,
  RefreshCw,
  Trophy,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  icon: any;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
  color: string;
}

const ICONS = [
  { icon: Atom, name: 'React', color: 'text-cyan-400' },
  { icon: Database, name: 'Database', color: 'text-yellow-400' },
  { icon: Server, name: 'Server', color: 'text-green-400' },
  { icon: Code, name: 'Code', color: 'text-pink-400' },
  { icon: Terminal, name: 'Terminal', color: 'text-gray-200' },
  { icon: Cloud, name: 'Cloud', color: 'text-blue-400' },
  { icon: Lock, name: 'Security', color: 'text-red-400' },
  { icon: Smartphone, name: 'Mobile', color: 'text-purple-400' },
];

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [matches, setMatches] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);

  useEffect(() => {
    // Moved initializeGame logic here or use a useCallback/flag
    const init = () => {
        const shuffledCards = [...ICONS, ...ICONS]
          .sort(() => Math.random() - 0.5)
          .map((item, index) => ({
            id: index,
            icon: item.icon,
            name: item.name,
            color: item.color,
            isFlipped: false,
            isMatched: false,
          }));

        setCards(shuffledCards);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setIsGameWon(false);
        setTimer(0);
        setIsPlaying(true);
    };
    init();

    // Load best time from localStorage
    const savedBestTime = localStorage.getItem('memory-match-best-time');
    if (savedBestTime) setBestTime(parseInt(savedBestTime));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isGameWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isGameWon]);

  const initializeGame = () => {
    const shuffledCards = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        icon: item.icon,
        name: item.name,
        color: item.color,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsGameWon(false);
    setTimer(0);
    setIsPlaying(true);
  };

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length === 2 ||
      cards[id].isFlipped ||
      cards[id].isMatched ||
      !isPlaying
    ) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (currentFlipped: number[]) => {
    const [id1, id2] = currentFlipped;
    const card1 = cards[id1];
    const card2 = cards[id2];

    if (card1.name === card2.name) {
      const newCards = [...cards];
      newCards[id1].isMatched = true;
      newCards[id2].isMatched = true;
      setCards(newCards);
      setFlippedCards([]);
      setMatches((prev) => {
        const newMatches = prev + 1;
        if (newMatches === ICONS.length) {
          handleGameWin();
        }
        return newMatches;
      });
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[id1].isFlipped = false;
        newCards[id2].isFlipped = false;
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  const handleGameWin = () => {
    setIsGameWon(true);
    setIsPlaying(false);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (!bestTime || timer < bestTime) {
      setBestTime(timer);
      localStorage.setItem('memory-match-best-time', timer.toString());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Time</span>
            <div className="flex items-center gap-2 text-2xl font-mono font-bold text-white">
              <Timer className="w-5 h-5 text-neonBlue" />
              {formatTime(timer)}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Moves</span>
            <span className="text-2xl font-mono font-bold text-white">{moves}</span>
          </div>
          {bestTime && (
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm uppercase tracking-wider">Best</span>
              <div className="flex items-center gap-2 text-xl font-mono text-yellow-400">
                <Trophy className="w-4 h-4" />
                {formatTime(bestTime)}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={initializeGame}
          className="flex items-center gap-2 px-6 py-3 bg-neonBlue/10 hover:bg-neonBlue/20 text-neonBlue border border-neonBlue/50 rounded-xl transition-all hover:scale-105 active:scale-95 font-semibold"
        >
          <RefreshCw className="w-5 h-5" />
          Restart Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 aspect-square sm:aspect-auto">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => handleCardClick(card.id)}
              className={`relative cursor-pointer group perspective-1000 h-24 sm:h-32 md:h-40 w-full`}
            >
              <div
                className={`w-full h-full relative preserve-3d transition-all duration-500 ${
                  card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Hidden) */}
                <div className="absolute inset-0 backface-hidden w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-white/10 shadow-lg flex items-center justify-center group-hover:border-neonBlue/50 transition-colors">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Code className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600" />
                  </div>
                </div>

                {/* Back (Revealed) */}
                <div
                  className="absolute inset-0 backface-hidden w-full h-full bg-gray-800 rounded-xl border border-white/10 shadow-xl flex flex-col items-center justify-center rotate-y-180"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <card.icon className={`w-8 h-8 sm:w-12 sm:h-12 ${card.color} mb-2 drop-shadow-glow`} />
                  <span className={`text-xs sm:text-sm font-medium ${card.color}`}>{card.name}</span>
                  {card.isMatched && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isGameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="bg-gray-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-white mb-2">Victory!</h2>
            <p className="text-gray-400 mb-8">
              You matched all pairs in <span className="text-white font-bold">{moves}</span> moves
              and <span className="text-white font-bold">{formatTime(timer)}</span>.
            </p>
            <button
              onClick={initializeGame}
              className="w-full py-4 bg-gradient-to-r from-neonBlue to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Play Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
