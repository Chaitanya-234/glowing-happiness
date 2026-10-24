import { Metadata } from 'next';
import MeetingNotesClient from './Client';

export const metadata: Metadata = {
  title: 'AI Meeting Note Taker | Summaries & Action Items',
  description: 'Turn messy meeting transcripts into structured notes. Automatically extract action items, decisions, and key summaries.',
  keywords: ['meeting notes', 'ai minute taker', 'transcript summarizer', 'action item extractor'],
};

export default function MeetingNotesPage() {
  return <MeetingNotesClient />;
}
