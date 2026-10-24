// components/AdContainer.tsx
'use client';
import { ReactNode, useEffect, useRef } from 'react';

interface AdContainerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
  className?: string;
  label?: string;
  children?: ReactNode;
}

export default function AdContainer({
  slot,
  format = 'auto',
  fullWidthResponsive = true,
  className = '',
  label = 'Advertisement',
  children
}: AdContainerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate initialization
    if (loadedRef.current) {
      return;
    }

    // Only load if element exists and hasn't been initialized by AdSense
    const adElement = adRef.current;
    if (adElement && !adElement.hasAttribute('data-adsbygoogle-status')) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        loadedRef.current = true;
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }

    // Cleanup function
    return () => {
      // Don't reset loadedRef on unmount to prevent re-initialization
    };
  }, []); // Empty dependency array - only run once

  // Get responsive height based on format
  const getMinHeight = () => {
    switch(format) {
      case 'horizontal': return 'min-h-[50px] sm:min-h-[90px]';
      case 'rectangle': return 'min-h-[250px] sm:min-h-[280px]';
      case 'vertical': return 'min-h-[400px] sm:min-h-[600px]';
      default: return 'min-h-[50px] sm:min-h-[100px]';
    }
  };

  // Get responsive max width based on format
  const getMaxWidth = () => {
    switch(format) {
      case 'horizontal': return 'max-w-full sm:max-w-[728px]';
      case 'rectangle': return 'max-w-[300px] sm:max-w-[336px]';
      case 'vertical': return 'w-full max-w-[160px]';
      default: return 'max-w-full';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center my-4 sm:my-8 ${className}`}>
      {/* Ad Label */}
      {label && (
        <div className="w-full max-w-4xl flex justify-center mb-1 sm:mb-2 px-2 sm:px-4">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-mono">
            {label}
          </span>
        </div>
      )}

      {/* Ad Wrapper - FULLY RESPONSIVE */}
      <div className="w-full max-w-4xl">
        <div className={`bg-gray-100/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden flex items-center justify-center relative ${getMinHeight()}`}>

          {/* AdSense Component with responsive styles */}
          <div className={`w-full h-full text-center ${getMaxWidth()} mx-auto`}>
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                minWidth: format === 'vertical' ? '160px' : 'auto',
              }}
              data-ad-client="ca-pub-3483228469012203"
              data-ad-slot={slot}
              data-ad-format={format}
              data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            />
          </div>

          {/* Fallback/Internal Ad Support */}
          {children && (
            <div className="absolute inset-0 pointer-events-none group-hover:pointer-events-auto">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}