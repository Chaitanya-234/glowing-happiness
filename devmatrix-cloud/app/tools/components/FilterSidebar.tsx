'use client';

import { motion } from 'framer-motion';
import { X, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll: () => void;
  totalResults: number;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  tags,
  selectedTags,
  onToggleTag,
  onClearAll,
  totalResults
}: FilterSidebarProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isTagsOpen, setIsTagsOpen] = useState(true);

  return (
    <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto thin-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-purple-100 flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-400" />
          Filters
        </h2>
        {(selectedCategories.length > 0 || selectedTags.length > 0) && (
          <button
            onClick={onClearAll}
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            Clear all <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="mb-4 text-xs text-purple-200/40 uppercase tracking-wider font-semibold">
        {totalResults} Results Found
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-purple-200 mb-2 hover:text-purple-100 transition-colors"
        >
          Categories
          {isCategoriesOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {isCategoriesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1 pl-1"
          >
            {categories.map((category) => (
              <label
                key={category}
                className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-purple-600/20 text-purple-100'
                    : 'hover:bg-purple-900/20 text-purple-200/60'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-purple-600 border-purple-500'
                    : 'bg-transparent border-purple-500/30'
                }`}>
                   {selectedCategories.includes(category) && <X className="w-3 h-3 text-white transform rotate-45" />}
                </div>
                {/* Hidden real checkbox for a11y */}
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onToggleCategory(category)}
                  className="sr-only"
                />
                <span className="text-sm truncate select-none">{category}</span>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      {/* Tags */}
      <div>
        <button
          onClick={() => setIsTagsOpen(!isTagsOpen)}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-purple-200 mb-2 hover:text-purple-100 transition-colors"
        >
          Popular Tags
          {isTagsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {isTagsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={`px-2 py-1 rounded text-xs border transition-all select-none ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                    : 'bg-purple-900/20 text-purple-200/60 border-purple-500/10 hover:border-purple-500/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
