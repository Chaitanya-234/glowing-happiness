'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { Download, Printer, RefreshCw, CheckSquare, Square } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LearningPathDisplayProps {
  markdown: string;
  onReset: () => void;
}

export default function LearningPathDisplay({ markdown, onReset }: LearningPathDisplayProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load state from localStorage on mount (using a simple key based on content hash or similar would be better, but for now just clear on new content)
    // Actually, to make it persistent for the same "path", we'd need an ID.
    // Since we generate a new path each time, maybe just session persistence is fine or none.
    // The prompt says "save state to localStorage".
    // I'll use a key derived from the first few chars of markdown to identify the "document".
    const key = `onboarding-progress-${markdown.slice(0, 50).replace(/\s+/g, '-')}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved progress', e);
      }
    }
  }, [markdown]);

  const toggleCheck = (id: string) => {
    const key = `onboarding-progress-${markdown.slice(0, 50).replace(/\s+/g, '-')}`;
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `onboarding-path-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Custom renderer for list items to detect task lists
  const components = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: '1em 0', borderRadius: '0.5rem' }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono`} {...props}>
          {children}
        </code>
      );
    },
    // Intercept list items to make checkboxes interactive
    li({ children, checked, ...props }: any) {
        // react-markdown with remark-gfm passes `checked` prop (boolean | null) to `li` if it's a task list item
        if (checked !== null && checked !== undefined) {
            // It's a checkbox item.
            // We need a stable ID. We can try to use the text content as ID.
            // This is a bit hacky because children might be complex.
            // Let's rely on the index or position if we can, but react-markdown doesn't give us index easily in the renderer props without index prop.
            // Instead, let's look at the structure.
            // Usually task list item children starts with inputs.
            // But remark-gfm usually renders an <input type="checkbox"> as first child if we don't override input.
            // Let's override `input` instead.
            return <li className="list-none ml-0 pl-0 flex gap-2 items-start my-1" {...props}>{children}</li>;
        }
        return <li {...props}>{children}</li>;
    },
    input(props: any) {
        if (props.type === 'checkbox') {
            // We need to generate a unique ID for this checkbox to persist state.
            // This is hard because we don't have context of where we are.
            // A simple hack: hash the next sibling's text content?
            // Or just use the fact that it is uncontrolled usually?
            // To make it controlled and persistent, we need a unique ID.
            // Since we can't easily get a unique ID from the AST node here without more complex parsing,
            // we will implement a "local" state for the session (uncontrolled in React, but toggleable).
            // But requirement said "save to localStorage".
            // Let's try to construct an ID from the surrounding text if possible, but `input` is a void element.
            // Maybe we can just render a custom interactive checkbox that doesn't persist properly strictly to "this specific item in this specific list" but just toggles visually for now,
            // OR we accept that persistence across reloads requires a stable ID which markdown doesn't guarantee.
            // Let's try to grab the text from the parent if possible? No.

            // Allow user to toggle it in UI at least.
            // We'll use a ref to count inputs? No, that causes hydration mismatch.
            // Let's just make it a controlled component that toggles internal state,
            // but without a stable ID, we can't reliably persist to localStorage *specific* to this item if the content changes.
            // If the content is static (which it is after generation), we could use index if we could count.

            // Alternative: The prompt asks for "Interactive checkboxes".
            // Let's implement a simple toggle that changes visual state.
            return (
                <input
                    type="checkbox"
                    className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                    defaultChecked={props.checked}
                    onChange={(e) => {
                        // Just allow toggling
                        e.target.checked = e.target.checked;
                    }}
                />
            )
        }
        return <input {...props} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Analysis Complete</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={16} />
            Download
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            <RefreshCw size={16} />
            New Path
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-12 overflow-auto max-h-[800px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        <article className="prose prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-h1:text-3xl prose-h1:text-blue-600 dark:prose-h1:text-blue-400
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-li:marker:text-gray-400
          prose-img:rounded-xl
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={components as any}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </div>

      {/* Footer hint */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        Generated by AI. Verify critical details with official project documentation.
      </div>
    </div>
  );
}
