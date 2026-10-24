'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog-data';
import { Filter, X, ChevronDown, ChevronUp, Tag, SortAsc, LayoutGrid, List, Calendar, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogFiltersProps {
  allPosts: BlogPost[];
  selectedCategory: string | null;
  selectedTags: string[];
  sortBy: string;
  selectedDateRange: string;
  viewMode: 'grid' | 'list';
  onSelectCategory: (category: string | null) => void;
  onToggleTag: (tag: string) => void;
  onSortChange: (sort: string) => void;
  onDateRangeChange: (range: string) => void;
  onClearFilters: () => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function BlogFilters({
  allPosts,
  selectedCategory,
  selectedTags,
  sortBy,
  selectedDateRange,
  viewMode,
  onSelectCategory,
  onToggleTag,
  onSortChange,
  onDateRangeChange,
  onClearFilters,
  onViewModeChange,
}: BlogFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract unique categories and tags
  const categories = Array.from(new Set(allPosts.map(p => p.category))).sort();
  // Get top 15 most popular tags (reduced from 20)
  const allTags = allPosts.flatMap(p => p.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([tag]) => tag);

  const activeFilterCount = (selectedCategory ? 1 : 0) + selectedTags.length + (selectedDateRange !== 'all' ? 1 : 0);

  return (
    <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-2 md:p-2.5 mb-3 md:mb-4 sticky top-20 z-10 backdrop-blur-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2">

        {/* Mobile: Filter Toggle & Active Count */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden flex items-center gap-1.5 text-purple-200 font-medium text-xs bg-purple-900/40 px-2.5 py-1.5 rounded-lg border border-purple-500/20"
        >
          <SlidersHorizontal size={14} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-purple-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </span>
          )}
          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {/* Desktop: Active Chips (Compact) */}
        <div className="hidden md:flex flex-wrap items-center gap-1.5 flex-1">
          <button
            onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
            className="text-xs font-semibold text-purple-200 mr-1 flex items-center gap-1.5 hover:text-purple-100 transition-colors"
          >
            <Filter size={14} />
            {isDesktopExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          {selectedCategory && (
            <span className="flex items-center gap-1 text-[10px] bg-purple-500/20 text-purple-200 px-1.5 py-0.5 rounded border border-purple-500/30">
              {selectedCategory}
              <button onClick={() => onSelectCategory(null)} className="hover:text-white"><X size={10} /></button>
            </span>
          )}
          {selectedDateRange !== 'all' && (
             <span className="flex items-center gap-1 text-[10px] bg-green-500/20 text-green-200 px-1.5 py-0.5 rounded border border-green-500/30">
              {selectedDateRange === '7d' ? '7d' : selectedDateRange === '30d' ? '30d' : '1y'}
              <button onClick={() => onDateRangeChange('all')} className="hover:text-white"><X size={10} /></button>
            </span>
          )}
          {selectedTags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-[10px] bg-blue-500/20 text-blue-200 px-1.5 py-0.5 rounded border border-blue-500/30">
              #{tag}
              <button onClick={() => onToggleTag(tag)} className="hover:text-white"><X size={10} /></button>
            </span>
          ))}
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="text-[10px] text-red-400 hover:text-red-300 underline ml-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right Side: Compact Controls */}
        <div className="flex items-center gap-2">
             {/* Desktop Sort Controls - Compact */}
            <div className="hidden md:flex items-center gap-2">
                 <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-purple-400" />
                    <select
                        value={selectedDateRange}
                        onChange={(e) => onDateRangeChange(e.target.value)}
                        className="bg-gray-800 text-xs text-purple-200 border border-purple-500/30 rounded px-1.5 py-1 focus:outline-none focus:border-purple-500"
                    >
                        <option value="all">Any Date</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="1y">Last Year</option>
                    </select>
                 </div>

                <div className="flex items-center gap-1">
                    <SortAsc size={14} className="text-purple-400" />
                    <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="bg-gray-800 text-xs text-purple-200 border border-purple-500/30 rounded px-1.5 py-1 focus:outline-none focus:border-purple-500"
                    >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Popular</option>
                    <option value="readingTime">Read Time</option>
                    <option value="alpha">A-Z</option>
                    </select>
                </div>
            </div>

            {/* View Mode Toggle - Compact */}
            <div className="flex items-center bg-gray-800 rounded p-0.5 border border-purple-500/30">
                <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1 rounded transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white shadow' : 'text-purple-400 hover:text-purple-200'}`}
                title="Grid View"
                >
                <LayoutGrid size={14} />
                </button>
                <button
                onClick={() => onViewModeChange('list')}
                className={`p-1 rounded transition-colors ${viewMode === 'list' ? 'bg-purple-600 text-white shadow' : 'text-purple-400 hover:text-purple-200'}`}
                title="List View"
                >
                <List size={14} />
                </button>
            </div>
        </div>
      </div>

      {/* Desktop Expanded Filters - Collapsible */}
      <AnimatePresence>
        {isDesktopExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="hidden md:block mt-2 pt-2 border-t border-purple-500/10 overflow-hidden"
          >
            <div className="space-y-2">
                  {/* Categories - Horizontal Pills */}
                  <div>
                    <h4 className="text-[10px] font-bold text-purple-300 uppercase tracking-wider mb-1.5">Categories</h4>
                    <div className="flex flex-wrap gap-1">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => onSelectCategory(selectedCategory === cat ? null : cat)}
                          className={`text-[10px] px-2 py-0.5 rounded-full border transition-all whitespace-nowrap ${
                            selectedCategory === cat
                              ? 'bg-purple-500 border-purple-400 text-white'
                              : 'bg-gray-800 border-gray-700 text-purple-300/70 hover:bg-purple-900/30 hover:text-purple-200 hover:border-purple-500/50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tags Cloud - Horizontal Pills */}
                  <div>
                    <h4 className="text-[10px] font-bold text-purple-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Tag size={10} /> Popular Tags
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {popularTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => onToggleTag(tag)}
                          className={`text-[9px] px-1.5 py-0.5 rounded-full border transition-all whitespace-nowrap ${
                            selectedTags.includes(tag)
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-blue-500/50 hover:text-blue-300'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: Collapsible - Compact */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-2 pt-2 border-t border-purple-500/10 overflow-hidden"
          >
             <div className="flex flex-col gap-3">
                 {/* Mobile Controls - Compact */}
                <div className="grid grid-cols-2 gap-2">
                     <div>
                        <label className="text-[10px] text-purple-400 mb-1 block">Date</label>
                        <select
                            value={selectedDateRange}
                            onChange={(e) => onDateRangeChange(e.target.value)}
                            className="w-full bg-gray-800 text-xs text-purple-200 border border-purple-500/30 rounded px-2 py-1.5"
                        >
                            <option value="all">Any Date</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="1y">Last Year</option>
                        </select>
                     </div>
                     <div>
                         <label className="text-[10px] text-purple-400 mb-1 block">Sort</label>
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="w-full bg-gray-800 text-xs text-purple-200 border border-purple-500/30 rounded px-2 py-1.5"
                        >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popular">Popular</option>
                        <option value="readingTime">Read Time</option>
                        <option value="alpha">A-Z</option>
                        </select>
                    </div>
                </div>

              {/* Categories Mobile - Compact */}
              <div>
                <h4 className="text-[10px] font-bold text-purple-300 uppercase tracking-wider mb-1.5">Categories</h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => onSelectCategory(selectedCategory === cat ? null : cat)}
                      className={`text-left text-[10px] px-2 py-1 rounded transition-colors ${
                        selectedCategory === cat
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800 text-purple-300/70 border border-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Cloud Mobile - Compact */}
              <div>
                <h4 className="text-[10px] font-bold text-purple-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Tag size={10} /> Popular Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => onToggleTag(tag)}
                      className={`text-[9px] px-2 py-1 rounded-full border transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-gray-800 border-gray-700 text-gray-400'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={onClearFilters}
                className="w-full py-1.5 text-xs text-red-400 border border-red-500/30 rounded hover:bg-red-500/10"
              >
                Clear All Filters
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}