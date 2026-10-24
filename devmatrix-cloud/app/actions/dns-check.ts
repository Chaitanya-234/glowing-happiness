'use server';

import dns from 'node:dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);
const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);
const resolveCname = promisify(dns.resolveCname);
const resolveNs = promisify(dns.resolveNs);

export interface DnsResult {
  provider: string;
  location: string;
  status: 'success' | 'error';
  data?: string[];
  error?: string;
  timestamp: string;
}

export async function checkDnsPropagation(domain: string, type: string): Promise<DnsResult[]> {
  const results: DnsResult[] = [];
  const timestamp = new Date().toISOString();

  // Parallel execution for multiple providers
  const promises = [
    queryGoogleDoH(domain, type, timestamp),
    queryCloudflareDoH(domain, type, timestamp),
    queryLocalDns(domain, type, timestamp),
  ];

  const resolved = await Promise.allSettled(promises);

  resolved.forEach((res) => {
    if (res.status === 'fulfilled') {
      results.push(res.value);
    }
  });

  return results;
}

async function queryGoogleDoH(domain: string, type: string, timestamp: string): Promise<DnsResult> {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${type}`);
    const data = await response.json();

    if (data.Status !== 0) {
       return {
        provider: 'Google Public DNS',
        location: 'Global (Anycast)',
        status: 'error',
        error: `DNS Status: ${data.Status}`,
        timestamp,
      };
    }

    const answers = data.Answer ? data.Answer.map((a: { data: string }) => a.data) : [];

    return {
      provider: 'Google Public DNS',
      location: 'Global (Anycast)',
      status: 'success',
      data: answers.length > 0 ? answers : ['No records found'],
      timestamp,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      provider: 'Google Public DNS',
      location: 'Global (Anycast)',
      status: 'error',
      error: err.message,
      timestamp,
    };
  }
}

async function queryCloudflareDoH(domain: string, type: string, timestamp: string): Promise<DnsResult> {
  try {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`, {
      headers: {
        'Accept': 'application/dns-json',
      },
    });
    const data = await response.json();

    if (data.Status !== 0) {
       return {
        provider: 'Cloudflare DNS',
        location: 'Global (Anycast)',
        status: 'error',
        error: `DNS Status: ${data.Status}`,
        timestamp,
      };
    }

    const answers = data.Answer ? data.Answer.map((a: { data: string }) => a.data) : [];

    return {
      provider: 'Cloudflare DNS',
      location: 'Global (Anycast)',
      status: 'success',
      data: answers.length > 0 ? answers : ['No records found'],
      timestamp,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      provider: 'Cloudflare DNS',
      location: 'Global (Anycast)',
      status: 'error',
      error: err.message,
      timestamp,
    };
  }
}

async function queryLocalDns(domain: string, type: string, timestamp: string): Promise<DnsResult> {
  try {
    let data: string[] = [];

    switch (type) {
      case 'A':
        data = await resolve4(domain);
        break;
      case 'AAAA':
        data = await resolve6(domain);
        break;
      case 'MX':
        const mx = await resolveMx(domain);
        data = mx.map(m => `${m.priority} ${m.exchange}`);
        break;
      case 'TXT':
        const txt = await resolveTxt(domain);
        data = txt.flat();
        break;
      case 'CNAME':
        data = await resolveCname(domain);
        break;
      case 'NS':
        data = await resolveNs(domain);
        break;
      default:
        throw new Error('Unsupported record type');
    }

    return {
      provider: 'Local Resolver',
      location: 'Server Location',
      status: 'success',
      data: data.length > 0 ? data : ['No records found'],
      timestamp,
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      provider: 'Local Resolver',
      location: 'Server Location',
      status: 'error',
      error: err.message,
      timestamp,
    };
  }
}
