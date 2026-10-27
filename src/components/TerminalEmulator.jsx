import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export const TerminalEmulator = ({ connectedNode, logMessage }) => {
  const [output, setOutput] = useState([
    { text: "Cisco IOS Software, Catalyst L3 Switch Software, Version 17.03.04", color: "text-brand-400 font-bold" },
    { text: "Copyright (c) 1986-2026 by Cisco Systems, Inc.", color: "text-slate-400 mb-2" },
    { text: "Connection established. Type '?' or 'help' for commands.", color: "text-emerald-400 mb-4" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const outputEndRef = useRef(null);

  const promptText = connectedNode ? `${connectedNode.label}>` : "NetPulse>";

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      if (!cmd) return;

      const newOutput = [...output, { text: `${promptText} ${cmd}`, color: "text-white font-bold mt-1" }];
      
      const parts = cmd.toLowerCase().split(' ');
      const action = parts[0];

      if (action === 'help' || action === '?') {
        newOutput.push({ text: "Commands: enable, show version, show ip route, ping [ip], traceroute [ip], clear", color: "text-slate-300" });
      } else if (action === 'clear') {
        setOutput([]);
        setInputVal('');
        return;
      } else if (action === 'ping') {
        newOutput.push({ text: `Sending 5 ICMP echoes to ${parts[1] || '8.8.8.8'}... Success rate 100%`, color: "text-emerald-300" });
        logMessage(connectedNode ? connectedNode.label : "CLI", `Ping executed to ${parts[1] || '8.8.8.8'}`, "info");
      } else if (action === 'show') {
        if (parts[1] === 'version') {
          newOutput.push({ text: connectedNode ? `${connectedNode.model} OS ${connectedNode.os}` : "No device selected", color: "text-slate-300" });
        } else if (parts[1] === 'ip') {
          newOutput.push({ text: connectedNode ? `C ${connectedNode.ip}/24 is directly connected` : "No IP configured", color: "text-slate-300" });
        } else {
          newOutput.push({ text: "% Invalid input detected at '^' marker.", color: "text-red-400" });
        }
      } else {
        newOutput.push({ text: `unknown command: ${cmd}`, color: "text-red-400" });
      }

      setOutput(newOutput);
      setInputVal('');
    }
  };

  return (
    <div className="h-72 border-t border-slate-300 bg-[#0f172a] flex flex-col shrink-0 relative">
      <div className="h-7 bg-slate-800 flex items-center px-3 justify-between border-b border-slate-700/50">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-[11px] font-mono font-bold text-slate-300">
            NetPulse CLI v3.1 — <span className={connectedNode ? "text-emerald-400" : "text-slate-500"}>{connectedNode ? connectedNode.label : "Disconnected"}</span>
          </span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 font-mono text-[12px] text-slate-300 space-y-0.5 dark-scroll">
        {output.map((item, idx) => (
          <div key={idx} className={item.color}>{item.text}</div>
        ))}
        <div ref={outputEndRef} />
      </div>

      <div className="flex items-center px-3 pb-3 pt-1 font-mono text-[12px] bg-[#0f172a]">
        <span className="text-brand-400 font-bold mr-2 whitespace-nowrap">{promptText}</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck="false"
          className="flex-1 bg-transparent text-slate-100 focus:outline-none caret-brand-500"
        />
      </div>
    </div>
  );
};