'use client';

import { useState, useEffect, useMemo } from 'react';
import { BlogPost } from '@/lib/blog-data';
import { searchBlogPosts } from '@/app/actions/blog-search';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogCardThemed from '@/components/blog/BlogCardThemed';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { useTheme } from '@/components/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogClientProps {
  initialPosts: BlogPost[];
}

interface HistoryItem {
  postId: string;
  timestamp: string;
  readPercentage: number;
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const { currentTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchIds, setSearchIds] = useState<string[] | null>(null); // null means no search active
  const [isSearching, setIsSearching] = useState(false);

  // Initialize state from URL if available
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'latest');
  const [selectedDateRange, setSelectedDateRange] = useState(searchParams.get('dateRange') || 'all');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readingHistory, setReadingHistory] = useState<HistoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Hydration check
  const [mounted, setMounted] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    setMounted(true);
    const savedBookmarks = localStorage.getItem('blog_bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    const savedHistory = localStorage.getItem('blog_reading_history');
    if (savedHistory) setReadingHistory(JSON.parse(savedHistory));

    const savedViewMode = localStorage.getItem('blog_view_mode');
    if (savedViewMode) setViewMode(savedViewMode as 'grid' | 'list');
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('blog_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('blog_view_mode', viewMode);
  }, [viewMode, mounted]);

  // URL Synchronization
  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (sortBy !== 'latest') params.set('sort', sortBy);
    if (selectedDateRange !== 'all') params.set('dateRange', selectedDateRange);

    // Replace URL without reloading
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedCategory, selectedTags, sortBy, selectedDateRange, mounted, router]);

  // Handle Search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchIds(null);
      return;
    }

    setIsSearching(true);
    try {
      const ids = await searchBlogPosts(query);
      setSearchIds(ids);
      setCurrentPage(1); // Reset to page 1 on search
    } catch (error) {
      console.error('Search failed', error);
      // Fallback?
      setSearchIds([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Filter & Sort Logic
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // 1. Search Filter
    if (searchIds !== null) {
      // Create a map for sorting by relevance (order in searchIds)
      const idMap = new Map(searchIds.map((id, index) => [id, index]));
      result = result.filter(p => searchIds.includes(p.id));
      // Sort by relevance if searching
      result.sort((a, b) => (idMap.get(a.id) || 0) - (idMap.get(b.id) || 0));
    }

    // 2. Category Filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Tags Filter
    if (selectedTags.length > 0) {
      result = result.filter(p => selectedTags.every(t => p.tags.includes(t)));
    }

    // 4. Date Range Filter
    if (selectedDateRange !== 'all') {
        const now = new Date();
        result = result.filter(p => {
            const postDate = new Date(p.datePublished);
            const diffTime = Math.abs(now.getTime() - postDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (selectedDateRange === '7d') return diffDays <= 7;
            if (selectedDateRange === '30d') return diffDays <= 30;
            if (selectedDateRange === '1y') return diffDays <= 365;
            return true;
        });
    }

    // 5. Sort (only if not searching, or explicitly overridden)
    if (searchIds === null || sortBy !== 'relevance') {
       switch (sortBy) {
        case 'latest':
          result.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
          break;
        case 'oldest':
          result.sort((a, b) => new Date(a.datePublished).getTime() - new Date(b.datePublished).getTime());
          break;
        case 'popular':
          result.sort((a, b) => b.viewCount - a.viewCount);
          break;
        case 'readingTime':
          result.sort((a, b) => a.readingTime - b.readingTime);
          break;
        case 'alpha':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }

    return result;
  }, [posts, searchIds, selectedCategory, selectedTags, sortBy, selectedDateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handlers
  const toggleBookmark = (id: string) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setSearchIds(null);
    setSortBy('latest');
    setSelectedDateRange('all');
    setCurrentPage(1);
    router.replace('/blog');
  };

  if (!mounted) {
      // Server-side / Hydration loading state
      return <div className="min-h-screen bg-black pt-24 pb-20 px-4 flex justify-center"><Loader2 className="animate-spin text-purple-500" /></div>;
  }

  return (
    <div className={`min-h-screen ${currentTheme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.effects.gradients.join(' ')} mb-6 text-center`}>
          Developer Blog
        </h1>
        <p className="text-purple-200/50 text-center mb-16 max-w-2xl mx-auto text-lg">
          Tutorials, guides, and best practices for modern web development.
          <br/>
          <span className="text-sm text-purple-400/60 mt-2 block">Powered by Gemini AI Search</span>
        </p>

        <BlogSearch
          onSearch={handleSearch}
          isSearching={isSearching}
          allPosts={posts}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 flex flex-col">
            <BlogFilters
              allPosts={posts}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              sortBy={sortBy}
              selectedDateRange={selectedDateRange}
              viewMode={viewMode}
              onSelectCategory={setSelectedCategory}
              onToggleTag={toggleTag}
              onSortChange={setSortBy}
              onDateRangeChange={setSelectedDateRange}
              onClearFilters={clearFilters}
              onViewModeChange={setViewMode}
            />

            {/* Bookmarked Section (Only if any) */}
            {bookmarks.length > 0 && selectedCategory === null && selectedTags.length === 0 && searchIds === null && selectedDateRange === 'all' && (
               <div className="mb-12">
                   <h3 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                       ⭐ Your Bookmarks
                   </h3>
                   <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                       {posts.filter(p => bookmarks.includes(p.id)).map(post => (
                           <BlogCardThemed
                               key={`bookmark-${post.id}`}
                               post={post}
                               viewMode={viewMode}
                               isBookmarked={true}
                               onToggleBookmark={toggleBookmark}
                            />
                       ))}
                   </div>
                   <div className="border-b border-purple-500/20 my-8" />
               </div>
            )}

            {/* Results */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-gray-900/30 rounded-xl border border-dashed border-purple-500/20">
                    <p className="text-purple-300/50 text-lg">No posts found matching your criteria.</p>
                    <button onClick={clearFilters} className="mt-4 text-purple-400 hover:text-purple-300 underline">Clear all filters</button>
                </div>
            ) : (
                <div className="flex-1">
                     <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        <AnimatePresence mode="popLayout">
                            {currentPosts.map(post => (
                                <BlogCardThemed
                                    key={post.id}
                                    post={post}
                                    viewMode={viewMode}
                                    isBookmarked={bookmarks.includes(post.id)}
                                    onToggleBookmark={toggleBookmark}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Pagination - Ensure visibility with margins and z-index */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12 mb-8 gap-2 relative z-0">
                            <button
                                onClick={() => {
                                  setCurrentPage(p => Math.max(1, p - 1));
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded bg-purple-900/20 text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900/40 transition-colors"
                            >
                                Previous
                            </button>

                            {/* Mobile: Simple page indicator */}
                            <span className="md:hidden flex items-center px-4 text-purple-200">
                              {currentPage} / {totalPages}
                            </span>

                            {/* Desktop: Full pagination */}
                            <div className="hidden md:flex gap-2">
                              {Array.from({ length: totalPages }).map((_, i) => (
                                  <button
                                      key={i}
                                      onClick={() => {
                                        setCurrentPage(i + 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                      }}
                                      className={`w-10 h-10 rounded transition-colors ${
                                          currentPage === i + 1
                                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                                              : 'bg-purple-900/20 text-purple-300 hover:bg-purple-900/40'
                                      }`}
                                  >
                                      {i + 1}
                                  </button>
                              ))}
                            </div>

                            <button
                                onClick={() => {
                                  setCurrentPage(p => Math.min(totalPages, p + 1));
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded bg-purple-900/20 text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900/40 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar
                recentPosts={posts.sort((a,b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()).slice(0, 5)}
                readingHistory={readingHistory}
                allPosts={posts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
