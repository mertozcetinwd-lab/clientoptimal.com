import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Static output to dist/, host-agnostic. The React integration exists ONLY to
// mount the animated 3D hero as a client island (client:only) — the rest of the
// site stays plain Astro + hand-authored CSS. Tailwind (v4, via the Vite plugin)
// is scoped to that island's stylesheet and imports utilities WITHOUT preflight,
// so it never resets the existing token-driven CSS. See src/styles/tailwind.css.
export default defineConfig({
  site: 'https://clientoptimal.com',
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
