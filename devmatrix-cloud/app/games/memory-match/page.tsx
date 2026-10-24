import { Metadata } from 'next';
import MemoryMatch from '@/components/games/MemoryMatch';
import Link from 'next/link';
import { ArrowLeft, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tech Stack Memory - Developer Games | DevMetrix',
  description: 'Test your memory by matching popular tech logos in this developer-themed card game.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/games" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arcade
        </Link>

        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Tech Stack Memory</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Flip the cards and find the matching pairs of technologies.
            </p>
        </div>

        <MemoryMatch />
      </div>
    </div>
  );
}
