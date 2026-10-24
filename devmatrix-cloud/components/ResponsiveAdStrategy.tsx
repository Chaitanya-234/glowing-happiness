// components/ResponsiveAdStrategy.tsx
'use client';

import { useEffect, useState } from 'react';
import AdContainer from './AdContainer';

interface ResponsiveAdStrategyProps {
  leftAdSlot?: string;      // Optional (for backward compatibility)
  rightAdSlot?: string;     // Optional (for backward compatibility)
  mobileAdSlot: string;     // This will be used for all devices
}

export default function ResponsiveAdStrategy({
  mobileAdSlot,
}: ResponsiveAdStrategyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Top Banner Ad - Shows on ALL devices, scrolls with content */}
      <div className="w-full">
        <AdContainer
          slot={mobileAdSlot}
          format="horizontal"
          label="Advertisement"
          className="mb-6"
        />
      </div>
    </>
  );
}