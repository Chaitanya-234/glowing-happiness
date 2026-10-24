import type { Metadata } from 'next';
import StartupValidatorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Startup Idea Validator | Market Analysis Tool',
  description: 'Validate your startup idea instantly with AI. Get market size estimates, SWOT analysis, and competitor research to build with confidence.',
  keywords: ['startup idea validator', 'business idea checker', 'market analysis ai', 'swot analysis generator', 'mvp planner'],
};

export default function Page() {
  return <StartupValidatorClient />;
}
