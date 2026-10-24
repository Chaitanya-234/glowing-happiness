// app/api/run-code/route.ts
export const runtime = 'nodejs';

const JUDGE0_BASE_URL = 'https://ce.judge0.com';
const MAX_POLL_ATTEMPTS = 10;
const POLL_INTERVAL_MS = 800;

const sleep = (ms: number) =>
new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: Request) {
  try {
    const { source_code, language_id, stdin } = await req.json();

    const submitRes = await fetch(
      `${JUDGE0_BASE_URL}/submissions?base64_encoded=false`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_code, language_id, stdin }),
      }
    );

    if (!submitRes.ok) {
      return new Response(await submitRes.text(), { status: 500 });
    }

    const { token } = await submitRes.json();

    for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
      await sleep(POLL_INTERVAL_MS);

      const res = await fetch(
        `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=false`
      );

      const result = await res.json();
      if (![1, 2].includes(result.status.id)) {
        return Response.json(result);
      }
    }

    return new Response(
      JSON.stringify({ error: 'Execution timeout' }),
      { status: 408 }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}
