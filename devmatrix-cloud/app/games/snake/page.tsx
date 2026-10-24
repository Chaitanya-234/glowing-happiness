import { Metadata } from 'next';
import SnakeGame from '@/components/games/SnakeGame';
import Link from 'next/link';
import { ArrowLeft, Ghost } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Snake Code - Developer Games | DevMetrix',
  description: 'Classic snake game. Eat the bugs, grow your code, avoid syntax errors.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/games" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arcade
        </Link>

        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <Ghost className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Snake Code</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Navigate the grid, collect the items, and don't crash into yourself or the walls.
            </p>
        </div>

        <SnakeGame />
      </div>
    </div>
  );
}
