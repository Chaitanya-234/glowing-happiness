import type { Metadata } from 'next';
import PersonaGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI User Persona Generator | Marketing & UX Tools',
  description: 'Create detailed buyer personas and user profiles instantly. Understand your target audience demographics, pain points, and goals.',
  keywords: ['user persona generator', 'marketing persona', 'ux research tool', 'target audience analysis', 'customer profile'],
};

export default function Page() {
  return <PersonaGeneratorClient />;
}
