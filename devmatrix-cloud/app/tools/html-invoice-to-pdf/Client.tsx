'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DEFAULT_INVOICE_HTML = `
<div style="padding: 40px; font-family: Helvetica, sans-serif; color: #333; background: white; width: 700px; margin: auto;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 20px;">
    <div>
      <h1 style="margin: 0; color: #2563eb;">INVOICE</h1>
      <p style="margin: 5px 0; color: #666;">#INV-2023-001</p>
    </div>
    <div style="text-align: right;">
      <h3 style="margin: 0;">DevMatrix Inc.</h3>
      <p style="margin: 5px 0; font-size: 14px; color: #666;">123 Tech Street, Silicon Valley</p>
    </div>
  </div>

  <div style="margin-top: 40px; display: flex; justify-content: space-between;">
    <div>
      <p style="font-weight: bold; margin-bottom: 5px;">Bill To:</p>
      <p style="margin: 0;">Acme Corp</p>
      <p style="margin: 0;">John Smith</p>
      <p style="margin: 0;">john@acme.com</p>
    </div>
    <div style="text-align: right;">
      <p><strong>Date:</strong> Oct 24, 2023</p>
      <p><strong>Due Date:</strong> Nov 24, 2023</p>
    </div>
  </div>

  <table style="width: 100%; margin-top: 40px; border-collapse: collapse;">
    <thead>
      <tr style="background: #f8fafc; text-align: left;">
        <th style="padding: 12px; border-bottom: 2px solid #ddd;">Description</th>
        <th style="padding: 12px; border-bottom: 2px solid #ddd; text-align: right;">Qty</th>
        <th style="padding: 12px; border-bottom: 2px solid #ddd; text-align: right;">Price</th>
        <th style="padding: 12px; border-bottom: 2px solid #ddd; text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">Web Development Service</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">10</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$150.00</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$1,500.00</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">Server Setup</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">1</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$500.00</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$500.00</td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 30px; text-align: right;">
    <p style="margin: 5px 0;">Subtotal: $2,000.00</p>
    <p style="margin: 5px 0;">Tax (10%): $200.00</p>
    <h2 style="margin: 10px 0; color: #2563eb;">Total: $2,200.00</h2>
  </div>

  <div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #888; font-size: 12px;">
    <p>Thank you for your business!</p>
  </div>
</div>
`;

export default function HtmlInvoiceToPdfClient() {
  const [htmlContent, setHtmlContent] = useState(DEFAULT_INVOICE_HTML);
  const previewRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setLoading(true);

    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height] // Custom format to fit the invoice exactly
      });

      // To fit A4, we would need to scale differently, but for invoice accuracy, custom size is often better or scale to A4
      // Let's scale to A4 for print readiness
      const a4Width = 595.28;
      const a4Height = 841.89;
      // Convert px to pt approx (1px = 0.75pt) - jsPDF default unit is mm usually but we set px?
      // Actually standard A4 is 210x297mm.

      // Let's re-init PDF as A4 and scale image
      const pdfA4 = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdfA4.internal.pageSize.getWidth();
      const pdfHeight = pdfA4.internal.pageSize.getHeight();

      const imgProps = pdfA4.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      const height = pdfWidth / ratio;

      pdfA4.addImage(imgData, 'PNG', 0, 0, pdfWidth, height);
      pdfA4.save('invoice.pdf');

    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500 mb-4">
            HTML Invoice to PDF
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Design invoices in HTML and convert them to print-ready PDF files instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Editor */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col h-[800px]">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">HTML Editor</h2>
            <p className="text-xs text-neutral-500 mb-2">Edit the HTML below to update the invoice preview.</p>
            <textarea
              value={htmlContent}
              onChange={e => setHtmlContent(e.target.value)}
              className="flex-1 w-full bg-neutral-800 border border-neutral-700 rounded-md p-4 text-xs font-mono focus:outline-none focus:border-cyan-500 resize-none"
            />
            <button
              onClick={handleDownload}
              disabled={loading}
              className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>

          {/* Preview */}
          <div className="bg-neutral-800 rounded-xl p-4 overflow-auto h-[800px] flex items-start justify-center border border-neutral-700">
            <div className="origin-top scale-75 md:scale-90 lg:scale-100 transition-transform">
               {/* Wrapper for html2canvas */}
               <div ref={previewRef} dangerouslySetInnerHTML={{ __html: htmlContent }} className="bg-white shadow-xl" style={{ width: 'min-content' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
