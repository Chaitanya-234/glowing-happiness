'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  allPosts: BlogPost[]; // For suggestions
}

export default function BlogSearch({ onSearch, isSearching, allPosts }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<BlogPost[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Suggestions logic
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const lowerQ = query.toLowerCase();
    const matches = allPosts
      .filter(p => p.title.toLowerCase().includes(lowerQ))
      .slice(0, 5);
    setSuggestions(matches);
  }, [query, allPosts]);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8" ref={searchRef}>
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-gray-900 border border-purple-500/30 rounded-lg shadow-xl flex items-center p-1">
          <Search className="ml-3 text-purple-400" size={20} />
          <input
            type="text"
            className="w-full bg-transparent text-white p-3 focus:outline-none placeholder-purple-300/30"
            placeholder="Search tutorials, guides, or ask AI (e.g. 'posts about security')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                onSearch('');
                setSuggestions([]);
              }}
              className="p-2 text-purple-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
          {isSearching && (
            <div className="mr-3 text-purple-500 animate-spin">
              <Loader2 size={20} />
            </div>
          )}
        </div>
      </div>

      {/* Auto-suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-purple-500/30 rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="p-2 text-xs text-purple-300/50 uppercase font-semibold tracking-wider px-4 py-2">
            Direct Matches
          </div>
          {suggestions.map((post) => (
            <button
              key={post.id}
              className="w-full text-left px-4 py-3 hover:bg-purple-900/30 transition-colors flex items-center justify-between group"
              onClick={() => {
                setQuery(post.title);
                onSearch(post.title); // Trigger search directly
                setShowSuggestions(false);
              }}
            >
              <span className="text-purple-100 text-sm group-hover:text-purple-300">{post.title}</span>
              <span className="text-xs text-purple-400/50 bg-purple-900/20 px-2 py-1 rounded">
                {post.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
