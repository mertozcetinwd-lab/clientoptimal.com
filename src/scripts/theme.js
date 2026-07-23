// Theme engine. Ported from mertozcetin.com with one change: its own
// localStorage key, so the two sites don't fight over each other's preference
// when someone visits both.
export const THEMES = ['dark', 'light'];
const KEY = 'co-theme';

export function getTheme() {
  // Light is the default now (Alabaster & Azure). Matches <html data-theme="light">.
  return document.documentElement.getAttribute('data-theme') || 'light';
}

export function setTheme(t) {
  if (!THEMES.includes(t)) return;
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(KEY, t); } catch (e) { /* private mode */ }
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } }));
}

export function cycleTheme() {
  const i = THEMES.indexOf(getTheme());
  setTheme(THEMES[(i + 1) % THEMES.length]);
}

function sync() {
  const t = getTheme();
  document.querySelectorAll('[data-theme-set]').forEach((el) => {
    el.setAttribute('aria-pressed', String(el.getAttribute('data-theme-set') === t));
  });
}

export function initThemeControls() {
  document.querySelectorAll('[data-theme-set]').forEach((el) => {
    el.addEventListener('click', () => setTheme(el.getAttribute('data-theme-set')));
  });
  document.querySelectorAll('[data-theme-cycle]').forEach((el) => {
    el.addEventListener('click', () => cycleTheme());
  });
  window.addEventListener('themechange', sync);
  sync();
}
