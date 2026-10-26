'use client';

import { motion, useReducedMotion } from 'framer-motion';

export const TypingIndicator = () => {
  const reduce = useReducedMotion();
  return (
    <div
      role="status"
      aria-label="DevBot is typing"
      className="flex items-center gap-1 px-3 py-2.5 mb-4 ml-10 bg-surface/15 border border-border/20 rounded-2xl rounded-tl-none w-fit"
    >
      {[0, 0.2, 0.4].map((delay) => (
        <motion.span
          key={delay}
          className="w-2 h-2 bg-accent rounded-full"
          animate={reduce ? { opacity: [0.4, 1, 0.4] } : { y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay }}
        />
      ))}
    </div>
  );
};