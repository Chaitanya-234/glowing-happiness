'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { motion } from 'framer-motion';

export default function ThemeIndicator() {
  const { currentTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-6 z-30 bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 rounded-lg px-4 py-2 flex items-center gap-3"
    >
      <span className="text-2xl">{currentTheme.preview}</span>
      <div>
        <div className="text-purple-200 font-semibold text-sm">
          {currentTheme.name}
        </div>
        <div className="text-purple-400/60 text-xs">Active Theme</div>
      </div>
    </motion.div>
  );
}
