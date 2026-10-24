import React from 'react';
import { BookOpen, Video, Globe, DollarSign, ExternalLink } from 'lucide-react';

interface Resource {
  title: string;
  type: 'Course' | 'Article' | 'Video' | 'Book' | 'Documentation' | 'Interactive';
  url?: string;
  isPaid: boolean;
  description: string;
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const getIcon = () => {
    switch (resource.type.toLowerCase()) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'book': return <BookOpen className="w-4 h-4" />;
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors h-full">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          {getIcon()}
          <span className="capitalize">{resource.type}</span>
        </div>
        {resource.isPaid ? (
            <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
              <DollarSign className="w-3 h-3 mr-0.5" /> Paid
            </span>
        ) : (
             <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
               Free
             </span>
        )}
      </div>

      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{resource.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{resource.description}</p>

      {resource.url && (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Start Learning <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      )}
    </div>
  );
}
