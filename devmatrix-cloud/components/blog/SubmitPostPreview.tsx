'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, Tag, BookOpen } from 'lucide-react';
import { BLOG_THEMES, ThemeId } from '@/lib/themes/blog-themes';
import ReactMarkdown from 'react-markdown';

interface SubmitPostPreviewProps {
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  themeId: ThemeId;
  readingTime: number;
}

export default function SubmitPostPreview({
  title,
  description,
  content,
  category,
  tags,
  authorName,
  themeId,
  readingTime,
}: SubmitPostPreviewProps) {
  const theme = BLOG_THEMES[themeId];

  return (
    <div className={`${theme.colors.background} min-h-screen p-8 transition-all duration-500`}>
      <div className="max-w-4xl mx-auto">
        {/* Preview Label */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">
            <Eye size={16} />
            <span>Live Preview</span>
          </div>
        </div>

        {/* Article Container */}
        <article
          className={`
            ${theme.colors.cardBg}
            ${theme.layout.cardBorderRadius}
            ${theme.layout.cardPadding}
            ${theme.layout.cardShadow}
            border ${theme.colors.border}
            backdrop-blur-sm
            transition-all duration-500
          `}
        >
          {/* Category Badge */}
          {category && (
            <div className="mb-6">
              <span
                className={`
                  inline-block px-4 py-2
                  ${theme.layout.cardBorderRadius}
                  text-sm
                  ${theme.typography.fontFamily}
                  bg-gradient-to-r ${theme.effects.gradients.join(' ')}
                  text-white
                  ${theme.effects.animations ? 'animate-pulse' : ''}
                `}
              >
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className={`
              ${theme.typography.headingWeight}
              ${theme.typography.fontFamily}
              text-4xl md:text-5xl
              ${theme.colors.primary}
              mb-4
              transition-all duration-500
              ${theme.effects.glowEffect ? 'hover:drop-shadow-glow' : ''}
            `}
          >
            {title || 'Your Post Title Here'}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={`
                ${theme.colors.secondary}
                ${theme.typography.fontFamily}
                ${theme.typography.bodyWeight}
                text-lg mb-6
                transition-all duration-500
              `}
            >
              {description}
            </p>
          )}

          {/* Meta Info */}
          <div
            className={`
              flex flex-wrap items-center gap-4
              ${theme.colors.textSecondary}
              text-sm
              ${theme.typography.fontFamily}
              mb-8 pb-8
              border-b ${theme.colors.border}
            `}
          >
            {authorName && (
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.effects.gradients.join(' ')} flex items-center justify-center text-white font-bold`}>
                  {authorName.charAt(0).toUpperCase()}
                </div>
                <span>{authorName}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>{content.split(' ').length} words</span>
            </div>
            <div className="ml-auto">
              {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Content Preview */}
          {content ? (
            <div
              className={`
                prose prose-lg max-w-none
                ${theme.colors.text}
                ${theme.typography.fontFamily}
                mb-8
                transition-all duration-500
              `}
            >
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className={`${theme.typography.headingWeight} ${theme.colors.primary}`} {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className={`${theme.typography.headingWeight} ${theme.colors.primary}`} {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className={`${theme.typography.headingWeight} ${theme.colors.primary}`} {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className={`${theme.colors.text}`} {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className={`${theme.colors.primary} underline`} {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className={`${theme.colors.cardBg} px-2 py-1 rounded text-sm`} {...props} />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className={`${theme.colors.textSecondary} text-center py-12 italic`}>
              Start writing to see your content here...
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className={`flex flex-wrap gap-2 pt-8 border-t ${theme.colors.border}`}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`
                    flex items-center gap-1
                    px-3 py-1
                    ${theme.layout.cardBorderRadius}
                    text-sm
                    ${theme.colors.textSecondary}
                    border ${theme.colors.border}
                    ${theme.effects.animations ? 'hover:scale-105 transition-transform' : ''}
                  `}
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Glow Effect Overlay */}
          {theme.effects.glowEffect && (
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.effects.gradients.join(' ')} opacity-5 blur-3xl`} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
