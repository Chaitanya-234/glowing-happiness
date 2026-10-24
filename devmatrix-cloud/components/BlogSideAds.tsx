// components/BlogSideAds.tsx
'use client';
import { useEffect, useState } from 'react';
import GoogleAdSense from './GoogleAdSense';

interface BlogSideAdsProps {
  leftAdSlot?: string;
  rightAdSlot?: string;
}

export default function BlogSideAds({
  leftAdSlot = "5535154789",  // Left Corner Ad
  rightAdSlot = "6465093078"  // Right Side Ads
}: BlogSideAdsProps) {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      // Only show ads if screen is wider than 1600px to prevent overlap
      setIsWideScreen(window.innerWidth >= 1600);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  // Don't render anything if screen is not wide enough
  if (!isWideScreen) return null;

  return (
    <>
      {/* Left Side Ad Panel - 197x594px */}
      <div className="fixed left-4 top-32 z-20 w-[197px]">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Ad Label */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 py-1.5 px-2">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono block text-center">
              Advertisement
            </span>
          </div>

          {/* Ad Content - Exact size 197x594px */}
          <div className="p-2">
            <GoogleAdSense
              adSlot={leftAdSlot}
              adFormat="vertical"
              fullWidthResponsive={false}
              style={{
                display: 'block',
                width: '197px',
                height: '594px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Side Ad Panel - 197x594px */}
      <div className="fixed right-4 top-32 z-20 w-[197px]">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Ad Label */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 py-1.5 px-2">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono block text-center">
              Advertisement
            </span>
          </div>

          {/* Ad Content - Exact size 197x594px */}
          <div className="p-2">
            <GoogleAdSense
              adSlot={rightAdSlot}
              adFormat="vertical"
              fullWidthResponsive={false}
              style={{
                display: 'block',
                width: '197px',
                height: '594px'
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}