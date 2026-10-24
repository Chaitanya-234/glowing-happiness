// app/cheat-sheets/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import AdContainer from '@/components/AdContainer';

export const metadata: Metadata = {
  title: 'Developer Cheat Sheets | DevMetrix',
  description: 'Quick reference guides for developers. Git, Docker, JavaScript, SQL, Linux commands and more.',
  keywords: ['cheat sheet', 'developer reference', 'git commands', 'docker commands', 'javascript reference'],
};

const cheatSheets = [
  {
    slug: 'git-commands',
    title: 'Git Commands Cheat Sheet',
    description: 'Essential Git commands for version control',
    icon: '🔀',
    color: 'from-orange-500 to-red-500',
    commands: 45
  },
  {
    slug: 'docker-commands',
    title: 'Docker Commands Cheat Sheet',
    description: 'Container management commands reference',
    icon: '🐳',
    color: 'from-blue-500 to-cyan-500',
    commands: 38
  },
  {
    slug: 'javascript-array-methods',
    title: 'JavaScript Array Methods',
    description: 'Complete guide to array manipulation',
    icon: '📊',
    color: 'from-yellow-500 to-orange-500',
    commands: 25
  },
  {
    slug: 'http-status-codes',
    title: 'HTTP Status Codes Reference',
    description: 'Every HTTP status code explained',
    icon: '🌐',
    color: 'from-green-500 to-teal-500',
    commands: 60
  },

  {
    slug: 'linux-terminal',
    title: 'Linux Terminal Commands',
    description: 'Essential Linux/Unix commands',
    icon: '💻',
    color: 'from-gray-500 to-slate-500',
    commands: 50
  },
  {
    slug: 'css-flexbox',
    title: 'CSS Flexbox Cheat Sheet',
    description: 'Complete flexbox properties guide',
    icon: '📐',
    color: 'from-pink-500 to-rose-500',
    commands: 20
  },
];

export default function CheatSheetsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 mb-4">
            Developer Cheat Sheets
          </h1>
          <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
            Quick reference guides for developers. Download, bookmark, or print these handy cheat sheets.
          </p>
        </div>

        {/* Cheat Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatSheets.map((sheet) => (
            <Link
              key={sheet.slug}
              href={`/cheat-sheets/${sheet.slug}`}
              className="group"
            >
              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all hover:scale-105">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sheet.color} flex items-center justify-center text-3xl mb-4`}>
                  {sheet.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-purple-100 mb-2 group-hover:text-purple-300 transition-colors">
                  {sheet.title}
                </h3>
                <p className="text-sm text-purple-200/60 mb-4">
                  {sheet.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">{sheet.commands} commands</span>
                  <span className="text-purple-300 group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Download CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 text-center">

          <AdContainer
  slot="6465093078"
  format="horizontal"
  label="Advertisement"
  className="max-w-7xl mx-auto px-4 my-12"
/>
          <h2 className="text-2xl font-bold text-purple-100 mb-4">
            📥 Get All Cheat Sheets
          </h2>
          <p className="text-purple-200/60 mb-6 max-w-2xl mx-auto">
            Download all cheat sheets as printable PDFs. Perfect for quick reference during coding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-purple-900/30 border border-purple-500/30 rounded-lg text-purple-100 placeholder-purple-400/50 w-full sm:w-80"
            />
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-semibold whitespace-nowrap">
              Download Free PDFs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
