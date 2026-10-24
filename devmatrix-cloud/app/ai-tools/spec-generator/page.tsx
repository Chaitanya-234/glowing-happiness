import type { Metadata } from 'next';
import SpecGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Technical Spec Generator | PRD & Architecture',
  description: 'Generate professional Product Requirement Documents (PRDs), database schemas, and API endpoints instantly from feature descriptions.',
  keywords: ['prd generator', 'technical spec writer', 'database schema generator', 'api design tool', 'product management ai'],
};

export default function Page() {
  return <SpecGeneratorClient />;
}
