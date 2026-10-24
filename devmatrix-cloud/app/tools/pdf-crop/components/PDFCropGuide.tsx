import Icon from '@/components/Icon';

export default function PDFCropGuide() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 prose prose-slate dark:prose-invert lg:prose-lg prose-headings:text-foreground prose-p:text-muted prose-li:text-muted prose-strong:text-foreground">
      <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
        <Icon name="auto_awesome" className="text-accent" />
        The Ultimate Guide to AI-Powered PDF Cropping
      </h2>

      <p className="lead text-xl text-muted mb-8">
        In the digital age, Portable Document Format (PDF) files are the standard for sharing documents. However, they often come with unwanted baggage: excessive white margins, scanner artifacts, black borders, and inconsistent page sizes. Our AI PDF Cropping Tool revolutionizes how you handle these documents by leveraging advanced machine learning to detect and remove these imperfections automatically. Whether you're a student scanning textbooks, a professional archiving receipts, or a designer prepping files for print, understanding the nuances of PDF cropping is essential for creating clean, professional documents.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">What is PDF Cropping?</h2>
      <p>
        PDF cropping is the process of reducing the visible area of a PDF page. Unlike resizing, which scales the entire page up or down, cropping trims the outer edges of the document, effectively "cutting off" the margins. This process does not necessarily delete the content outside the crop box (in many PDF viewers, the content is merely hidden), but it redefines the displayed page boundaries.
      </p>
      <p>
        Technically, a PDF page is defined by several boxes: the MediaBox (physical paper size), CropBox (visible area), BleedBox, TrimBox, and ArtBox. When you crop a PDF using our tool, you are modifying the CropBox and MediaBox to focus on the essential content. This results in a document that looks cleaner on screen, prints more efficiently, and is easier to read on mobile devices where screen real estate is precious.
      </p>
      <p>
        The need for cropping arises from various sources. Scanned documents often include the scanner bed's background or dark edges. eBooks formatted for print might have large margins for binding that are unnecessary for digital reading. Presentation slides might have branding headers or footers you wish to exclude. By cropping, you reclaim space and focus attention on the content that matters.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">When to Crop PDFs: Key Use Cases</h2>
      <p>
        Identifying the right time to crop can save you hours of frustration. Here are the most common scenarios where PDF cropping is indispensable:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Scanned Books and Archives:</strong> Digitizing physical books often results in pages with visible binding shadows, scanner lid borders, and skewed margins. Cropping removes these artifacts, making the digital copy look like a native eBook.</li>
        <li><strong>Forms and Applications:</strong> Government forms or applications scanned on A4 paper might be small slips or receipts. Cropping isolates the form itself, removing the vast empty white space around it.</li>
        <li><strong>Receipts and Invoices:</strong> For expense reporting, you often scan multiple receipts on a single page or have a small receipt on a large background. Cropping isolates each receipt for clarity and compliance.</li>
        <li><strong>Academic Papers:</strong> Research papers often have wide margins for reviewer notes. When reading on a tablet or e-reader, these margins force the text to be smaller. Cropping the margins allows the text to fill the screen, improving readability significantly.</li>
        <li><strong>Engineering Drawings:</strong> Large schematics often have title blocks or revision history in the margins. Cropping can isolate specific details or views for reports or presentations.</li>
        <li><strong>Presentation Handouts:</strong> Slides exported to PDF often have large white borders. Cropping them allows for a more immersive presentation experience.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">How Our AI Crop Tool Works</h2>
      <p>
        Our tool distinguishes itself by using the Gemini 2.5 Flash AI model to "see" your document like a human would. Traditional cropping tools rely on simple thresholding—detecting where pixels change from white to black. This often fails with noisy scans, faint text, or non-white backgrounds.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">1. Intelligent Auto-Detection</h3>
      <p>
        When you upload a file and click "Auto-Detect Crop," the AI analyzes the visual layout of the page. It identifies:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Text Blocks:</strong> Paragraphs, headings, and tables are identified as critical content.</li>
        <li><strong>Images and Graphics:</strong> Charts, photos, and diagrams are preserved.</li>
        <li><strong>Page Elements:</strong> Page numbers, headers, and footers can be detected.</li>
        <li><strong>Artifacts:</strong> The AI distinguishes between content and scanner noise, such as punch holes, staple marks, or dark scanner edges.</li>
      </ul>
      <p>
        Based on this analysis, the tool calculates a bounding box that encompasses all meaningful content plus a small "safety padding" to ensure nothing is accidentally cut off. It then suggests this crop to you.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">2. Precision Manual Adjustment</h3>
      <p>
        While AI is powerful, personal preference varies. Our manual controls allow you to fine-tune the crop. You can drag the edges of the crop box on the visual preview or enter exact coordinates (in points) for pixel-perfect accuracy. This is crucial for printing, where you might need exact 1-inch margins.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground">3. Batch Processing Capabilities</h3>
      <p>
        Cropping a 100-page document one page at a time is tedious. Our tool offers "Apply to All" functionality. You can set the crop on one representative page and apply those same coordinates to every page in the document. This is perfect for documents with consistent layouts, such as digitally generated reports or books.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Auto Crop vs. Manual Crop: Which to Choose?</h2>
      <p>
        <strong>Auto Crop</strong> is best for:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Scanned documents with varying content placement.</li>
        <li>Removing messy scanner borders quickly.</li>
        <li>Quickly trimming white space from single-page documents.</li>
        <li>Users who want a "one-click" improvement.</li>
      </ul>
      <p>
        <strong>Manual Crop</strong> is superior when:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>You need specific output dimensions (e.g., cropping to exactly A5 size).</li>
        <li>The document has inconsistent artifacts that AI might misinterpret as content.</li>
        <li>You want to remove specific content, like headers or footers, that the AI tries to preserve.</li>
        <li>You are preparing a document for professional printing with bleed requirements.</li>
      </ul>
      <p>
        The most effective workflow often combines both: use Auto-Detect to get a baseline, then use Manual controls to fine-tune the result before applying it to the batch.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Cropping Different Document Types: A Deep Dive</h2>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">Scanned Books</h3>
      <p>
        Scanned books present unique challenges. Pages often curve near the spine, creating dark shadows. The text block might drift from page to page. Our AI is trained to ignore the "gutter shadow" and focus on the text block. For books, we recommend checking odd and even pages separately, as the margins often mirror each other (inner vs. outer margins).
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">Forms and Applications</h3>
      <p>
        Forms often have specific boundaries. Cropping too tight might remove instructions or form IDs located at the very bottom. When cropping forms, ensure you leave enough white space for the document to look balanced and for any necessary marginalia to be readable.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">Receipts and Invoices</h3>
      <p>
        Receipts are often long and narrow. Scanning them on A4 paper results in huge white areas. Cropping these files significantly reduces file size (if the white space contains noise) and makes them easier to view on mobile banking apps. Our Auto-Crop is particularly aggressive with receipts to maximize readability.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Cropping Best Practices</h2>
      <p>
        To achieve professional results, keep these tips in mind:
      </p>
      <ul className="list-decimal pl-6 space-y-2">
        <li><strong>Maintain Aspect Ratio:</strong> If you intend to print the cropped document, ensure the final dimensions match a standard paper size (like A4 or Letter) or a scalable ratio.</li>
        <li><strong>Leave "Breathing Room":</strong> Don't crop right up to the text. Leave at least 10-20 points of padding. Text touching the edge of the screen or paper looks cramped and is hard to read.</li>
        <li><strong>Check for Hidden Elements:</strong> Before batch cropping, scan through a few pages to ensure no page numbers, footnotes, or diagrams extend into the margin area you are removing.</li>
        <li><strong>Symmetry Matters:</strong> For double-sided documents, ensure your left and right margins are balanced, or mirrored if you are preparing for binding.</li>
        <li><strong>Backup Originals:</strong> Cropping is often non-destructive in PDF metadata, but some tools (including "flattening" processes) can make it permanent. Always keep your original file until you are satisfied with the result.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Batch Cropping Guide</h2>
      <p>
        Batch cropping is a productivity superpower, but it requires caution.
      </p>
      <p>
        <strong>1. Analyze Consistency:</strong> Scroll through your PDF. Does the text start at the same vertical position on every page? Are the margins consistent? If yes, batch cropping is safe.
      </p>
      <p>
        <strong>2. The "Lowest Common Denominator":</strong> When setting a batch crop, find the page with the *widest* content. Set your crop box to fit this page. Applying this crop to all pages ensures you don't cut off content on pages that have wider tables or images.
      </p>
      <p>
        <strong>3. Odd/Even Split:</strong> For books, you might need to crop odd pages differently from even pages due to binding margins. While our current tool applies a single crop to the selection, you can process the document in two passes (extract odd, crop, extract even, crop, merge) using our Split and Merge tools alongside the Cropper.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Crop vs. Resize vs. Trim</h2>
      <p>
        It's easy to confuse these terms.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Crop:</strong> Reducing the visible canvas size. The content outside is hidden. The content inside stays the same size (scale).</li>
        <li><strong>Resize:</strong> Changing the page dimensions by scaling the content. For example, shrinking an A3 page to A4. The entire page content shrinks.</li>
        <li><strong>Trim:</strong> Often used in printing, this refers to cutting off the physical edges of paper. In digital PDF terms, it's synonymous with cropping but often implies automated removal of white space (trimming whitespace).</li>
      </ul>
      <p>
        Use <strong>Crop</strong> when you want to remove garbage. Use <strong>Resize</strong> when you want to change the paper format.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Common Cropping Mistakes to Avoid</h2>
      <p>
        <strong>1. Over-Cropping:</strong> Cutting off page numbers or headers. Always check the corners of your crop box.
      </p>
      <p>
        <strong>2. Ignoring Print Margins:</strong> If you crop a document to the exact edge of the text and then try to print it, your printer might cut off the text because printers need a non-printable margin (usually 0.25 inches).
      </p>
      <p>
        <strong>3. Assuming Center Alignment:</strong> Scanned documents are rarely perfectly centered. A crop box centered on the page might cut off text if the scan is skewed. Always rely on visual alignment rather than mathematical centering for scans.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Mobile PDF Cropping</h2>
      <p>
        Cropping on mobile is challenging due to screen size. Our tool is optimized for mobile with touch-friendly handles.
      </p>
      <p>
        <strong>Tips for Mobile Users:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Use landscape mode for a wider view of the document.</li>
        <li>Rely on Auto-Crop more heavily, as precise dragging with a finger can be difficult.</li>
        <li>Use the "Zoom" pinch gesture to inspect the corners of your crop before applying.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-foreground">Frequently Asked Questions (FAQ)</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-lg text-foreground">Is cropping permanent?</h3>
          <p>
            When you download the file from our tool, the crop is applied by modifying the PDF's internal page boxes (MediaBox/CropBox). Most viewers will respect this. However, the data outside might still exist in the file stream unless the file is "refried" (printed to PDF again). For visual purposes, it is permanent.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Does cropping reduce file size?</h3>
          <p>
            Not necessarily. Cropping hides content; it doesn't always delete the underlying image data. To reduce file size, you should use a PDF Compression tool after cropping. However, if the tool re-encodes the pages (which our "Export" process does via pdf-lib), it might discard unused objects, potentially reducing size.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Can I crop password-protected PDFs?</h3>
          <p>
            You must remove the password protection first. If you have the password, you can unlock the PDF using our Unlock tool, then upload it here to crop.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">How to crop all pages at once?</h3>
          <p>
            Set the crop on one page, then use the "Apply to All" button in the Manual Controls panel. This will copy the crop coordinates to every page in the document.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Can I undo a crop?</h3>
          <p>
            Yes, within the editor session, you can reset any page's crop using the "Reset" button. Once downloaded, you would need to re-upload the original file to start over.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Does cropping lose quality?</h3>
          <p>
            No. Our tool manipulates the page boundaries without resampling the images or text, preserving the original quality of your document.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">What's the difference between crop and delete?</h3>
          <p>
            Deleting a page removes it entirely from the document. Cropping keeps the page but hides parts of it (like margins). Use "Delete" to remove blank pages, and "Crop" to fix pages with content.
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 glass border border-accent/20 rounded-2xl">
        <h3 className="text-lg font-semibold text-accent mb-2 flex items-center gap-2">
          <Icon name="check_circle" />
          Ready to clean up your PDFs?
        </h3>
        <p className="text-muted">
          Scroll up to the editor to get started. It's fast, free, and powered by AI.
        </p>
      </div>
    </article>
  );
}