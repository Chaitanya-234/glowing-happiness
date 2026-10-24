'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, Trophy, Scale, Swords, Zap, Flame } from 'lucide-react';

interface DebateTurn {
  speaker: 'A' | 'B';
  text: string;
  topic?: string;
}

interface Persona {
  name: string;
  role: string;
  color: string;
  avatar?: string;
}

interface DebateComparisonProps {
  title: string;
  description: string;
  personaA: Persona;
  personaB: Persona;
  intro: string;
  turns: DebateTurn[];
  conclusion: string;
  winner?: string;
}

export default function DebateComparison({
  title,
  description,
  personaA,
  personaB,
  intro,
  turns,
  conclusion,
  winner,
}: DebateComparisonProps) {

  const getColorClasses = (color: string) => {
    const map: Record<string, any> = {
        blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/50', glow: 'shadow-blue-500/50', gradient: 'from-blue-600 to-cyan-600', aura: 'bg-blue-600/10' },
        green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/50', glow: 'shadow-green-500/50', gradient: 'from-green-600 to-emerald-600', aura: 'bg-green-600/10' },
        red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/50', glow: 'shadow-red-500/50', gradient: 'from-red-600 to-orange-600', aura: 'bg-red-600/10' },
        purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/50', glow: 'shadow-purple-500/50', gradient: 'from-purple-600 to-pink-600', aura: 'bg-purple-600/10' },
        yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', glow: 'shadow-yellow-500/50', gradient: 'from-yellow-600 to-orange-600', aura: 'bg-yellow-600/10' },
        cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/50', glow: 'shadow-cyan-500/50', gradient: 'from-cyan-600 to-blue-600', aura: 'bg-cyan-600/10' },
        orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/50', glow: 'shadow-orange-500/50', gradient: 'from-orange-600 to-red-600', aura: 'bg-orange-600/10' },
        pink: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/50', glow: 'shadow-pink-500/50', gradient: 'from-pink-600 to-purple-600', aura: 'bg-pink-600/10' },
        indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/50', glow: 'shadow-indigo-500/50', gradient: 'from-indigo-600 to-violet-600', aura: 'bg-indigo-600/10' },
        teal: { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/50', glow: 'shadow-teal-500/50', gradient: 'from-teal-600 to-green-600', aura: 'bg-teal-600/10' },
    };
    return map[color] || map['blue'];
  };

  const styleA = getColorClasses(personaA.color);
  const styleB = getColorClasses(personaB.color);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-purple-500/30">
        {/* Anime Background Grid */}
        <div className="fixed inset-0 pointer-events-none opacity-20"
             style={{
                 backgroundImage: 'radial-gradient(circle at 50% 50%, #2a2a2a 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
             }}
        />

        {/* Ambient Glows */}
        <div className={`fixed top-0 left-0 w-[500px] h-[500px] ${styleA.aura} blur-[120px] rounded-full pointer-events-none`} />
        <div className={`fixed bottom-0 right-0 w-[500px] h-[500px] ${styleB.aura} blur-[120px] rounded-full pointer-events-none`} />

        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 pt-24 pb-24 space-y-20">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center space-y-6"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-4 backdrop-blur-sm">
                    <Swords className="w-4 h-4" />
                    <span className="uppercase tracking-widest text-xs font-bold">Tech Showdown</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-2xl">
                    {title}
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                    {description}
                </p>
            </motion.div>

            {/* Battle Arena */}
            <div className="relative">
                {/* VS Badge */}
                <motion.div
                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center"
                >
                    <div className="w-24 h-24 bg-black border-4 border-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-xl">
                        <span className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-600">VS</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 relative">
                    {/* Fighter A */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
                        className={`group relative p-8 rounded-3xl border-2 ${styleA.border} ${styleA.bg} backdrop-blur-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${styleA.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-24 h-24 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${styleA.gradient} shadow-lg ${styleA.glow}`}>
                                <User className="w-12 h-12 text-white" />
                            </div>
                            <h3 className={`text-3xl font-black uppercase italic mb-2 ${styleA.text}`}>{personaA.name}</h3>
                            <div className="px-3 py-1 bg-black/40 rounded-lg border border-white/10">
                                <span className="text-sm text-gray-300 font-mono tracking-wider">{personaA.role}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Fighter B */}
                    <motion.div
                         initial={{ x: 100, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
                         className={`group relative p-8 rounded-3xl border-2 ${styleB.border} ${styleB.bg} backdrop-blur-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${styleB.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-24 h-24 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${styleB.gradient} shadow-lg ${styleB.glow}`}>
                                <User className="w-12 h-12 text-white" />
                            </div>
                            <h3 className={`text-3xl font-black uppercase italic mb-2 ${styleB.text}`}>{personaB.name}</h3>
                            <div className="px-3 py-1 bg-black/40 rounded-lg border border-white/10">
                                <span className="text-sm text-gray-300 font-mono tracking-wider">{personaB.role}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Intro Quote */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="max-w-3xl mx-auto text-center"
            >
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl relative">
                    <div className="absolute top-0 left-0 -mt-3 -ml-3 text-6xl text-purple-500/20 font-serif">"</div>
                    <p className="text-xl text-gray-300 italic font-light leading-relaxed relative z-10">
                        {intro}
                    </p>
                    <div className="absolute bottom-0 right-0 -mb-3 -mr-3 text-6xl text-purple-500/20 font-serif rotate-180">"</div>
                </div>
            </motion.div>

            {/* Debate Stream */}
            <div className="relative space-y-12 py-12">
                {/* Center Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent -translate-x-1/2 hidden md:block" />

                {turns.map((turn, index) => {
                    const isA = turn.speaker === 'A';
                    const style = isA ? styleA : styleB;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isA ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className={`flex ${isA ? 'md:justify-start' : 'md:justify-end'} relative group`}
                        >
                            <div className={`md:w-[45%] flex gap-4 ${isA ? 'flex-row' : 'flex-row-reverse'}`}>
                                {/* Avatar Bubble */}
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-zinc-900 border-2 ${style.border} shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10`}>
                                     <span className={`font-black ${style.text}`}>{isA ? 'A' : 'B'}</span>
                                </div>

                                {/* Dialogue Box */}
                                <div className={`flex-1 relative`}>
                                     <div className={`
                                        p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-xl backdrop-blur-md relative overflow-hidden
                                        ${isA ? 'rounded-tl-none' : 'rounded-tr-none'}
                                        hover:border-${isA ? personaA.color : personaB.color}-500/30 transition-colors duration-300
                                     `}>
                                         {/* Topic Tag */}
                                         {turn.topic && (
                                             <div className="flex items-center gap-2 mb-3">
                                                 <Zap className={`w-3 h-3 ${style.text}`} />
                                                 <span className={`text-xs font-bold uppercase tracking-widest ${style.text} opacity-80`}>
                                                     {turn.topic}
                                                 </span>
                                             </div>
                                         )}

                                         <p className="text-gray-300 leading-relaxed text-lg">
                                             {turn.text}
                                         </p>
                                     </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Verdict */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
                <div className="bg-black/80 border border-zinc-800 p-8 md:p-12 rounded-3xl text-center space-y-8 backdrop-blur-xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-2 ring-4 ring-purple-500/10">
                        <Scale className="w-8 h-8 text-purple-400" />
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">The Final Verdict</h2>
                        <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full mb-8" />
                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                            {conclusion}
                        </p>
                    </div>

                    {winner && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-block"
                        >
                            <div className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl">
                                 <Trophy className="w-6 h-6 text-yellow-500" />
                                 <span className="text-xl font-bold text-yellow-400">{winner}</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: title,
                    description: description,
                    articleBody: turns.map(t => `${t.speaker === 'A' ? personaA.name : personaB.name}: ${t.text}`).join('\n'),
                    author: {
                        '@type': 'Organization',
                        name: 'DevMetrix'
                    }
                })
                }}
            />
        </div>
    </div>
  );
}
