'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { Server, Database, Globe, Zap, AlertTriangle, Activity, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface ServiceNode {
  id: string;
  type: 'frontend' | 'backend' | 'database' | 'cache';
  x: number;
  y: number;
  health: number;
  load: number;
  connections: string[]; // IDs of services this node sends data TO
}

interface Packet {
  id: string;
  fromId: string;
  toId: string;
  progress: number; // 0 to 1
  status: 'ok' | 'fail';
}

const MicroserviceManager = () => {
  const [nodes, setNodes] = useState<ServiceNode[]>([
    { id: 'web-1', type: 'frontend', x: 50, y: 200, health: 100, load: 0, connections: ['api-1'] },
    { id: 'api-1', type: 'backend', x: 300, y: 150, health: 100, load: 0, connections: ['db-1'] },
    { id: 'db-1', type: 'database', x: 550, y: 200, health: 100, load: 0, connections: [] },
  ]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [money, setMoney] = useState(2000);
  const [rps, setRps] = useState(10);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [tutorialMode, setTutorialMode] = useState(true);

  // Game Loop
  useEffect(() => {
    if (gameOver || tutorialMode) return;

    const interval = setInterval(() => {
      // 1. Generate Traffic (Packets from Frontend)
      const newPackets: Packet[] = [];
      nodes.filter(n => n.type === 'frontend').forEach(fe => {
          if (Math.random() < rps / 100) { // Probability based on RPS
             fe.connections.forEach(targetId => {
                 newPackets.push({
                     id: Math.random().toString(36),
                     fromId: fe.id,
                     toId: targetId,
                     progress: 0,
                     status: 'ok'
                 });
             });
             // Frontend load increase
             updateNodeLoad(fe.id, 5);
          }
      });

      // 2. Move Packets
      setPackets(prev => {
          const nextPackets = [...prev, ...newPackets].map(p => ({
              ...p,
              progress: p.progress + 0.05 // Speed
          })).filter(p => {
              if (p.progress >= 1) {
                  // Packet arrived
                  handlePacketArrival(p);
                  return false;
              }
              return true;
          });
          return nextPackets;
      });

      // 3. Node Logic (Recovery, Cost, Failures)
      setNodes(prev => prev.map(n => {
          // Recovery
          let newLoad = Math.max(0, n.load - 2);
          let newHealth = n.health;

          // Overload damage
          if (n.load > 80) newHealth -= 1;
          if (n.load > 95) newHealth -= 5;
          if (newHealth <= 0) newHealth = 0; // Service Dead

          return { ...n, load: newLoad, health: newHealth };
      }));

      // 4. Money & Score
      setMoney(m => m - nodes.length * 0.5); // Maintenance cost
      setScore(s => s + Math.floor(rps / 10));

      // 5. Difficulty Ramp
      if (Math.random() > 0.99) setRps(r => r + 5);

    }, 50);

    return () => clearInterval(interval);
  }, [nodes, gameOver, rps, tutorialMode]);

  const handlePacketArrival = (p: Packet) => {
      const target = nodes.find(n => n.id === p.toId);
      if (!target || target.health <= 0) {
          // Packet failed (Service down)
          setScore(s => Math.max(0, s - 10));
          return;
      }

      // Success processing
      updateNodeLoad(target.id, 5); // Add load to target

      // Propagate (Backend -> DB)
      target.connections.forEach(nextId => {
           setPackets(prev => [...prev, {
               id: Math.random().toString(),
               fromId: target.id,
               toId: nextId,
               progress: 0,
               status: 'ok'
           }]);
      });
  };

  const updateNodeLoad = (id: string, amount: number) => {
      setNodes(prev => prev.map(n => n.id === id ? { ...n, load: Math.min(100, n.load + amount) } : n));
  };

  const addService = (type: ServiceNode['type']) => {
      const cost = type === 'database' ? 500 : 200;
      if (money < cost) return;
      setMoney(m => m - cost);

      const id = `${type}-${Math.random().toString(36).substr(2, 4)}`;
      const newNode: ServiceNode = {
          id,
          type,
          x: 100 + Math.random() * 400,
          y: 100 + Math.random() * 200,
          health: 100,
          load: 0,
          connections: []
      };
      setNodes(prev => [...prev, newNode]);
  };

  const connectServices = (fromId: string, toId: string) => {
      if (fromId === toId) return;
      setNodes(prev => prev.map(n => {
          if (n.id === fromId && !n.connections.includes(toId)) {
              return { ...n, connections: [...n.connections, toId] };
          }
          return n;
      }));
  };

  const removeService = (id: string) => {
      setNodes(prev => prev.filter(n => n.id !== id));
      // Remove connections to this node
      setNodes(prev => prev.map(n => ({
          ...n,
          connections: n.connections.filter(cId => cId !== id)
      })));
  };

  // Dragging Logic
  const updateNodePos = (id: string, x: number, y: number) => {
      setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  };

  return (
    <div className="flex flex-col h-[85vh] w-full max-w-7xl mx-auto p-4 gap-4 select-none">
      {/* HUD */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center shadow-xl">
          <div className="flex gap-6">
              <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase font-bold">Budget</span>
                  <span className={`text-2xl font-mono font-bold ${money < 500 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>${Math.floor(money)}</span>
              </div>
              <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase font-bold">Traffic (RPS)</span>
                  <span className="text-2xl font-mono font-bold text-blue-400">{rps}</span>
              </div>
               <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase font-bold">Score</span>
                  <span className="text-2xl font-mono font-bold text-yellow-400">{score}</span>
              </div>
          </div>

          <div className="flex gap-2">
               <button onClick={() => addService('frontend')} className="px-3 py-2 bg-purple-900/50 border border-purple-500/50 rounded hover:bg-purple-900 text-purple-200 text-xs font-bold flex flex-col items-center">
                   <Globe size={16} /> + Frontend ($200)
               </button>
               <button onClick={() => addService('backend')} className="px-3 py-2 bg-blue-900/50 border border-blue-500/50 rounded hover:bg-blue-900 text-blue-200 text-xs font-bold flex flex-col items-center">
                   <Server size={16} /> + Backend ($200)
               </button>
               <button onClick={() => addService('database')} className="px-3 py-2 bg-orange-900/50 border border-orange-500/50 rounded hover:bg-orange-900 text-orange-200 text-xs font-bold flex flex-col items-center">
                   <Database size={16} /> + DB ($500)
               </button>
          </div>
      </div>

      {/* Game Canvas */}
      <div className="flex-1 bg-gray-950 rounded-xl border border-gray-800 relative overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
        {/* Connection Lines Layer (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Defs for gradients/markers */}
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
                </marker>
            </defs>

            {/* Lines */}
            {nodes.map(node => node.connections.map(targetId => {
                const target = nodes.find(n => n.id === targetId);
                if (!target) return null;
                return (
                    <line
                        key={`${node.id}-${targetId}`}
                        x1={node.x + 80} // Center of node width (approx 160px)
                        y1={node.y + 40} // Center of node height
                        x2={target.x + 80}
                        y2={target.y + 40}
                        stroke="#374151"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                    />
                );
            }))}

            {/* Packets */}
            {packets.map(p => {
                const start = nodes.find(n => n.id === p.fromId);
                const end = nodes.find(n => n.id === p.toId);
                if (!start || !end) return null;

                const startX = start.x + 80;
                const startY = start.y + 40;
                const endX = end.x + 80;
                const endY = end.y + 40;

                const curX = startX + (endX - startX) * p.progress;
                const curY = startY + (endY - startY) * p.progress;

                return (
                    <circle key={p.id} cx={curX} cy={curY} r="4" fill={p.status === 'ok' ? '#60a5fa' : '#ef4444'} />
                );
            })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
            <Rnd
                key={node.id}
                size={{ width: 160, height: 100 }}
                position={{ x: node.x, y: node.y }}
                onDragStop={(e, d) => updateNodePos(node.id, d.x, d.y)}
                bounds="parent"
                className={`z-10 bg-gray-900 border-2 rounded-lg p-2 shadow-2xl flex flex-col justify-between ${
                    node.health <= 0 ? 'border-red-600 opacity-50' :
                    node.load > 80 ? 'border-yellow-500' : 'border-gray-700'
                }`}
            >
                {/* Node Header */}
                <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                    <span className="uppercase">{node.type}</span>
                    <button onClick={() => removeService(node.id)} className="hover:text-red-500">
                        <X size={12} />
                    </button>
                </div>

                {/* Node Body */}
                <div className="flex flex-col items-center gap-1">
                    {node.type === 'frontend' && <Globe className="text-purple-400" />}
                    {node.type === 'backend' && <Server className="text-blue-400" />}
                    {node.type === 'database' && <Database className="text-orange-400" />}
                    <span className="text-white font-mono text-xs">{node.id}</span>
                </div>

                {/* Node Footer / Stats */}
                <div className="space-y-1">
                     {/* Load Bar */}
                     <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                         <div
                            className={`h-full transition-all duration-300 ${node.load > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${node.load}%` }}
                        />
                     </div>
                     {/* Health Bar (if damaged) */}
                     {node.health < 100 && (
                         <div className="h-1 bg-red-900/50 rounded-full overflow-hidden">
                             <div className="h-full bg-red-500 transition-all" style={{ width: `${node.health}%` }} />
                         </div>
                     )}
                </div>

                {/* Connect Handler (Right side) */}
                <div
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-700 hover:bg-neonBlue rounded-full flex items-center justify-center cursor-crosshair border-2 border-gray-900"
                    title="Drag ID to another node to connect (Not implemented drag-connect yet, click + ID)"
                    onClick={() => {
                        const targetId = prompt('Connect to ID:');
                        if(targetId) connectServices(node.id, targetId);
                    }}
                >
                    <Zap size={12} className="text-white" />
                </div>
            </Rnd>
        ))}

        {tutorialMode && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-8 rounded-2xl max-w-md text-center border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">Architecture Simulator</h2>
                    <ul className="text-left text-gray-400 space-y-2 mb-6 text-sm">
                        <li className="flex gap-2"><Globe size={16} /> <strong>Frontend</strong> generates traffic.</li>
                        <li className="flex gap-2"><Server size={16} /> <strong>Backend</strong> processes requests.</li>
                        <li className="flex gap-2"><Database size={16} /> <strong>Database</strong> stores data.</li>
                        <li className="flex gap-2"><AlertTriangle size={16} /> <strong>Load</strong> damages health. Add more nodes to balance load!</li>
                    </ul>
                    <p className="text-xs text-gray-500 mb-6">
                        Click the <Zap size={12} className="inline"/> icon on a node, then type the ID of the target node to connect them. (e.g. web-1 -&gt; api-1)
                    </p>
                    <button
                        onClick={() => setTutorialMode(false)}
                        className="w-full bg-neonBlue text-black font-bold py-3 rounded-lg hover:bg-blue-400"
                    >
                        Start Simulation
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MicroserviceManager;
