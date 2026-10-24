'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, BarChart2 } from 'lucide-react';

interface ModeSelectorProps {
  mode: 'generator' | 'analyzer';
  setMode: (mode: 'generator' | 'analyzer') => void;
}

export default function ModeSelector({ mode, setMode }: ModeSelectorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full inline-flex relative">
        {/* Sliding Background */}
        <motion.div
          className="absolute top-1 bottom-1 bg-white dark:bg-violet-600 rounded-full shadow-sm z-0"
          initial={false}
          animate={{
            left: mode === 'generator' ? '4px' : '50%',
            width: 'calc(50% - 4px)',
            x: mode === 'analyzer' ? '0%' : '0%'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <button
          onClick={() => setMode('generator')}
          className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'generator'
              ? 'text-slate-900 dark:text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4" />
          Script Generator
        </button>

        <button
          onClick={() => setMode('analyzer')}
          className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            mode === 'analyzer'
              ? 'text-slate-900 dark:text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Report Analyzer
        </button>
      </div>
    </div>
  );
}
