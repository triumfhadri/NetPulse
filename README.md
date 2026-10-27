# 🌐 NetPulse Enterprise AIOps Network Visualizer

<p align="center">
  <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" alt="NetPulse Banner" width="100%" style="border-radius: 8px;" />
</p>

<p align="center">
  <b>An enterprise-grade, real-time network topology visualizer and telemetry monitoring engine built with React, Vis.js, Chart.js, and Tailwind CSS.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Chart.js-4.4-FF6384?style=for-the-badge&logo=chart.js" />
  <img src="https://img.shields.io/badge/Vis.js-Network-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" />
</p>

---

## ⚡ Overview

**NetPulse Enterprise** is an advanced network operations center (NOC) dashboard designed to simulate, visualize, and monitor complex enterprise routing topologies, security perimeters, and data center fabrics in real time. 

Featuring live packet flow simulation, LLDP/CDP auto-discovery engines, volumetric DDoS attack testing, and an interactive Cisco-like CLI terminal, NetPulse delivers an immersive systems engineering experience.

---

## ✨ Core Features

### 🗺️ Interactive Network Topology Graph
* **Dynamic Node Mapping**: Visualizes L3 Core Routers, Data Center Switches, Firewalls, VMware vCenter, and SAN Storage nodes using physics-driven force-directed graph layouts (`Vis.js`).
* **Live Packet Simulation**: Real-time particle animation streams packets across network links, scaling velocity and color during traffic spikes or security incidents.
* **Topology Builder**: Interactive edit mode allowing operators to drop new network hardware, establish cross-links, and manage layouts.

### 📊 Real-Time Telemetry & Analytics
* **Live Hardware Metrics**: Dynamic CPU load and RAM utilization gauges updating second-by-second.
* **Throughput & Latency Charts**: Built on `Chart.js` to render high-frequency Rx/Tx bandwidth and ICMP packet latency curves.
* **Top Talkers Dashboard**: Live ranking of bandwidth-heavy enterprise nodes.

### 🛡️ Cyber Threat & Incident Simulation
* **DDoS Attack Injector**: Instantly simulates a volumetric DDoS attack, turning network pathways red and intensifying packet traffic.
* **Auto-Discovery Engine**: Simulates LLDP/CDP neighbor discovery by automatically probing and mapping newly connected IoT sensors and client devices.
* **Syslog & Event Feed**: Real-time logging buffer capturing BGP adjacency drops, interface state changes, and high-CPU alarms.

### 💻 Enterprise CLI Terminal
* Fully interactive terminal emulator supporting standard enterprise networking commands (`enable`, `ping`, `show version`, `show ip route`, `traceroute`, and device power cycling).

---

## 🖼️ Visual Preview

```text
+-----------------------------------------------------------------------------------+
|  [NetPulse AIOps]  [Packet Sim: ON]  [Auto-Discovery]  [Inject Event]  [DDoS]     |
+-----------------------------------------------------------------------------------+
|                           |                                                       |
|   INTERACTIVE             |   REAL-TIME TELEMETRY SIDEBAR                         |
|   TOPOLOGY CANVAS         |   +-----------------------+  +---------------------+  |
|                           |   | CPU Load: 24%         |  | Active Throughput   |  |
|      (Core-RTR-1)         |   | [||||||||          ]  |  | [Chart.js Live Rx]  |  |
|         /      \          |   +-----------------------+  +---------------------+  |
|    (Dist-SW)  (Edge-FW)   |                                                       |
|        /          \       |   SYSLOG BUFFER / CLI TERMINAL                        |
|    (Servers)   (Cloud)    |   Router# show ip route                               |
|                           |   C 10.0.0.1/24 is directly connected                 |
+-----------------------------------------------------------------------------------+
