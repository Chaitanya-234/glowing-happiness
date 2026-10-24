'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, Bookmark, BookmarkCheck, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';
import { BLOG_THEMES } from '@/lib/themes/blog-themes';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPost;
  viewMode: 'grid' | 'list';
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function BlogCard({
  post,
  viewMode,
  isBookmarked,
  onToggleBookmark,
}: BlogCardProps) {
  // Use the post's theme, fallback to default
  const theme = BLOG_THEMES[post.themeId || 'default'];

  const cardClasses = `
    ${theme.colors.cardBg}
    ${theme.layout.cardBorderRadius}
    ${theme.layout.cardPadding}
    ${theme.layout.cardShadow}
    border ${theme.colors.border}
    ${theme.effects.animations ? theme.layout.cardHoverEffect : ''}
    transition-all duration-300
    ${theme.effects.glowEffect ? 'hover:glow' : ''}
    relative overflow-hidden
  `;

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
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.effects.gradients.join(' ')} opacity-10 blur-xl`} />
        </div>
      )}

      <div className="relative z-10">
        {/* Theme Badge & Bookmark */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 ${theme.layout.cardBorderRadius} text-xs ${theme.typography.fontFamily} ${theme.typography.bodyWeight} bg-gradient-to-r ${theme.effects.gradients.join(' ')} text-white`}>
              {post.category}
            </span>
            {/* Theme indicator */}
            <span className="text-lg" title={theme.name}>
              {theme.preview}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleBookmark(post.id);
            }}
            className={`${theme.colors.primary} hover:scale-110 transition-transform`}
          >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className={`${theme.typography.headingWeight} ${theme.typography.fontFamily} text-xl mb-3 ${theme.colors.primary} hover:opacity-80 transition-opacity line-clamp-2`}>
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
        <div className={`flex items-center gap-4 text-sm ${theme.colors.textSecondary} ${theme.typography.fontFamily}`}>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{post.readingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{post.viewCount}</span>
          </div>
          <div className="ml-auto text-xs">
            {new Date(post.datePublished).toLocaleDateString()}
          </div>
        </div>

        {/* Hover Overlay */}
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
