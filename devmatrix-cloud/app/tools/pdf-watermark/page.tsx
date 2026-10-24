import { Metadata } from 'next';
import Client from './Client';

export const metadata: Metadata = {
  title: 'Protect PDF - Encrypt PDF with Password | DevMetrix',
  description: 'Secure your PDF files with a password. Encrypt sensitive documents online for free.',
  keywords: ['protect pdf', 'encrypt pdf', 'password protect pdf', 'pdf security', 'lock pdf'],
  openGraph: {
    title: 'Password Protect PDF Files - Secure & Free',
    description: 'Encrypt your PDF documents instantly.',
    url: 'https://devmetrix.in/tools/pdf-protect',
    type: 'website',
  },
};

export default function PdfProtectPage() {
  return <Client />;
}
