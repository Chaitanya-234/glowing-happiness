import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  notificationCount?: number;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick, notificationCount = 0 }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-2 group">

      {/* Tooltip */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="hidden md:block bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium mb-2 border border-purple-500/20"
        >
          Need help? Chat with DevBot! 🤖
          <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white dark:bg-gray-800 border-b border-r border-purple-500/20 transform rotate-45"></div>
        </motion.div>
      )}

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-gray-800 text-white rotate-90'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        }`}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <motion.div
            animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
            }}
          >
             <MessageCircle size={28} fill="currentColor" className="text-white" />
          </motion.div>
        )}

        {/* Notification Badge */}
        {!isOpen && notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 animate-bounce">
            {notificationCount}
          </span>
        )}
      </motion.button>
    </div>
  );
};
