'use client';

import React, { useState, useEffect } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { usePathname } from 'next/navigation';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const pathname = usePathname();

  // Proactive engagement based on page
  useEffect(() => {
    // Only trigger once per session per page type if needed, but for now simple check
    if (pathname === '/pricing') {
        const timer = setTimeout(() => {
            if (!isOpen) setNotificationCount(prev => prev + 1);
        }, 5000);
        return () => clearTimeout(timer);
    }
  }, [pathname, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
        setNotificationCount(0);
    }
  };

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsOpen(false)}
      />
      <ChatButton
        isOpen={isOpen}
        onClick={toggleChat}
        notificationCount={notificationCount}
      />
    </>
  );
}
