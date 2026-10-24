import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Document Webhook Tester - Debug & Validate Webhooks | DevMatrix',
  description: 'Simulate, debug, and validate webhook events for document workflows. Verify signatures (HMAC) and test retry logic.',
  keywords: ['webhook tester', 'hmac validator', 'webhook simulation', 'developer tools'],
};

export default function DocumentWebhookTesterPage() {
  return <Client />;
}
