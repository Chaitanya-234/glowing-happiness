'use server';

import net from 'net';
import dns from 'dns/promises';
import { COMMON_PORTS } from '@/lib/port-scanner-constants';

const ALLOWED_PORTS = new Set(Object.keys(COMMON_PORTS).map(Number));

function isPrivateIP(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4) return false; // Handle IPv6 separately or assume safe/unsafe? For now stick to IPv4 or standard checks.

  // 10.0.0.0/8
  if (parts[0] === 10) return true;
  // 172.16.0.0/12
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  // 192.168.0.0/16
  if (parts[0] === 192 && parts[1] === 168) return true;
  // 127.0.0.0/8 (Loopback)
  if (parts[0] === 127) return true;
  // 0.0.0.0/8
  if (parts[0] === 0) return true;
  // 169.254.0.0/16 (Link-local)
  if (parts[0] === 169 && parts[1] === 254) return true;

  return false;
}

export type PortScanResult = {
  port: number;
  status: 'open' | 'closed' | 'timeout' | 'error';
  service: string;
  error?: string;
};

export async function resolveHost(host: string): Promise<{ ip: string | null; error?: string }> {
  try {
    const { address } = await dns.lookup(host);

    // Block localhost/private IPs
    if (address === '127.0.0.1' || address === '::1' || address === '0.0.0.0') {
      return { ip: null, error: 'Scanning local/private networks is not allowed.' };
    }

    if (isPrivateIP(address)) {
      return { ip: null, error: 'Scanning private networks is not allowed.' };
    }

    return { ip: address };
  } catch (error: any) {
    return { ip: null, error: `Could not resolve host: ${error.message}` };
  }
}

export async function scanPort(host: string, port: number): Promise<PortScanResult> {
  // 1. Validation
  if (!ALLOWED_PORTS.has(port)) {
    return { port, status: 'error', service: 'Unknown', error: 'Port not in allowed list' };
  }

  // 2. Resolve Host again to ensure security (double-check against rebinding if we were keeping state, but here we just re-resolve or rely on IP)
  // If the user passes a domain, we resolve it. If they pass an IP, we check it.
  const resolveResult = await resolveHost(host);
  if (resolveResult.error || !resolveResult.ip) {
      return { port, status: 'error', service: COMMON_PORTS[port] || 'Unknown', error: resolveResult.error || 'Invalid host' };
  }

  const ip = resolveResult.ip;

  // Abuse Monitoring (Basic Logging)
  console.log(`[PortScanner] Scanning ${host} (${ip}):${port} - Time: ${new Date().toISOString()}`);
  // In a real production environment, this should log to a database or a dedicated logging service (e.g., Datadog, Splunk, Firebase).

  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status: 'open' | 'closed' | 'timeout' | 'error' = 'closed';

    // Timeout: 3 seconds
    socket.setTimeout(3000);

    socket.on('connect', () => {
      status = 'open';
      socket.destroy();
    });

    socket.on('timeout', () => {
      status = 'timeout';
      socket.destroy();
    });

    socket.on('error', (err: any) => {
      if (err.code === 'ECONNREFUSED') {
        status = 'closed';
      } else {
        status = 'closed';
      }
    });

    socket.on('close', () => {
      resolve({
        port,
        status,
        service: COMMON_PORTS[port] || 'Unknown'
      });
    });

    socket.connect(port, ip);
  });
}
