import { Metadata } from 'next';
import EmailAssistantClient from './Client';

export const metadata: Metadata = {
  title: 'AI Email Assistant | Drafts & Improvements',
  description: 'Write better emails faster. Generate subject lines, polish your drafts, and get tone analysis with our AI Email Assistant.',
  keywords: ['email writer', 'ai email assistant', 'email drafter', 'tone checker'],
};

export default function EmailAssistantPage() {
  return <EmailAssistantClient />;
}
