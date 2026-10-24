import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Send, Sparkles, Zap, BookOpen, CreditCard, HelpCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage as ChatMessageType, chatWithDevBot } from '@/app/actions/chatbot';
import { usePathname } from 'next/navigation';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const initialized = useRef(false);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initial welcome message
  useEffect(() => {
    if (!initialized.current && isOpen && messages.length === 0) {
        setMessages([
            {
                role: 'model',
                parts: [{ text: "👋 **Hey there! I'm DevBot.**\n\nI can help you explore tools, find blog posts, or explain technical concepts. What's on your mind? ✨" }]
            }
        ]);
        initialized.current = true;
    }
  }, [isOpen, messages.length]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessageType = { role: 'user', parts: [{ text }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: m.parts
      }));

      const response = await chatWithDevBot(history, text, pathname);

      const botMsg: ChatMessageType = {
        role: 'model',
        parts: [{ text: response.message }]
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Explore Tools', icon: <Zap size={14} />, action: 'What tools do you have?' },
    { label: 'Browse Blogs', icon: <BookOpen size={14} />, action: 'Show me the latest blogs' },
    { label: 'Pricing', icon: <CreditCard size={14} />, action: 'What is the pricing?' },
    { label: 'Help', icon: <HelpCircle size={14} />, action: 'How does DevMetrix work?' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 right-0 md:bottom-[80px] md:right-[20px] w-full md:w-[400px] h-full md:h-[600px] bg-white dark:bg-[#0f1117] md:rounded-2xl shadow-2xl z-[9999] flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-700 to-blue-600 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Sparkles size={20} className="text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">DevBot</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-white/80">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onMinimize} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                <Minimize2 size={18} />
              </button>
              <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                role={msg.role}
                text={msg.parts[0].text}
                timestamp={new Date()}
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (Only show if few messages to avoid clutter) */}
          {messages.length < 3 && (
             <div className="px-4 py-2 bg-gray-50 dark:bg-[#0a0a0a] flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
                {quickActions.map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(action.action)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-purple-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 whitespace-nowrap transition-colors"
                    >
                        {action.icon}
                        {action.label}
                    </button>
                ))}
             </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-[#0f1117] border-t border-gray-200 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 border border-transparent focus-within:border-purple-500 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500"
                autoFocus
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-lg transition-all ${
                    input.trim() && !isLoading
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400">Powered by Devmetrix.Cloud AI • DevMetrix</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
