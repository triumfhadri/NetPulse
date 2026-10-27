import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/umd/vis-network.min.js';
import { Focus, ZoomIn, ZoomOut, BarChart2, Hammer, Hexagon, Square, Server, Shield, Cable, Trash2, Save, Upload } from 'lucide-react';

export const NetworkGraph = ({
  nodesData,
  edgesData,
  onSelectNode,
  onContextMenu,
  editMode,
  startAddNode,
  startAddEdge,
  deleteSelectedElement,
  saveTopology,
  loadTopology,
  topTalkers,
  simulateTraffic,
  underAttack
}) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      autoResize: true,
      layout: { randomSeed: 42 },
      physics: {
        forceAtlas2Based: { gravitationalConstant: -80, centralGravity: 0.005, springLength: 150, springConstant: 0.08 },
        maxVelocity: 40,
        solver: 'forceAtlas2Based',
        timestep: 0.3,
        stabilization: { iterations: 200 }
      },
      groups: {
        router: { shape: 'hexagon', color: { background: '#ffffff', border: '#dc2626' }, borderWidth: 2, size: 28, font: { color: '#1e293b', face: 'Inter', bold: true, size: 12 } },
        firewall: { shape: 'box', color: { background: '#ffffff', border: '#f59e0b' }, borderWidth: 2, font: { color: '#1e293b', face: 'Inter', bold: true, size: 12 }, margin: 10 },
        switch: { shape: 'square', color: { background: '#ffffff', border: '#3b82f6' }, borderWidth: 2, size: 22, font: { color: '#1e293b', face: 'Inter', bold: true, size: 12 } },
        server: { shape: 'dot', color: { background: '#ffffff', border: '#8b5cf6' }, borderWidth: 2, size: 20, font: { color: '#1e293b', face: 'Inter', bold: true, size: 11 } },
        database: { shape: 'database', color: { background: '#ffffff', border: '#0ea5e9' }, borderWidth: 2, size: 20, font: { face: 'Inter', size: 11, bold: true } },
        cloud: { shape: 'ellipse', color: { background: '#f8fafc', border: '#94a3b8' }, borderWidth: 2, font: { face: 'Inter', size: 14, bold: true } },
        client: { shape: 'dot', color: { background: '#10b981', border: '#047857' }, borderWidth: 2, size: 12, font: { face: 'Inter', size: 10 } }
      },
      edges: {
        color: { color: '#cbd5e1', highlight: '#94a3b8' },
        width: 2,
        smooth: { type: 'dynamic' },
        font: { size: 9, color: '#64748b', face: 'JetBrains Mono', background: 'white', strokeWidth: 0 }
      },
      interaction: { hover: true, tooltipDelay: 200, zoomSpeed: 0.5 },
      manipulation: { enabled: false }
    };

    const network = new Network(containerRef.current, { nodes: nodesData, edges: edgesData }, options);
    networkRef.current = network;

    network.on("selectNode", (params) => {
      if (params.nodes.length > 0) {
        onSelectNode(params.nodes[0]);
      }
    });

    network.on("oncontext", (params) => {
      params.event.preventDefault();
      const nodeId = network.getNodeAt(params.pointer.DOM);
      if (nodeId) {
        network.selectNodes([nodeId]);
        onSelectNode(nodeId);
        onContextMenu(params.event, nodeId);
      }
    });

    // Packet Simulation Loop on canvas
    let animationFrameId;
    let particles = [];

    const spawnParticle = () => {
      if (!simulateTraffic) return;
      const edgeIds = edgesData.getIds();
      if (edgeIds.length === 0) return;

      const spawnCount = underAttack ? 3 : 1;
      for (let i = 0; i < spawnCount; i++) {
        const randomEdgeId = edgeIds[Math.floor(Math.random() * edgeIds.length)];
        const edgeObj = edgesData.get(randomEdgeId);
        if (!edgeObj) continue;

        particles.push({
          edgeId: randomEdgeId,
          progress: 0,
          speed: 0.015 * (underAttack ? 1.5 : 1),
          color: underAttack ? '#ef4444' : (Math.random() > 0.15 ? '#ef4444' : '#3b82f6'),
          size: (2.5 + Math.random() * 2) * (underAttack ? 1.5 : 1),
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    network.on("afterDrawing", (ctx) => {
      if (!simulateTraffic) return;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const edge = edgesData.get(p.edgeId);
        if (!edge) continue;

        const pos = network.getPositions([edge.from, edge.to]);
        const n1 = pos[edge.from];
        const n2 = pos[edge.to];

        if (n1 && n2) {
          const startX = p.direction === 1 ? n1.x : n2.x;
          const startY = p.direction === 1 ? n1.y : n2.y;
          const endX = p.direction === 1 ? n2.x : n1.x;
          const endY = p.direction === 1 ? n2.y : n1.y;

          const curX = startX + (endX - startX) * p.progress;
          const curY = startY + (endY - startY) * p.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, p.size, 0, 2 * Math.PI);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }
    });

    const animate = () => {
      if (simulateTraffic) {
        if (Math.random() < 0.6) spawnParticle();
        network.redraw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      network.destroy();
    };
  }, []);

  const handleZoomIn = () => networkRef.current?.moveTo({ scale: networkRef.current.getScale() * 1.2 });
  const handleZoomOut = () => networkRef.current?.moveTo({ scale: networkRef.current.getScale() / 1.2 });
  const handleFit = () => networkRef.current?.fit({ animation: true });

  return (
    <div className="flex-1 relative bg-enterprise-bg overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="cyber-grid-container">
        <div className="cyber-grid"></div>
        <div className="cyber-grid-overlay"></div>
      </div>

      {/* Graph Floating Tools */}
      <div className="absolute top-4 left-4 z-20 glass-panel p-1 flex flex-col space-y-1">
        <button onClick={handleFit} className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors" title="Fit Map">
          <Focus className="w-4 h-4" />
        </button>
        <button onClick={handleZoomIn} className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors" title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={handleZoomOut} className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded transition-colors" title="Zoom Out">
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 glass-panel p-3 text-[10px] font-medium text-slate-500 space-y-2">
        <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-sm border-2 border-brand-600 bg-white"></div><span>L3 Core Router</span></div>
        <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-sm border-2 border-blue-500 bg-white"></div><span>L2/L3 Switch</span></div>
        <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full border-2 border-purple-500 bg-white"></div><span>Server / Service</span></div>
        <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full border-2 border-emerald-500 bg-white"></div><span>End Device (Dynamic)</span></div>
      </div>

      {/* Top Talkers Overlay */}
      <div className="absolute top-4 right-4 z-20 glass-panel w-56 overflow-hidden flex flex-col">
        <div className="bg-slate-800 text-white px-3 py-2 text-xs font-bold flex justify-between items-center">
          <span className="flex items-center"><BarChart2 className="w-3.5 h-3.5 mr-1.5 text-brand-400" /> Top Talkers</span>
          <span className="text-[9px] font-mono bg-slate-700 px-1 rounded text-slate-300">LIVE</span>
        </div>
        <div className="p-2 space-y-2">
          {topTalkers.map((t, idx) => (
            <div key={idx} className="flex flex-col mb-1.5">
              <div className="flex justify-between text-[10px] font-medium text-slate-600 mb-0.5">
                <span className="truncate pr-2">{idx + 1}. {t.name}</span>
                <span className="text-brand-600 font-bold">{t.bw} Mbps</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="bg-brand-500 h-full rounded-full transition-all duration-500" style={{ width: `${t.bw}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="w-full h-full outline-none cursor-grab active:cursor-grabbing"></div>

      {/* Builder Toolbox */}
      {editMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 glass-panel px-3 py-2 flex items-center space-x-2 border-brand-200 shadow-lg shadow-brand-500/10">
          <div className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mr-2 pr-2 border-r border-brand-100 flex items-center"><Hammer className="w-3 h-3 mr-1" /> Build Mode</div>
          <button onClick={() => startAddNode('router')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors" title="Add Router"><Hexagon className="w-4 h-4" /></button>
          <button onClick={() => startAddNode('switch')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors" title="Add Switch"><Square className="w-4 h-4" /></button>
          <button onClick={() => startAddNode('server')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors" title="Add Server"><Server className="w-4 h-4" /></button>
          <button onClick={() => startAddNode('firewall')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 transition-colors" title="Add Firewall"><Shield className="w-4 h-4" /></button>
          <div className="w-px h-5 bg-slate-200 mx-1"></div>
          <button onClick={startAddEdge} className="px-2 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded border border-brand-200 flex items-center text-[10px] font-bold transition-colors"><Cable className="w-3.5 h-3.5 mr-1" /> Connect</button>
          <div className="w-px h-5 bg-slate-200 mx-1"></div>
          <button onClick={deleteSelectedElement} className="p-1.5 hover:bg-red-50 rounded text-slate-500 hover:text-red-600 transition-colors" title="Delete Selected"><Trash2 className="w-4 h-4" /></button>
          <button onClick={saveTopology} className="p-1.5 hover:bg-emerald-50 rounded text-slate-500 hover:text-emerald-600 transition-colors" title="Save Layout"><Save className="w-4 h-4" /></button>
          <button onClick={loadTopology} className="p-1.5 hover:bg-blue-50 rounded text-slate-500 hover:text-blue-600 transition-colors" title="Load Layout"><Upload className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  );
};