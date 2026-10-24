import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'SaaS Lifecycle Email Generator | Retention & Upsell',
  description: 'Generate automated email sequences for SaaS churn reduction, trial onboarding, and upsells based on user behavior and product usage.',
  keywords: ['saas email sequences', 'churn reduction email', 'trial expiration email', 'upsell templates', 'lifecycle marketing'],
};

export default function SaasEmailGeneratorPage() {
  return <Client />;
}
