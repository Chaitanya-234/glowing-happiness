import { Metadata } from 'next';
import PDFCropClient from './components/PDFCropClient';
import PDFCropGuide from './components/PDFCropGuide';

export const metadata: Metadata = {
  title: 'AI PDF Crop Tool | Remove Margins & White Space Online Free',
  description: 'Free AI-powered PDF cropping tool. Remove white margins, scanner borders, and unwanted edges from PDFs. Auto-detect or manual crop. Perfect for scanned books, forms, receipts. Supports batch cropping.',
  keywords: ['pdf crop tool', 'crop pdf online', 'remove pdf margins', 'trim pdf edges', 'pdf margin remover', 'remove white space from pdf', 'scanner border removal', 'batch crop pdf', 'auto crop pdf', 'smart pdf crop', 'pdf crop online free'],
  openGraph: {
    title: 'Free AI PDF Crop Tool - Remove Margins & Borders',
    description: 'Auto-detect and remove unwanted margins, white space, and scanner borders from PDFs. Free, fast, no registration.',
    url: 'https://devmetrix.in/tools/pdf-crop',
    type: 'website',
  },
};

export default function PDFCropPage() {
  return (
    <div className="flex min-h-screen flex-col pt-20">
      {/* Tool Area - allows content to define height, no forced 85vh */}
      <div className="w-full relative z-10">
        <PDFCropClient />
      </div>
      
      {/* Guide Area - separated cleanly */}
      <div className="w-full relative z-0 mt-12 border-t border-border/10">
        <PDFCropGuide />
      </div>
    </div>
  );
}