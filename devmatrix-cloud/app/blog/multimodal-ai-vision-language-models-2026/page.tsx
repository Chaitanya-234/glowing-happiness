import type { Metadata } from 'next';
import ClientPage from './ClientPage';

const metadata: Metadata = {
  title: 'Beyond Text: How Multimodal AI is Creating a New Era of Human-Computer Interaction',
  description: 'Multimodal AI is creating a new era of Human-Computer Interaction. Learn how Vision-Language Models process images and text to transform industries.',
  keywords: ['multimodal AI 2026', 'vision language models', 'AI image understanding', 'multimodal artificial intelligence', 'visual AI', 'image recognition AI', 'AI computer vision'],
};

export default function Page() {
  return <ClientPage />;
}
