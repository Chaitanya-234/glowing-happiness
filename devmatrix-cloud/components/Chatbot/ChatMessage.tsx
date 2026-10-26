'use client';

import Icon from '@/components/Icon';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, text, timestamp }) => {
  const isBot = role === 'model';
  const codeBg = isBot ? 'bg-surface/25' : 'bg-primary-foreground/15';

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div
          className={`shrink-0 h-8 w-8 rounded-full grid place-items-center ${
            isBot ? 'bg-surface/20 border border-border/25 text-accent mr-2' : 'bg-primary text-primary-foreground ml-2'
          }`}
        >
          <Icon name={isBot ? 'smart_toy' : 'person'} className="text-[18px]" />
        </div>

        {/* Bubble */}
        <div className={`flex flex-col min-w-0 ${isBot ? 'items-start' : 'items-end'}`}>
          <div
            className={`p-3 rounded-2xl text-sm shadow-md ${
              isBot
                ? 'bg-surface/15 border border-border/20 text-foreground rounded-tl-none'
                : 'bg-primary text-primary-foreground rounded-tr-none'
            }`}
          >
            <div className="text-sm break-words [&_pre_code]:bg-transparent [&_pre_code]:p-0">
              <ReactMarkdown
                components={{
                  a: ({ node, href, children, ...props }) => {
                    const isExternal = href?.startsWith('http');
                    return (
                      <a
                        {...props}
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center gap-1 font-medium underline underline-offset-2 decoration-2 transition-colors ${
                          isBot ? 'text-accent hover:text-foreground' : 'text-primary-foreground hover:opacity-80'
                        }`}
                      >
                        {children}
                        {isExternal && <Icon name="open_in_new" className="text-[14px] shrink-0" />}
                      </a>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className={`my-2 overflow-x-auto rounded-xl p-3 text-xs font-mono ${codeBg}`}>{children}</pre>
                  ),
                  code: ({ children, ...props }) => (
                    <code className={`${codeBg} px-1.5 py-0.5 rounded text-xs font-mono`} {...props}>{children}</code>
                  ),
                  p: ({ children }) => <p className="my-1 leading-relaxed">{children}</p>,
                  h1: ({ children }) => <p className="my-1 font-bold text-base">{children}</p>,
                  h2: ({ children }) => <p className="my-1 font-bold">{children}</p>,
                  h3: ({ children }) => <p className="my-1 font-semibold">{children}</p>,
                  ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="my-0.5">{children}</li>,
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          </div>

          <span className="text-[10px] text-muted mt-1 px-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};