'use client';

import Icon from '@/components/Icon';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

interface CropEditorProps {
  file: File;
  pageNumber: number;
  cropData: { x: number; y: number; width: number; height: number } | null;
  onCropChange: (crop: { x: number; y: number; width: number; height: number }) => void;
}

export default function CropEditor({
  file,
  pageNumber,
  cropData,
  onCropChange
}: CropEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [scale, setScale] = useState(1.0);
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number } | null>(null);

  // Load PDF Document
  useEffect(() => {
    const loadPdf = async () => {
      const pdfjsLib = await import('pdfjs-dist');
      if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadedPdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      setPdfDoc(loadedPdf);
    };
    loadPdf();
  }, [file]);

  // Render Page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    let isMounted = true;

    const render = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);

        const viewportPoints = page.getViewport({ scale: 1.0 });
        setPageDimensions({ width: viewportPoints.width, height: viewportPoints.height });

        const containerWidth = containerRef.current?.clientWidth || 800;
        const newScale = (containerWidth - 40) / viewportPoints.width;
        setScale(newScale);

        const viewport = page.getViewport({ scale: newScale });
        const canvas = canvasRef.current;

        if (canvas) {
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            const renderContext: any = {
              canvasContext: context,
              viewport: viewport
            };
            await page.render(renderContext).promise;

            if (isMounted) {
               setContainerDimensions({ width: viewport.width, height: viewport.height });
            }
          }
        }
      } catch (error) {
        console.error("Render error:", error);
      }
    };

    render();

    const handleResize = () => render();
    window.addEventListener('resize', handleResize);
    return () => {
       isMounted = false;
       window.removeEventListener('resize', handleResize);
    };
  }, [pdfDoc, pageNumber]);

  const getRndProps = () => {
    if (!cropData || !pageDimensions) return { x: 0, y: 0, width: 0, height: 0 };
    return {
      x: cropData.x * scale,
      y: cropData.y * scale,
      width: cropData.width * scale,
      height: cropData.height * scale
    };
  };

  const handleDragStop = (e: any, d: any) => {
    if (!pageDimensions) return;
    onCropChange({
      x: d.x / scale,
      y: d.y / scale,
      width: cropData?.width || 0,
      height: cropData?.height || 0
    });
  };

  const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    if (!pageDimensions) return;
    onCropChange({
      x: position.x / scale,
      y: position.y / scale,
      width: parseInt(ref.style.width) / scale,
      height: parseInt(ref.style.height) / scale
    });
  };

  if (!pdfDoc) return <div className="p-10 text-center text-muted flex items-center justify-center gap-2"><Icon name="sync" className="animate-spin" /> Loading PDF...</div>;

  const rndProps = getRndProps();

  return (
    <div className="flex flex-col h-full bg-surface/5 relative">
       <div className="flex-1 overflow-auto flex justify-center p-8" ref={containerRef}>
          <div
            className={`relative shadow-2xl bg-white ${!cropData ? 'cursor-crosshair' : ''}`}
            style={{ width: containerDimensions?.width, height: containerDimensions?.height }}
            onClick={() => {
              if (!cropData && pageDimensions) {
                onCropChange({
                  x: 0,
                  y: 0,
                  width: pageDimensions.width,
                  height: pageDimensions.height
                });
              }
            }}
          >
            <canvas ref={canvasRef} className="block pointer-events-none" />

            {!cropData && containerDimensions && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="glass text-foreground px-4 py-2 rounded-xl text-sm font-medium">
                    Click to start cropping
                  </div>
               </div>
            )}

            {cropData && containerDimensions && (
              <>
                {/* Overlays */}
                <div className="absolute top-0 left-0 right-0 bg-black/60 pointer-events-none transition-all duration-75" style={{ height: rndProps.y }} />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 pointer-events-none transition-all duration-75" style={{ top: rndProps.y + rndProps.height }} />
                <div className="absolute left-0 bg-black/60 pointer-events-none transition-all duration-75" style={{ top: rndProps.y, height: rndProps.height, width: rndProps.x }} />
                <div className="absolute right-0 bg-black/60 pointer-events-none transition-all duration-75" style={{ top: rndProps.y, height: rndProps.height, left: rndProps.x + rndProps.width }} />

                <Rnd
                  size={{ width: rndProps.width, height: rndProps.height }}
                  position={{ x: rndProps.x, y: rndProps.y }}
                  onDragStop={handleDragStop}
                  onResizeStop={handleResizeStop}
                  bounds="parent"
                  className="border-2 border-accent bg-transparent cursor-move"
                  resizeHandleClasses={{
                    topLeft: "w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm -translate-x-1/2 -translate-y-1/2 cursor-nw-resize z-50",
                    topRight: "w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm translate-x-1/2 -translate-y-1/2 cursor-ne-resize z-50",
                    bottomLeft: "w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm -translate-x-1/2 translate-y-1/2 cursor-sw-resize z-50",
                    bottomRight: "w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm translate-x-1/2 translate-y-1/2 cursor-se-resize z-50",
                    top: "h-2 bg-transparent cursor-n-resize",
                    bottom: "h-2 bg-transparent cursor-s-resize",
                    left: "w-2 bg-transparent cursor-w-resize",
                    right: "w-2 bg-transparent cursor-e-resize"
                  }}
                  minWidth={20}
                  minHeight={20}
                />
              </>
            )}
          </div>
       </div>

       {cropData && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full shadow-lg text-xs font-mono flex items-center gap-6 z-10 text-foreground">
             <span>X: {Math.round(cropData.x)}</span>
             <span>Y: {Math.round(cropData.y)}</span>
             <span>W: {Math.round(cropData.width)}</span>
             <span>H: {Math.round(cropData.height)}</span>
          </div>
       )}
    </div>
  );
}