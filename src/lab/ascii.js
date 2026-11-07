// ASCII art engine for the design lab (2026-11-07). Same idea as the ebook art
// (builds/ai-income-bundle/art.py: shade a scene, map brightness to a character ramp) but live:
// each <pre data-ascii="sphere|burst|field"> is redrawn a few times a second while it is on screen.
// Reduced motion gets one still frame. Plain text, so it scales crisply at any size.

const RAMP = ' .,:;-=+*x#%@';
const ASPECT = 0.5; // a monospace cell is about twice as tall as it is wide

function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function ch(v, ramp = RAMP) {
  const i = Math.max(0, Math.min(ramp.length - 1, Math.floor(v * ramp.length)));
  return ramp[i];
}

// A lit planet with turning meridians and a thin ring, like the ebook's sphere plate.
export function sphere(cols, rows, t) {
  let out = '';
  const cx = cols / 2, cy = rows / 2, r = Math.min(cols * ASPECT, rows) * 0.46;
  const lx = Math.cos(t * 0.15) * -0.35, ly = -0.45, lz = 0.82;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const nx = ((x - cx) * ASPECT) / r, ny = (y - cy) / r;
      const d2 = nx * nx + ny * ny;
      if (d2 <= 1) {
        const nz = Math.sqrt(1 - d2);
        let v = Math.max(0, nx * lx + ny * ly + nz * lz) * 0.95 + 0.05;
        const lon = Math.atan2(nx, nz) + t * 0.35;
        const lat = Math.asin(ny);
        if (Math.abs(Math.sin(lon * 6)) < 0.08 || Math.abs(Math.sin(lat * 7)) < 0.07) v *= 0.45; // grid lines
        out += ch(v);
      } else {
        const ring = Math.abs(Math.hypot(nx * 0.55, ny * 2.4) - 1.18);
        if (ring < 0.035 && !(ny < 0 && d2 < 1.6)) out += ch(0.55);
        else out += hash(x, y) > 0.992 ? (hash(x + t | 0, y) > 0.5 ? '+' : '.') : ' ';
      }
    }
    out += '\n';
  }
  return out;
}

// A supernova: a hot core, sharp rays and twinkling debris.
export function burst(cols, rows, t) {
  let out = '';
  const cx = cols / 2, cy = rows / 2, sc = Math.min(cols * ASPECT, rows) * 0.5;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = ((x - cx) * ASPECT) / sc, dy = (y - cy) / sc;
      const r = Math.hypot(dx, dy) + 1e-4, a = Math.atan2(dy, dx);
      const rays = Math.pow(Math.abs(Math.cos(a * 9 + Math.sin(a * 3 + t * 0.2) * 0.6)), 28) * 0.9
                 + Math.pow(Math.abs(Math.cos(a * 4 - t * 0.05)), 60) * 0.7;
      let v = 0.11 / (r * r) * 0.08 + rays * Math.max(0, 1 - r * 0.85) + Math.max(0, 0.32 - r) * 2.2;
      const tw = hash(x, y);
      if (tw > 0.985) v += 0.35 * (0.5 + 0.5 * Math.sin(t * 2 + tw * 50));
      out += ch(Math.min(1, v));
    }
    out += '\n';
  }
  return out;
}

// A faint drafting field: drifting dots and crosses, for section backgrounds.
export function field(cols, rows, t) {
  let out = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const h = hash(x, y);
      if (x % 12 === 0 && y % 6 === 0) out += '+';
      else if (h > 0.985) out += 0.5 + 0.5 * Math.sin(t + h * 40) > 0.5 ? '.' : ' ';
      else out += ' ';
    }
    out += '\n';
  }
  return out;
}

// Ordered (Bayer 4x4) dithering, the same trick the ebook plates use to go 1-bit: a pixel is drawn
// only when its brightness beats the cell's threshold, so a smooth glow turns into a print texture.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
function dith(v, x, y, ramp = ' .:+*#') {
  const th = BAYER[(y % 4) * 4 + (x % 4)];
  if (v < th * 0.9) return ' ';
  return ch(Math.min(1, v), ramp);
}

// The receptionist's disc: a dithered supernova core with sound rings rippling out from the orb.
export function nova(cols, rows, t) {
  let out = '';
  const cx = cols / 2, cy = rows / 2, R = Math.min(cols * ASPECT, rows) / 2;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const r = Math.hypot(((x - cx) * ASPECT) / R, (y - cy) / R);
      if (r > 1) { out += ' '; continue; }
      const core = Math.exp(-r * 2.4) * 0.7;
      const ring = Math.pow(Math.max(0, Math.cos((r - t * 0.09) * 22)), 8) * 0.8 * Math.max(0.15, r);
      const rim = Math.pow(r, 6) * 0.6;
      out += dith(core + ring + rim, x, y);
    }
    out += '\n';
  }
  return out;
}

// A voice waveform band for the footer: stacked sine lines, dithered, drifting left.
export function wave(cols, rows, t) {
  let out = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const u = x / cols, env = Math.sin(Math.PI * u) * 0.9 + 0.1;
      const amp = (Math.sin(x * 0.09 + t * 1.3) * 0.6 + Math.sin(x * 0.031 - t * 0.7) * 0.4) * env;
      const yy = (y / (rows - 1)) * 2 - 1;
      const d = Math.abs(yy - amp * 0.8);
      out += dith(Math.max(0, 1 - d * 3.2) * 0.9, x, y);
    }
    out += '\n';
  }
  return out;
}

const KINDS = { sphere, burst, field, nova, wave };

export function mountAscii(root = document) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.querySelectorAll('pre[data-ascii]').forEach((pre) => {
    const fn = KINDS[pre.dataset.ascii];
    if (!fn) return;
    const fps = Number(pre.dataset.fps || 12);
    let cols = 0, rows = 0, visible = false, last = 0, t0 = performance.now();
    const size = () => {
      // Measure one character so the art fills the box whatever the font size.
      const probe = document.createElement('span');
      probe.textContent = 'M'.repeat(10);
      pre.appendChild(probe);
      const cw = probe.getBoundingClientRect().width / 10;
      const lh = parseFloat(getComputedStyle(pre).lineHeight) || cw * 2;
      probe.remove();
      const box = pre.parentElement.getBoundingClientRect();
      cols = Math.max(10, Math.floor(box.width / cw));
      rows = Math.max(6, Math.floor(box.height / lh));
    };
    const draw = (now) => { pre.textContent = fn(cols, rows, (now - t0) / 1000); };
    size(); draw(performance.now() + 4000);
    new ResizeObserver(() => { size(); draw(performance.now()); }).observe(pre.parentElement);
    if (reduce) return;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) requestAnimationFrame(loop); }).observe(pre);
    function loop(now) {
      if (!visible) return;
      if (now - last > 1000 / fps) { last = now; draw(now); }
      requestAnimationFrame(loop);
    }
  });
}
