// Headless probe for the floating VoiceAgentWidget. Companion to
// check-hero.mjs / check-services.mjs, run against a dev server:
//   node scripts/check-widget.mjs [baseUrl]
// Verifies: launcher mounts site-wide, opens an accessible modal dialog on
// click and on [data-open-voice-widget] clicks, Escape closes with focus
// restored, and /demo keeps its full orb card with no duplicate launcher.
// Deliberately does NOT press "Start the call" (no Retell session is opened).
import puppeteer from 'puppeteer-core';

const BASE = process.argv[2] || 'http://localhost:4321';
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

const out = {};

// --- homepage: launcher mounts and opens the modal ---
await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
await page.waitForSelector('.va-launcher', { timeout: 15000 });
out.launcherAria = await page.$eval('.va-launcher', (b) => ({
  haspopup: b.getAttribute('aria-haspopup'),
  expanded: b.getAttribute('aria-expanded'),
  label: b.textContent.replace(/\s+/g, ' ').trim().slice(0, 60),
}));
await page.click('.va-launcher');
await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
out.dialog = await page.$eval('[role="dialog"]', (d) => ({
  modal: d.getAttribute('aria-modal'),
  labelledby: !!d.getAttribute('aria-labelledby'),
  title: document.getElementById('va-title')?.textContent.trim(),
  focusInDialog: d.contains(document.activeElement),
}));
out.startBtn = await page.$$eval('[role="dialog"] button', (bs) =>
  bs.map((b) => b.textContent.trim()).filter(Boolean).slice(0, 4));
// Escape closes and focus returns to the launcher
await page.keyboard.press('Escape');
await page.waitForFunction(() => !document.querySelector('[role="dialog"]'), { timeout: 5000 });
out.escapeCloses = true;
out.focusRestored = await page.$eval('.va-launcher', (b) => document.activeElement === b);

// --- /services: the [data-open-voice-widget] button also opens the modal ---
await page.goto(BASE + '/services', { waitUntil: 'networkidle0' });
await page.waitForSelector('.va-launcher', { timeout: 15000 });
await page.click('[data-open-voice-widget]');
await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
out.ctaOpensModal = true;
await page.keyboard.press('Escape');

// --- /demo: no floating launcher (page has the full orb card) ---
await page.goto(BASE + '/demo', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1500));
out.demoHasNoLauncher = (await page.$('.va-launcher')) === null;
out.demoHasOrbCard = !!(await page.$('.voice-card'));

console.log('ERRORS:', errors.length ? errors : 'none');
console.log(JSON.stringify(out, null, 2));
await browser.close();
