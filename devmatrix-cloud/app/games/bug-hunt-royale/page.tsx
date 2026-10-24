import { Metadata } from 'next';
import BugHunt from '@/components/games/BugHunt';

export const metadata: Metadata = {
  title: 'Bug Hunt Battle Royale | Debug Code Faster Than Others',
  description: 'Find and fix bugs in code snippets. Test your debugging skills against common JavaScript errors.',
  keywords: ['debugging', 'bug hunt', 'javascript errors', 'coding game', 'programming'],
  openGraph: {
    title: 'Bug Hunt Battle Royale',
    description: 'Find and fix bugs in code.',
    type: 'website',
  },
};

export default function BugHuntPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
         <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600 mb-2">
                Bug Hunt Royale
            </h1>
            <p className="text-gray-400">
                Spot the bug, fix the code, and earn points.
            </p>
        </div>
        <BugHunt />
    </div>
  );
}
