import type { Metadata } from 'next';
import ClientPage from './ClientPage';

const metadata: Metadata = {
  title: 'AI Incident Response: How DevOps Is Ending Downtime in 2026',
  description: 'Discover how AI-powered autonomous incident response is revolutionizing DevOps. Learn how self-healing systems detect, diagnose, and fix outages before users ever notice.',
  keywords: [
    'AI incident response DevOps 2026',
    'autonomous incident management',
    'AI-powered AIOps',
    'zero-downtime DevOps',
    'intelligent incident detection',
    'self-healing infrastructure',
    'AI root cause analysis',
    'automated runbooks',
    'DevOps observability AI'
  ],
};

export default function Page() {
  return <ClientPage />;
}
