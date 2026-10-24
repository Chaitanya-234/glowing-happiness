import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'PDF API Playground - Test PDF Endpoints | DevMatrix',
  description: 'Test PDF-related API endpoints in real time. Instantly generate, convert, merge, or manipulate PDF files using live requests and responses.',
  keywords: ['pdf api', 'api testing', 'pdf generation', 'developer tools'],
};

export default function PDFApiPlaygroundPage() {
  return <Client />;
}
