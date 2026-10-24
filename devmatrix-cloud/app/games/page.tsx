import { Metadata } from 'next';
import GamesPageClient from './GamesPageClient';

export const metadata: Metadata = {
  title: 'Developer Games Arcade - Brain Training for Coders | DevMetrix',
  description: 'Interactive games for developers including Tech Stack Memory, CSS quizzes, and coding challenges. Train your brain and have fun.',
  keywords: ['developer games', 'coding games', 'memory match', 'css games', 'programmer humor', 'brain training'],
  openGraph: {
    title: 'Developer Arcade - Fun Games for Coders',
    description: 'Relax and train your brain with our developer-focused mini-games.',
    url: 'https://devmetrix.in/games',
    type: 'website',
  },
};

export default function GamesPage() {
  return <GamesPageClient />;
}
