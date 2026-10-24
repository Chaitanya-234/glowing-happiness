import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'API Request to PDF Logger - Audit & Debug API Logs | DevMatrix',
  description: 'Convert HTTP request and response logs into downloadable PDF files. Ideal for API audits, debugging, compliance, and sharing technical logs.',
  keywords: ['api logging', 'pdf logs', 'request to pdf', 'audit trail'],
};

export default function ApiRequestToPdfPage() {
  return <Client />;
}
