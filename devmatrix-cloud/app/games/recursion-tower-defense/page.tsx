import { Metadata } from 'next';
import RecursionDefense from '@/components/games/RecursionDefense';

export const metadata: Metadata = {
  title: 'Recursion Tower Defense | Learn Recursive Programming',
  description: 'Defend your stack from stack overflow! Identify base cases and recursive calls in this educational game.',
  keywords: ['recursion', 'tower defense', 'programming game', 'algorithms', 'stack overflow'],
  openGraph: {
    title: 'Recursion Tower Defense',
    description: 'Learn recursion by defending the stack.',
    type: 'website',
  },
};

export default function RecursionPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
         <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-2">
                Recursion Tower Defense
            </h1>
            <p className="text-gray-400">
                Incoming function calls! Click 'Base Case' for n ≤ 1, and 'Recurse' for n &gt; 1 to clear the stack.
            </p>
        </div>
        <RecursionDefense />
    </div>
  );
}
