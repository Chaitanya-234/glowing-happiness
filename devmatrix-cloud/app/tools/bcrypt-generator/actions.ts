'use server';

import bcrypt from 'bcryptjs';

export interface GenerateHashResult {
  hash: string;
  timeTaken: string; // formatted in ms
  cost: number;
}

export interface VerifyHashResult {
  isMatch: boolean;
  timeTaken: string; // formatted in ms
}

export async function generateHashAction(password: string, cost: number): Promise<GenerateHashResult> {
  if (!password) {
    throw new Error('Password is required');
  }
  if (cost < 4 || cost > 31) {
    throw new Error('Cost must be between 4 and 31');
  }

  const start = performance.now();
  const hash = await bcrypt.hash(password, cost);
  const end = performance.now();

  return {
    hash,
    timeTaken: (end - start).toFixed(2),
    cost,
  };
}

export async function verifyHashAction(password: string, hash: string): Promise<VerifyHashResult> {
  if (!password || !hash) {
    throw new Error('Password and hash are required');
  }

  const start = performance.now();
  const isMatch = await bcrypt.compare(password, hash);
  const end = performance.now();

  return {
    isMatch,
    timeTaken: (end - start).toFixed(2),
  };
}
