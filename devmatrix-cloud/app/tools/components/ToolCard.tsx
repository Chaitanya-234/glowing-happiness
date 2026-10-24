'use client';

import { ToolIcon } from '@/components/ToolIcon';
import { Tool } from '@/lib/tools-data';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { ViewMode } from '../hooks/useToolStorage';

interface ToolCardProps {
  tool: Tool;
  viewMode: ViewMode;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick?: () => void;
  index: number;
}

// Fixed-hue badges: darker text on light theme, lighter text on dark themes
const popularBadge =
  'bg-yellow-500/20 text-yellow-800 dark:text-yellow-200 border border-yellow-500/30';
const newBadge =
  'bg-green-500/20 text-green-800 dark:text-green-200 border border-green-500/30';

export function ToolCard({ tool, viewMode, isFavorite, onToggleFavorite, onClick, index }: ToolCardProps) {
  const isNew = tool.dateAdded
    ? new Date(tool.dateAdded).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    : false;

  const favButton = (extra = '') => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(e);
      }}
      className={`p-2 rounded-full transition-colors hover:bg-foreground/10 ${extra} ${
        isFavorite ? 'text-yellow-500' : 'text-muted hover:text-foreground'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
    >
      <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-500' : ''}`} />
    </button>
  );

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.05, 0.5) }}
        className="group glass glass-hover relative flex items-center gap-4 p-4 rounded-3xl"
      >
        <Link href={tool.link} onClick={onClick} className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 shrink-0 grid place-items-center rounded-2xl bg-foreground/10 border border-border/25 text-accent">
            <ToolIcon toolId={tool.id} className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-foreground truncate block">{tool.name}</span>
              {tool.popular && (
                <span className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${popularBadge}`}>Popular</span>
              )}
              {isNew && (
                <span className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${newBadge}`}>New</span>
              )}
            </div>
            <p className="text-sm text-muted truncate">{tool.description}</p>
          </div>
        </Link>
        {favButton()}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      className="group glass glass-hover relative flex flex-col h-full rounded-3xl overflow-hidden"
    >
      <div className="absolute top-3 right-3 z-10">{favButton('bg-foreground/10')}</div>

      <Link href={tool.link} onClick={onClick} className="flex-1 flex flex-col p-6">
        <div className="w-12 h-12 mb-4 grid place-items-center rounded-2xl bg-foreground/10 border border-border/25 text-accent transition-colors group-hover:bg-foreground/15">
          <ToolIcon toolId={tool.id} className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 pr-8">{tool.name}</h3>

        <p className="text-sm text-muted mb-4 line-clamp-3 flex-1">{tool.description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tool.popular && <span className={`px-2.5 py-1 text-xs rounded-full ${popularBadge}`}>Popular</span>}
          {isNew && <span className={`px-2.5 py-1 text-xs rounded-full ${newBadge}`}>New</span>}
          {tool.features.slice(0, 2).map((feature, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-xs rounded-full bg-foreground/10 text-muted border border-border/15"
            >
              {feature}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}