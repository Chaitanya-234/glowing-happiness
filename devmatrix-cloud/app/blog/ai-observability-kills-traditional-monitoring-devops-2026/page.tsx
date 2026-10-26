import type { Metadata } from 'next';
import ClientPage from './ClientPage';

const metadata: Metadata = {
  title: 'AI Observability: Why Traditional Monitoring Is Dying in 2026',
  description: 'Discover how AI observability is replacing traditional monitoring forever. Learn how intelligent systems are moving from watching your infrastructure to truly understanding it — before problems even happen.',
  keywords: [
    'AI observability DevOps 2026',
    'intelligent observability platform',
    'AI vs traditional monitoring',
    'smart observability tools',
    'AI-driven system monitoring'
  ],
};

export default function Page() {
  return <ClientPage />;
}
