import { Metadata } from 'next';
import CandyCrushGame from '@/components/games/CandyCrushGame';
import Link from 'next/link';
import { ArrowLeft, Grid3X3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Candy Crash - Developer Games | DevMetrix',
  description: 'Match 3 colors to clear the grid. A relaxing puzzle game.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/games" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Arcade
        </Link>

        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <Grid3X3 className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Candy Crash</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Swap adjacent items to create a line of 3 or more matching colors.
            </p>
        </div>

        <CandyCrushGame />
      </div>
    </div>
  );
}
