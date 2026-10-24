// app/tools/qr-code-generator/QrCodeGeneratorClient.tsx
'use client';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';

export default function QrCodeGeneratorClient() {
  const [value, setValue] = useState('https://devmetrix.in');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        QR Code Generator
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Generate custom QR codes for your links and text instantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Content</label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-32 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none resize-none placeholder-purple-300/20"
              placeholder="Enter text or URL here"
            />
          </div>

          <div>
             <label className="block text-purple-200/60 mb-2 font-semibold">Size ({size}px)</label>
             <input
                type="range"
                min="128"
                max="512"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-purple-500"
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-purple-200/60 mb-2 font-semibold">Foreground Color</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10 w-10 bg-transparent border-0 cursor-pointer"
                    />
                    <span className="text-purple-200/40 text-sm">{fgColor}</span>
                </div>
             </div>
             <div>
                <label className="block text-purple-200/60 mb-2 font-semibold">Background Color</label>
                 <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-10 bg-transparent border-0 cursor-pointer"
                    />
                    <span className="text-purple-200/40 text-sm">{bgColor}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-purple-900/10 rounded-xl border border-purple-500/20">
          <div ref={canvasRef} className="bg-white p-4 rounded-lg shadow-lg">
             <QRCodeCanvas
                value={value}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level={"H"}
                includeMargin={true}
             />
          </div>
          <button
            onClick={downloadQR}
            className="mt-6 px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold flex items-center gap-2"
          >
            <span>Download PNG</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
