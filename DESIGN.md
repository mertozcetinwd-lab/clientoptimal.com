---
name: Client Optimal
description: A premium white-and-navy system for an AI receptionist sold to home-service contractors. Rebuilt 2026-10-21 from the /demo redesign.
colors:
  navy: "#050f22"
  navy-2: "#0a1f42"
  blue: "#2b6bff"
  blue-ink: "#1546b3"
  sky: "#a5c8ff"
  ice: "#e6efff"
  white: "#ffffff"
  mist: "#f4f7fc"
  line: "#e1e7f0"
  ink: "#0a1424"
  muted: "#4f5d73"
  muted-dark: "#a9b8cf"
  go: "#5ee3a1"
  mark-field: "#0b0d12"
  mark-dot: "#3f7dff"
typography:
  display:
    fontFamily: "Archivo Variable (width axis, font-stretch 70%), Arial Narrow, sans-serif"
    fontSize: "clamp(56px, 7.3vw, 116px)"
    fontWeight: 800
    lineHeight: 0.87
    letterSpacing: "-0.012em"
    textTransform: uppercase
  body:
    fontFamily: "Inter Variable, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.14em"
    textTransform: uppercase
  led:
    fontFamily: "Doto (Google Fonts, OFL), IBM Plex Mono, monospace"
    fontWeight: 900
    use: "Step numbers and the demo phone number only: the LED job-board accent."
rounded:
  panel: "clamp(22px, 2.6vw, 36px)"
  card: "18px to 22px"
  pill: "999px"
  orb: "50%"
spacing:
  content-width: "1200px"
  gutter: "32px desktop, 20px phone"
  section: "clamp(80px, 11vw, 140px)"
---

# Design System: Client Optimal

Source of truth in code: `src/styles/demo.css` (tokens, buttons, panels, motion) and `src/styles/site.css`
(inner pages, footer, FAQ, legacy token map). Where each premium detail came from:
`website-design/mockups/clientoptimal-demo/REFERENCES.md` in the AI OS repo.

## Overview

**North star: "the office that answers while you're on the roof."** A white page holding inset navy panels.
The navy is where the product lives: the glowing voice orb, the drifting blue light, the halftone dots. White
sections explain it plainly, and stamped work-order cards give it a job-site feel. Light only (Mert's call).

## Colors

- **Navy panels** (`navy`, `navy-2`) carry every hero and the closing call to action. Text on them is white,
  `sky` for the one emphasised line, `muted-dark` for supporting copy.
- **White sections** use `ink` text, `muted` support, `blue-ink` for eyebrows, emphasis and stamped shadows.
- **`go` green** appears only as the live dot and badge.
- **No gradient text and no cyan neon** (flagged as AI tells, 2026-10-14 and 2026-10-20).

## Typography

Archivo's width axis gives condensed uppercase display type at signage weight. Inter for every sentence. Plex
Mono for labels. Doto, a dot-matrix face, is reserved for step numbers and the demo phone number.

## Components

- **Page hero** (`PageHero.astro`): inset navy panel with drifting light, the halftone `DotField` canvas, grain,
  a glass nav pill with the C mark, and the page heading. `size="compact"` for inner pages.
- **Voice orb**: the arctic-blue `FluidCloudOrb` shader with a soft halo, used as the talk button on /demo and
  home. No rings and no idle label (Mert, 2026-10-20).
- **Buttons**: pills. Light (white on navy) for the main action, glass for secondary. Hover sweeps a light band
  and nudges the arrow.
- **Work-order cards** (`.d-order`, `.d-card`): white, 1.5px ink border, 6px offset `blue-ink` shadow, a dot patch
  in one corner, a cursor spotlight on hover.
- **Rule cards** (`.d-fact`): mist fill with a blue top edge that grows on hover.
- **Trades marquee**: slow, masked edges, keeps running under the OS reduce-motion setting (Mert's call).
- **FAQ**: rows ruled in ink, condensed uppercase questions, a circled plus that turns into an x.

## Motion

Entrance lifts on load, reveal on scroll, the drifting light and the orb. With reduce-motion on, the large motion
stops; the marquee, live dot and orb keep a gentle loop.

## Don't

- Don't invent proof: no logos, testimonials, stars or numbers (zero clients; site.js hard constraint).
- Don't add faces or people imagery (halal rulings), music, fake dashboards or gradient text.
- Don't change the wording of /text-me's consent block, /privacy or /terms when restyling.
