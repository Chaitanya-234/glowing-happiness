import { Metadata } from 'next';
import ShaderShowdown from '@/components/games/ShaderShowdown';

export const metadata: Metadata = {
  title: 'Shader Coding Challenge | Real-time GLSL Competition',
  description: 'Write GLSL fragment shaders in real-time. Create beautiful visual effects and learn GPU programming.',
  keywords: ['glsl', 'shader', 'webgl', 'graphics programming', 'coding challenge', 'creative coding'],
  openGraph: {
    title: 'Shader Showdown',
    description: 'Real-time GLSL shader editor and preview.',
    type: 'website',
  },
};

export default function ShaderPage() {
  return (
     <div className="min-h-screen bg-black pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-2">
                Shader Showdown
            </h1>
            <p className="text-gray-400">
                Live GLSL Editor. Write fragment shaders to create visuals on the canvas.
            </p>
        </div>
        <ShaderShowdown />
    </div>
  );
}
