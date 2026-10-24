import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Image Compressor - Compress JPG, PNG, WEBP Online | DevMetrix',
  description: 'Compress and optimize images online for free. Reduce file size of JPG, PNG, and WEBP images without losing quality.',
  keywords: ['image compressor', 'compress jpg', 'compress png', 'optimize images', 'reduce image size', 'free image tool'],
  openGraph: {
    title: 'Compress Images Online - Best Quality',
    description: 'Reduce image file size up to 80% without quality loss.',
    url: 'https://devmetrix.in/tools/image-compressor',
    type: 'website',
  },
};

export default function ImageCompressorPage() {
  return <Client />;
}
