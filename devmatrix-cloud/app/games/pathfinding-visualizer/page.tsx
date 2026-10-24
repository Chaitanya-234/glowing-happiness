import { Metadata } from 'next';
import PathfindingVisualizer from '@/components/games/PathfindingVisualizer';

export const metadata: Metadata = {
  title: 'Pathfinding Algorithm Visualizer Game | Learn A* & Dijkstra',
  description: 'Interactive visualizer for pathfinding algorithms like A*, Dijkstra, BFS, and DFS. Learn how algorithms traverse graphs.',
  keywords: ['pathfinding', 'algorithm visualizer', 'dijkstra', 'a star', 'bfs', 'dfs', 'graph theory', 'coding game'],
  openGraph: {
    title: 'Pathfinding Algorithm Visualizer',
    description: 'Interactive visualizer for pathfinding algorithms.',
    type: 'website',
  },
};

export default function PathfindingPage() {
  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-purple-400 mb-2">
                Pathfinding Visualizer
            </h1>
            <p className="text-gray-400">
                Visualize how algorithms find the shortest path. Click to add walls, then drag Start/End nodes.
            </p>
        </div>
        <PathfindingVisualizer />
    </div>
  );
}
