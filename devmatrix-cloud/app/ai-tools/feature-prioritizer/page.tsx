import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'SaaS Feature Prioritizer | RICE Score Matrix',
  description: 'Prioritize your product roadmap objectively. AI analyzes feature requests based on Impact and Effort to generate a prioritized matrix.',
  keywords: ['feature prioritization', 'product roadmap', 'rice score', 'impact vs effort', 'product management ai'],
};

export default function FeaturePrioritizerPage() {
  return <Client />;
}
