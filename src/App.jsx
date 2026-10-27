import React, { useState, useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { initialNodes, initialEdges } from './data/initialTopology';
import { Header } from './components/Header';
import { NetworkGraph } from './components/NetworkGraph';
import { Sidebar } from './components/Sidebar';
import { TerminalEmulator } from './components/TerminalEmulator';
import { ContextMenu } from './components/ContextMenu';
import { NodeModal } from './components/NodeModal';

export default function App() {
  const nodesDataset = useRef(new DataSet(initialNodes));
  const edgesDataset = useRef(new DataSet(initialEdges));

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [simulateTraffic, setSimulateTraffic] = useState(true);
  const [discoveryActive, setDiscoveryActive] = useState(false);
  const [underAttack, setUnderAttack] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeFilterText, setActiveFilterText] = useState('All Devices');
  const [globalLoad, setGlobalLoad] = useState('12.4 Gbps');
  const [nodeCount, setNodeCount] = useState(initialNodes.length);
  const [edgeCount, setEdgeCount] = useState(initialEdges.length);
  const [logs, setLogs] = useState([
    { time: '20:00:01', source: 'System', msg: 'NetPulse React Visualizer Initialized' }
  ]);

  const [ctxMenu, setCtxMenu] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, type: 'router' });

  const discoveryTimerRef = useRef(null);

  const logMessage = (source, msg, type = 'info') => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [{ time, source, msg, type }, ...prev]);
  };

  const handleSelectNode = (id) => {
    setSelectedNodeId(id);
    const nodeObj = nodesDataset.current.get(id);
    setSelectedNode(nodeObj || null);
  };

  const toggleDiscoveryEngine = () => {
    const nextState = !discoveryActive;
    setDiscoveryActive(nextState);
    if (nextState) {
      logMessage("System", "LLDP/CDP Auto-Discovery Engine Started", "info");
      discoveryTimerRef.current = setInterval(() => {
        const id = 100 + Math.floor(Math.random() * 1000);
        const newNode = {
          id,
          label: `IoT-Sensor-${Math.floor(Math.random() * 999)}`,
          group: 'client',
          ip: `10.1.10.${Math.floor(Math.random() * 200)}`,
          model: 'Embedded Linux',
          os: 'vOS',
          baseCpu: 15,
          baseRam: 25,
          baseLat: 2,
          interfaces: ['wlan0']
        };
        nodesDataset.current.add(newNode);
        edgesDataset.current.add({ id: `dyn_${id}`, from: 7, to: id, label: '1G', capacity: 1, traffic: 0.2 });
        setNodeCount(nodesDataset.current.length);
        setEdgeCount(edgesDataset.current.length);
        logMessage("Discovery", `New device discovered: ${newNode.label}`, "info");
      }, 5000);
    } else {
      logMessage("System", "Auto-Discovery Engine Stopped", "warning");
      clearInterval(discoveryTimerRef.current);
    }
  };

  const simulateDDoS = () => {
    const nextState = !underAttack;
    setUnderAttack(nextState);
    if (nextState) {
      logMessage("IDS/IPS", "CRITICAL: Volumetric DDoS Attack Detected", "critical");
    } else {
      logMessage("IDS/IPS", "Attack Mitigated.", "success");
    }
  };

  const simulateNetworkEvent = () => {
    const all = nodesDataset.current.get();
    if (all.length === 0) return;
    const target = all[Math.floor(Math.random() * all.length)];
    logMessage(target.label, "BGP adjacency loss (Hold Timer Expired)", "critical");
  };

  const filterTopology = (group, label) => {
    setActiveFilterText(label);
    nodesDataset.current.forEach(n => {
      if (group === 'all' || n.group === group) {
        nodesDataset.current.update({ id: n.id, color: undefined });
      } else {
        nodesDataset.current.update({ id: n.id, color: { background: '#f1f5f9', border: '#cbd5e1' } });
      }
    });
  };

  const topTalkers = [
    { name: 'Core-RTR-1', bw: 85 },
    { name: 'Storage-SAN', bw: 64 },
    { name: 'Dist-SW-A', bw: 42 }
  ];

  return (
    <div className="h-screen w-screen flex flex-col font-sans select-none text-slate-800 bg-[#f8fafc] overflow-hidden">
      <Header
        simulateTraffic={simulateTraffic}
        toggleTraffic={() => setSimulateTraffic(!simulateTraffic)}
        discoveryActive={discoveryActive}
        toggleDiscoveryEngine={toggleDiscoveryEngine}
        simulateNetworkEvent={simulateNetworkEvent}
        simulateDDoS={simulateDDoS}
        underAttack={underAttack}
        toggleEditMode={() => setEditMode(!editMode)}
        editMode={editMode}
        filterTopology={filterTopology}
        activeFilterText={activeFilterText}
        nodeCount={nodeCount}
        edgeCount={edgeCount}
        globalLoad={globalLoad}
      />

      <main className="flex-1 flex overflow-hidden relative">
        <section className="flex-1 flex flex-col min-w-0 relative z-10">
          <NetworkGraph
            nodesData={nodesDataset.current}
            edgesData={edgesDataset.current}
            onSelectNode={handleSelectNode}
            onContextMenu={(e, id) => {
              const node = nodesDataset.current.get(id);
              setCtxMenu({ x: e.pageX, y: e.pageY, label: node ? node.label : 'Node' });
            }}
            editMode={editMode}
            startAddNode={(type) => setModalState({ isOpen: true, type })}
            startAddEdge={() => alert("Click and drag between nodes in Vis.js to connect.")}
            deleteSelectedElement={() => {
              if (selectedNodeId) {
                nodesDataset.current.remove(selectedNodeId);
                setSelectedNodeId(null);
                setSelectedNode(null);
                setNodeCount(nodesDataset.current.length);
              }
            }}
            saveTopology={() => logMessage("System", "Topology saved to localStorage", "success")}
            loadTopology={() => logMessage("System", "Topology loaded successfully", "success")}
            topTalkers={topTalkers}
            simulateTraffic={simulateTraffic}
            underAttack={underAttack}
          />
          <TerminalEmulator connectedNode={selectedNode} logMessage={logMessage} />
        </section>

        <Sidebar
          selectedNode={selectedNode}
          onClose={() => { setSelectedNode(null); setSelectedNodeId(null); }}
          logs={logs}
        />
      </main>

      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          nodeLabel={ctxMenu.label}
          onAction={(action) => logMessage("CLI", `Action executed: ${action}`, "info")}
          onClose={() => setCtxMenu(null)}
        />
      )}

      <NodeModal
        isOpen={modalState.isOpen}
        nodeType={modalState.type}
        onConfirm={(name, ip) => {
          const id = Date.now();
          const newNode = {
            id,
            label: name,
            group: modalState.type,
            ip,
            model: 'Enterprise Device',
            os: 'vOS 1.0',
            baseCpu: 20,
            baseRam: 30,
            baseLat: 1.5,
            interfaces: ['Eth0']
          };
          nodesDataset.current.add(newNode);
          setNodeCount(nodesDataset.current.length);
          setModalState({ isOpen: false, type: 'router' });
          logMessage("System", `Deployed new ${modalState.type}: ${name}`, "success");
        }}
        onCancel={() => setModalState({ isOpen: false, type: 'router' })}
      />
    </div>
  );
}