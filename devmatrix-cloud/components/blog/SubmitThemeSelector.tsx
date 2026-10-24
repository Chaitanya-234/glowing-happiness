'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, ChevronDown, Sparkles } from 'lucide-react';
import { BLOG_THEMES, ThemeId } from '@/lib/themes/blog-themes';

interface SubmitThemeSelectorProps {
  selectedTheme: ThemeId;
  onThemeChange: (themeId: ThemeId) => void;
}

export default function SubmitThemeSelector({
  selectedTheme,
  onThemeChange,
}: SubmitThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = BLOG_THEMES[selectedTheme];

  return (
    <div className="relative">
      <label className="block text-purple-200 mb-2 font-semibold flex items-center gap-2">
        <Palette size={18} />
        Choose Theme for Your Post
      </label>

      {/* Current Selection Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 bg-gray-800/50 border border-purple-500/30 rounded-lg text-left flex items-center justify-between hover:border-purple-500/50 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl">{currentTheme.preview}</div>
          <div>
            <div className="text-purple-200 font-semibold">{currentTheme.name}</div>
            <div className="text-purple-400/60 text-sm">{currentTheme.description}</div>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-purple-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Theme Grid Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-gray-900 border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 bg-purple-900/20 border-b border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-200">
                <Sparkles size={16} />
                <span className="text-sm font-semibold">Select Your Visual Theme</span>
              </div>
              <p className="text-purple-400/60 text-xs mt-1">
                Choose how your post will look to readers
              </p>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 space-y-2">
              {Object.values(BLOG_THEMES).map((theme) => (
                <ThemeOption
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedTheme === theme.id}
                  onSelect={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

interface ThemeOptionProps {
  theme: any;
  isSelected: boolean;
  onSelect: () => void;
}

function ThemeOption({ theme, isSelected, onSelect }: ThemeOptionProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        w-full p-4 rounded-lg border-2 transition-all text-left
        ${
          isSelected
            ? 'border-purple-500 bg-purple-900/30 shadow-lg shadow-purple-500/20'
            : 'border-purple-500/10 bg-gray-800/30 hover:border-purple-500/30'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Preview Icon */}
        <div className="text-3xl flex-shrink-0">{theme.preview}</div>

        {/* Theme Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-purple-200 font-semibold">{theme.name}</h4>
              <p className="text-purple-400/60 text-sm mt-0.5">
                {theme.description}
              </p>
            </div>

            {/* Selection Check */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-purple-600 text-white rounded-full p-1 flex-shrink-0"
              >
                <Check size={14} />
              </motion.div>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className={`px-2 py-0.5 bg-gray-900/50 text-purple-300 text-xs rounded ${theme.typography.fontFamily}`}>
              {theme.typography.fontFamily.replace('font-', '')}
            </span>
            {theme.effects.animations && (
              <span className="px-2 py-0.5 bg-blue-900/30 text-blue-300 text-xs rounded">
                Animated
              </span>
            )}
            {theme.effects.glowEffect && (
              <span className="px-2 py-0.5 bg-purple-900/30 text-purple-300 text-xs rounded">
                Glow
              </span>
            )}
          </div>

          {/* Color Preview */}
          <div className="flex gap-1.5 mt-2">
            {theme.effects.gradients.slice(0, 3).map((gradient: string, i: number) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full border border-purple-500/20 bg-gradient-to-r ${gradient}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
