import { Metadata } from 'next';
import PDFTextEditorClient from './PDFTextEditorClient';

export const metadata: Metadata = {
  title: 'Free PDF Text Editor | Edit PDF Text Online',
  description: 'Click any text in your PDF to edit it in place. Fix typos, update dates, or add text boxes without converting to Word. 100% private, no upload required.',
  keywords: ['pdf text editor', 'edit pdf text', 'change pdf text', 'pdf editor online', 'free pdf editor'],
  openGraph: {
    title: 'PDF Text Editor - Edit PDF Text Locally',
    description: 'Edit PDF text directly in your browser. No upload, no watermark.',
    url: 'https://devmetrix.cloud/tools/pdf-text-editor',
    type: 'website',
  },
};

export default function PDFTextEditorPage() {
  return (
    <div className="flex min-h-screen flex-col pt-20">
      <div className="w-full relative z-10">
        <PDFTextEditorClient />
      </div>
    </div>
  );
}