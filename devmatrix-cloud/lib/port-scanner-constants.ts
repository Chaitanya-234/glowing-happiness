export const COMMON_PORTS: Record<number, string> = {
  20: 'FTP Data',
  21: 'FTP Control',
  22: 'SSH',
  23: 'Telnet',
  25: 'SMTP',
  53: 'DNS',
  80: 'HTTP',
  110: 'POP3',
  119: 'NNTP',
  123: 'NTP',
  143: 'IMAP',
  161: 'SNMP',
  194: 'IRC',
  443: 'HTTPS',
  445: 'SMB',
  465: 'SMTPS',
  587: 'SMTP Submission',
  993: 'IMAPS',
  995: 'POP3S',
  1433: 'SQL Server',
  1521: 'Oracle SQL',
  3306: 'MySQL',
  3389: 'RDP',
  5432: 'PostgreSQL',
  5900: 'VNC',
  6379: 'Redis',
  8080: 'HTTP-Alt',
  8443: 'HTTPS-Alt',
  27017: 'MongoDB',
};

// Ports available in the frontend selector (subset of common ports)
export const UI_PORTS_LIST = [
  21, 22, 23, 25, 53, 80, 110, 143, 443, 465, 587, 993, 995, 3306, 3389, 5432, 8080, 8443
];
