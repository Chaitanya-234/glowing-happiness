import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Churn Reduction Strategist | AI Retention Tool',
  description: 'Identify the root causes of churn and generate actionable retention strategies. Includes custom email drafts to win back customers.',
  keywords: ['churn reduction', 'customer retention', 'saas churn', 'winback strategy', 'retention emails'],
};

export default function ChurnReductionStrategistPage() {
  return <Client />;
}
