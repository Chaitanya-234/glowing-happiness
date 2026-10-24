import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Split PDF - Extract Pages from PDF Online | DevMetrix',
  description: 'Split PDF files into individual pages or extract specific pages. Free, fast, and secure online PDF splitter.',
  keywords: ['split pdf', 'extract pdf pages', 'separate pdf', 'pdf splitter', 'free pdf tool'],
  openGraph: {
    title: 'Split PDF Files - Extract Pages Free',
    description: 'Separate PDF pages or extract ranges instantly.',
    url: 'https://devmetrix.in/tools/pdf-split',
    type: 'website',
  },
};

export default function PdfSplitPage() {
  return <Client />;
}
