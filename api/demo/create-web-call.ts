// Production endpoint for the browser voice demos (/demo card + floating widget).
//
// Mirrors the dev-only middleware in astro.config.mjs (which serves this route
// under `astro dev`): holds the Retell credentials SERVER-SIDE and returns only
// a short-lived web-call access token, which the browser exchanges for a direct
// WebRTC session. The API key, the agent id, and any phone network never reach
// the client, and nothing here dials a phone number. Vercel collects this file
// automatically as a Node serverless function alongside the static Astro build.
//
// Required project env vars (Vercel dashboard, server-side only):
//   RETELL_API_KEY, RETELL_AGENT_ID
// Without them the function answers 501 and the widget shows its honest
// "live demo is not wired up here" panel with the phone number instead.
import type { IncomingMessage, ServerResponse } from 'node:http';

const RETELL_CREATE_WEB_CALL = 'https://api.retellai.com/v2/create-web-call';

// Origins allowed to mint tokens. The bare domain and www serve the site;
// *.vercel.app keeps preview deployments working. A missing Origin header
// (curl, server-to-server) passes; the rate limit below is the backstop.
const ALLOWED_ORIGIN_HOSTS = new Set(['clientoptimal.com', 'www.clientoptimal.com']);

// Small in-memory throttle. Serverless instances are ephemeral, so this deters
// bursts on a warm instance rather than providing real abuse protection; put
// platform-level rate limiting or a WAF in front if that is ever needed.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear(); // crude memory bound
  return list.length > MAX_PER_WINDOW;
}

function originAllowed(origin: string | undefined): boolean {
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    return ALLOWED_ORIGIN_HOSTS.has(host) || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
    return;
  }

  if (!originAllowed(req.headers.origin)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Origin not allowed' }));
    return;
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded : forwarded?.[0] ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'Too many requests' }));
    return;
  }

  const key = process.env.RETELL_API_KEY;
  const agentId = process.env.RETELL_AGENT_ID;
  if (!key || !agentId) {
    res.statusCode = 501;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({ ok: false, error: 'Voice demo is not configured on this deployment' })
    );
    return;
  }

  try {
    const upstream = await fetch(RETELL_CREATE_WEB_CALL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        metadata: { source: 'clientoptimal-web' },
      }),
    });
    const data = (await upstream.json()) as {
      access_token?: string;
      call_id?: string;
      error?: string;
    };
    res.statusCode = upstream.ok ? 200 : 502;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        ok: upstream.ok,
        access_token: data.access_token,
        accessToken: data.access_token,
        call_id: data.call_id,
        callId: data.call_id,
        error: data.error ?? (upstream.ok ? null : 'Failed to create web call'),
      })
    );
  } catch (e) {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: String(e) }));
  }
}
