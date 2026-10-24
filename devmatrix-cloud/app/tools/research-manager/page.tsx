import { Metadata } from 'next';
import ResearchManagerClient from './components/ResearchManagerClient';

export const metadata: Metadata = {
  title: 'AI Smart Research Manager | DevMetrix',
  description: 'AI-powered research assistant for students and academics. Manage papers, generate citations, and identify research gaps.',
};

export default function ResearchManagerPage() {
  return <ResearchManagerClient />;
}
