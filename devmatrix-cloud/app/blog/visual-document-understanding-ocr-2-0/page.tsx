'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

const metadata = {
  title: 'Visual Document Understanding: Next-Gen OCR with LayoutLM and Donut | DevMetrix',
  description: 'Forget Tesseract. Learn how to extract structured data from complex PDFs, invoices, and forms using LayoutLM, Donut, and Multimodal Transformers.',
  keywords: ['VDU', 'OCR', 'LayoutLM', 'Donut', 'Document Intelligence', 'Multimodal AI'],
};

export default function VduBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="Visual Document Understanding: Next-Gen OCR with LayoutLM and Donut"
        description="Forget Tesseract. Learn how to extract structured data from complex PDFs, invoices, and forms using LayoutLM, Donut, and Multimodal Transformers."
        datePublished="2026-01-01"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/visual-document-understanding-ocr-2-0"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Visual Document Understanding: Next-Gen OCR with LayoutLM and Donut
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 January 1, 2026</span>
          <span>⏱️ 35 min read</span>
          <span>🏷️ Multimodal AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          For decades, "extracting data from a PDF" meant one thing: Tesseract OCR. You would get a wall of raw text, losing all spatial information. If "Total: \$500" was at the bottom right, and "Invoice #123" was at the top left, Tesseract just gave you a flat string. You had to write hundreds of fragile RegEx rules to parse it.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          That era is over. <strong>Visual Document Understanding (VDU)</strong> models don't just "read" text; they "see" the document. They understand that bold text is a header. They understand that data in a grid is a table. They understand that a signature at the bottom validates the form.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          In this guide, we will compare <strong>LayoutLM</strong> (which combines Text + Layout + Image) and <strong>Donut</strong> (OCR-free visual document understanding) and build a pipeline to automate invoice processing.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Table of Contents</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#why-ocr-failed" className="text-purple-600 dark:text-purple-400 hover:underline">Why Traditional OCR Failed Enterprise</a></li>
          <li><a href="#layoutlm" className="text-purple-600 dark:text-purple-400 hover:underline">Theory: LayoutLM (Text + Layout + Image)</a></li>
          <li><a href="#donut" className="text-purple-600 dark:text-purple-400 hover:underline">Theory: Donut (Document Understanding Transformer)</a></li>
          <li><a href="#python-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Python Implementation: Fine-tuning Donut on Invoices</a></li>
          <li><a href="#java-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Java Implementation: The Document Processor Service</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security: Redacting PII in Images</a></li>
        </ul>
      </nav>

      {/* Why OCR Failed */}
      <section id="why-ocr-failed" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Why Traditional OCR Failed Enterprise
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Traditional OCR (Optical Character Recognition) engines like Tesseract or AWS Textract (in raw mode) are purely <strong>unimodal</strong>. They look at pixel clusters and predict characters. They discard the most valuable signal in a document: <strong>Spatial Layout</strong>.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600 mb-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The "Key-Value" Problem</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
               Consider an invoice. The word "Total" is a Key. The number "\$500.00" is the Value. They might be separated by 3 inches of whitespace.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
               To a human, the relationship is obvious because they are aligned horizontally. To Tesseract, they are just two disconnected strings. VDU models treat the 2D position (x, y coordinates) of text bounding boxes as a first-class input feature, allowing them to "link" Keys and Values spatially.
            </p>
        </div>
      </section>

      {/* Theory: LayoutLM */}
      <section id="layoutlm" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Theory: LayoutLM (Text + Layout + Image)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           <strong>LayoutLM</strong> (by Microsoft) revolutionized this field by pre-training a BERT model on millions of scanned documents. It accepts three inputs:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>Text Embeddings:</strong> The tokenized words (like BERT).</li>
            <li><strong>Layout Embeddings:</strong> The (x0, y0, x1, y1) coordinates of each word box. This tells the model <em>where</em> the word is.</li>
            <li><strong>Image Embeddings:</strong> Visual features extracted from the document image (using a CNN backbone). This helps distinguish a "Logo" from a "Table Header" or a "Stamp".</li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           LayoutLMv3 achieves state-of-the-art results on tasks like Invoice Information Extraction (finding the Date, Total, Vendor).
        </p>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Evolution of LayoutLM</h3>
             <ul className="space-y-4">
                 <li><strong>LayoutLMv1:</strong> Added Layout Embeddings (x,y coordinates) to BERT. Still relied on external OCR.</li>
                 <li><strong>LayoutLMv2:</strong> Added a visual backbone (ResNet) to process image patches directly alongside text.</li>
                 <li><strong>LayoutLMv3 (The King):</strong> Removed the dependency on CNNs. It uses a Vision Transformer (ViT) approach where image patches are linear embeddings just like text tokens. This "Unified Multimodal Transformer" approach is cleaner and faster.</li>
             </ul>
        </div>
      </section>

      {/* Theory: Donut */}
      <section id="donut" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Theory: Donut (Document Understanding Transformer)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           LayoutLM still relies on an external OCR engine (like Tesseract) to get the text first. If the OCR fails (e.g., blurry text), LayoutLM fails.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           <strong>Donut</strong> (<strong>Do</strong>cume<strong>n</strong>t <strong>U</strong>nderstanding <strong>T</strong>ransformer) is <strong>OCR-Free</strong>. It is an Image-to-Text model.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           It uses a Vision Encoder (Swin Transformer) to process the raw image pixels and a Text Decoder (BART) to generate the structured JSON output directly. It doesn't output a list of words; it outputs: <code>&#123;"invoice_no": "123", "total": "500"&#125;</code>.
        </p>
      </section>

      {/* Python Implementation */}
      <section id="python-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Python Implementation: Fine-tuning Donut on Invoices
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Let's see how to fine-tune Donut to extract data from a custom receipt dataset.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-python">{`from transformers import DonutProcessor, VisionEncoderDecoderModel
from datasets import load_dataset

# 1. Load Pre-trained Donut
processor = DonutProcessor.from_pretrained("naver-clova-ix/donut-base-finetuned-cord-v2")
model = VisionEncoderDecoderModel.from_pretrained("naver-clova-ix/donut-base-finetuned-cord-v2")

# 2. Prepare Image
image = load_dataset("naver-clova-ix/cord-v2", split="validation")[0]["image"]

# 3. Inference
# Convert image to pixel values
pixel_values = processor(image, return_tensors="pt").pixel_values

# Generate JSON output
# We force the model to start with a special <s_cord-v2> token
task_prompt = "<s_cord-v2>"
decoder_input_ids = processor.tokenizer(task_prompt, add_special_tokens=False, return_tensors="pt").input_ids

outputs = model.generate(
    pixel_values,
    decoder_input_ids=decoder_input_ids,
    max_length=512,
    early_stopping=True,
    pad_token_id=processor.tokenizer.pad_token_id,
    eos_token_id=processor.tokenizer.eos_token_id,
    use_cache=True,
    num_beams=1,
    bad_words_ids=[[processor.tokenizer.unk_token_id]],
    return_dict_in_generate=True,
)

# 4. Parse Sequence to JSON
sequence = processor.batch_decode(outputs.sequences)[0]
sequence = sequence.replace(processor.tokenizer.eos_token, "").replace(processor.tokenizer.pad_token, "")
sequence = sequence.split("<s_cord-v2>", 1)[-1].strip()

import json
print(json.dumps(processor.token2json(sequence), indent=2))
`}</code></pre>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The output isn't a mess of bounding boxes. It's clean JSON: <code>&#123;"menu": [&#123;"nm": "Pizza", "price": "15.00"&#125;]&#125;</code>.
        </p>
      </section>

      {/* Java Implementation */}
      <section id="java-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Java Implementation: The Document Processor Service
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          In a real enterprise, you have a queue of PDFs coming in from emails. We need a Spring Boot service to consume these files, convert pages to images, and send them to the model.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-java">{`package com.devmetrix.vdu;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;
import java.awt.image.BufferedImage;
import java.io.File;

@Service
public class DocumentProcessor {

    private final InferenceClient inferenceClient;

    public DocumentProcessor(InferenceClient inferenceClient) {
        this.inferenceClient = inferenceClient;
    }

    public void processInvoice(File pdfFile) throws Exception {
        try (PDDocument document = PDDocument.load(pdfFile)) {
            PDFRenderer pdfRenderer = new PDFRenderer(document);

            // Convert first page to image (Donut takes images)
            BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 300);

            // Send to Python Inference Service
            InvoiceData data = inferenceClient.extractData(bim);

            // Save to DB
            saveToDatabase(data);
        }
    }

    private void saveToDatabase(InvoiceData data) {
        System.out.println("Vendor: " + data.getVendor());
        System.out.println("Total: " + data.getTotalAmount());
    }
}
`}</code></pre>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-red-600">
          Security: Redacting PII in Images
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Uploading raw documents (drivers licenses, bank statements) to the cloud is risky.
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6 border-l-4 border-red-600">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Visual Redaction</h3>
             <p className="text-gray-700 dark:text-gray-300 mb-2">
                Before sending a document to a 3rd party model API, you must <strong>redact PII visually</strong>. We can use a lightweight local model (like YOLOv8 trained on PII detection) to find bounding boxes of faces, credit card numbers, and SSNs.
             </p>
             <p className="text-gray-700 dark:text-gray-300">
                Then, use OpenCV to draw a black rectangle over those coordinates. Only then do you send the image to the powerful (but untrusted) cloud VDU model. This ensures that even if the cloud provider is hacked, your users' PII is safe.
             </p>
        </div>
      </section>

    </article>
  );
}
