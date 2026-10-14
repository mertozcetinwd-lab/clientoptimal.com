import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

// Local development plugin for generating ephemeral Retell Web Call tokens
function retellDevPlugin() {
  return {
    name: 'retell-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/demo/create-web-call', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        let retellKey = process.env.RETELL_API_KEY;
        let agentId = process.env.RETELL_AGENT_ID;

        // Fallback: parse parent repo .env file directly if not in process.env
        if (!retellKey || !agentId) {
          const rootEnv = path.resolve('..', '.env');
          if (fs.existsSync(rootEnv)) {
            const raw = fs.readFileSync(rootEnv, 'utf8');
            for (const line of raw.split('\n')) {
              const trimmed = line.trim();
              if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                const [k, ...v] = trimmed.split('=');
                const val = v.join('=').trim().replace(/^["']|["']$/g, '');
                if (k.trim() === 'RETELL_API_KEY' && !retellKey) retellKey = val;
                if (k.trim() === 'RETELL_AGENT_ID' && !agentId) agentId = val;
              }
            }
          }
        }

        if (!retellKey || !agentId) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'RETELL_API_KEY or RETELL_AGENT_ID missing in .env' }));
          return;
        }

        try {
          const retellResp = await fetch('https://api.retellai.com/v2/create-web-call', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${retellKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              agent_id: agentId,
              metadata: { source: 'clientoptimal-local-dev' },
            }),
          });

          const data = await retellResp.json();
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: retellResp.ok,
              access_token: data.access_token,
              accessToken: data.access_token,
              call_id: data.call_id,
              callId: data.call_id,
              error: data.error || (retellResp.ok ? null : 'Failed to create web call'),
            })
          );
        } catch (e) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: String(e) }));
        }
      });
    },
  };
}

// Static output to dist/, host-agnostic. React powers the consent-gated browser
// sample and floating sample launcher. Tailwind (v4, via the Vite plugin) is
// scoped to the visualizer stylesheet and imports utilities WITHOUT preflight,
// so it never resets the existing token-driven CSS. See src/styles/tailwind.css.
export default defineConfig({
  site: 'https://clientoptimal.com',
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: { plugins: [tailwindcss(), retellDevPlugin()] },
});
