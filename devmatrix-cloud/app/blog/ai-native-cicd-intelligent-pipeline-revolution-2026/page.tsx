import type { Metadata } from 'next';
import ClientPage from './ClientPage';

const metadata: Metadata = {
  title: 'AI-Native CI/CD: The Intelligent Pipeline Revolution in 2026',
  description: 'Explore how AI-native CI/CD pipelines are transforming software delivery. Discover how intelligent orchestration, predictive testing, and smart deployments are reshaping DevOps.',
  keywords: [
    'AI-native CI/CD 2026',
    'intelligent pipeline orchestration',
    'AI software delivery',
    'smart CI/CD pipelines',
    'machine learning DevOps pipelines',
    'predictive test selection',
    'AI deployment optimization',
    'intelligent build systems',
    'adaptive release management'
  ],
};

export default function Page() {
  return <ClientPage />;
}
