import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'SaaS Metric Analyst | LTV, CAC & Growth Calculator',
  description: 'Calculate and analyze key SaaS metrics. Get instant health scores, growth projections, and actionable recommendations.',
  keywords: ['saas calculator', 'ltv calculator', 'cac analysis', 'churn rate', 'saas metrics'],
};

export default function SaasMetricCalculatorPage() {
  return <Client />;
}
