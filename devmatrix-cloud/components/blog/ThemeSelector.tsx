'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { BlogTheme } from '@/lib/themes/blog-themes';

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, themeId, setTheme, availableThemes } = useTheme();

  return (
    <>
      {/* Theme Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all"
      >
        <Palette size={24} />
      </motion.button>

      {/* Theme Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-gray-900 border border-purple-500/30 rounded-2xl p-8"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-purple-200 mb-2">
                    Choose Your Theme
                  </h2>
                  <p className="text-purple-300/60">
                    Select a visual theme for your blog reading experience
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-purple-900/20 rounded-lg transition-colors"
                >
                  <X size={24} className="text-purple-300" />
                </button>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(availableThemes).map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isSelected={themeId === theme.id}
                    onSelect={() => {
                      setTheme(theme.id);
                      setTimeout(() => setIsOpen(false), 300);
                    }}
                  />
                ))}
              </div>

              {/* Current Theme Info */}
              <div className="mt-8 p-6 bg-purple-900/20 border border-purple-500/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{currentTheme.preview}</div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-200">
                      Current: {currentTheme.name}
                    </h3>
                    <p className="text-purple-300/60">{currentTheme.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface ThemeCardProps {
  theme: BlogTheme;
  isSelected: boolean;
  onSelect: () => void;
}

function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative text-left p-6 rounded-xl border-2 transition-all ${
        isSelected
          ? 'border-purple-500 bg-purple-900/30 shadow-lg shadow-purple-500/20'
          : 'border-purple-500/20 bg-gray-800/50 hover:border-purple-500/40'
      }`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 bg-purple-600 text-white rounded-full p-1"
        >
          <Check size={16} />
        </motion.div>
      )}

      {/* Theme Preview Icon */}
      <div className="text-5xl mb-4">{theme.preview}</div>

      {/* Theme Info */}
      <h3 className="text-xl font-bold text-purple-200 mb-2">{theme.name}</h3>
      <p className="text-purple-300/60 text-sm mb-4">{theme.description}</p>

      {/* Color Preview */}
      <div className="flex gap-2 mb-3">
        <div
          className={`w-8 h-8 rounded-full border-2 border-purple-500/20 ${!theme.colors.accent.includes('gradient') ? theme.colors.accent : ''}`}
        >
             {/* If it is a gradient, we can just apply the tailwind classes to the div. */}
             {theme.colors.accent.includes('gradient') && (
                 <div className={`w-full h-full rounded-full bg-gradient-to-r ${theme.effects.gradients.join(' ')}`} />
             )}
        </div>

        <div className="flex gap-1">
          {theme.effects.animations && (
            <span className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded">
              Animated
            </span>
          )}
          {theme.effects.glowEffect && (
            <span className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded">
              Glow
            </span>
          )}
        </div>
      </div>

      {/* Font Preview */}
      <div className={`${theme.typography.fontFamily} text-purple-300/80 text-sm`}>
        <span className={theme.typography.headingWeight}>Aa</span> - Font Preview
      </div>
    </motion.button>
  );
}
