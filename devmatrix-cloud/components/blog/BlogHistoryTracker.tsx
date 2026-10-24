'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Info } from 'lucide-react';

export default function BlogHistoryTracker() {
  const pathname = usePathname();
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    // Check privacy acknowledgment
    const acknowledged = localStorage.getItem('privacy_acknowledged');
    if (!acknowledged) {
      setShowPrivacy(true);
    }

    // Logic for tracking history
    // Only track individual blog posts, not the listing page
    if (!pathname || !pathname.startsWith('/blog/') || pathname === '/blog') return;

    const slug = pathname.split('/').pop();
    if (!slug) return;

    // Helper to get history
    const getHistory = () => {
        try {
            return JSON.parse(localStorage.getItem('blog_reading_history') || '[]');
        } catch {
            return [];
        }
    };

    // Initial visit record
    const history = getHistory();
    // Check if exists
    const existingIndex = history.findIndex((h: any) => h.postId === slug);

    if (existingIndex !== -1) {
        // Update timestamp
        history[existingIndex].timestamp = new Date().toISOString();
        // Move to top
        const item = history.splice(existingIndex, 1)[0];
        history.unshift(item);
    } else {
        // Add new
        history.unshift({
            postId: slug,
            timestamp: new Date().toISOString(),
            readPercentage: 0
        });
    }
    localStorage.setItem('blog_reading_history', JSON.stringify(history.slice(0, 20)));


    // Scroll listener for read percentage
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        // Only update if significantly changed or user read more
        if (scrolled > 1) {
             const currentHistory = getHistory();
             const index = currentHistory.findIndex((h: any) => h.postId === slug);

             if (index !== -1) {
                 const currentPct = currentHistory[index].readPercentage || 0;
                 const newPct = Math.min(100, Math.floor(scrolled));

                 // Only update if user read further
                 if (newPct > currentPct) {
                     currentHistory[index].readPercentage = newPct;
                     localStorage.setItem('blog_reading_history', JSON.stringify(currentHistory));
                 }
             }
        }
    };

    // Throttle scroll event slightly
    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);

  }, [pathname]);

  if (!showPrivacy) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] max-w-sm bg-gray-900 border border-purple-500/30 p-4 rounded-xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-purple-200 flex items-center gap-2">
            <Info size={16} className="text-purple-400" />
            Privacy Notice
        </h4>
        <button
            onClick={() => {
                localStorage.setItem('privacy_acknowledged', 'true');
                setShowPrivacy(false);
            }}
            className="text-purple-400 hover:text-white transition-colors"
        >
            <X size={16} />
        </button>
      </div>
      <p className="text-xs text-purple-300/70 leading-relaxed">
        We use local storage to save your reading history, bookmarks, and preferences to enhance your experience. No personal data is sent to our servers.
      </p>
      <button
        onClick={() => {
            localStorage.setItem('privacy_acknowledged', 'true');
            setShowPrivacy(false);
        }}
        className="text-xs font-semibold text-purple-400 hover:text-purple-300 self-start mt-1"
      >
        Acknowledge & Dismiss
      </button>
    </div>
  );
}
