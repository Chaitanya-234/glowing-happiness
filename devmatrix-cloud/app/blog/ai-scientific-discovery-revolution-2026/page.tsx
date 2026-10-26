import type { Metadata } from 'next';
import ClientPage from './ClientPage';

const metadata: Metadata = {
  title: 'AI Scientific Discovery: How AI is Revolutionizing Research in 2026',
  description: 'Explore how AI is transforming scientific research across medicine, climate science, and physics. Discover breakthrough AI technologies accelerating discovery and solving complex problems.',
  keywords: ['AI scientific discovery 2026', 'AI in research', 'artificial intelligence science', 'AI drug discovery', 'machine learning scientific breakthrough'],
};

export default function Page() {
  return <ClientPage />;
}
