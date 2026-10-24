'use server';
export const runtime = 'nodejs'; // ✅ REQUIRED FIX

const JUDGE0_BASE_URL = 'https://api.judge0.com';
const MAX_POLL_ATTEMPTS = 10;
const POLL_INTERVAL_MS = 800;

// --------------------
// Types
// --------------------

export interface ExecuteCodeParams {
  source_code: string;
  language_id: number;
  stdin?: string;
}

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
}

// --------------------
// Helpers
// --------------------

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --------------------
// Main function
// --------------------

export async function runCode({
  source_code,
  language_id,
  stdin,
}: ExecuteCodeParams): Promise<ExecutionResult> {

  try {
    const submitRes = await fetch(
      `${JUDGE0_BASE_URL}/submissions?base64_encoded=false`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_code, language_id, stdin }),
      }
    );

    if (!submitRes.ok) {
      throw new Error(await submitRes.text());
    }

    const { token } = await submitRes.json();
    if (!token) throw new Error('No token returned');

    for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
      await sleep(POLL_INTERVAL_MS);

      const resultRes = await fetch(
        `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=false`
      );

      const result = await resultRes.json();
      if (![1, 2].includes(result.status.id)) return result;
    }

    return {
      stdout: null,
      stderr: 'Execution timed out',
      compile_output: null,
      message: 'Polling limit exceeded',
      status: { id: 0, description: 'Timeout' },
      time: null,
      memory: null,
    };

  } catch (error) {
    console.error(error);
    return {
      stdout: null,
      stderr: 'Failed to execute code',
      compile_output: null,
      message: error instanceof Error ? error.message : 'Unknown error',
      status: { id: 0, description: 'Error' },
      time: null,
      memory: null,
    };
  }
}
