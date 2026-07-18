// Dev screenshot helper. Drives the already-installed Chrome via puppeteer-core.
// Build-time only, never shipped.
//
// Usage: node scripts/shoot.mjs <outDir> [themes csv] [path] [width]
//   node scripts/shoot.mjs ../shots dark,light / 1440
//   node scripts/shoot.mjs ../shots dark /privacy 390
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = process.argv[2] || '.';
const THEMES = (process.argv[3] || 'dark,light').split(',');
// Pass paths WITHOUT a leading slash ("privacy", "" for home). Git Bash on
// Windows rewrites a bare "/" argument into a real Windows path (MSYS path
// conversion), which produced "Cannot navigate to invalid URL" here. Taking a
// slashless argument and adding the slash ourselves sidesteps the shell.
const RAW = (process.argv[4] || '').replace(/^\/+/, '');
const PATH_ = '/' + RAW;
const WIDTH = Number(process.argv[5] || 1440);
const BASE = 'http://localhost:4321';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: 1 });

// Freeze reveals and the looping plate animations so a full-page shot captures
// the settled layout rather than whatever frame the dashes happened to be on.
const freeze =
  '*{animation:none!important;transition:none!important}' +
  '.reveal{opacity:1!important;transform:none!important}';

const slug = PATH_.replace(/\//g, '') || 'home';

for (const t of THEMES) {
  await page.goto(`${BASE}${PATH_}?theme=${t}`, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: freeze });
  await new Promise((r) => setTimeout(r, 600)); // let fonts settle
  await page.screenshot({
    path: `${OUT}/${slug}-${t}-${WIDTH}-fold.png`,
    clip: { x: 0, y: 0, width: WIDTH, height: 900 },
  });
  await page.screenshot({ path: `${OUT}/${slug}-${t}-${WIDTH}-full.png`, fullPage: true });
  console.log('shot', slug, t, WIDTH);
}

await browser.close();
console.log('done ->', OUT);
