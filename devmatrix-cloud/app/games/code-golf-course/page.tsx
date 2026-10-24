import { Metadata } from 'next';
import CodeGolf from '@/components/games/CodeGolf';

export const metadata: Metadata = {
  title: 'Code Golf Challenges | Minimize Your Code Solutions',
  description: 'Solve coding challenges with the fewest characters possible. Test your JavaScript knowledge and optimization skills.',
  keywords: ['code golf', 'coding challenge', 'javascript', 'minification', 'algorithm'],
  openGraph: {
    title: 'Code Golf Course',
    description: 'Solve coding challenges with minimum characters.',
    type: 'website',
  },
};

export default function CodeGolfPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
         <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                Code Golf Course
            </h1>
            <p className="text-gray-400">
                Solve the problem. Shortest code wins.
            </p>
        </div>
        <CodeGolf />
    </div>
  );
}
