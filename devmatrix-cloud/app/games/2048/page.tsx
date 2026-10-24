import { Metadata } from 'next';
import Game2048 from '@/components/games/Game2048';
import Link from 'next/link';
import { ArrowLeft, Grid2X2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '2048 Dev Edition - Developer Games | DevMetrix',
  description: 'Merge the tiles to reach 2048. A classic puzzle game for developers.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/games" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arcade
        </Link>

        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <Grid2X2 className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">2048 Dev Edition</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Use arrow keys to merge matching numbers. Can you reach 2048?
            </p>
        </div>

        <Game2048 />
      </div>
    </div>
  );
}
