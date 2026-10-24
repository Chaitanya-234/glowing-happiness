'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/blog-data';
import { History, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

interface HistoryItem {
  postId: string;
  timestamp: string;
  readPercentage: number;
}

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  readingHistory: HistoryItem[];
  allPosts: BlogPost[];
}

export default function BlogSidebar({ recentPosts, readingHistory, allPosts }: BlogSidebarProps) {

  const historyItemsWithDetails = readingHistory
    .map(h => {
      const post = allPosts.find(p => p.id === h.postId);
      return post ? { ...post, readPercentage: h.readPercentage, timestamp: h.timestamp } : null;
    })
    .filter((item): item is BlogPost & { readPercentage: number; timestamp: string } => item !== null)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Recent Reading History */}
      {historyItemsWithDetails.length > 0 && (
        <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 text-purple-200">
            <History className="text-purple-400" size={20} />
            <h3 className="font-bold">Continue Reading</h3>
          </div>

          <div className="space-y-4">
            {historyItemsWithDetails.map((post) => (
              <Link key={`history-${post.id}`} href={`/blog/${post.slug}`} className="block group">
                <div className="text-sm font-medium text-purple-100/80 group-hover:text-purple-400 transition-colors line-clamp-2 mb-1">
                  {post.title}
                </div>
                <div className="flex items-center justify-between text-xs text-purple-300/40">
                  <span>{post.readPercentage}% complete</span>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${post.readPercentage}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured / Trending */}
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-purple-200">
          <Sparkles className="text-yellow-400" size={20} />
          <h3 className="font-bold">Trending Now</h3>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link key={`trending-${post.id}`} href={`/blog/${post.slug}`} className="block group border-b border-purple-500/10 last:border-0 pb-3 last:pb-0">
              <h4 className="text-sm font-medium text-purple-100/90 group-hover:text-purple-400 transition-colors line-clamp-2 mb-1">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-purple-300/40">
                <span className="bg-purple-900/40 px-1.5 py-0.5 rounded border border-purple-500/10">
                  {post.category}
                </span>
                <span>{post.readingTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

       {/* Newsletter or CTA could go here */}
       <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6 text-center">
         <BookOpen className="mx-auto text-purple-400 mb-3" size={32} />
         <h3 className="font-bold text-purple-100 mb-2">Want to write for us?</h3>
         <p className="text-xs text-purple-200/60 mb-4">
           Share your knowledge with the developer community.
         </p>
         <Link
           href="/contact"
           className="inline-block w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg transition-colors"
         >
           Get in Touch
         </Link>
       </div>
    </div>
  );
}
