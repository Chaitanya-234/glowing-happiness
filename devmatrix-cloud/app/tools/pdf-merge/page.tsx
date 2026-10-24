import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Merge PDF - Combine PDF Files Online for Free | DevMetrix',
  description: 'Merge multiple PDF files into one document instantly. Free, secure, and fast online PDF merger. No signup required.',
  keywords: ['merge pdf', 'combine pdf', 'pdf merger', 'join pdf', 'free pdf tool', 'pdf tools'],
  openGraph: {
    title: 'Merge PDF Files Online - Free & Secure',
    description: 'Combine PDFs into one file in seconds. Drag, drop, and merge.',
    url: 'https://devmetrix.in/tools/pdf-merge',
    type: 'website',
  },
};

export default function PdfMergePage() {
  return <Client />;
}
