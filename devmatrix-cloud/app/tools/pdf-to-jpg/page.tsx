import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'PDF to JPG - Convert PDF Pages to Images | DevMetrix',
  description: 'Convert every page of your PDF into a JPG image instantly. High quality extraction and free online conversion.',
  keywords: ['pdf to jpg', 'pdf to image', 'convert pdf', 'pdf converter', 'free pdf tool'],
  openGraph: {
    title: 'Convert PDF to JPG Online - High Quality',
    description: 'Turn your PDF pages into images instantly.',
    url: 'https://devmetrix.in/tools/pdf-to-jpg',
    type: 'website',
  },
};

export default function PdfToJpgPage() {
  return <Client />;
}
