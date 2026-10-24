import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, ExternalLink } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, text, timestamp }) => {
  const isBot = role === 'model';
  
  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isBot ? 'bg-purple-600 mr-2' : 'bg-blue-600 ml-2'}`}>
          {isBot ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
        </div>
        
        {/* Message Bubble */}
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
          <div 
            className={`p-3 rounded-2xl text-sm shadow-md ${
              isBot 
                ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-700' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none'
            }`}
          >
            <div className={`prose dark:prose-invert max-w-none text-sm break-words 
              prose-p:my-1 prose-p:leading-relaxed
              prose-strong:font-semibold
              prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-700 prose-pre:p-2 prose-pre:rounded-lg
              prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
              ${isBot ? 'prose-a:text-blue-600 dark:prose-a:text-blue-400' : 'prose-a:text-blue-100'}
            `}>
              <ReactMarkdown 
                components={{
                  // Enhanced link styling with hover effects and external link icon
                  a: ({ node, href, children, ...props }) => {
                    const isExternal = href?.startsWith('http');
                    const isInternal = href?.startsWith('/');
                    
                    return (
                      <a 
                        {...props}
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={`
                          inline-flex items-center gap-1 
                          font-medium underline decoration-2 
                          transition-all duration-200 
                          ${isBot 
                            ? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:decoration-blue-800 dark:hover:decoration-blue-300' 
                            : 'text-blue-100 hover:text-white hover:decoration-white'
                          }
                          underline-offset-2
                          cursor-pointer
                          ${isInternal ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 px-1 rounded' : ''}
                        `}
                      >
                        {children}
                        {isExternal && (
                          <ExternalLink 
                            size={12} 
                            className="inline-block flex-shrink-0" 
                          />
                        )}
                      </a>
                    );
                  },
                  
                  // Enhanced code block styling
                  code: ({ className, children, ...props }) => {
                    // Check if it's inline code by looking at the className
                    const isInline = !className || !className.includes('language-');
                    
                    if (isInline) {
                      return (
                        <code 
                          className={`${className || ''} bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code 
                        className={`${className || ''} block bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-xs font-mono overflow-x-auto`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  
                  // Enhanced paragraph spacing
                  p: ({ children }) => (
                    <p className="my-1 leading-relaxed">{children}</p>
                  ),
                  
                  // Enhanced list styling
                  ul: ({ children }) => (
                    <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="my-0.5">{children}</li>
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          </div>
          
          <span className="text-[10px] text-gray-400 mt-1 px-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
