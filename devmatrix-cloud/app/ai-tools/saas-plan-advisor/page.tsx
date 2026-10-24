import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'SaaS Pricing & Plan Advisor | AI Strategy Tool',
  description: 'AI-powered pricing strategy advisor. Analyze usage patterns to suggest optimal pricing plans and generate high-converting page copy.',
  keywords: ['saas pricing', 'pricing strategy', 'ai pricing tool', 'churn analysis', 'pricing psychology'],
};

export default function SaasPlanAdvisorPage() {
  return <Client />;
}
