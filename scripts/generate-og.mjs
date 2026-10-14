import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';

const chromePath = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputPath = fileURLToPath(new URL('../public/og.png', import.meta.url));

const artwork = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      * { box-sizing: border-box; }
      html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
      body { background: #eff4fb; font-family: Arial, Helvetica, sans-serif; }
      svg { display: block; width: 1200px; height: 630px; }
    </style>
  </head>
  <body>
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Client Optimal AI voice agent implementation">
      <defs>
        <radialGradient id="aura">
          <stop offset="0" stop-color="#5bb8ff" stop-opacity=".34" />
          <stop offset=".58" stop-color="#5c9cff" stop-opacity=".18" />
          <stop offset="1" stop-color="#5c9cff" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="orb" x1=".18" y1="0" x2=".78" y2="1">
          <stop offset="0" stop-color="#174bbd" />
          <stop offset=".34" stop-color="#2869d6" />
          <stop offset=".72" stop-color="#3b98db" />
          <stop offset="1" stop-color="#9bdaf3" />
        </linearGradient>
        <linearGradient id="cloud" x1="0" y1="0" x2="1" y2=".15">
          <stop offset="0" stop-color="#f7fdff" stop-opacity=".5" />
          <stop offset=".3" stop-color="#ffffff" stop-opacity=".96" />
          <stop offset=".72" stop-color="#e8f8ff" stop-opacity=".92" />
          <stop offset="1" stop-color="#d8f4ff" stop-opacity=".28" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="cloud-shape" x="-25%" y="-45%" width="150%" height="190%">
          <feTurbulence type="fractalNoise" baseFrequency=".014 .03" numOctaves="3" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="48" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id="sphere"><circle cx="934" cy="332" r="174" /></clipPath>
      </defs>

      <rect width="1200" height="630" fill="#eff4fb" />
      <path d="M0 112H1200" stroke="#d6e1f3" />
      <g fill="none" stroke="#dce6f5" stroke-width="1" opacity=".72">
        <path d="M810 0 1190 380" /><path d="M900 0 1200 300" />
        <path d="M810 580 1200 190" /><path d="M900 630 1200 330" />
      </g>

      <g transform="translate(68 57)" fill="none" stroke="#2459ec" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M0 18h8l5-10 8 21 8-15 5 4h7" />
      </g>
      <text x="116" y="82" fill="#0b1736" font-size="25" font-weight="700" letter-spacing="-.6">Client Optimal</text>
      <text x="1132" y="79" text-anchor="end" fill="#2459ec" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" letter-spacing="2">IMPLEMENTATION  /  ONGOING SUPPORT</text>

      <text x="70" y="180" fill="#2459ec" font-family="Courier New, monospace" font-size="14" font-weight="700" letter-spacing="2.2">AI VOICE AGENT IMPLEMENTATION</text>
      <text x="66" y="280" fill="#0b1736" font-size="79" font-weight="700" letter-spacing="-4.2">Every call gets a</text>
      <text x="66" y="365" fill="#2459ec" font-size="79" font-weight="700" letter-spacing="-4.2">clear next move.</text>

      <text x="70" y="425" fill="#435574" font-size="22">Custom voice agents for the calls your business receives.</text>
      <text x="70" y="459" fill="#435574" font-size="22">Approved intake, with a person ready for exceptions.</text>

      <g transform="translate(70 534)" font-family="Courier New, monospace" font-size="13" font-weight="700" letter-spacing="1.2">
        <circle cx="7" cy="0" r="5" fill="#2459ec" />
        <text x="23" y="5" fill="#0b1736">DISCLOSE</text>
        <path d="M112 0h44" stroke="#9eb4db" stroke-width="1.5" />
        <path d="m151-4 5 4-5 4" fill="none" stroke="#2459ec" stroke-width="1.5" />
        <circle cx="175" cy="0" r="5" fill="#70bff0" />
        <text x="191" y="5" fill="#0b1736">APPROVED INTAKE</text>
        <path d="M345 0h43" stroke="#9eb4db" stroke-width="1.5" />
        <path d="m383-4 5 4-5 4" fill="none" stroke="#2459ec" stroke-width="1.5" />
        <circle cx="407" cy="0" r="5" fill="#0b1736" />
        <text x="423" y="5" fill="#0b1736">HUMAN FOLLOW-UP</text>
      </g>

      <circle cx="934" cy="332" r="238" fill="url(#aura)" />
      <circle cx="934" cy="332" r="174" fill="url(#orb)" />
      <g clip-path="url(#sphere)">
        <ellipse cx="926" cy="347" rx="184" ry="60" fill="#dff5ff" opacity=".37" filter="url(#soft)" />
        <path d="M746 345c38-17 55-56 101-55 41 1 54 34 85 29 36-7 49-49 88-45 39 3 47 42 82 35 26-5 40-32 68-28 31 4 44 29 77 23v113c-38-10-50 19-86 10-36-10-50-38-86-30-37 9-50 43-90 38-40-6-48-40-87-35-35 4-49 32-84 26-27-5-43-26-68-18z" fill="url(#cloud)" opacity=".78" filter="url(#cloud-shape)" />
        <path d="M765 306c35-30 63-40 91-25 25 14 30 37 57 31 32-8 42-43 73-41 27 2 34 28 60 26 28-3 39-29 67-23 19 4 32 19 51 18" fill="none" stroke="#bceaff" stroke-width="22" stroke-linecap="round" opacity=".55" filter="url(#soft)" />
        <ellipse cx="851" cy="247" rx="34" ry="20" fill="#91d8ff" opacity=".46" filter="url(#soft)" />
        <ellipse cx="1009" cy="282" rx="36" ry="27" fill="#bdeaff" opacity=".5" filter="url(#soft)" />
        <ellipse cx="1052" cy="377" rx="48" ry="25" fill="#effaff" opacity=".47" filter="url(#soft)" />
        <ellipse cx="868" cy="399" rx="35" ry="22" fill="#9de1ff" opacity=".52" filter="url(#soft)" />
        <path d="M786 427c39-16 74-27 101-12 27 16 39 33 69 27 36-8 49-30 79-23 24 6 41 27 68 21 17-4 29-14 48-10v54H786z" fill="#d6f3ff" opacity=".42" filter="url(#soft)" />
      </g>
      <circle cx="934" cy="332" r="174" fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width="2" />
      <circle cx="934" cy="332" r="184" fill="none" stroke="#8ebfff" stroke-opacity=".25" stroke-width="1" />

      <text x="70" y="598" fill="#6d7d97" font-family="Courier New, monospace" font-size="12" letter-spacing="1.8">CLIENTOPTIMAL.COM</text>
      <text x="1132" y="598" text-anchor="end" fill="#6d7d97" font-family="Courier New, monospace" font-size="12" letter-spacing="1.4">AI VOICE AGENT  /  CUSTOM IMPLEMENTATION</text>
    </svg>
  </body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(artwork, { waitUntil: 'load' });
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(`Generated ${outputPath}`);
} finally {
  await browser.close();
}
