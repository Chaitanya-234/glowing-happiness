'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Play, RotateCcw, Lock } from 'lucide-react';

interface Enemy {
  id: string;
  progress: number; // 0 to 100
  speed: number;
  hp: number;
  type: 'linear' | 'exponential'; // Linear = easy, Exp = tank
}

interface Projectile {
    id: string;
    x: number;
    y: number;
    targetId: string;
}

interface Tower {
    id: string;
    x: number; // Grid X
    y: number; // Grid Y
    type: 'base' | 'recursive';
    level: number;
    range: number;
    cooldown: number;
    lastShot: number;
}

const GRID_W = 10;
const GRID_H = 8;
const PATH_COORDS = [
    {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3},
    {x: 3, y: 3}, {x: 4, y: 3}, {x: 4, y: 2}, {x: 4, y: 1}, {x: 5, y: 1},
    {x: 6, y: 1}, {x: 7, y: 1}, {x: 7, y: 2}, {x: 7, y: 3}, {x: 7, y: 4},
    {x: 7, y: 5}, {x: 6, y: 5}, {x: 5, y: 5}, {x: 4, y: 5}, {x: 4, y: 6},
    {x: 4, y: 7}, {x: 5, y: 7}, {x: 6, y: 7}, {x: 7, y: 7}, {x: 8, y: 7}, {x: 9, y: 7}
];

const RecursionDefense = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [money, setMoney] = useState(100);
  const [lives, setLives] = useState(20);
  const [wave, setWave] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTowerType, setSelectedTowerType] = useState<'base' | 'recursive'>('base');

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // 1. Move Enemies
      setEnemies(prev => {
          const next = prev.map(e => ({
              ...e,
              progress: e.progress + e.speed
          })).filter(e => {
              if (e.progress >= PATH_COORDS.length - 1) {
                  setLives(l => l - 1);
                  return false;
              }
              return e.hp > 0;
          });
          return next;
      });

      // 2. Spawn Enemies
      if (Math.random() < 0.02 * wave) {
          const type = Math.random() > 0.8 ? 'exponential' : 'linear';
          setEnemies(prev => [...prev, {
              id: Math.random().toString(),
              progress: 0,
              speed: 0.05 + (Math.random() * 0.05),
              hp: type === 'exponential' ? 50 * wave : 10 * wave,
              type
          }]);
      }

      // 3. Towers Shoot
      const now = Date.now();
      setTowers(prevTowers => {
          const newProjectiles: Projectile[] = [];

          const nextTowers = prevTowers.map(tower => {
              if (now - tower.lastShot < tower.cooldown) return tower;

              // Find target in range
              // Simple check: distance check
              // We need pixel coords for this.
              // Grid cell size approx 80px?
              // Let's assume progress maps to coords.
              const target = enemies.find(e => {
                  const pos = getPosFromProgress(e.progress);
                  const dist = Math.hypot(pos.x - tower.x, pos.y - tower.y);
                  return dist <= tower.range;
              });

              if (target) {
                  newProjectiles.push({
                      id: Math.random().toString(),
                      x: tower.x,
                      y: tower.y,
                      targetId: target.id
                  });
                  return { ...tower, lastShot: now };
              }
              return tower;
          });

          if (newProjectiles.length > 0) {
            setProjectiles(prev => [...prev, ...newProjectiles]);
            // Instant hit logic for simplicity in this tick, or animate?
            // Let's do instant damage for logic, projectile just visual
            newProjectiles.forEach(p => {
                setEnemies(prev => prev.map(e => {
                    if (e.id === p.targetId) {
                         const dmg = towers.find(t => t.x === p.x && t.y === p.y)?.type === 'recursive' ? 20 : 5;
                         if (e.hp - dmg <= 0) setMoney(m => m + (e.type === 'exponential' ? 10 : 2));
                         return { ...e, hp: e.hp - dmg };
                    }
                    return e;
                }));
            });
            // Clear projectiles after short delay
            setTimeout(() => setProjectiles(prev => prev.filter(p => !newProjectiles.includes(p))), 200);
          }

          return nextTowers;
      });

      if (lives <= 0) setIsPlaying(false);

    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, wave, enemies, lives]); // towers excluded to avoid loop reset issues, handled inside

  const getPosFromProgress = (progress: number) => {
      const idx = Math.floor(progress);
      const nextIdx = Math.min(idx + 1, PATH_COORDS.length - 1);
      const decimal = progress - idx;

      const p1 = PATH_COORDS[idx];
      const p2 = PATH_COORDS[nextIdx];

      return {
          x: p1.x + (p2.x - p1.x) * decimal,
          y: p1.y + (p2.y - p1.y) * decimal
      };
  };

  const placeTower = (x: number, y: number) => {
      if (!isPlaying) return;
      if (PATH_COORDS.some(p => p.x === x && p.y === y)) return; // Can't place on path
      if (towers.some(t => t.x === x && t.y === y)) return; // Already occupied

      const cost = selectedTowerType === 'base' ? 50 : 150;
      if (money < cost) return;

      setMoney(m => m - cost);
      setTowers(prev => [...prev, {
          id: Math.random().toString(),
          x,
          y,
          type: selectedTowerType,
          level: 1,
          range: selectedTowerType === 'base' ? 2 : 3, // Grid units
          cooldown: selectedTowerType === 'base' ? 500 : 1000,
          lastShot: 0
      }]);
  };

  return (
    <div className="flex flex-col h-[85vh] w-full max-w-6xl mx-auto p-4 gap-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-900 p-4 rounded-xl border border-gray-800">
             <div className="flex gap-8">
                 <div className="flex flex-col">
                     <span className="text-xs text-gray-500 font-bold">LIVES</span>
                     <span className={`text-2xl font-mono font-bold ${lives < 5 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>{lives}</span>
                 </div>
                 <div className="flex flex-col">
                     <span className="text-xs text-gray-500 font-bold">STACK MEMORY ($)</span>
                     <span className="text-2xl font-mono font-bold text-yellow-400">${money}</span>
                 </div>
                  <div className="flex flex-col">
                     <span className="text-xs text-gray-500 font-bold">WAVE</span>
                     <span className="text-2xl font-mono font-bold text-blue-400">{wave}</span>
                 </div>
             </div>

             <div className="flex gap-4">
                 <button
                    onClick={() => setSelectedTowerType('base')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${selectedTowerType === 'base' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                 >
                     <Shield size={18} />
                     <div className="text-left">
                         <div className="text-sm font-bold">Base Case</div>
                         <div className="text-xs opacity-70">$50 | Fast, Low Dmg</div>
                     </div>
                 </button>

                 <button
                    onClick={() => setSelectedTowerType('recursive')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${selectedTowerType === 'recursive' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                 >
                     <Zap size={18} />
                      <div className="text-left">
                         <div className="text-sm font-bold">Recursive Call</div>
                         <div className="text-xs opacity-70">$150 | Slow, High Dmg</div>
                     </div>
                 </button>
             </div>

             <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 ${isPlaying ? 'bg-yellow-500 text-black' : 'bg-neonBlue text-black'}`}
             >
                 {isPlaying ? 'Pause' : 'Start Wave'} <Play size={18} fill="black" />
             </button>
        </div>

        {/* Game Grid */}
        <div className="flex-1 bg-black border border-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center">
            <div
                className="relative bg-gray-900 grid"
                style={{
                    width: GRID_W * 60,
                    height: GRID_H * 60,
                    gridTemplateColumns: `repeat(${GRID_W}, 60px)`,
                    gridTemplateRows: `repeat(${GRID_H}, 60px)`
                }}
            >
                {/* Cells */}
                {Array.from({ length: GRID_H * GRID_W }).map((_, i) => {
                    const x = i % GRID_W;
                    const y = Math.floor(i / GRID_W);
                    const isPath = PATH_COORDS.some(p => p.x === x && p.y === y);

                    return (
                        <div
                            key={i}
                            className={`border border-white/5 ${isPath ? 'bg-gray-800' : 'hover:bg-white/5 cursor-pointer'}`}
                            onClick={() => placeTower(x, y)}
                        >
                            {/* Path Indicator */}
                            {isPath && <div className="w-2 h-2 rounded-full bg-white/10 mx-auto mt-[26px]" />}
                        </div>
                    );
                })}

                {/* Path Overlay Line */}
                {/* Could draw SVG line here for better visuals */}

                {/* Towers */}
                {towers.map(t => (
                    <div
                        key={t.id}
                        className="absolute w-[60px] h-[60px] flex items-center justify-center pointer-events-none"
                        style={{ left: t.x * 60, top: t.y * 60 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center ${
                                t.type === 'base' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
                            }`}
                        >
                            {t.type === 'base' ? <Shield size={20} /> : <Zap size={20} />}
                        </motion.div>
                    </div>
                ))}

                {/* Enemies */}
                <AnimatePresence>
                    {enemies.map(e => {
                        const pos = getPosFromProgress(e.progress);
                        return (
                            <motion.div
                                key={e.id}
                                className="absolute w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                                style={{
                                    left: pos.x * 60 + 20, // Center in 60px cell (offset 20 approx)
                                    top: pos.y * 60 + 20,
                                    backgroundColor: e.type === 'linear' ? '#3b82f6' : '#a855f7'
                                }}
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500"
                                        style={{ width: `${(e.hp / (e.type === 'exponential' ? 50 * wave : 10 * wave)) * 100}%` }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                 {/* Projectiles */}
                 {projectiles.map(p => (
                     <motion.div
                        key={p.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        style={{ left: p.x * 60 + 30, top: p.y * 60 + 30 }}
                     />
                 ))}
            </div>

            {!isPlaying && lives > 0 && enemies.length === 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                         <h2 className="text-4xl font-bold text-white mb-4">Recursion Defense</h2>
                         <p className="text-gray-400 mb-6">Build towers to prevent the stack from overflowing!</p>
                         <button onClick={() => setIsPlaying(true)} className="bg-neonBlue px-8 py-3 rounded-xl font-bold hover:bg-blue-400">Play</button>
                    </div>
                </div>
            )}
             {lives <= 0 && (
                <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center">
                    <div className="text-center text-white">
                         <h2 className="text-4xl font-bold mb-4">Stack Overflow!</h2>
                         <p className="mb-6">System crashed.</p>
                         <button
                            onClick={() => { setLives(20); setMoney(100); setEnemies([]); setTowers([]); setIsPlaying(true); }}
                            className="bg-white text-red-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-200"
                        >
                            Restart System
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default RecursionDefense;
