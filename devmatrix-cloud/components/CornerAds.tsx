// components/CornerAds.tsx - ALTERNATIVE VERSION
// This version only shows on screens wider than 1700px to avoid content overlap

'use client';
import { useEffect, useState } from 'react';
import GoogleAdSense from './GoogleAdSense';

interface CornerAdsProps {
  leftAdSlot?: string;
  rightAdSlot?: string;
}

export default function CornerAds({
  leftAdSlot = "5535154789",  // Left Corner Ad
  rightAdSlot = "6465093078"  // Right Side Ads
}: CornerAdsProps) {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      // Only show ads if screen is wider than 1700px
      setIsWideScreen(window.innerWidth >= 1700);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  if (!isWideScreen) return null;

  return (
    <>
      {/* Left Corner Ad */}
      <div className="fixed left-4 top-32 z-20 w-[160px]">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Ad Label */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 py-1 px-2">
            <span className="text-[8px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono block text-center">
              Advertisement
            </span>
          </div>

          {/* Ad Content */}
          <div className="p-2">
            <GoogleAdSense
              adSlot={leftAdSlot}
              adFormat="vertical"
              fullWidthResponsive={true}
              style={{ display: 'block', minHeight: '600px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Right Corner Ad */}
      <div className="fixed right-4 top-32 z-20 w-[160px]">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Ad Label */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 py-1 px-2">
            <span className="text-[8px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono block text-center">
              Advertisement
            </span>
          </div>

          {/* Ad Content */}
          <div className="p-2">
            <GoogleAdSense
              adSlot={rightAdSlot}
              adFormat="vertical"
              fullWidthResponsive={true}
              style={{ display: 'block', minHeight: '600px', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}