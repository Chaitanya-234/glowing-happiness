import { Metadata } from 'next';
import ChessGame from '@/components/games/ChessGame';
import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developer Chess - Developer Games | DevMetrix',
  description: 'Play a game of chess. Strategy and foresight required.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/games" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arcade
        </Link>

        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-gray-500/10 rounded-xl border border-gray-500/20">
                <Trophy className="w-8 h-8 text-gray-200" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Developer Chess</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                A simple chess board for local play. Challenge a colleague or test your opening lines.
            </p>
        </div>

        <ChessGame />
      </div>
    </div>
  );
}
