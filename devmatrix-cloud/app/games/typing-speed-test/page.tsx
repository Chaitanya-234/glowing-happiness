import TypingGame from '@/components/games/TypingGame';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Typing Speed Test for Developers | Improve WPM & Accuracy',
  description: 'Boost your coding speed and accuracy with our developer-focused typing game. Practice with real code snippets, SQL queries, and complex syntax.',
  keywords: ['typing speed test', 'typing practice online', 'improve typing speed', 'typing game for developers', 'free typing test', 'typing accuracy test', 'developer typing practice'],
  openGraph: {
    title: 'Developer Typing Speed Test - Master Your Keyboard',
    description: 'Challenge yourself with code snippets and tech-focused typing tests.',
    url: 'https://devmetrix.in/games/typing-speed-test',
    type: 'website',
  },
};

export default function TypingGamePage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4">
            Developer Typing Test
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Train your muscle memory with code syntax, special characters, and real-world dev scenarios.
          </p>
        </div>

        <TypingGame />
      </div>
    </div>
  );
}
