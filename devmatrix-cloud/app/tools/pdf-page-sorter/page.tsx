import { Metadata } from 'next';
import PDFPageSorterClient from './PDFPageSorterClient';

export const metadata: Metadata = {
  title: 'Free PDF Page Sorter | Rearrange, Rotate & Delete PDF Pages',
  description: 'Easily organize your PDF documents. Drag and drop to reorder pages, rotate landscape pages, and delete unwanted blanks. 100% free, private, and runs entirely in your browser.',
  keywords: ['pdf page sorter', 'reorder pdf', 'organize pdf pages', 'rotate pdf', 'delete pdf pages', 'sort pdf online', 'free pdf organizer'],
  openGraph: {
    title: 'PDF Page Sorter - Rearrange PDF Pages Online',
    description: 'Drag and drop to reorganize your PDF. No upload required, 100% private.',
    url: 'https://devmetrix.in/tools/pdf-page-sorter',
    type: 'website',
  },
};

export default function PDFPageSorterPage() {
  return (
    <div className="flex min-h-screen flex-col pt-20">
      <div className="w-full relative z-10">
        <PDFPageSorterClient />
      </div>
    </div>
  );
}