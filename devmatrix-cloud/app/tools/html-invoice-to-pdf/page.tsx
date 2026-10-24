import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'HTML Invoice to PDF - Convert HTML to Print-Ready PDF | DevMatrix',
  description: 'Convert HTML-based invoices into professional PDF documents. Ideal for generating receipts, billing statements, and financial records from web apps.',
  keywords: ['html to pdf', 'invoice generator', 'html invoice', 'pdf conversion'],
};

export default function HtmlInvoiceToPdfPage() {
  return <Client />;
}
