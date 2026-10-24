import { Metadata } from 'next';
import NumberBaseConverterClient from './NumberBaseConverterClient';

export const metadata: Metadata = {
  title: 'Number Base Converter | Binary Hex Decimal Converter Online',
  description: 'Convert numbers between Binary, Octal, Decimal, Hexadecimal, and custom bases (2-36). Real-time conversion with step-by-step explanation.',
  keywords: 'base converter, binary to decimal, hex to decimal, number converter, octal converter, radix converter, online calculator',
  openGraph: {
    title: 'Number Base Converter | Binary Hex Decimal Converter Online',
    description: 'Convert numbers between Binary, Octal, Decimal, Hexadecimal, and custom bases (2-36). Real-time conversion with step-by-step explanation.',
    type: 'website',
  },
};

export default function Page() {
  return <NumberBaseConverterClient />;
}
