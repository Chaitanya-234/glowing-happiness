'use client';

import { ToolIcon } from '@/components/ToolIcon';
import { Tool, tools } from '@/lib/tools-data';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, ChevronDown, Clock, Home, LayoutGrid, List as ListIcon, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { FilterSidebar } from './components/FilterSidebar';
import { SearchBar } from './components/SearchBar';
import { ToolCard } from './components/ToolCard';
import { useToolStorage } from './hooks/useToolStorage';

type SortOption = 'popularity' | 'newest' | 'alphabetical';

export default function ToolsPageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 pb-20 px-4 text-center text-muted">Loading tools...</div>}>
      <ToolsPageContent />
    </Suspense>
  );
}

function ToolsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    favorites, recentTools, viewMode, toolViews,
    toggleFavorite, addRecentTool, addToolView, changeViewMode, mounted,
  } = useToolStorage();

  const handleToolClick = (toolId: string) => {
    addRecentTool(toolId);
    addToolView(toolId);
  };

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategories.length) params.set('categories', selectedCategories.join(','));
    if (selectedTags.length) params.set('tags', selectedTags.join(','));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchQuery, selectedCategories, selectedTags, router]);

  const uniqueCategories = useMemo(() => [...new Set(tools.map((t) => t.category))].sort(), []);
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    tools.forEach((t) => t.features.forEach((f) => tags.add(f)));
    return Array.from(tags).sort((a, b) => a.localeCompare(b)).slice(0, 30);
  }, []);

  const filteredTools = useMemo(() => {
    let result = tools;

    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowerQ) ||
          tool.description.toLowerCase().includes(lowerQ) ||
          tool.category.toLowerCase().includes(lowerQ) ||
          tool.features.some((f) => f.toLowerCase().includes(lowerQ))
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter((tool) => selectedCategories.includes(tool.category));
    }
    if (selectedTags.length > 0) {
      result = result.filter((tool) => tool.features.some((f) => selectedTags.includes(f)));
    }

    const favoriteTools = result.filter((t) => favorites.includes(t.id));
    const nonFavoriteTools = result.filter((t) => !favorites.includes(t.id));

    const sorter = (a: Tool, b: Tool) => {
      if (sortBy === 'popularity') {
        const countA = toolViews[a.id] || 0;
        const countB = toolViews[b.id] || 0;
        if (countA !== countB) return countB - countA;
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
      if (sortBy === 'newest') {
        const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
        const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
        return dateB - dateA;
      }
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      return 0;
    };

    nonFavoriteTools.sort(sorter);
    favoriteTools.sort(sorter);
    return [...favoriteTools, ...nonFavoriteTools];
  }, [searchQuery, selectedCategories, selectedTags, sortBy, favorites, toolViews]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const paginatedTools = filteredTools.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleToggleCategory = (cat: string) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
    setCurrentPage(1);
  };
  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    setCurrentPage(1);
  };
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const viewBtn = (active: boolean) =>
    `p-2 rounded-lg transition-colors ${
      active ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground hover:bg-surface/15'
    }`;

  if (!mounted) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 text-center">
        <div className="animate-pulse text-accent">Loading directory...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <span className="select-none">/</span>
          <span className="text-foreground">Tools</span>
        </nav>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
         
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Developer Tools
          </h1>
          <p className="text-xl text-muted mb-8 max-w-3xl mx-auto">
            A comprehensive collection of {tools.length}+ free developer utilities.
          </p>

          <SearchBar
            value={searchQuery}
            onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
            isAiEnabled={false}
            onToggleAi={() => {}}
            isSearching={false}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile toolbar */}
          <div className="lg:hidden glass flex justify-between items-center mb-4 sticky top-24 z-20 p-2 rounded-2xl">
            <button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              className="btn-glass flex items-center gap-2 px-4 py-2 text-sm"
            >
              <Menu className="w-5 h-5" /> Filters
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => changeViewMode('grid')} aria-label="Grid view" className={viewBtn(viewMode === 'grid')}>
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button onClick={() => changeViewMode('list')} aria-label="List view" className={viewBtn(viewMode === 'list')}>
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div
            className={`lg:w-72 shrink-0 ${
              showMobileSidebar ? 'fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-4 overflow-y-auto' : 'hidden lg:block'
            }`}
          >
            {showMobileSidebar && (
              <button onClick={() => setShowMobileSidebar(false)} className="absolute top-4 right-4 text-accent p-2">
                Close
              </button>
            )}

            <div className="space-y-6 lg:sticky lg:top-28">
              {recentTools.length > 0 && (
                <div className="glass rounded-3xl p-4">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-accent" />
                    Recently Viewed
                  </h2>
                  <div className="space-y-1">
                    {recentTools.slice(0, 5).map((id) => {
                      const tool = tools.find((t) => t.id === id);
                      if (!tool) return null;
                      return (
                        <Link
                          key={id}
                          href={tool.link}
                          onClick={() => handleToolClick(id)}
                          className="flex items-center gap-2 text-sm text-muted hover:text-foreground truncate py-1.5 hover:bg-surface/15 rounded-lg px-2 transition-colors"
                        >
                          <ToolIcon toolId={id} className="w-4 h-4 shrink-0 text-accent" />
                          <span className="truncate">{tool.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <FilterSidebar
                categories={uniqueCategories}
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
                tags={uniqueTags}
                selectedTags={selectedTags}
                onToggleTag={handleToggleTag}
                onClearAll={clearFilters}
                totalResults={filteredTools.length}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="glass flex justify-between items-center mb-6 p-4 rounded-3xl">
              <div className="text-sm text-muted hidden md:block">
                Showing <span className="font-bold text-foreground">{paginatedTools.length}</span> of {filteredTools.length} tools
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="relative group">
                  <button className="flex items-center gap-2 text-sm font-medium text-foreground px-3 py-1.5 rounded-lg hover:bg-surface/15 transition-colors">
                    <ArrowUpDown className="w-4 h-4" />
                    Sort by: <span className="text-accent capitalize">{sortBy}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block group-focus-within:block z-20">
                    <div className="bg-background border border-border/30 rounded-2xl shadow-xl overflow-hidden">
                      {(['popularity', 'newest', 'alphabetical'] as SortOption[]).map((option) => (
                        <button
                          key={option}
                          onClick={() => setSortBy(option)}
                          className={`w-full text-left px-4 py-3 text-sm capitalize transition-colors hover:bg-surface/15 ${
                            sortBy === option ? 'text-foreground bg-surface/15 font-semibold' : 'text-muted'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-1 border-l border-border/20 pl-4">
                  <button onClick={() => changeViewMode('grid')} title="Grid View" aria-label="Grid view" className={viewBtn(viewMode === 'grid')}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => changeViewMode('list')} title="List View" aria-label="List view" className={viewBtn(viewMode === 'list')}>
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tools grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
              <AnimatePresence mode="popLayout">
                {paginatedTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    viewMode={viewMode}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={(e) => { e.preventDefault(); toggleFavorite(tool.id); }}
                    onClick={() => handleToolClick(tool.id)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>

            {paginatedTools.length === 0 && (
              <div className="glass text-center py-20 rounded-3xl border-dashed">
                <p className="text-muted text-lg mb-4">No tools found matching your criteria.</p>
                <button onClick={clearFilters} className="btn-solid px-6 py-2.5">Clear Filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => { setCurrentPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="btn-glass px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-muted text-sm">
                  Page <span className="text-foreground font-bold">{currentPage}</span> of {totalPages}
                </span>
                <button
                  onClick={() => { setCurrentPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="btn-glass px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            <div className="mt-20 pt-8 border-t border-border/15 text-center text-xs text-muted">
              <p>Preferences and history are stored locally on your device. No personal data is sent to our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}