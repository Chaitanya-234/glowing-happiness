'use client';

import { useState, useEffect } from 'react';

export type ViewMode = 'grid' | 'list';

export function useToolStorage() {
  // Initialize with defaults, update in useEffect to avoid hydration mismatch
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [toolViews, setToolViews] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedFavorites = localStorage.getItem('devmatrix_favorites');
      const savedRecent = localStorage.getItem('devmatrix_recent');
      const savedViewMode = localStorage.getItem('devmatrix_viewMode');
      const savedToolViews = localStorage.getItem('devmatrix_toolViews');

      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      if (savedRecent) setRecentTools(JSON.parse(savedRecent));
      if (savedViewMode) setViewMode(savedViewMode as ViewMode);
      if (savedToolViews) setToolViews(JSON.parse(savedToolViews));
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
  }, []);

  const toggleFavorite = (toolId: string) => {
    const newFavorites = favorites.includes(toolId)
      ? favorites.filter(id => id !== toolId)
      : [...favorites, toolId];

    setFavorites(newFavorites);
    localStorage.setItem('devmatrix_favorites', JSON.stringify(newFavorites));
  };

  const addRecentTool = (toolId: string) => {
    const newRecent = [toolId, ...recentTools.filter(id => id !== toolId)].slice(0, 10);
    setRecentTools(newRecent);
    localStorage.setItem('devmatrix_recent', JSON.stringify(newRecent));
  };

  const addToolView = (toolId: string) => {
    const newViews = { ...toolViews, [toolId]: (toolViews[toolId] || 0) + 1 };
    setToolViews(newViews);
    localStorage.setItem('devmatrix_toolViews', JSON.stringify(newViews));
  };

  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('devmatrix_viewMode', mode);
  };

  return {
    favorites,
    recentTools,
    viewMode,
    toolViews,
    toggleFavorite,
    addRecentTool,
    addToolView,
    changeViewMode,
    mounted // Useful to prevent rendering localStorage dependent UI on server
  };
}
