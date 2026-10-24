import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Image Converter - Convert JPG, PNG, WEBP Online | DevMetrix',
  description: 'Convert images to JPG, PNG, WEBP, or GIF format online. Free bulk image converter tool.',
  keywords: ['image converter', 'convert image', 'jpg to png', 'png to jpg', 'webp converter', 'image format converter'],
  openGraph: {
    title: 'Convert Images Online - Any Format',
    description: 'Convert between JPG, PNG, WEBP instantly.',
    url: 'https://devmetrix.in/tools/image-converter',
    type: 'website',
  },
};

export default function ImageConverterPage() {
  return <Client />;
}
