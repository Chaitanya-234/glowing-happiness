// components/Hero.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const VormirCursorLight = dynamic(() => import('./animations/VormirCursorLight'), {
  ssr: false,
});

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setTimeout(() => setShowWelcome(false), 1000);
    }
  };

  const handleMouseMove = () => {
    if (!isMobile) {
      handleInteraction();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleInteraction();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleInteraction();
    }
  };

  return (
    <section
      className="relative min-h-screen bg-white dark:bg-darkBg overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {/* Vormir Background - Interactive (uses its own mouse tracking) */}
      <div className="absolute inset-0 z-10 cursor-crosshair">
        <VormirCursorLight />
      </div>

      {/* Welcome Message - Vanishes after first interaction */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.1,
              transition: { duration: 0.5, ease: "easeOut" }
            }}
            className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 pointer-events-none"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center bg-white/60 dark:bg-black/40 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-black/10 dark:border-white/10 max-w-4xl mx-auto shadow-xl dark:shadow-none"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-mono text-gray-900 dark:text-white mb-6 leading-tight"
                style={{
                  textShadow: '0 0 30px rgba(0, 212, 255, 0.2)',
                }}
              >
                Welcome to{' '}
                <span className="text-neonBlue block sm:inline">DevMetrix</span>
                <span className="text-neonGreen">.</span>
                <span className="text-hotPink">cloud</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 text-center max-w-3xl mx-auto"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Where Developers Build, Share, and Scale
              </motion.p>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-3xl mx-auto"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-neonBlue">Tools</span> •{' '}
                <span className="text-neonGreen">Open Source</span> •{' '}
                <span className="text-hotPink">Community</span> •{' '}
                <span className="text-yellow-400">Across the Universe</span>
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button className="px-8 py-4 bg-gradient-to-r from-neonBlue to-purple-600 text-white font-bold rounded-lg text-lg pointer-events-auto hover:shadow-[0_0_30px_rgba(0,212,255,0.8)] transition-all duration-300">
                  Explore Tools →
                </button>
                <button className="px-8 py-4 border-2 border-neonGreen text-neonGreen font-bold rounded-lg text-lg pointer-events-auto hover:bg-neonGreen hover:text-darkBg hover:shadow-[0_0_30px_rgba(57,255,20,0.8)] transition-all duration-300">
                  Join Community
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {isMobile ? 'Touch anywhere to begin exploration' : 'Move cursor to begin exploration'}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal UI that appears after welcome vanishes */}
      <AnimatePresence>
        {!showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-20 flex items-center justify-center min-h-screen px-4 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-center"
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-gray-900 dark:text-white mb-4"
                style={{
                  textShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
                }}
              >
                <span className="text-neonBlue">DevMetrix</span>
                <span className="text-neonGreen">.</span>
                <span className="text-hotPink">cloud</span>
              </motion.h2>

              {/* Optional: Show a subtle hint that user can scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-10 border-2 border-neonBlue rounded-full flex justify-center pt-2"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-neonBlue rounded-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}