import { defineConfig } from 'astro/config';

// No integrations, no adapter. Static output to dist/, host-agnostic.
// Same posture as mertozcetin.com: nothing here should be Vercel-specific,
// so moving hosts stays a same-day job.
export default defineConfig({
  site: 'https://clientoptimal.com',
  devToolbar: { enabled: false },
});
