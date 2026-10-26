'use client';

import { ChatMessage as ChatMessageType, chatWithDevBot } from '@/app/actions/chatbot';
import Icon from '@/components/Icon';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

type UiMessage = ChatMessageType & { at: number };

const quickActions = [
  { label: 'Explore Tools', icon: 'bolt', action: 'What tools do you have?' },
  { label: 'Browse Blogs', icon: 'menu_book', action: 'Show me the latest blogs' },
  { label: 'Pricing', icon: 'credit_card', action: 'What is the pricing?' },
  { label: 'Help', icon: 'help', action: 'How does DevMetrix work?' },
];

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initial welcome message
  useEffect(() => {
    if (!initialized.current && isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          at: Date.now(),
          parts: [{ text: "**Hey there! I'm DevBot.**\n\nI can help you explore tools, find blog posts, or explain technical concepts. What's on your mind?" }],
        },
      ]);
      initialized.current = true;
    }
  }, [isOpen, messages.length]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: UiMessage = { role: 'user', at: Date.now(), parts: [{ text }] };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, parts: m.parts }));
      const response = await chatWithDevBot(history, text, pathname);
      setMessages((prev) => [...prev, { role: 'model', at: Date.now(), parts: [{ text: response.message }] }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'model', at: Date.now(), parts: [{ text: 'Sorry, something went wrong. Please try again.' }] }]);
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

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-label="DevBot chat"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 right-0 md:bottom-[88px] md:right-5 w-full md:w-[340px] h-full md:h-[min(480px,calc(100dvh-8rem))] bg-background/90 backdrop-blur-xl md:rounded-3xl shadow-2xl z-[9999] flex flex-col border border-border/25 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-surface/15 border-b border-border/20 shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 grid place-items-center rounded-full bg-primary text-primary-foreground">
                <Icon name="auto_awesome" className="text-[20px]" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base text-foreground">DevBot</h3>
                <div className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="w-2 h-2 bg-accent rounded-full motion-safe:animate-pulse" />
                  <span className="text-xs text-muted">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={onMinimize} aria-label="Minimize chat" className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface/20 transition-colors">
                <Icon name="minimize" className="text-[20px]" />
              </button>
              <button onClick={onClose} aria-label="Close chat" className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface/20 transition-colors">
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div role="log" aria-live="polite" className="flex-1 overflow-y-auto p-3">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} role={msg.role} text={msg.parts[0].text} timestamp={new Date(msg.at)} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length < 3 && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => handleSend(a.action)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-surface/15 border border-border/30 rounded-full text-xs font-medium text-foreground hover:bg-surface/25 whitespace-nowrap transition-colors"
                >
                  <Icon name={a.icon} className="text-[16px] text-accent" />
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-border/20 shrink-0">
            <div className="flex items-center gap-2 bg-surface/15 border border-border/20 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                aria-label="Message DevBot"
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted"
                autoFocus
              />
              <button
                onClick={() => handleSend()}
                disabled={!canSend}
                aria-label="Send message"
                className={`w-9 h-9 grid place-items-center rounded-full transition-all ${
                  canSend ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md' : 'bg-surface/25 text-muted cursor-not-allowed'
                }`}
              >
                <Icon name="send" className="text-[18px]" />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-muted">Powered by Devmetrix.in AI • DevMetrix</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};