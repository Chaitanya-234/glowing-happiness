import type { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'AI Ephemeral Environments: The Future of Dev Infrastructure',
  description: 'Learn how AI-powered ephemeral cloud environments are revolutionizing DevOps. Discover how self-provisioning, self-destroying infrastructure is saving teams millions while shipping faster than ever.',
  keywords: [
    'AI ephemeral cloud environments DevOps',
    'ephemeral infrastructure 2026',
    'AI-powered dev environments',
    'intelligent cloud provisioning',
    'disposable cloud environments',
    'cloud cost optimization DevOps',
    'dynamic environment management',
    'feature branch environments',
    'infrastructure as code AI'
  ],
};

export default function Page() {
  return <ClientPage />;
}
