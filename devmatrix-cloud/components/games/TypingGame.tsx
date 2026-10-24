'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Keyboard,
  Trophy,
  RefreshCw,
  Settings,
  Target,
  Zap,
  Code,
  Type,
  Volume2,
  VolumeX,
  Move,
  BarChart,
  Medal,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Data Constants ---

const WORDS_BEGINNER = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", "quince", "raspberry", "strawberry", "tangerine", "ugli", "watermelon", "ant", "bear", "cat", "dog", "elephant", "frog", "giraffe", "hippo", "iguana", "jaguar", "kangaroo", "lion", "monkey", "newt", "owl", "penguin", "quail", "rabbit", "snake", "tiger", "unicorn", "vulture", "whale", "x-ray", "yak", "zebra", "red", "blue", "green", "yellow", "purple", "orange", "black", "white", "gray", "brown", "pink", "cyan", "magenta", "lime", "olive", "maroon", "navy", "aquamarine", "turquoise", "silver", "gold", "bronze", "copper", "iron", "steel", "aluminum", "titanium", "zinc", "lead", "tin", "nickel", "platinum", "uranium", "plutonium"
];

const SENTENCES_INTERMEDIATE = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "Action speaks louder than words.",
  "Beauty is in the eye of the beholder.",
  "Better late than never.",
  "Birds of a feather flock together.",
  "Cleanliness is next to godliness.",
  "Don't count your chickens before they hatch.",
  "Don't put all your eggs in one basket.",
  "Early to bed and early to rise makes a man healthy, wealthy and wise.",
  "Every cloud has a silver lining.",
  "Fortune favors the bold.",
  "Good things come to those who wait.",
  "Honesty is the best policy.",
  "If it ain't broke, don't fix it.",
  "Knowledge is power.",
  "Laughter is the best medicine.",
  "Look before you leap.",
  "Necessity is the mother of invention.",
  "No pain, no gain.",
  "Practice makes perfect.",
  "Rome wasn't built in a day.",
  "The early bird catches the worm.",
  "The grass is always greener on the other side.",
  "The pen is mightier than the sword.",
  "Time is money.",
  "Two heads are better than one.",
  "When in Rome, do as the Romans do.",
  "Where there's a will, there's a way.",
  "You can't judge a book by its cover."
];

const CODE_SNIPPETS = [
  "const [state, setState] = useState(initialState);",
  "useEffect(() => { console.log('Mounted'); }, []);",
  "import { useState, useEffect } from 'react';",
  "export default function App() { return <div>Hello</div>; }",
  "function sum(a, b) { return a + b; }",
  "const double = (n) => n * 2;",
  "array.map(item => item.id).filter(id => id > 0);",
  "if (user.isAdmin && user.isLoggedIn) { grantAccess(); }",
  "try { await fetchData(); } catch (error) { console.error(error); }",
  "const { data, error, isLoading } = useSWR('/api/user', fetcher);",
  "public static void main(String[] args) { System.out.println('Hello'); }",
  "SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC;",
  "UPDATE products SET price = price * 1.1 WHERE category = 'electronics';",
  "def fibonacci(n): return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)",
  "for i in range(10): print(i * i)",
  "class Dog extends Animal { bark() { console.log('Woof'); } }",
  "interface User { id: number; name: string; email?: string; }",
  "type Status = 'idle' | 'loading' | 'success' | 'error';",
  "const router = useRouter(); const { id } = router.query;",
  "return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />;",
  "git commit -m 'feat: add typing game'",
  "docker build -t my-app . && docker run -p 3000:3000 my-app",
  "npm install react react-dom next framer-motion tailwindcss",
  "console.log(`User ${user.name} logged in at ${new Date().toISOString()}`);",
  "const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;"
];

const PUNCTUATION_ADVANCED = [
  "Hello, world! How are you today?",
  "Wait... did you hear that?",
  "It's 10:00 AM; time for a break.",
  "1 + 1 = 2, but 2 * 2 = 4.",
  "Email me at user@example.com.",
  "Cost: $19.99 (plus tax).",
  "#Hashtag #Trending #Viral",
  "Error 404: Page not found.",
  "Success: Operation completed in 2.5s.",
  "Warning: Low battery (15%).",
  "Let's go to the store & buy some milk.",
  "Is this true? Yes/No.",
  "{ key: 'value', id: 123 }",
  "[1, 2, 3, 4, 5]",
  "<div className='container'>Content</div>",
  "User_Name_123",
  "Password123!",
  "C:\\Windows\\System32",
  "https://www.google.com/search?q=typing+test",
  "50% off everything *limited time only*."
];


// --- Helper Functions ---

const generateText = (mode: string, difficulty: string, count: number): string => {
  if (difficulty === 'developer') {
    let snippets = [];
    for (let i = 0; i < Math.max(3, count / 5); i++) {
        snippets.push(CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
    }
    return snippets.join(' ');
  }

  if (difficulty === 'advanced') {
      let sentences = [];
      for(let i=0; i< Math.max(2, count / 10); i++) {
          sentences.push(PUNCTUATION_ADVANCED[Math.floor(Math.random() * PUNCTUATION_ADVANCED.length)]);
      }
      return sentences.join(' ');
  }

  if (difficulty === 'intermediate') {
      let sentences = [];
      for(let i=0; i< Math.max(2, count / 10); i++) {
          sentences.push(SENTENCES_INTERMEDIATE[Math.floor(Math.random() * SENTENCES_INTERMEDIATE.length)]);
      }
      return sentences.join(' ');
  }

  // Beginner - random words
  let words = [];
  for (let i = 0; i < count; i++) {
    words.push(WORDS_BEGINNER[Math.floor(Math.random() * WORDS_BEGINNER.length)]);
  }
  return words.join(' ');
};

const playSound = (type: 'key' | 'error') => {
    // Simple synth beep to avoid external assets
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } else {
        // Key press - soft click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }
};

const calculateGrade = (wpm: number, accuracy: number): string => {
    if (wpm >= 80 && accuracy >= 98) return 'S';
    if (wpm >= 60 && accuracy >= 95) return 'A';
    if (wpm >= 40 && accuracy >= 92) return 'B';
    if (wpm >= 30 && accuracy >= 85) return 'C';
    return 'D';
};

export default function TypingGame() {
  // --- State ---
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [mode, setMode] = useState<'time' | 'words' | 'custom'>('time');
  const [timeLimit, setTimeLimit] = useState(30);
  const [wordCount, setWordCount] = useState(25);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'developer'>('beginner');
  const [customText, setCustomText] = useState('');

  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');

  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);

  const [isFocused, setIsFocused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  // Persistence
  const [bestWpm, setBestWpm] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Stats for result
  const [finalStats, setFinalStats] = useState({ wpm: 0, accuracy: 0, time: 0, errors: 0, keystrokes: 0, grade: 'C' });

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Effects ---

  // Load persistence
  useEffect(() => {
    const savedBest = localStorage.getItem('typing_best_wpm');
    const savedGames = localStorage.getItem('typing_games_played');
    if (savedBest) setBestWpm(parseInt(savedBest));
    if (savedGames) setGamesPlayed(parseInt(savedGames));
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && mode === 'time') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, mode]);

  // Real-time WPM calculation
  useEffect(() => {
    if (gameState === 'playing' && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      if (timeElapsed > 0) {
        const wordsTyped = userInput.length / 5;
        const currentWpm = Math.round(wordsTyped / timeElapsed);
        setWpm(currentWpm);
      }
    }
  }, [userInput, gameState, startTime]);

  // Focus input on game start
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState]);

  // --- Game Logic ---

  const startGame = () => {
    let text = '';
    if (mode === 'custom') {
      text = customText.trim() || "Please enter some custom text to practice.";
    } else {
      const actualCount = mode === 'time' ? 200 : wordCount;
      text = generateText(mode, difficulty, actualCount);
    }

    setTargetText(text);
    setUserInput('');
    setGameState('playing');
    setStartTime(Date.now());
    setTimeLeft(mode === 'time' ? timeLimit : 0);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setIsFocused(true);
  };

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const endTime = Date.now();
    const durationMinutes = startTime ? (endTime - startTime) / 1000 / 60 : 0.1;

    const grossWpm = Math.round((userInput.length / 5) / durationMinutes);
    const accuracyVal = userInput.length > 0 ? Math.round(((userInput.length - errors) / userInput.length) * 100) : 0;
    const grade = calculateGrade(grossWpm, accuracyVal);

    setFinalStats({
      wpm: grossWpm,
      accuracy: accuracyVal,
      time: Math.round(durationMinutes * 60),
      errors: errors,
      keystrokes: userInput.length,
      grade
    });

    // Save Persistence
    if (grossWpm > bestWpm) {
        setBestWpm(grossWpm);
        localStorage.setItem('typing_best_wpm', grossWpm.toString());
    }
    const newGamesPlayed = gamesPlayed + 1;
    setGamesPlayed(newGamesPlayed);
    localStorage.setItem('typing_games_played', newGamesPlayed.toString());

    setGameState('finished');
    if (grossWpm > 40 && accuracyVal > 90) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
  }, [startTime, userInput, errors, bestWpm, gamesPlayed]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const oldVal = userInput;

    if (val.length > oldVal.length) {
      // Typing forward
      const newCharIndex = val.length - 1;
      if (newCharIndex < targetText.length) {
        if (val[newCharIndex] !== targetText[newCharIndex]) {
          setErrors(prev => prev + 1);
          if (soundEnabled) playSound('error');
        } else {
          if (soundEnabled) playSound('key');
        }
      }
    }

    setUserInput(val);

    if (mode !== 'time' && val.length >= targetText.length) {
      endGame();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      // Optional: Show toast or visual cue that paste is disabled
  };

  const handleClickGameArea = () => {
    if (inputRef.current) inputRef.current.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
      setIsFocused(false);
  };

  // --- Render Functions ---

  const renderCharacter = (char: string, index: number) => {
    let className = `font-mono text-2xl transition-colors duration-75 `;
    if (index < userInput.length) {
      if (userInput[index] === char) {
        className += "text-green-400";
      } else {
        className += "text-red-500 bg-red-500/20 rounded";
      }
    } else if (index === userInput.length) {
      className += "bg-purple-500/50 text-white rounded animate-pulse"; // Cursor
    } else {
      className += "text-gray-500";
    }

    if (char === ' ') return <span key={index} className={className}>&nbsp;</span>;
    return <span key={index} className={className}>{char}</span>;
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${dyslexiaFont ? 'font-dyslexic' : ''}`}>

      {/* Header / Stats Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center space-x-6">
           <div className="flex flex-col">
             <span className="text-xs text-gray-400 uppercase tracking-wider">WPM</span>
             <span className="text-3xl font-bold text-green-400 font-mono">{gameState === 'finished' ? finalStats.wpm : wpm}</span>
           </div>
           <div className="w-px h-10 bg-gray-700" />
           <div className="flex flex-col">
             <span className="text-xs text-gray-400 uppercase tracking-wider">Accuracy</span>
             <span className={`text-3xl font-bold font-mono ${accuracy < 90 ? 'text-yellow-400' : 'text-blue-400'}`}>
               {gameState === 'finished' ? finalStats.accuracy : (
                  userInput.length > 0
                  ? Math.round(((userInput.length - errors) / userInput.length) * 100)
                  : 100
               )}%
             </span>
           </div>
           <div className="w-px h-10 bg-gray-700" />
           {mode === 'time' && (
             <div className="flex flex-col">
               <span className="text-xs text-gray-400 uppercase tracking-wider">Time</span>
               <span className={`text-3xl font-bold font-mono ${timeLeft < 10 ? 'text-red-500' : 'text-purple-400'}`}>{timeLeft}s</span>
             </div>
           )}
           {mode === 'words' && (
             <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Words</span>
                <span className="text-3xl font-bold font-mono text-purple-400">{wordCount}</span>
             </div>
           )}
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
             <button
               onClick={() => setSoundEnabled(!soundEnabled)}
               className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
               title="Toggle Sound"
             >
               {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
             </button>
             <button
               onClick={() => setDyslexiaFont(!dyslexiaFont)}
               className={`p-2 rounded-lg transition-colors ${dyslexiaFont ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
               title="Dyslexia Friendly Font"
             >
               <Type size={20} />
             </button>
             <button
               onClick={() => setGameState('menu')}
               className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg transition-colors"
               title="Settings / Menu"
             >
               <Settings size={20} />
             </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Keyboard className="w-8 h-8 text-purple-400" />
                    Setup Your Game
                </h2>
                <div className="flex gap-4 text-sm text-gray-400">
                     <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1"><Trophy size={14} className="text-yellow-400" /> Best WPM</div>
                         <div className="font-mono font-bold text-white">{bestWpm}</div>
                     </div>
                     <div className="flex flex-col items-end">
                         <div className="flex items-center gap-1"><Calendar size={14} className="text-blue-400" /> Played</div>
                         <div className="font-mono font-bold text-white">{gamesPlayed}</div>
                     </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mode Selection */}
              <div className="space-y-4">
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Game Mode</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setMode('time')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${mode === 'time' ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
                  >
                    <Timer size={18} /> Time Attack
                  </button>
                  <button
                    onClick={() => setMode('words')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${mode === 'words' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
                  >
                    <Target size={18} /> Word Count
                  </button>
                  <button
                    onClick={() => setMode('custom')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${mode === 'custom' ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/20' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
                  >
                    <Code size={18} /> Custom
                  </button>
                </div>

                {mode === 'time' && (
                  <div className="flex gap-2 mt-4">
                    {[15, 30, 60, 120].map(t => (
                      <button
                        key={t}
                        onClick={() => setTimeLimit(t)}
                        className={`px-3 py-1 rounded-lg text-sm border ${timeLimit === t ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
                      >
                        {t}s
                      </button>
                    ))}
                  </div>
                )}
                {mode === 'words' && (
                  <div className="flex gap-2 mt-4">
                    {[10, 25, 50, 100].map(c => (
                      <button
                        key={c}
                        onClick={() => setWordCount(c)}
                        className={`px-3 py-1 rounded-lg text-sm border ${wordCount === c ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'border-gray-800 text-gray-500 hover:border-gray-600'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Difficulty Selection */}
              {mode !== 'custom' && (
                 <div className="space-y-4">
                  <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Difficulty</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDifficulty('beginner')}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${difficulty === 'beginner' ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
                    >
                      <div className="font-bold">Beginner</div>
                      <div className="text-xs opacity-70">Simple words</div>
                    </button>
                    <button
                      onClick={() => setDifficulty('intermediate')}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${difficulty === 'intermediate' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
                    >
                      <div className="font-bold">Intermediate</div>
                      <div className="text-xs opacity-70">Sentences</div>
                    </button>
                    <button
                      onClick={() => setDifficulty('advanced')}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${difficulty === 'advanced' ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
                    >
                      <div className="font-bold">Advanced</div>
                      <div className="text-xs opacity-70">Punctuation + Symbols</div>
                    </button>
                    <button
                      onClick={() => setDifficulty('developer')}
                      className={`px-4 py-3 rounded-xl border text-left transition-all ${difficulty === 'developer' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800'}`}
                    >
                      <div className="font-bold">Developer</div>
                      <div className="text-xs opacity-70">Code Snippets</div>
                    </button>
                  </div>
                </div>
              )}

              {mode === 'custom' && (
                <div className="space-y-4 col-span-2">
                   <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Paste Text</h3>
                   <textarea
                     value={customText}
                     onChange={(e) => setCustomText(e.target.value)}
                     className="w-full h-32 bg-gray-900 border border-gray-800 rounded-xl p-4 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono text-sm"
                     placeholder="Paste your text here..."
                   />
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={startGame}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-purple-600 font-lg rounded-full hover:bg-purple-500 focus:outline-none ring-offset-2 focus:ring-2 ring-purple-600"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Typing
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.05 }}
             className="relative min-h-[400px]"
          >
            {/* Input Overlay */}
            <input
              ref={inputRef}
              type="text"
              className="absolute opacity-0 w-full h-full cursor-default"
              value={userInput}
              onChange={handleInputChange}
              onPaste={handlePaste}
              onBlur={handleBlur}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {/* Typing Area */}
            <div
               className={`relative w-full min-h-[300px] bg-black/40 backdrop-blur-sm rounded-3xl border ${isFocused ? 'border-purple-500/30' : 'border-gray-800'} p-8 shadow-2xl transition-colors cursor-text`}
               onClick={handleClickGameArea}
            >
               {!isFocused && (
                 <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/60 rounded-3xl backdrop-blur-xs">
                    <div className="text-white flex flex-col items-center animate-bounce">
                      <Move className="w-8 h-8 mb-2 text-purple-400" />
                      <span>Click to Focus</span>
                    </div>
                 </div>
               )}

               <div className="font-mono text-2xl leading-relaxed break-words whitespace-pre-wrap">
                 {targetText.split('').map((char, i) => renderCharacter(char, i))}
               </div>
            </div>

            <div className="mt-6 flex justify-between text-sm text-gray-500 font-mono">
              <div>
                <span className="text-purple-400">Esc</span> to restart
              </div>
              <div>
                 {targetText.length - userInput.length} chars remaining
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'finished' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-2xl text-center"
          >
             <div className="inline-flex items-center justify-center p-4 bg-purple-500/20 rounded-full mb-6">
               <Trophy className="w-12 h-12 text-purple-400" />
             </div>
             <h2 className="text-4xl font-bold text-white mb-2">Game Over!</h2>
             <p className="text-gray-400 mb-8">Great job! Here is how you performed.</p>

             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-4xl mx-auto">
               <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                 <div className="text-sm text-gray-500 mb-1">Grade</div>
                 <div className={`text-4xl font-bold font-mono ${finalStats.grade === 'S' ? 'text-yellow-400' : 'text-purple-400'}`}>{finalStats.grade}</div>
               </div>
               <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                 <div className="text-sm text-gray-500 mb-1">WPM</div>
                 <div className="text-4xl font-bold text-green-400 font-mono">{finalStats.wpm}</div>
               </div>
               <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                 <div className="text-sm text-gray-500 mb-1">Accuracy</div>
                 <div className="text-4xl font-bold text-blue-400 font-mono">{finalStats.accuracy}%</div>
               </div>
               <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                 <div className="text-sm text-gray-500 mb-1">Errors</div>
                 <div className="text-4xl font-bold text-red-400 font-mono">{finalStats.errors}</div>
               </div>
               <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                 <div className="text-sm text-gray-500 mb-1">Time</div>
                 <div className="text-4xl font-bold text-yellow-400 font-mono">{finalStats.time}s</div>
               </div>
             </div>

             <div className="flex gap-4 justify-center">
               <button
                 onClick={startGame}
                 className="flex items-center px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
               >
                 <RefreshCw className="w-5 h-5 mr-2" />
                 Play Again
               </button>
               <button
                 onClick={() => setGameState('menu')}
                 className="flex items-center px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
               >
                 <Settings className="w-5 h-5 mr-2" />
                 Menu
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
