import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'JSON to PDF Converter - Generate PDF Reports from JSON | DevMatrix',
  description: 'Convert structured JSON data into clean, readable PDF documents. Ideal for API reports, invoices, system logs, and data exports.',
  keywords: ['json to pdf', 'pdf generation', 'report generator', 'json converter'],
};

export default function JsonToPdfPage() {
  return <Client />;
}
