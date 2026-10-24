'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, BookOpen, AlertCircle, CheckCircle, Info, Server, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { httpStatusData, HttpStatusInfo } from '@/lib/http-status-data';

export default function HttpStatusExplorerClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', '1xx', '2xx', '3xx', '4xx', '5xx'];

  const filteredCodes = useMemo(() => {
    return httpStatusData.filter((status) => {
      const matchesSearch =
        status.code.toString().includes(searchQuery) ||
        status.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        status.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || status.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '1xx': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case '2xx': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case '3xx': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case '4xx': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case '5xx': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const getIcon = (category: string) => {
     switch (category) {
      case '1xx': return <Info className="w-5 h-5" />;
      case '2xx': return <CheckCircle className="w-5 h-5" />;
      case '3xx': return <RefreshCw className="w-5 h-5" />;
      case '4xx': return <AlertCircle className="w-5 h-5" />;
      case '5xx': return <Server className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            HTTP Status Code Explorer
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your definitive guide to every HTTP status code. Learn what they mean, how to fix them, and when to retry.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((status) => (
            <Link href={`/tools/http-status-explorer/${status.code}`} key={status.code}>
              <motion.div
                layoutId={`card-${status.code}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`h-full p-6 rounded-2xl border bg-gray-900/40 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer group ${getCategoryColor(status.category)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg bg-black/20`}>
                    <span className="text-2xl font-bold font-mono">{status.code}</span>
                  </div>
                  <div className={`p-2 rounded-full bg-black/20 ${status.category === '2xx' ? 'text-green-400' : status.category === '4xx' ? 'text-orange-400' : status.category === '5xx' ? 'text-red-400' : 'text-blue-400'}`}>
                    {getIcon(status.category)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {status.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {status.concise}
                </p>

                <div className="flex items-center text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredCodes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No status codes found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
