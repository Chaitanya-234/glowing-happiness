'use client';

import { BlogPost } from '@/lib/blog-data';
import Link from 'next/link';
import { Clock, Eye, ArrowLeft, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '@/components/providers/ThemeProvider';

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { currentTheme: theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <article className={`max-w-4xl mx-auto ${theme.colors.cardBg} ${theme.layout.cardBorderRadius} ${theme.layout.cardPadding} border ${theme.colors.border} transition-all duration-300`}>

        <Link href="/blog" className={`inline-flex items-center gap-2 mb-8 ${theme.colors.textSecondary} hover:${theme.colors.primary} transition-colors`}>
             <ArrowLeft size={20} /> Back to Blog
        </Link>

        {/* Theme indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{theme.preview}</span>
          <span className="text-sm text-purple-400/60">{theme.name} Theme</span>
        </div>

        {/* Category */}
        <span className={`inline-block px-4 py-2 ${theme.layout.cardBorderRadius} text-sm bg-gradient-to-r ${theme.effects.gradients.join(' ')} text-white mb-6 font-semibold`}>
          {post.category}
        </span>

        {/* Title */}
        <h1 className={`${theme.typography.headingWeight} ${theme.typography.fontFamily} text-4xl md:text-5xl ${theme.colors.primary} mb-6`}>
          {post.title}
        </h1>

        {/* Meta */}
        <div className={`flex items-center gap-6 ${theme.colors.textSecondary} text-sm mb-8 pb-8 border-b ${theme.colors.border} ${theme.typography.fontFamily}`}>
          <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{post.viewCount} views</span>
          </div>
          <div className="ml-auto text-xs">
            {new Date(post.datePublished).toLocaleDateString()}
          </div>
        </div>

        {/* Content */}
        <div className={`prose prose-lg ${theme.colors.text} ${theme.typography.fontFamily} max-w-none
          prose-headings:${theme.colors.primary}
          prose-p:${theme.colors.text}
          prose-strong:${theme.colors.primary}
          prose-a:${theme.colors.primary}
          prose-code:${theme.colors.text}
          prose-pre:bg-black/30 prose-pre:border prose-pre:border-${theme.colors.border}
        `}>
           <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        <div className={`flex flex-wrap gap-2 mt-12 pt-8 border-t ${theme.colors.border}`}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 ${theme.layout.cardBorderRadius} text-sm ${theme.colors.textSecondary} border ${theme.colors.border} flex items-center gap-1`}
            >
              <Tag size={14} />
              {tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}