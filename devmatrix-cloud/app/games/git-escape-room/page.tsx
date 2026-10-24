import { Metadata } from 'next';
import GitEscapeRoom from '@/components/games/GitEscapeRoom';

export const metadata: Metadata = {
  title: 'Git Escape Room | Master Git Commands Through Puzzles',
  description: 'Learn Git commands by solving puzzles in a terminal simulator. Escape the room by mastering merge, rebase, and checkout.',
  keywords: ['git', 'git tutorial', 'git game', 'version control', 'coding game', 'terminal simulator'],
  openGraph: {
    title: 'Git Escape Room',
    description: 'Master Git commands through puzzles.',
    type: 'website',
  },
};

export default function GitPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
         <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-600 mb-2">
                Git Escape Room
            </h1>
            <p className="text-gray-400">
                Type the correct git commands to solve the puzzle and advance to the next level.
            </p>
        </div>
        <GitEscapeRoom />
    </div>
  );
}
