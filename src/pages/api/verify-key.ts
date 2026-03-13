export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  try {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = (await request.json()) as { key?: string };
    const submittedKey = (body.key || '').trim();

    if (!submittedKey) {
      return new Response(JSON.stringify({ valid: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const raw = process.env.CFA_KEYS || '';
    const keys = raw
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const valid = keys.includes(submittedKey);

    return new Response(JSON.stringify({ valid }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ valid: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

