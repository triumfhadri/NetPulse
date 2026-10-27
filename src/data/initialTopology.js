export const initialNodes = [
  { id: 1, label: 'Core-RTR-1', group: 'router', ip: '10.0.0.1', model: 'Cisco ASR 9904', os: 'IOS-XR 7.3.1', baseCpu: 15, baseRam: 30, baseLat: 1, interfaces: ['Te0/0/0/0', 'Te0/0/0/1'] },
  { id: 2, label: 'Core-RTR-2', group: 'router', ip: '10.0.0.2', model: 'Cisco ASR 9904', os: 'IOS-XR 7.3.1', baseCpu: 12, baseRam: 28, baseLat: 1, interfaces: ['Te0/0/0/0', 'Te0/0/0/1'] },
  { id: 3, label: 'Edge-FW-HA1', group: 'firewall', ip: '192.168.254.1', model: 'Palo Alto PA-5250', os: 'PAN-OS 10.1', baseCpu: 45, baseRam: 65, baseLat: 3, interfaces: ['eth1/1', 'eth1/2'] },
  { id: 4, label: 'Edge-FW-HA2', group: 'firewall', ip: '192.168.254.2', model: 'Palo Alto PA-5250', os: 'PAN-OS 10.1', baseCpu: 5, baseRam: 40, baseLat: 0, interfaces: ['eth1/1', 'eth1/2'] },
  { id: 14, label: 'Internet-Cloud', group: 'cloud', ip: '8.8.8.8', model: 'ISP Uplink', os: 'BGP', baseCpu: 0, baseRam: 0, baseLat: 12, interfaces: ['WAN1'] },
  { id: 5, label: 'Dist-SW-A', group: 'switch', ip: '10.1.0.1', model: 'Nexus 93180YC', os: 'NX-OS 9.3', baseCpu: 25, baseRam: 40, baseLat: 1.5, interfaces: ['Eth1/1', 'Vlan10'] },
  { id: 6, label: 'Dist-SW-B', group: 'switch', ip: '10.2.0.1', model: 'Nexus 93180YC', os: 'NX-OS 9.3', baseCpu: 22, baseRam: 38, baseLat: 1.5, interfaces: ['Eth1/1', 'Vlan30'] },
  { id: 7, label: 'Acc-SW-Lab1', group: 'switch', ip: '10.1.10.1', model: 'Catalyst 9300', os: 'IOS-XE 17.3', baseCpu: 15, baseRam: 30, baseLat: 2, interfaces: ['Gi1/0/1', 'Gi1/0/2'] },
  { id: 8, label: 'Acc-SW-Lab2', group: 'switch', ip: '10.1.20.1', model: 'Catalyst 9300', os: 'IOS-XE 17.3', baseCpu: 12, baseRam: 28, baseLat: 2, interfaces: ['Gi1/0/1', 'Gi1/0/2'] },
  { id: 9, label: 'Acc-SW-Office', group: 'switch', ip: '10.2.10.1', model: 'Catalyst 9300', os: 'IOS-XE 17.3', baseCpu: 20, baseRam: 35, baseLat: 2, interfaces: ['Gi1/0/1', 'Gi1/0/2'] },
  { id: 10, label: 'WLC-Primary', group: 'server', ip: '10.0.100.5', model: 'Cisco 9800-L', os: 'IOS-XE 17.3', baseCpu: 55, baseRam: 70, baseLat: 4, interfaces: ['Te0/0/0'] },
  { id: 11, label: 'ISE-Auth-Node', group: 'server', ip: '10.0.100.10', model: 'Cisco ISE SNS', os: 'ISE 3.1', baseCpu: 60, baseRam: 85, baseLat: 2, interfaces: ['eth0'] },
  { id: 12, label: 'vCenter-Mgmt', group: 'server', ip: '10.0.100.20', model: 'VMware Appliance', os: 'VCSA 7.0', baseCpu: 40, baseRam: 90, baseLat: 2, interfaces: ['vmnic0'] },
  { id: 13, label: 'Storage-SAN', group: 'database', ip: '10.0.100.50', model: 'NetApp AFF', os: 'ONTAP 9', baseCpu: 30, baseRam: 95, baseLat: 0.5, interfaces: ['e0a', 'e0b'] }
];

export const initialEdges = [
  { id: 'e_wan1', from: 14, to: 3, label: '10G BGP', capacity: 10, traffic: 0.8 },
  { id: 'e_ha', from: 3, to: 4, label: 'HA-Sync', capacity: 10, traffic: 0.1, dashes: true },
  { id: 'e1', from: 1, to: 2, label: '100G LACP', capacity: 100, traffic: 0.6 },
  { id: 'e2', from: 1, to: 3, label: '40G OSPF', capacity: 40, traffic: 0.5 },
  { id: 'e3', from: 2, to: 3, label: '40G OSPF', capacity: 40, traffic: 0.3 },
  { id: 'e4', from: 1, to: 5, label: '40G', capacity: 40, traffic: 0.7 },
  { id: 'e5', from: 2, to: 5, label: '40G', capacity: 40, traffic: 0.4 },
  { id: 'e6', from: 1, to: 6, label: '40G', capacity: 40, traffic: 0.5 },
  { id: 'e7', from: 2, to: 6, label: '40G', capacity: 40, traffic: 0.6 },
  { id: 'e8', from: 5, to: 7, label: '10G Po', capacity: 10, traffic: 0.8 },
  { id: 'e9', from: 5, to: 8, label: '10G Po', capacity: 10, traffic: 0.9 },
  { id: 'e10', from: 6, to: 9, label: '10G Po', capacity: 10, traffic: 0.4 },
  { id: 'e11', from: 5, to: 10, label: '10G', capacity: 10, traffic: 0.5 },
  { id: 'e12', from: 5, to: 11, label: '10G', capacity: 10, traffic: 0.3 },
  { id: 'e13', from: 5, to: 12, label: '25G', capacity: 25, traffic: 0.2 },
  { id: 'e14', from: 5, to: 13, label: '40G FCoE', capacity: 40, traffic: 0.7 }
];