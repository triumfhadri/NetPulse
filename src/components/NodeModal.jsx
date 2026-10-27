import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';

export const NodeModal = ({ isOpen, nodeType, onConfirm, onCancel }) => {
  const [nodeName, setNodeName] = useState('Device-New');
  const [nodeIp, setNodeIp] = useState('10.99.1.50');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-80 overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm flex items-center"><Settings2 className="w-4 h-4 mr-2 text-brand-600" /> Configure {nodeType}</h3>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Device Name</label>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">IP Address</label>
            <input
              type="text"
              value={nodeIp}
              onChange={(e) => setNodeIp(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
          <button onClick={onCancel} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded transition-colors">Cancel</button>
          <button onClick={() => onConfirm(nodeName, nodeIp)} className="px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded shadow transition-colors">Deploy Device</button>
        </div>
      </div>
    </div>
  );
};