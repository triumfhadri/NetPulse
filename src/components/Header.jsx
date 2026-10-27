import React from 'react';
import { Network, Activity, Radar, Zap, ShieldAlert, PenTool, Filter, ChevronDown, Settings } from 'lucide-react';

export const Header = ({
  simulateTraffic,
  toggleTraffic,
  discoveryActive,
  toggleDiscoveryEngine,
  simulateNetworkEvent,
  simulateDDoS,
  underAttack,
  toggleEditMode,
  editMode,
  filterTopology,
  activeFilterText,
  nodeCount,
  edgeCount,
  globalLoad
}) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 z-30 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
      {/* Branding */}
      <div className="flex items-center space-x-3 w-1/4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-200 relative overflow-hidden">
          <Network className="w-4 h-4 relative z-10" />
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
        <div>
          <h1 className="font-bold text-[15px] tracking-tight leading-tight">NetPulse AIOps</h1>
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Enterprise React Core</p>
        </div>
      </div>

      {/* Toolbar / Engine Controls */}
      <div className="flex-1 flex justify-center items-center space-x-2">
        <div className="bg-slate-50 p-1 rounded-md border border-slate-200 flex space-x-1 shadow-inner">
          <button
            onClick={toggleTraffic}
            className={`px-3 py-1.5 rounded shadow-sm flex items-center space-x-1.5 font-semibold text-xs transition-all ${
              simulateTraffic
                ? 'text-brand-700 bg-brand-100 border border-brand-200 hover:bg-brand-200'
                : 'text-slate-500 bg-white border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Packet Sim: {simulateTraffic ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={toggleDiscoveryEngine}
            className={`px-3 py-1.5 rounded flex items-center space-x-1.5 font-medium text-xs transition-all border ${
              discoveryActive
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-slate-600 border-transparent hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200'
            }`}
          >
            <Radar className={`w-3.5 h-3.5 ${discoveryActive ? 'animate-spin text-emerald-500' : ''}`} />
            <span>Auto-Discovery: {discoveryActive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={simulateNetworkEvent}
            className="px-3 py-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded flex items-center space-x-1.5 font-medium text-xs transition-all border border-transparent hover:border-amber-200"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Inject Event</span>
          </button>

          <button
            onClick={simulateDDoS}
            className={`px-3 py-1.5 rounded flex items-center space-x-1.5 font-medium text-xs transition-all border ${
              underAttack
                ? 'bg-red-100 text-red-700 border-red-300 animate-pulse'
                : 'text-slate-600 border-transparent hover:text-red-700 hover:bg-red-50 hover:border-red-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{underAttack ? 'ATTACK ACTIVE' : 'Simulate Attack'}</span>
          </button>

          <div className="w-px h-5 bg-slate-200 mx-1"></div>

          <button
            onClick={toggleEditMode}
            className={`px-3 py-1.5 rounded flex items-center space-x-1.5 font-medium text-xs transition-all border ${
              editMode
                ? 'bg-brand-600 text-white border-brand-700 shadow-sm'
                : 'text-slate-600 border-transparent hover:text-brand-700 hover:bg-brand-50 hover:border-brand-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Topology Builder</span>
          </button>
        </div>

        {/* Filter Dropdown */}
        <div className="relative group ml-2">
          <button className="px-3 py-1.5 bg-white text-slate-600 rounded flex items-center space-x-1.5 font-medium text-xs border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-3.5 h-3.5" />
            <span>{activeFilterText}</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>
          <div className="absolute top-full mt-1 left-0 w-40 bg-white border border-slate-200 shadow-xl rounded-md py-1 hidden group-hover:block z-50">
            <button onClick={() => filterTopology('all', 'All Devices')} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700">All Devices</button>
            <button onClick={() => filterTopology('router', 'Routers Only')} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700">Routers Only</button>
            <button onClick={() => filterTopology('switch', 'Switches Only')} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700">Switches Only</button>
            <button onClick={() => filterTopology('server', 'Servers & DC')} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700">Servers & DC</button>
            <button onClick={() => filterTopology('firewall', 'Security Edge')} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-brand-50 hover:text-brand-700">Security Edge</button>
          </div>
        </div>
      </div>

      {/* Global Telemetry */}
      <div className="w-1/4 flex justify-end items-center space-x-4">
        <div className="hidden lg:flex items-center space-x-4 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase">Active Nodes</span>
            <span className="text-xs font-bold font-mono text-slate-700 leading-none">{nodeCount}</span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase">Total Edges</span>
            <span className="text-xs font-bold font-mono text-slate-700 leading-none">{edgeCount}</span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase">Net Load</span>
            <span className="text-xs font-bold font-mono text-brand-600 leading-none">{globalLoad}</span>
          </div>
        </div>
        
        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 hover:bg-slate-200 cursor-pointer transition-colors" title="Settings">
          <Settings className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};