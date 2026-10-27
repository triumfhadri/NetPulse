import React from 'react';
import { Terminal, Activity, FileCode, Power } from 'lucide-react';

export const ContextMenu = ({ x, y, nodeLabel, onAction, onClose }) => {
  return (
    <div
      style={{ top: y, left: x }}
      className="fixed z-[100] bg-white border border-slate-200 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.15)] rounded-lg py-1 w-48 text-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 truncate">
        {nodeLabel}
      </div>
      <button onClick={() => { onAction('ssh'); onClose(); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center text-xs text-slate-700 font-medium transition-colors">
        <Terminal className="w-3.5 h-3.5 mr-2 text-slate-400" /> SSH / Console
      </button>
      <button onClick={() => { onAction('ping'); onClose(); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center text-xs text-slate-700 font-medium transition-colors">
        <Activity className="w-3.5 h-3.5 mr-2 text-slate-400" /> Ping Target
      </button>
      <button onClick={() => { onAction('config'); onClose(); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center text-xs text-slate-700 font-medium transition-colors">
        <FileCode className="w-3.5 h-3.5 mr-2 text-slate-400" /> View Config
      </button>
      <div className="h-px bg-slate-100 my-1"></div>
      <button onClick={() => { onAction('reboot'); onClose(); }} className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center text-xs font-medium transition-colors">
        <Power className="w-3.5 h-3.5 mr-2" /> Power Cycle
      </button>
    </div>
  );
};