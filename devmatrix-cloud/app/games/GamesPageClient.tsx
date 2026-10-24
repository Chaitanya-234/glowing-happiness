'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Brain, Zap, Code2, Terminal, Grid3X3, Grid2X2, ArrowUpRight, Ghost, Move, Trophy, Keyboard, Network, ListOrdered, Palette, Flag, GitBranch, Server, Bug, Shield } from 'lucide-react';
import Link from 'next/link';

const GAMES = [
  {
    title: 'Typing Speed Test',
    description: 'Test your WPM & accuracy with developer-focused challenges.',
    icon: Keyboard,
    slug: 'typing-speed-test',
    color: 'from-purple-400 to-indigo-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Pathfinding Visualizer',
    description: 'Visualize A* & Dijkstra algorithms finding the shortest path.',
    icon: Network,
    slug: 'pathfinding-visualizer',
    color: 'from-blue-400 to-cyan-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    title: 'Sorting Arena',
    description: 'Watch Bubble, Quick, and Merge sort algorithms battle it out.',
    icon: ListOrdered,
    slug: 'sorting-algorithm-arena',
    color: 'from-green-400 to-emerald-400',
    bg: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400'
  },
  {
    title: 'Shader Showdown',
    description: 'Real-time GLSL coding challenge. Create art with code.',
    icon: Palette,
    slug: 'shader-showdown',
    color: 'from-pink-400 to-rose-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    iconColor: 'text-pink-400'
  },
  {
    title: 'Code Golf Course',
    description: 'Solve challenges with the minimum number of characters.',
    icon: Flag,
    slug: 'code-golf-course',
    color: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    iconColor: 'text-yellow-400'
  },
  {
    title: 'Git Escape Room',
    description: 'Master Git commands to escape the terminal.',
    icon: GitBranch,
    slug: 'git-escape-room',
    color: 'from-red-400 to-orange-400',
    bg: 'bg-red-500/10 border-red-500/20',
    iconColor: 'text-red-400'
  },
  {
    title: 'Microservice Manager',
    description: 'Balance load and scale your distributed system.',
    icon: Server,
    slug: 'microservice-manager',
    color: 'from-blue-400 to-indigo-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    title: 'Bug Hunt Royale',
    description: 'Find and fix bugs in code snippets before time runs out.',
    icon: Bug,
    slug: 'bug-hunt-royale',
    color: 'from-red-400 to-pink-400',
    bg: 'bg-red-500/10 border-red-500/20',
    iconColor: 'text-red-400'
  },
  {
    title: 'Recursion Defense',
    description: 'Defend the stack from overflow by identifying base cases.',
    icon: Shield,
    slug: 'recursion-tower-defense',
    color: 'from-green-400 to-teal-400',
    bg: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400'
  },
  {
    title: 'Tech Stack Memory',
    description: 'Test your memory by matching popular tech logos.',
    icon: Brain,
    slug: 'memory-match',
    color: 'from-blue-400 to-cyan-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    title: '2048 Dev Edition',
    description: 'Merge tiles to reach the 2048 milestone.',
    icon: Grid2X2,
    slug: '2048',
    color: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    iconColor: 'text-yellow-400'
  },
  {
    title: 'Snake Code',
    description: 'Classic snake game. Don\'t hit the syntax errors!',
    icon: Ghost,
    slug: 'snake',
    color: 'from-green-400 to-emerald-400',
    bg: 'bg-green-500/10 border-green-500/20',
    iconColor: 'text-green-400'
  },
  {
    title: 'Algo Sliding Puzzle',
    description: 'Unscramble the grid in fewer moves.',
    icon: Move,
    slug: 'sliding-puzzle',
    color: 'from-purple-400 to-pink-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Candy Crash',
    description: 'Match 3 logic in a colorful grid.',
    icon: Grid3X3,
    slug: 'candy-crush',
    color: 'from-red-400 to-pink-400',
    bg: 'bg-red-500/10 border-red-500/20',
    iconColor: 'text-red-400'
  },
  {
    title: 'Developer Chess',
    description: 'Classic strategy game on a virtual board.',
    icon: Trophy,
    slug: 'chess',
    color: 'from-gray-200 to-gray-400',
    bg: 'bg-gray-500/10 border-gray-500/20',
    iconColor: 'text-gray-200'
  }
];

export default function GamesPageClient() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-purple-900/20 rounded-2xl border border-purple-500/30">
            <Gamepad2 className="w-8 h-8 text-purple-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              Developer Arcade
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Take a break from coding bugs and train your brain.
            Sharpen your memory, speed, and developer skills.
          </p>
        </motion.div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.map((game, index) => (
                <Link href={`/games/${game.slug}`} key={game.slug}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`h-full p-6 rounded-2xl border ${game.bg} backdrop-blur-sm cursor-pointer group hover:bg-opacity-20 transition-all`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-black/20 ${game.iconColor}`}>
                                <game.icon className="w-8 h-8" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
                            {game.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {game.description}
                        </p>
                    </motion.div>
                </Link>
            ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMING_SOON_GAMES.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900/30 border border-white/10 rounded-2xl p-6 hover:bg-gray-900/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <game.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neonBlue transition-colors">
                {game.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {game.description}
              </p>
              <div className="flex items-center text-xs font-mono text-gray-500 bg-black/20 rounded-lg px-2 py-1 w-fit">
                IN DEVELOPMENT
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const COMING_SOON_GAMES = [
  {
    title: 'CSS Grid Garden',
    description: 'Master CSS Grid layout by growing your carrot garden. A visual coding challenge.',
    icon: Code2,
    color: 'bg-green-500/20',
  },
  {
    title: 'Terminal Velocity',
    description: 'Type commands as fast as you can to defend your server from incoming packets.',
    icon: Terminal,
    color: 'bg-orange-500/20',
  },
];
