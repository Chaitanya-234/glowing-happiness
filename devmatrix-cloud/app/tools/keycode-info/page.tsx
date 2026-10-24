'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


export default function ToolPage() {

  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setEvent({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        which: e.which,
        location: e.location,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        metaKey: e.metaKey
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 via-purple-100/60 to-purple-200/80">
            Keycode Info
          </h1>
          <p className="text-lg text-purple-200/50 max-w-2xl mx-auto">
            Press any key to get its JavaScript key code, event code, and other keyboard event properties.
          </p>
        </motion.div>

        <div className="bg-purple-900/5 border border-purple-500/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">

          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
            {!event ? (
              <div className="text-2xl text-purple-200/40 animate-pulse">Press any key on your keyboard...</div>
            ) : (
              <>
                <div className="text-9xl font-bold text-purple-100 mb-8">{event.keyCode}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                  <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-xs text-purple-300/60 mb-1">event.key</div>
                    <div className="text-xl text-purple-100 font-mono">{event.key === ' ' ? '(Space)' : event.key}</div>
                  </div>
                  <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-xs text-purple-300/60 mb-1">event.code</div>
                    <div className="text-xl text-purple-100 font-mono">{event.code}</div>
                  </div>
                  <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-xs text-purple-300/60 mb-1">event.which</div>
                    <div className="text-xl text-purple-100 font-mono">{event.which}</div>
                  </div>
                  <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-xs text-purple-300/60 mb-1">Modifiers</div>
                    <div className="text-sm text-purple-100 font-mono flex gap-2">
                       {event.ctrlKey && <span className="bg-purple-500/30 px-1 rounded">CTRL</span>}
                       {event.shiftKey && <span className="bg-purple-500/30 px-1 rounded">SHIFT</span>}
                       {event.altKey && <span className="bg-purple-500/30 px-1 rounded">ALT</span>}
                       {event.metaKey && <span className="bg-purple-500/30 px-1 rounded">META</span>}
                       {!event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey && <span className="text-purple-200/30">None</span>}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert prose-purple max-w-none">
          <h2 className="text-2xl font-bold text-purple-100/70 mb-4">About Keycode Info</h2>
          <p className="text-purple-200/50">
            The Keycode Info is a free online utility designed for developers, designers, and digital professionals.
            It allows you to press any key to get its javascript key code, event code, and other keyboard event properties. quickly and efficiently directly in your browser without installing any software.
          </p>
          <h3 className="text-xl font-bold text-purple-100/70 mt-6 mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-purple-200/50">
             <li>Event.key</li>
<li>Event.code</li>
<li>Event.which</li>
<li>Visual Display</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
