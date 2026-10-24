'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, Bookmark, BookmarkCheck, Tag, ArrowRight, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';
import { useTheme } from '@/components/providers/ThemeProvider';
import Link from 'next/link';

interface BlogCardThemedProps {
  post: BlogPost;
  viewMode: 'grid' | 'list';
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function BlogCardThemed({
  post,
  viewMode,
  isBookmarked,
  onToggleBookmark,
}: BlogCardThemedProps) {
  const { currentTheme } = useTheme();
  const theme = currentTheme;
  const isList = viewMode === 'list';

  const cardClasses = `
    ${theme.colors.cardBg}
    ${theme.layout.cardBorderRadius}
    ${theme.layout.cardShadow}
    border ${theme.colors.border}
    ${theme.effects.animations ? theme.layout.cardHoverEffect : ''}
    transition-all duration-300
    ${theme.effects.glowEffect ? 'hover:glow' : ''}
    relative overflow-hidden
    ${isList ? 'flex flex-col md:flex-row' : 'flex flex-col h-full'}
  `;

  // We apply padding to a wrapper or the content div depending on layout
  const contentClasses = isList ? 'flex-1 flex flex-col justify-center' : 'flex-1 flex flex-col';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cardClasses}
    >
      {/* Glow Effect */}
      {theme.effects.glowEffect && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-0">
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.effects.gradients.join(' ')} opacity-10 blur-xl`} />
        </div>
      )}

      {/* Image / Banner Area (Placeholder) */}
       <div className={`relative overflow-hidden z-10 ${isList ? 'w-full md:w-64 h-48 md:h-auto shrink-0' : 'w-full h-48'}`}>
        <div className={`w-full h-full bg-gradient-to-br ${theme.effects.gradients.join(' ')} opacity-30 group-hover:scale-105 transition-transform duration-500`} />
         {/* Category Badge */}
         <span className={`absolute top-4 left-4 z-20 px-3 py-1 text-xs font-semibold ${theme.colors.primary} ${theme.colors.cardBg} backdrop-blur-sm border ${theme.colors.border} rounded-full`}>
          {post.category}
        </span>
         {/* Bookmark Button */}
         <button
            onClick={(e) => {
              e.preventDefault();
              onToggleBookmark(post.id);
            }}
            className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-all ${
                isBookmarked
                  ? `${theme.colors.accent} text-white shadow-lg`
                  : `${theme.colors.cardBg} ${theme.colors.primary} hover:opacity-80`
            }`}
          >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
      </div>

      <div className={`relative z-10 ${theme.layout.cardPadding} ${contentClasses}`}>
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className={`${theme.typography.headingWeight} ${theme.typography.fontFamily} ${isList ? 'text-2xl' : 'text-xl'} mb-3 ${theme.colors.primary} hover:opacity-80 transition-opacity line-clamp-2`}>
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className={`${theme.colors.secondary} ${theme.typography.fontFamily} ${theme.typography.bodyWeight} text-sm mb-4 line-clamp-3`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 ${theme.layout.cardBorderRadius} text-xs ${theme.colors.textSecondary} border ${theme.colors.border} flex items-center gap-1`}
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className={`mt-auto flex items-center justify-between pt-4 border-t ${theme.colors.border} text-sm ${theme.colors.textSecondary} ${theme.typography.fontFamily}`}>
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{post.readingTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{post.viewCount}</span>
              </div>
           </div>

           <Link
                href={`/blog/${post.slug}`}
                className={`flex items-center gap-2 text-xs font-semibold ${theme.colors.primary} hover:opacity-80 transition-colors`}
            >
                Read <ArrowRight size={14} />
            </Link>
        </div>

        {/* Hover Overlay (only if animations enabled) */}
        {theme.effects.animations && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.effects.gradients.join(' ')}`}
          />
        )}
      </div>
    </motion.div>
  );
}
