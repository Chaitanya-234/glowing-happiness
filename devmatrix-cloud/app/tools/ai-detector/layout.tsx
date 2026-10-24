import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Content Detector | Check for ChatGPT & Gemini Text | Free Tool',
  description: 'Free AI content detection tool. Analyze text to detect AI-generated content from ChatGPT, Gemini, Claude. Get percentage scores, highlighted suspicious sections, pattern analysis. Verify writing authenticity. Supports documents and URLs. Instant results with detailed breakdown.',
  keywords: 'ai content detector, chatgpt detector, ai text detector, detect ai writing, ai checker, gemini detector, claude detector, ai generated text checker, check for ai content, ai writing detector, plagiarism vs ai, ai content checker free, detect ai article, ai vs human writing, content authenticity checker, gpt detector, ai text scanner, check if written by ai, ai detection tool, verify writing authenticity, spot ai content, ai generated content finder, chatgpt checker free, detect machine writing, ai essay detector, ai paragraph detector',
  openGraph: {
    title: 'Free AI Content Detector - Detect ChatGPT, Gemini, Claude',
    description: 'Analyze text for AI-generated content. Get percentage scores, pattern analysis, sentence-by-sentence breakdown. Free, accurate, instant results.',
    type: 'website',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
