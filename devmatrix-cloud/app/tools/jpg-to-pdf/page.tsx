import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'JPG to PDF - Convert Images to PDF Online | DevMetrix',
  description: 'Convert JPG, PNG, and other images to a single PDF document. Adjust order and orientation instantly.',
  keywords: ['jpg to pdf', 'image to pdf', 'photos to pdf', 'convert jpg', 'free pdf tool'],
  openGraph: {
    title: 'Convert JPG Images to PDF - Free',
    description: 'Combine multiple images into one PDF document.',
    url: 'https://devmetrix.in/tools/jpg-to-pdf',
    type: 'website',
  },
};

export default function JpgToPdfPage() {
  return <Client />;
}
