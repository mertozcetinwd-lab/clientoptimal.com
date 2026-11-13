# clientoptimal.com

Website for Client Optimal, an introduction brokerage. Vite + React + Tailwind + TypeScript, served by Cloudflare Workers static assets.

- `npm install`
- `npm run dev` (http://127.0.0.1:5180)
- `npm run build` (type-checks, then builds to `dist/`)
- `npm run deploy` (build, then `wrangler deploy` to clientoptimal.com, www, try. and clientoptimalvoice.com)

Pages: Home, How it works, Case studies (`/work`), Who we serve, About, Contact, Privacy, Terms. Unknown paths fall back to the app (single-page routing). `public/_redirects` sends old links to the closest page.

Copy rules: no mention of AI, no "luck" or "chance", no absolute guarantees, no claim about who pays the fee, no em dashes.
