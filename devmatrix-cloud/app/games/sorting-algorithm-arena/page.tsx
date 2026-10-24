import { Metadata } from 'next';
import SortingArena from '@/components/games/SortingArena';

export const metadata: Metadata = {
  title: 'Sorting Algorithm Battle Arena | Interactive Algorithm Learning',
  description: 'Visualize sorting algorithms as animated battles. Compare Bubble Sort, Quick Sort, Merge Sort and more in real-time.',
  keywords: ['sorting algorithms', 'sorting visualizer', 'bubble sort', 'quick sort', 'merge sort', 'algorithm complexity'],
  openGraph: {
    title: 'Sorting Algorithm Battle Arena',
    description: 'Visualize sorting algorithms like Bubble Sort, Quick Sort, and Merge Sort.',
    type: 'website',
  },
};

export default function SortingPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-purple-400 mb-2">
                Sorting Algorithm Arena
            </h1>
            <p className="text-gray-400">
                Watch algorithms compete to sort the array. Adjust size and speed to see the difference in efficiency.
            </p>
        </div>
        <SortingArena />
    </div>
  );
}
