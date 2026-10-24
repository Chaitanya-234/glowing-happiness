'use client';

import Icon from '@/components/Icon';
import { FileToolLayout } from '@/components/tools/FileToolLayout';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import React, { useState } from 'react';

type Mode = 'ranges' | 'select' | 'all';

const inputCls =
  'w-full rounded-full px-4 py-2.5 text-sm bg-foreground/10 border border-border/25 text-foreground placeholder:text-muted outline-none focus:border-border/60 transition-colors';
const errorCls = 'text-sm text-red-600 dark:text-red-400';

export default function PdfSplitClient() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('ranges');
  const [rangesInput, setRangesInput] = useState('');
  const [currentGroup, setCurrentGroup] = useState<number[]>([]); // 1-indexed
  const [groups, setGroups] = useState<number[][]>([]); // finalized groups, 1-indexed
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);

  const loadFile = async (f: File) => {
    setError(null);
    setResult(null);
    setGroups([]);
    setCurrentGroup([]);
    setRangesInput('');
    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer);
      setFile(f);
      setNumPages(doc.getPageCount());
    } catch {
      setError('Could not read PDF file. Please upload a valid PDF.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) await loadFile(f);
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please drop a PDF file.');
      return;
    }
    await loadFile(f);
  };

  const togglePage = (page: number) => {
    setCurrentGroup((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page].sort((a, b) => a - b)
    );
  };

  const addGroup = () => {
    if (currentGroup.length === 0) return;
    setGroups((prev) => [...prev, currentGroup]);
    setCurrentGroup([]);
  };

  const removeGroup = (index: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== index));
  };

  const parseRanges = (input: string, total: number): number[][] => {
    const segments = input.split(',').map((s) => s.trim()).filter(Boolean);
    if (segments.length === 0) {
      throw new Error('Enter at least one page or range, e.g. 1-20, 25, 30-35');
    }
    return segments.map((seg) => {
      if (seg.includes('-')) {
        const [startStr, endStr] = seg.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!start || !end || start < 1 || end > total || start > end) {
          throw new Error(`Invalid range "${seg}". Pages must be between 1 and ${total}.`);
        }
        const pages: number[] = [];
        for (let p = start; p <= end; p++) pages.push(p);
        return pages;
      }
      const page = parseInt(seg, 10);
      if (!page || page < 1 || page > total) {
        throw new Error(`Invalid page "${seg}". Pages must be between 1 and ${total}.`);
      }
      return [page];
    });
  };

  const buildOutput = async (pageGroups: number[][]) => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer);
      const baseName = file.name.replace(/\.pdf$/i, '');

      if (pageGroups.length === 1) {
        const subPdf = await PDFDocument.create();
        const copiedPages = await subPdf.copyPages(srcDoc, pageGroups[0].map((p) => p - 1));
        copiedPages.forEach((p) => subPdf.addPage(p));
        const bytes = await subPdf.save();
        const url = URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' }));
        setResult({ url, name: `${baseName}-split.pdf` });
      } else {
        const zip = new JSZip();
        for (let i = 0; i < pageGroups.length; i++) {
          const subPdf = await PDFDocument.create();
          const copiedPages = await subPdf.copyPages(srcDoc, pageGroups[i].map((p) => p - 1));
          copiedPages.forEach((p) => subPdf.addPage(p));
          zip.file(`${baseName}-part-${i + 1}.pdf`, await subPdf.save());
        }
        const content = await zip.generateAsync({ type: 'blob' });
        setResult({ url: URL.createObjectURL(content), name: `${baseName}-split.zip` });
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong while splitting the PDF.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSplitRanges = async () => {
    if (!numPages) return;
    try {
      await buildOutput(parseRanges(rangesInput, numPages));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSplitSelected = async () => {
    const finalGroups = currentGroup.length > 0 ? [...groups, currentGroup] : groups;
    if (finalGroups.length === 0) {
      setError('Select at least one page before splitting.');
      return;
    }
    await buildOutput(finalGroups);
  };

  const handleSplitAll = async () => {
    if (!numPages) return;
    await buildOutput(Array.from({ length: numPages }, (_, i) => [i + 1]));
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setNumPages(null);
    setGroups([]);
    setCurrentGroup([]);
    setRangesInput('');
    setResult(null);
    setError(null);
  };

  return (
    <FileToolLayout
      toolId="pdf-split"
      title="Split PDF File"
      description="Separate one page or a whole set for easy conversion into independent PDF files."
      icon={<Icon name="content_cut" className="text-[64px] text-accent" />}
      howToSteps={[
        { title: 'Upload PDF', description: 'Select the PDF file you want to split.' },
        { title: 'Choose a method', description: 'Type page ranges, click pages to select them, or split every page individually.' },
        { title: 'Download', description: 'Download your split PDF (or ZIP if you created multiple files).' },
      ]}
      features={[
        { title: 'Secure Processing', description: 'Splitting happens in your browser.', icon: <Icon name="lock" /> },
        { title: 'Flexible Ranges', description: 'Type ranges or click pages to build custom groups.', icon: <Icon name="view_list" /> },
        { title: 'No Limits', description: 'Split large documents with many pages.', icon: <Icon name="rocket_launch" /> },
        { title: 'Free', description: 'Completely free to use.', icon: <Icon name="redeem" /> },
      ]}
      faq={[
        { question: 'Can I split specific ranges?', answer: 'Yes — type ranges like 1-20, 25, 30-35, click individual pages to build custom groups, or split every page at once.' },
        { question: 'Is it free?', answer: 'Yes, completely free.' },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {!file && (
          <>
            <label
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`glass flex flex-col items-center justify-center gap-1 rounded-3xl p-10 cursor-pointer border-2 border-dashed transition-colors ${
                dragging ? 'border-accent bg-foreground/10' : 'border-border/40 hover:border-accent'
              }`}
            >
              <Icon name="upload_file" className="text-[48px] text-accent mb-3" />
              <span className="text-base font-semibold text-foreground">Drag and drop your PDF here</span>
              <span className="text-sm text-muted my-1">or</span>
              <span className="btn-solid mt-2 px-6 py-2.5 text-sm">Browse files</span>
              <span className="text-xs text-muted mt-4">PDF only, up to 50MB</span>
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            </label>
            {error && <p role="alert" className={errorCls}>{error}</p>}
          </>
        )}

        {file && numPages && !result && (
          <div className="glass rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="truncate pr-4">{file.name} · {numPages} pages</span>
              <button onClick={reset} className="shrink-0 text-red-600 dark:text-red-400 font-medium hover:underline">
                Remove
              </button>
            </div>

            <div role="tablist" className="flex gap-2 border-b border-border/20">
              {([
                { key: 'ranges', label: 'Custom Ranges' },
                { key: 'select', label: 'Select Pages' },
                { key: 'all', label: 'Split All' },
              ] as { key: Mode; label: string }[]).map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={mode === tab.key}
                  onClick={() => setMode(tab.key)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    mode === tab.key
                      ? 'border-accent text-foreground'
                      : 'border-transparent text-muted hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {mode === 'ranges' && (
              <div className="space-y-3">
                <label htmlFor="ranges" className="block text-sm font-medium text-foreground">
                  Enter page ranges (each group becomes its own PDF)
                </label>
                <input
                  id="ranges"
                  type="text"
                  value={rangesInput}
                  onChange={(e) => setRangesInput(e.target.value)}
                  placeholder="e.g. 1-20, 25, 30-35"
                  className={inputCls}
                />
                <p className="text-xs text-muted">
                  Use a dash for a range (1-20), a comma to separate groups, a single number for one page (5).
                </p>
                <button
                  onClick={handleSplitRanges}
                  disabled={processing || !rangesInput.trim()}
                  className="btn-solid px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Splitting…' : 'Split PDF'}
                </button>
              </div>
            )}

            {mode === 'select' && (
              <div className="space-y-4">
                <p className="text-sm text-muted">
                  Click pages to select a group, then &quot;Add Group&quot; to lock it in and start a new one. Repeat, then finalize.
                </p>
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 max-h-64 overflow-y-auto p-2 rounded-2xl border border-border/20 bg-foreground/5">
                  {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => {
                    const inCurrent = currentGroup.includes(page);
                    const groupIndexes = groups.reduce<number[]>((acc, g, i) => {
                      if (g.includes(page)) acc.push(i);
                      return acc;
                    }, []);
                    const inSavedGroup = groupIndexes.length > 0;
                    return (
                      <button
                        key={page}
                        onClick={() => togglePage(page)}
                        aria-pressed={inCurrent}
                        className={`relative aspect-square rounded-lg text-xs font-medium border flex items-center justify-center transition-colors ${
                          inCurrent
                            ? 'bg-primary text-primary-foreground border-primary'
                            : inSavedGroup
                            ? 'bg-foreground/15 text-muted border-border/20'
                            : 'bg-foreground/5 text-foreground border-border/25 hover:bg-foreground/15'
                        }`}
                        title={
                          inSavedGroup
                            ? `Also in group ${groupIndexes.map((i) => i + 1).join(', ')}`
                            : `Page ${page}`
                        }
                      >
                        {page}
                        {inSavedGroup && !inCurrent && (
                          <span className="absolute -top-1 -right-1 bg-accent text-background rounded-full w-3.5 h-3.5 grid place-items-center">
                            <Icon name="check" className="text-[10px]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={addGroup}
                  disabled={currentGroup.length === 0}
                  className="btn-glass px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Group ({currentGroup.length} pages)
                </button>

                {groups.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Groups to split:</p>
                    {groups.map((g, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 text-sm bg-foreground/10 text-foreground rounded-2xl px-4 py-2"
                      >
                        <span className="truncate">Group {i + 1}: pages {g.join(', ')}</span>
                        <button
                          onClick={() => removeGroup(i)}
                          className="shrink-0 text-red-600 dark:text-red-400 text-xs font-medium hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleSplitSelected}
                  disabled={processing || (currentGroup.length === 0 && groups.length === 0)}
                  className="btn-solid px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Splitting…' : 'Finalize Split'}
                </button>
              </div>
            )}

            {mode === 'all' && (
              <div className="space-y-3">
                <p className="text-sm text-muted">
                  Every page will be extracted into its own PDF file, packaged as a ZIP.
                </p>
                <button
                  onClick={handleSplitAll}
                  disabled={processing}
                  className="btn-solid px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Splitting…' : `Split All ${numPages} Pages`}
                </button>
              </div>
            )}

            {error && <p role="alert" className={errorCls}>{error}</p>}
          </div>
        )}

        {result && (
          <div className="glass text-center space-y-4 rounded-3xl p-8">
            <span className="w-14 h-14 mx-auto rounded-full bg-foreground/10 border border-border/25 grid place-items-center text-accent">
              <Icon name="check_circle" className="text-[28px]" />
            </span>
            <p className="text-lg font-medium text-foreground">Your PDF has been split!</p>
            <a
              href={result.url}
              download={result.name}
              className="btn-solid inline-flex items-center gap-2 px-8 py-3 text-sm"
            >
              <Icon name="download" className="text-[18px]" />
              Download {result.name}
            </a>
            <div>
              <button onClick={reset} className="text-sm text-muted hover:text-foreground hover:underline">
                Split another PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </FileToolLayout>
  );
}