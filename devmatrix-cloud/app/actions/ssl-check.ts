'use server';

import tls from 'tls';

export interface SslCheckResult {
  host: string;
  port: number;
  valid: boolean;
  daysRemaining?: number;
  validFrom?: string;
  validTo?: string;
  issuer?: string;
  subject?: string;
  cipher?: string;
  protocol?: string;
  fingerprint?: string;
  serialNumber?: string;
  error?: string;
  details?: Record<string, unknown>;
}

export async function checkSslCertificate(domain: string): Promise<SslCheckResult> {
  return new Promise((resolve) => {
    const options = {
      host: domain,
      port: 443,
      servername: domain,
      rejectUnauthorized: false, // We want to inspect even invalid certs, validation is manual
    };

    const socket = tls.connect(options, () => {
      try {
        const cert = socket.getPeerCertificate(true); // true to get full chain if needed (though basic is usually enough for top level)

        if (!cert || Object.keys(cert).length === 0) {
          resolve({
            host: domain,
            port: 443,
            valid: false,
            error: 'No certificate found',
          });
          socket.end();
          return;
        }

        const validFrom = new Date(cert.valid_from);
        const validTo = new Date(cert.valid_to);
        const now = new Date();
        const daysRemaining = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isValidDate = now >= validFrom && now <= validTo;
        const isTrusted = socket.authorized;

        const result: SslCheckResult = {
          host: domain,
          port: 443,
          valid: isValidDate && isTrusted,
          daysRemaining,
          validFrom: validFrom.toISOString(),
          validTo: validTo.toISOString(),
          issuer: typeof cert.issuer === 'object' ? (cert.issuer as unknown as Record<string, unknown>).O as string || (cert.issuer as unknown as Record<string, unknown>).CN as string : String(cert.issuer),
          subject: typeof cert.subject === 'object' ? (cert.subject as unknown as Record<string, unknown>).CN as string : String(cert.subject),
          cipher: socket.getCipher().name,
          protocol: socket.getProtocol() || 'Unknown',
          fingerprint: cert.fingerprint,
          serialNumber: cert.serialNumber,
          // Removed full details object to avoid serialization issues with Uint8Array/Buffers in Server Actions
        };

        resolve(result);
        socket.end();
      } catch (err: unknown) {
        const error = err as Error;
        resolve({
          host: domain,
          port: 443,
          valid: false,
          error: error.message,
        });
        socket.end();
      }
    });

    socket.on('error', (err) => {
      resolve({
        host: domain,
        port: 443,
        valid: false,
        error: err.message,
      });
    });

    socket.setTimeout(5000, () => {
        resolve({
            host: domain,
            port: 443,
            valid: false,
            error: 'Connection timed out',
        });
        socket.destroy();
    });
  });
}
