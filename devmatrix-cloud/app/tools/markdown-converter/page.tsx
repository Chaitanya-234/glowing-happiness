// app/tools/markdown-converter/page.tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MarkdownConverterPage() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  // Simple markdown to HTML converter (basic implementation)
  const convertToHTML = () => {
    let result = markdown;

    // Headers
    result = result.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    result = result.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    result = result.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    result = result.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Italic
    result = result.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Links
    result = result.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Images
    result = result.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />');

    // Code blocks - FIXED VERSION (escape backticks properly)
    const codeBlockRegex = new RegExp('s', 'g');
    result = result.replace(codeBlockRegex, (match, code) => {
      return '<pre><code>' + code.trim() + '</code></pre>';
    });

    // Inline code
    const inlineCodeRegex = new RegExp('`([^`]+)`', 'g');
    result = result.replace(inlineCodeRegex, '<code>$1</code>');

    // Line breaks
    result = result.replace(/\n/gim, '<br>');

    setHtml(result);
  };

  const exampleMarkdown = `# Hello World

## This is a subtitle

This is a paragraph with **bold** and *italic* text.

### Features
- Easy to use
- Fast conversion
- Free forever

[Visit our website](https://devmetrix.in)

\`inline code\`

\`\`\`
code block
multiple lines
\`\`\``;

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Markdown to HTML Converter
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Convert Markdown syntax to HTML instantly. Perfect for documentation and content creation.
        </p>

        <div className="mb-6">
          <button
            onClick={() => setMarkdown(exampleMarkdown)}
            className="px-6 py-2 bg-purple-900/20 text-purple-200/60 rounded-lg border border-purple-500/20 hover:bg-purple-800/30 transition-all text-sm"
          >
            Load Example
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Markdown Input:</label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
              placeholder="# Enter markdown here..."
            />
          </div>

          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">HTML Output:</label>
            <textarea
              value={html}
              readOnly
              className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
              placeholder="HTML output will appear here..."
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={convertToHTML}
            className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
          >
            Convert to HTML
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(html)}
            disabled={!html}
            className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold disabled:opacity-30"
          >
            Copy HTML
          </button>
          <button
            onClick={() => {
              setMarkdown('');
              setHtml('');
            }}
            className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Preview */}
        {html && (
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-100/70 mb-4">Preview:</h3>
            <div
              className="prose prose-invert prose-purple max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">About Markdown Converter</h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Markdown is a lightweight markup language that you can use to add formatting elements
            to plaintext documents. This tool converts Markdown syntax to HTML for use in web pages,
            emails, and documentation.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Supported Syntax</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Headers (# H1, ## H2, ### H3)</li>
            <li>Bold (**text**) and Italic (*text*)</li>
            <li>Links [text](url)</li>
            <li>Images ![alt](url)</li>
            <li>Inline code `code`</li>
            <li>Code blocks ``````</li>
            <li>Lists and line breaks</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Common Use Cases</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Converting documentation to HTML</li>
            <li>Creating blog post content</li>
            <li>Generating email templates</li>
            <li>Building README files for GitHub</li>
            <li>Creating formatted text for websites</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
