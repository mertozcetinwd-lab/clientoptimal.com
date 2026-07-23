// Headless ERROR check for the 3D hero island — NOT a screenshot. Loads the page
// in Chrome, captures console errors / page errors, and confirms the WebGL canvas
// mounted and the command cells rendered. Verifies the React island runs without
// judging the animation visually. Build-time only.
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({
  executablePath: CHROME, headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2500)); // let the island hydrate + R3F mount

const report = await page.evaluate(() => {
  const h1 = document.querySelector('section h1');
  const desc = h1?.parentElement?.querySelector('p');
  const bar = document.querySelector('.animate-loading');
  const track = bar?.parentElement;
  const cs = (el) => (el ? getComputedStyle(el) : null);
  const eyebrow = [...document.querySelectorAll('section span')]
    .find((s) => /consulting|automation studio/i.test(s.textContent || ''));
  return {
    canvas: !!document.querySelector('section canvas'),
    cells: document.querySelectorAll('.command-cell').length,
    eyebrow: (eyebrow?.textContent || '').trim(),
    headline: (h1?.textContent || '').trim().replace(/\s+/g, ' '),
    descMarginTop: cs(desc)?.marginTop,
    cta: (document.querySelector('section a[href*="linkedin"] span')?.textContent || '').trim(),
    // availability bar: one child, 1/3 of track, linear infinite sweep
    barChildren: track ? track.children.length : null,
    barWidth: bar ? Math.round(bar.getBoundingClientRect().width) : null,
    trackWidth: track ? Math.round(track.getBoundingClientRect().width) : null,
    barAnim: cs(bar) ? `${cs(bar).animationName} ${cs(bar).animationDuration} ${cs(bar).animationTimingFunction} ${cs(bar).animationIterationCount}` : null,
    probCards: document.querySelectorAll('#problem .card').length,
    flowDots: document.querySelectorAll('#how-it-runs animateMotion').length,
    faqRows: document.querySelectorAll('#faq details').length,
  };
});

console.log('CONSOLE ERRORS:', errors.length ? errors : 'none');
console.log('REPORT:', JSON.stringify(report, null, 2));
await browser.close();
