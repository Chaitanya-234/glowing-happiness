import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'PDF N-Up Layout - Put Multiple Pages on One Sheet | DevMetrix',
  description: 'Combine several PDF pages onto a single sheet. Choose 2, 4, 6, 9, 16 or a custom grid, paper size, margins and fill order. Free and private, runs in your browser.',
  keywords: ['pages per sheet', 'n-up pdf', 'multiple pages per sheet', 'pdf handout layout', 'combine pdf pages on one page', 'free pdf tool'],
  openGraph: {
    title: 'PDF N-Up Layout - Multiple Pages Per Sheet',
    description: 'Print more with less paper. Put 2, 4, 6, 9 or 16 pages on every sheet.',
    url: 'https://devmetrix.in/tools/pdf-nup',
    type: 'website',
  },
};

export default function PdfNupPage() {
  return <Client />;
}