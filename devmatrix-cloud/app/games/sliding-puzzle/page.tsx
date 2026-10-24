import { Metadata } from 'next';
import SlidingPuzzleGame from '@/components/games/SlidingPuzzleGame';
import Link from 'next/link';
import { ArrowLeft, Move } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Algo Sliding Puzzle - Developer Games | DevMetrix',
  description: 'Unscramble the numbers in this classic sliding puzzle game.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/games" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arcade
        </Link>

        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Move className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Algo Sliding Puzzle</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Order the numbers from 1 to 15. A test of logic and patience.
            </p>
        </div>

        <SlidingPuzzleGame />
      </div>
    </div>
  );
}
