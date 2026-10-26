'use client';
// app/blog/markdown-documentation-guide/page.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: 'Writing Better Documentation with Markdown: Complete Guide | DevMetrix',
  description: 'Learn how to write professional documentation using Markdown. GitHub-flavored syntax, best practices, and real-world examples.',
  keywords: ['markdown', 'documentation', 'github markdown', 'readme', 'technical writing'],
};

export default function MarkdownDocumentationGuide() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="Writing Better Documentation with Markdown: Complete Guide"
        description="Create professional documentation using Markdown with advanced formatting, GitHub-flavored syntax, and automation tools."
        datePublished="2025-10-22"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/markdown-documentation-guide"
      />
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple prose-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-100/80 mb-4">
          Writing Better Documentation with Markdown: Complete Guide
        </h1>

        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-8">
          <span>October 22, 2025</span>
          <span>•</span>
          <span>22 min read</span>
          <span>•</span>
          <span>Documentation</span>
        </div>

        <p className="text-lg md:text-xl text-purple-200/60 leading-relaxed">
          Look, I'll be honest with you. Documentation is one of those things developers love to hate.
          We'd all rather be coding than writing docs. But here's the thing - good documentation can
          be the difference between your project taking off or collecting dust. And Markdown? It's
          basically the easiest way to write docs that don't look like garbage.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Why Markdown? (And Why You Should Care)
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed">
          Picture this: You've just finished building something awesome. Your code is clean, your tests
          pass, everything works beautifully. Then someone opens an issue asking "How do I even use this?"
          Sound familiar? Yeah, we've all been there.
        </p>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed mt-4">
          Markdown solves this problem elegantly. It's simple enough that you can write it in any text
          editor, but powerful enough to create professional-looking documentation. No need for fancy
          word processors or dealing with HTML tags everywhere.
        </p>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 md:p-6 my-6 md:my-8">
          <h3 className="text-lg md:text-xl font-semibold text-purple-100/70 mb-3 md:mb-4">The Real Benefits:</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-purple-200/50">
            <li>✅ <strong className="text-purple-200/70">Plain Text:</strong> Works with version control (Git loves it)</li>
            <li>✅ <strong className="text-purple-200/70">Universal:</strong> GitHub, GitLab, Reddit, Stack Overflow all support it</li>
            <li>✅ <strong className="text-purple-200/70">Fast:</strong> Write docs as quickly as you think</li>
            <li>✅ <strong className="text-purple-200/70">Readable:</strong> Even in raw form, it makes sense</li>
            <li>✅ <strong className="text-purple-200/70">Portable:</strong> Convert to HTML, PDF, or basically anything</li>
          </ul>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          The Basics (You'll Learn This in 5 Minutes)
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Headers - Your Document Structure
        </h3>

        <p className="text-sm md:text-base text-purple-200/50">
          Headers in Markdown use the hash symbol. The more hashes, the smaller the header. Simple, right?
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm my-4 md:my-6">
          <code className="text-purple-100/80">{`# This is a Big Header (H1)
## This is Slightly Smaller (H2)
### Getting Smaller... (H3)
#### Even Smaller (H4)
##### Tiny (H5)
###### Microscopic (H6)

Pro tip: In most docs, you'll use H2-H4 the most.
H1 is usually reserved for your main title.`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Text Formatting - Make It Pop
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`**Bold text** - for things that matter
*Italic text* - for emphasis
***Bold AND italic*** - when you really mean business
~~Strikethrough~~ - for mistakes you want to show
\`inline code\` - for those code snippets

// You can mix and match:
This is **really *important*** stuff!
Check out this \`console.log()\` function.`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Lists - Because Everyone Loves Lists
        </h3>

        <div className="space-y-4 md:space-y-6 my-6 md:my-8">
          <div>
            <p className="text-sm md:text-base text-purple-200/60 mb-2 md:mb-3 font-semibold">Unordered Lists (Bullets):</p>
            <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
              <code className="text-purple-100/80">{`- Item one
- Item two
  - Nested item (just add 2 spaces)
  - Another nested item
- Back to main level

// You can also use * or + instead of -
* Works the same
+ Also works
- Pick one style and stick with it`}</code>
            </pre>
          </div>

          <div>
            <p className="text-sm md:text-base text-purple-200/60 mb-2 md:mb-3 font-semibold">Ordered Lists (Numbers):</p>
            <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
              <code className="text-purple-100/80">{`1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step

// Here's a cool trick - Markdown auto-numbers for you:
1. First
1. Second (yes, just use 1 again)
1. Third (still 1!)
// Markdown will fix the numbering automatically`}</code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Links and Images (The Fun Stuff)
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Adding Links
        </h3>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Links in Markdown are super straightforward. Here are all the ways you can do it:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Basic link
[Click here](https://example.com)

// Link with title (shows on hover)
[DevMetrix Tools](https://devmetrix.in "Best dev tools")

// Reference-style links (cleaner for long docs)
Check out [DevMetrix][1] and [GitHub][2].

[1]: https://devmetrix.in
[2]: https://github.com

// Auto-linking (works on GitHub)
https://devmetrix.in

// Email links
<hello@Devmetrix.in>`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Images (Show, Don't Just Tell)
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Basic image
![Alt text](image.png)

// Image with title
![Logo](logo.png "Our awesome logo")

// Using a URL
![Remote image](https://example.com/image.png)

// Reference-style (same as links)
![Screenshot][screenshot]

[screenshot]: /assets/demo.png

// Pro tip: Always add alt text for accessibility!
![Dashboard showing user analytics with graphs]`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Code Blocks (The Developer's Best Friend)
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed">
          Let's be real - as developers, this is probably what you'll use most. Markdown makes sharing
          code snippets incredibly easy.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Inline Code
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`Use the \`console.log()\` function to debug.
The \`Array.map()\` method is super useful.
Don't forget to run \`npm install\` first!`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Multi-line Code Blocks
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

// Without syntax highlighting
\`\`\`
Just plain text
No fancy colors
\`\`\`

// Popular languages:
\`\`\`python
\`\`\`typescript
\`\`\`bash
\`\`\`json
\`\`\`sql`}</code>
        </pre>

        <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-4 md:p-6 my-6 md:my-8">
          <p className="text-sm md:text-base text-blue-300 font-semibold mb-2 md:mb-3">💡 Pro Tip:</p>
          <p className="text-xs md:text-sm text-blue-200/70">
            Always specify the language for code blocks. It makes your docs look professional and helps
            readers understand the context immediately. GitHub and most Markdown renderers will add
            syntax highlighting automatically.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Tables (Yes, They're Surprisingly Easy)
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          I'll admit, tables in Markdown look a bit weird at first. But once you get the hang of it,
          they're actually pretty intuitive.
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`| Feature      | Support | Notes           |
|--------------|---------|-----------------|
| Easy to use  | ✅      | Very intuitive  |
| Mobile ready | ✅      | Works great     |
| Expensive    | ❌      | Completely free |

// Alignment (notice the colons)
| Left aligned | Center | Right aligned |
|:-------------|:------:|--------------:|
| Text         | Text   | Text          |
| More text    | More   | More          |

// Minimal version (pipes don't need to line up)
|Header|Another|
|---|---|
|Data|More data|`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          GitHub-Flavored Markdown (GFM) - The Good Stuff
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed">
          GitHub took standard Markdown and added some really useful features. Most modern Markdown
          processors support these now, so you should definitely use them.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Task Lists (Super Useful for README)
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`## Project Roadmap

- [x] Set up project structure
- [x] Implement core features
- [ ] Write documentation
- [ ] Deploy to production
- [ ] Add more tests

// The checkboxes are actually clickable on GitHub!`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Mentions and References
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`// Mention users
Thanks @username for the contribution!

// Reference issues and PRs
Fixes #123
Closes #45
Related to #67

// Reference commits
See commit abc123f for details

// These become clickable links on GitHub`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Emoji Support 🎉
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`:tada: Just launched!
:rocket: Deploying...
:bug: Fixed that annoying bug
:sparkles: New feature
:fire: Hot fix
:memo: Updated docs

// Or just use actual emoji: 🎉 🚀 🐛 ✨ 🔥 📝`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Syntax Highlighting in Diffs
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`\`\`\`diff
function hello() {
-  console.log('Old way');
+  console.log('New way');
}
\`\`\``}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Real-World Documentation Structure
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed mb-4">
          Okay, now that you know the syntax, let's talk about actually structuring good documentation.
          Here's a template I use for almost every project:
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`# Project Name

Brief one-liner about what this does.

## Why This Exists

Real talk about the problem this solves.

## Features

- ✨ Cool feature one
- 🚀 Amazing feature two
- 💪 Powerful feature three

## Quick Start

\`\`\`bash
npm install your-package
npm start
\`\`\`

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps
1. Clone the repo
2. Install dependencies
3. Run it

## Usage

Real examples with code:

\`\`\`javascript
import Thing from 'your-package';

const instance = new Thing({
  option: 'value'
});
\`\`\`

## API Reference

Detailed docs here...

## Contributing

How to help out.

## License

MIT or whatever you choose.`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Common Mistakes (And How to Avoid Them)
        </h2>

        <div className="space-y-4 md:space-y-6 my-6 md:my-8">
          <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-red-300 mb-2 md:mb-3">❌ Mistake #1: No Blank Lines</h3>
            <p className="text-xs md:text-sm text-red-200/70 mb-3">
              Markdown needs breathing room. Always add blank lines between different elements.
            </p>
            <pre className="bg-red-900/20 p-2 md:p-3 rounded text-xs overflow-x-auto">
              <code className="text-red-100/80">{`# Header
This won't work right because there's no space.
\`\`\`javascript
// Code block needs space too
\`\`\``}</code>
            </pre>
          </div>

          <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-green-300 mb-2 md:mb-3">✅ Better:</h3>
            <pre className="bg-green-900/20 p-2 md:p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-100/80">{`# Header

This looks much better!

\`\`\`javascript
// Proper spacing makes it work
\`\`\``}</code>
            </pre>
          </div>
        </div>

        <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-lg p-4 md:p-6 my-6 md:my-8">
          <h3 className="text-base md:text-lg font-semibold text-yellow-300 mb-2 md:mb-3">⚠️ Mistake #2: Inconsistent Formatting</h3>
          <p className="text-xs md:text-sm text-yellow-200/70">
            Pick a style and stick with it. If you use <code className="text-yellow-300">*</code> for italic,
            don't switch to <code className="text-yellow-300">_</code> halfway through. Same with lists -
            choose <code className="text-yellow-300">-</code> or <code className="text-yellow-300">*</code> and be consistent.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Advanced Tips for Power Users
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Collapsible Sections
        </h3>

        <p className="text-sm md:text-base text-purple-200/50 mb-4">
          Keep your README clean with collapsible sections (works on GitHub):
        </p>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`<details>
<summary>Click to expand installation steps</summary>

### Detailed Installation

1. First step with lots of detail
2. Second step with even more detail
3. You get the idea...

</details>`}</code>
        </pre>

        <h3 className="text-xl md:text-2xl font-semibold text-purple-100/60 mt-6 md:mt-8 mb-3 md:mb-4">
          Badges (Make It Look Professional)
        </h3>

        <pre className="bg-purple-900/20 p-3 md:p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs md:text-sm">
          <code className="text-purple-100/80">{`![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

// Check out shields.io for tons of badge options`}</code>
        </pre>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Tools to Make Your Life Easier
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-6 md:my-8">
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-purple-100/70 mb-2 md:mb-3">Editors:</h3>
            <ul className="space-y-2 text-xs md:text-sm text-purple-200/50">
              <li>• <strong>VS Code</strong> - Best overall (with Markdown Preview Enhanced)</li>
              <li>• <strong>Typora</strong> - WYSIWYG editing</li>
              <li>• <strong>Mark Text</strong> - Simple and clean</li>
            </ul>
          </div>

          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-purple-100/70 mb-2 md:mb-3">Online Tools:</h3>
            <ul className="space-y-2 text-xs md:text-sm text-purple-200/50">
              <li>• <strong>DevMetrix Markdown Converter</strong> - Live preview</li>
              <li>• <strong>StackEdit</strong> - Browser-based editor</li>
              <li>• <strong>Dillinger</strong> - Quick conversions</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-purple-100/70 mt-8 md:mt-12 mb-4 md:mb-6">
          Wrapping Up
        </h2>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed">
          Here's the truth: Markdown isn't going to write your documentation for you. But it will make
          the process way less painful. And when documentation is easy to write and maintain, you're
          actually more likely to do it.
        </p>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed mt-4">
          Start small. Add a decent README to your next project. Use proper formatting. Add some code
          examples. Before you know it, writing docs becomes second nature. And your users (including
          future you) will thank you for it.
        </p>

        <p className="text-sm md:text-base text-purple-200/50 leading-relaxed mt-4">
          Remember: Good documentation is what turns a cool project into a project people actually use.
          Markdown just makes it easier to get there.
        </p>

        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <h3 className="text-xl md:text-2xl font-semibold text-purple-100/70 mb-3 md:mb-4">
            Try Our Markdown Converter
          </h3>
          <p className="text-sm md:text-base text-purple-200/50 mb-4">
            Test your Markdown with live preview and convert to HTML instantly!
          </p>
          <Link
            href="/tools/markdown-converter"
            className="inline-block px-4 md:px-6 py-2 md:py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline text-sm md:text-base"
          >
            Try Markdown Converter →
          </Link>
        </div>
      </div>
    </article>
  );
}
