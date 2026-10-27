import React, { useState, useEffect } from 'react';
import { Cpu, Database, Activity, Radio, MapPin, Clock, X, Link, Shield } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

ChartJS.defaults.color = '#94a3b8';
ChartJS.defaults.font.family = "'JetBrains Mono', monospace";
ChartJS.defaults.font.size = 9;

export const Sidebar = ({ selectedNode, onClose, logs }) => {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [cpuVal, setCpuVal] = useState(0);
  const [ramVal, setRamVal] = useState(0);
  const [throughputData, setThroughputData] = useState({
    labels: Array(20).fill(''),
    datasets: [
      { label: 'Rx', data: Array(20).fill(0), borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderWidth: 1.5, fill: true, tension: 0.3, pointRadius: 0 },
      { label: 'Tx', data: Array(20).fill(0), borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderWidth: 1.5, fill: true, tension: 0.3, pointRadius: 0 }
    ]
  });
  const [latencyData, setLatencyData] = useState({
    labels: Array(20).fill(''),
    datasets: [{ label: 'ms', data: Array(20).fill(0), borderColor: '#a855f7', borderWidth: 2, tension: 0.2, pointRadius: 0 }]
  });

  useEffect(() => {
    if (!selectedNode) return;
    const interval = setInterval(() => {
      const nc = Math.min(100, Math.max(0, selectedNode.baseCpu + (Math.random() * 20 - 10)));
      const nr = Math.min(100, Math.max(0, selectedNode.baseRam + (Math.random() * 4 - 2)));
      setCpuVal(nc);
      setRamVal(nr);

      const rx = Math.random() * 80;
      const tx = rx * 1.1;

      setThroughputData(prev => ({
        ...prev,
        datasets: [
          { ...prev.datasets[0], data: [...prev.datasets[0].data.slice(1), rx] },
          { ...prev.datasets[1], data: [...prev.datasets[1].data.slice(1), tx] }
        ]
      }));

      const lat = selectedNode.baseLat + Math.random();
      setLatencyData(prev => ({
        ...prev,
        datasets: [{ ...prev.datasets[0], data: [...prev.datasets[0].data.slice(1), lat] }]
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedNode]);

  return (
    <aside className="w-[420px] border-l border-slate-200 bg-white flex flex-col shrink-0 shadow-[-10px_0_20px_-5px_rgba(0,0,0,0.02)] z-20 relative">
      {!selectedNode && (
        <div className="absolute inset-0 z-30 bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-brand-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 text-brand-500">
              <Cpu className="w-10 h-10" />
            </div>
          </div>
          <h3 className="font-bold text-slate-800 text-lg mb-2">Awaiting Selection</h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[250px]">Select a network element from the topology map to deep-dive into real-time telemetry and routing tables.</p>
        </div>
      )}

      {selectedNode && (
        <>
          <div className="p-4 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 border border-brand-200">{selectedNode.group}</span>
                <span className="flex items-center space-x-1 text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>ONLINE</span>
                </span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">{selectedNode.label}</h2>
            <div className="flex items-center space-x-3 mt-1 text-[11px] font-mono text-slate-500">
              <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {selectedNode.ip}</span>
              <span>|</span>
              <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Uptime: 45d 12h</span>
            </div>
          </div>

          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button onClick={() => setActiveTab('telemetry')} className={`tab-btn flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors ${activeTab === 'telemetry' ? 'active' : ''}`}>Telemetry</button>
            <button onClick={() => setActiveTab('interfaces')} className={`tab-btn flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors ${activeTab === 'interfaces' ? 'active' : ''}`}>Interfaces</button>
            <button onClick={() => setActiveTab('events')} className={`tab-btn flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 transition-colors ${activeTab === 'events' ? 'active' : ''}`}>
              Logs <span className="ml-1 bg-brand-500 text-white px-1.5 rounded-full text-[9px]">{logs.length}</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-50/30 p-4 relative">
            {activeTab === 'telemetry' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-panel p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">CPU Load</p>
                    <div className="flex items-end justify-between">
                      <span className="text-lg font-bold font-mono text-slate-800">{Math.round(cpuVal)}%</span>
                      <Cpu className="w-4 h-4 text-brand-500 opacity-50" />
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full transition-all duration-500" style={{ width: `${cpuVal}%` }}></div>
                    </div>
                  </div>
                  <div className="glass-panel p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Memory</p>
                    <div className="flex items-end justify-between">
                      <span className="text-lg font-bold font-mono text-slate-800">{(ramVal * 0.32).toFixed(1)} GB</span>
                      <Database className="w-4 h-4 text-blue-500 opacity-50" />
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${ramVal}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-3">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-slate-700 flex items-center"><Activity className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Active Throughput</h3>
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 rounded border border-slate-200">Gbps</span>
                  </div>
                  <div className="h-32 w-full relative">
                    <Line data={throughputData} options={{ responsive: true, maintainAspectRatio: false, scales: { x: { display: false }, y: { min: 0, max: 100 } }, plugins: { legend: { display: false } }, animation: false }} />
                  </div>
                </div>
                
                <div className="glass-panel p-3">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-slate-700 flex items-center"><Radio className="w-3.5 h-3.5 mr-1.5 text-purple-500" /> Packet Latency (ms)</h3>
                  </div>
                  <div className="h-24 w-full relative">
                    <Line data={latencyData} options={{ responsive: true, maintainAspectRatio: false, scales: { x: { display: false }, y: { min: 0, suggestedMax: 20 } }, plugins: { legend: { display: false } }, animation: false }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interfaces' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-xs font-bold text-slate-700">Physical & Logical Ports</span>
                  <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">802.1Q</span>
                </div>
                <div className="space-y-2">
                  {selectedNode.interfaces.map((int, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs font-mono shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Link className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-bold text-slate-700">{int}</span>
                      </div>
                      <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-bold border border-emerald-100">UP</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="absolute inset-0 bg-white flex flex-col">
                <div className="bg-slate-800 px-3 py-2 flex justify-between items-center shrink-0">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Syslog Buffer</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 text-[11px] font-mono bg-slate-900 text-slate-300 dark-scroll">
                  {logs.map((l, i) => (
                    <div key={i}>
                      <span className="text-slate-500">[{l.time}]</span> <span className="text-brand-300">{l.source}:</span> {l.msg}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
};