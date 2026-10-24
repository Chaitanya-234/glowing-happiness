'use client';

import { Search, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isAiEnabled: boolean;
  onToggleAi: () => void;
  isSearching?: boolean;
}

export function SearchBar({ value, onChange, isAiEnabled, onToggleAi, isSearching }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto z-30">
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity ${isAiEnabled ? 'opacity-40 group-hover:opacity-50' : ''}`} />
        <div className="relative flex items-center bg-purple-900/40 border border-purple-500/30 rounded-full p-1 backdrop-blur-xl transition-colors focus-within:bg-purple-900/60 focus-within:border-purple-500/50">
          <Search className="ml-4 w-5 h-5 text-purple-400/50 shrink-0" />
          <input
            type="text"
            placeholder={isAiEnabled ? "Ask AI: 'Find tools for PDF merging'..." : "Search tools by name, description..."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-none text-purple-100 placeholder-purple-400/30 focus:outline-none focus:ring-0 px-4 py-2 min-w-0"
          />

          <div className="flex items-center gap-2 pr-1 shrink-0">
             {isSearching && (
                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
             )}
            <button
              onClick={onToggleAi}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isAiEnabled
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-purple-800/30 text-purple-300 hover:bg-purple-700/50'
              }`}
              title="Toggle AI Search"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Search</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isAiEnabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-purple-900/80 border border-purple-500/20 rounded-xl backdrop-blur-md z-20 text-xs text-purple-200/60 text-center shadow-xl"
          >
            <p>AI Search uses Gemini to understand natural language. Try searching for <span className="text-purple-300">"tools to help me write better code"</span> or <span className="text-purple-300">"image optimization"</span>.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
