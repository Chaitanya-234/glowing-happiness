'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';
import { useState } from 'react';
import { BlogTheme } from '@/lib/themes/blog-themes';
import { BlogPost } from '@/lib/blog-data';

interface ThemePreviewProps {
  theme: BlogTheme;
  samplePost: BlogPost;
}

export default function ThemePreview({ theme, samplePost }: ThemePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg text-sm transition-colors"
      >
        <Eye size={16} />
        Preview
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-2xl"
            >
              <div className="bg-gray-900 border border-purple-500/30 rounded-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-200 flex items-center gap-3">
                      <span className="text-3xl">{theme.preview}</span>
                      {theme.name}
                    </h3>
                    <p className="text-purple-300/60 mt-1">{theme.description}</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-purple-900/20 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-purple-300" />
                  </button>
                </div>

                {/* Theme Preview - Simulate the theme context */}
                <div className={`${theme.colors.background} ${theme.layout.cardBorderRadius} p-6`}>
                  <div className={cardClasses(theme)}>
                    <div className="mb-4">
                      <span className={`px-3 py-1 ${theme.layout.cardBorderRadius} text-xs bg-gradient-to-r ${theme.effects.gradients.join(' ')} text-white`}>
                        {samplePost.category}
                      </span>
                    </div>
                    <h4 className={`${theme.typography.headingWeight} ${theme.typography.fontFamily} text-xl mb-3 ${theme.colors.primary}`}>
                      {samplePost.title}
                    </h4>
                    <p className={`${theme.colors.secondary} ${theme.typography.fontFamily} text-sm mb-4`}>
                      {samplePost.excerpt}
                    </p>
                    <div className="flex gap-2 mb-4">
                      {samplePost.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 ${theme.layout.cardBorderRadius} text-xs ${theme.colors.textSecondary} border ${theme.colors.border}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className={`text-sm ${theme.colors.textSecondary}`}>
                      {samplePost.readingTime} min read • {samplePost.viewCount} views
                    </div>
                  </div>
                </div>

                {/* Theme Features */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-purple-900/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-semibold mb-2">Typography</h5>
                    <p className="text-purple-300/60 text-sm">
                      {theme.typography.fontFamily.replace('font-', '')}
                    </p>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-semibold mb-2">Effects</h5>
                    <div className="flex gap-2">
                      {theme.effects.animations && (
                        <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">
                          Animated
                        </span>
                      )}
                      {theme.effects.glowEffect && (
                        <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">
                          Glow
                        </span>
                      )}
                    </div>
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

function cardClasses(theme: BlogTheme) {
  return `
    ${theme.colors.cardBg}
    ${theme.layout.cardBorderRadius}
    ${theme.layout.cardPadding}
    ${theme.layout.cardShadow}
    border ${theme.colors.border}
  `;
}
