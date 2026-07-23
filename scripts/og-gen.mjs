// OG card generator, Alabaster & Azure (dark card). Reads the real site fonts
// from node_modules, inlines them as data URIs, renders a 1200x630 card and
// writes public/og.png. Build-time only, never shipped. Re-run after a palette
// change:  node scripts/og-gen.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const b64 = (p) => fs.readFileSync(path.join(ROOT, p)).toString('base64');

const archivo = b64('node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2');
const mono = b64('node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Archivo';src:url(data:font/woff2;base64,${archivo}) format('woff2');font-weight:100 900;}
@font-face{font-family:'Plex';src:url(data:font/woff2;base64,${mono}) format('woff2');font-weight:500;}
*{margin:0;box-sizing:border-box;}
html,body{width:1200px;height:630px;}
body{
  background:#0b0d12;color:#e9ebf0;font-family:'Archivo',sans-serif;
  padding:76px 84px;display:flex;flex-direction:column;justify-content:space-between;
  position:relative;overflow:hidden;
}
.rings{position:absolute;inset:0;pointer-events:none;opacity:.9;
  background:repeating-radial-gradient(circle at 108% 118%,
    rgba(91,155,255,.16) 0 1.5px, transparent 1.5px 46px);}
.top{display:flex;align-items:center;gap:14px;position:relative;z-index:1;}
.dot{width:14px;height:14px;background:#5b9bff;}
.wordmark{font-weight:700;font-size:30px;letter-spacing:-0.01em;}
.mid{position:relative;z-index:1;}
.eyebrow{font-family:'Plex',monospace;font-weight:500;font-size:22px;letter-spacing:0.18em;
  text-transform:uppercase;color:#5b9bff;margin-bottom:26px;}
h1{font-weight:800;font-size:96px;line-height:1.02;letter-spacing:-0.03em;max-width:15ch;}
.bottom{display:flex;align-items:center;justify-content:space-between;position:relative;z-index:1;}
.url{font-family:'Plex',monospace;font-weight:500;font-size:22px;letter-spacing:0.06em;color:rgba(233,235,240,.6);}
.chip{font-family:'Plex',monospace;font-weight:500;font-size:18px;letter-spacing:0.14em;text-transform:uppercase;
  color:#ffffff;background:#2764e0;padding:12px 20px;
  clip-path:polygon(11px 0,100% 0,100% calc(100% - 11px),calc(100% - 11px) 100%,0 100%,0 11px);}
</style></head><body>
<div class="rings"></div>
<div class="top"><span class="dot"></span><span class="wordmark">Client Optimal</span></div>
<div class="mid">
  <div class="eyebrow">AI automation studio</div>
  <h1>Automation that earns its keep.</h1>
</div>
<div class="bottom">
  <span class="url">clientoptimal.com</span>
  <span class="chip">Automations &middot; Agents &middot; Tools</span>
</div>
</body></html>`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: path.join(ROOT, 'public/og.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log('og.png written ->', path.join(ROOT, 'public/og.png'));
