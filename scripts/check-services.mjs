// Verification probe for /services. Measures rather than eyeballs: console clean,
// reveals actually fire, the #approach anchor clears the sticky header, and every
// nav/CTA link resolves. Build-time only.
import puppeteer from 'puppeteer-core';

const BASE = process.argv[2] || 'http://localhost:4321';
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true, args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(`${BASE}/services`, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));

// scroll the whole page so every IntersectionObserver fires, then come back
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 900));

const report = await page.evaluate(() => {
  const all = [...document.querySelectorAll('.reveal')];
  const stuck = all.filter((el) => getComputedStyle(el).opacity === '0');
  // any .reveal carrying a transition is the documented Astro specificity trap
  const withTransition = all.filter((el) => {
    const t = getComputedStyle(el).transitionProperty;
    return t && t !== 'none' && t !== 'all';
  }).length;
  return {
    sections: [...document.querySelectorAll('section[id]')].map((s) => s.id),
    reveals: all.length,
    revealed: all.filter((el) => el.classList.contains('in')).length,
    stuckAtZeroOpacity: stuck.length,
    revealsWithTransition: withTransition,
    navHrefs: [...document.querySelectorAll('.hdr .nav a')].map((a) => a.getAttribute('href')),
    headerIsOverHero: !!document.querySelector('.hdr.over-hero'),
    links: [...document.querySelectorAll('main a[href]')].map((a) => a.getAttribute('href')),
    hasForm: !!document.querySelector('form, input, textarea'),
    emDashes: (document.body.innerText.match(/—/g) || []).length,
  };
});

// anchor offset: does #approach land below the 4rem sticky header?
await page.evaluate(() => { location.hash = '#approach'; });
await new Promise((r) => setTimeout(r, 700));
const anchor = await page.evaluate(() => {
  const el = document.querySelector('#approach');
  const hdr = document.querySelector('.hdr');
  return {
    approachTop: Math.round(el.getBoundingClientRect().top),
    headerHeight: Math.round(hdr.getBoundingClientRect().height),
  };
});

console.log('ERRORS:', errors.length ? errors : 'none');
console.log(JSON.stringify(report, null, 2));
console.log('anchor #approach:', JSON.stringify(anchor),
  anchor.approachTop >= anchor.headerHeight ? '=> clears header OK' : '=> HIDDEN UNDER HEADER');
await browser.close();
