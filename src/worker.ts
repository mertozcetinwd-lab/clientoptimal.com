const RETELL_CREATE_WEB_CALL = 'https://api.retellai.com/v2/create-web-call';
const ALLOWED_ORIGIN_HOSTS = new Set(['clientoptimal.com', 'www.clientoptimal.com']);
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

// Mirrors the existing Vercel function's per-isolate throttle. It reduces
// bursts, but is not a global quota because Worker isolates scale separately.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function originAllowed(origin: string | null): boolean {
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    return ALLOWED_ORIGIN_HOSTS.has(host) || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

async function createWebCall(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST', 'Cache-Control': 'no-store' },
    });
  }

  if (!originAllowed(request.headers.get('Origin'))) {
    return json({ ok: false, error: 'Origin not allowed' }, 403);
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Too many requests' }, 429);
  }

  if (!env.RETELL_API_KEY || !env.RETELL_AGENT_ID) {
    return json({ ok: false, error: 'Voice demo is not configured on this deployment' }, 501);
  }

  try {
    const upstream = await fetch(RETELL_CREATE_WEB_CALL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: env.RETELL_AGENT_ID,
        metadata: { source: 'clientoptimal-web' },
      }),
    });
    const data = (await upstream.json()) as {
      access_token?: string;
      call_id?: string;
      error?: string;
    };

    return json(
      {
        ok: upstream.ok,
        access_token: data.access_token,
        accessToken: data.access_token,
        call_id: data.call_id,
        callId: data.call_id,
        error: data.error ?? (upstream.ok ? null : 'Failed to create web call'),
      },
      upstream.ok ? 200 : 502
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        message: 'Retell web call token request failed',
        error: error instanceof Error ? error.message : String(error),
      })
    );
    return json({ ok: false, error: 'Failed to create web call' }, 502);
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      if (url.pathname === '/api/demo/create-web-call') {
        return createWebCall(request, env);
      }
      return json({ ok: false, error: 'Not found' }, 404);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
