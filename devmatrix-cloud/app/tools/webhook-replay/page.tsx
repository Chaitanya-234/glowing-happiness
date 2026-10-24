
import { Metadata } from 'next';
import WebhookReplayClient from './Client';

export const metadata: Metadata = {
  title: 'Webhook Replay Tool | Debug & Test Webhooks',
  description: 'Capture, inspect, edit, and replay webhook events for Stripe, GitHub, Shopify, and more. Simulate production webhook delivery behavior.',
  keywords: ['webhook', 'replay', 'debug', 'stripe', 'github', 'testing', 'api', 'dev tool'],
};

export default function WebhookReplayPage() {
  return <WebhookReplayClient />;
}
