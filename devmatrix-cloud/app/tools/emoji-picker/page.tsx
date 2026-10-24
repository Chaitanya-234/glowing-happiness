'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const emojis = ['😀','😃','😄','😁','😆','😅','😂','🤣','🥲','🥹','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🫣','🤭','🫡','🤫','🫠','🤥','😶','🫥','😐','😑','😬','🫨','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','😵‍💫','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️','👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾'];

export default function ToolPage() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(''), 1000);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
         <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">Emoji Picker</h1>

         <input
            type="text"
            placeholder="Search emojis..."
            className="w-full max-w-md mx-auto block bg-purple-900/10 border border-purple-500/20 rounded-full py-3 px-6 text-purple-100 mb-12 focus:outline-none focus:border-purple-500"
            onChange={(e) => setSearch(e.target.value)}
         />

         <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
            {emojis.filter(e => true).map((emoji) => (
                <button
                    key={emoji}
                    onClick={() => copy(emoji)}
                    className="aspect-square flex items-center justify-center text-3xl bg-purple-900/5 hover:bg-purple-900/20 rounded-lg transition-all relative"
                >
                    {emoji}
                    {copied === emoji && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded">Copied!</span>}
                </button>
            ))}
         </div>
      </div>
    </div>
  );
}
