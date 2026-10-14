---
name: Client Optimal
description: A bold, route-first visual system for custom AI voice-agent work.
colors:
  light-field: "#f0f5fc"
  light-band: "#e2ecf9"
  light-panel: "#ffffff"
  light-ink: "#09162e"
  light-ink-dim: "rgba(9, 22, 46, 0.76)"
  light-muted: "rgba(9, 22, 46, 0.62)"
  light-hairline: "rgba(37, 99, 235, 0.14)"
  light-hairline-strong: "rgba(37, 99, 235, 0.26)"
  light-accent: "#1d4ed8"
  light-neon: "#0284c7"
  dark-field: "#070913"
  dark-band: "#03050a"
  dark-panel: "#0d1424"
  dark-ink: "#f0f6ff"
  dark-ink-dim: "rgba(240, 246, 255, 0.78)"
  dark-muted: "rgba(240, 246, 255, 0.62)"
  dark-hairline: "rgba(56, 189, 248, 0.15)"
  dark-hairline-strong: "rgba(56, 189, 248, 0.28)"
  dark-accent: "#38bdf8"
  dark-neon: "#00d2ff"
  action-azure: "#2563eb"
  action-text: "#ffffff"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, Helvetica, Arial, sans-serif"
    fontSize: "clamp(3.6rem, 8vw, 8rem)"
    fontWeight: 720
    lineHeight: 0.86
    letterSpacing: "-0.075em"
  body:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(0.97rem, 0.94rem + 0.18vw, 1.07rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.13em"
rounded:
  sharp: "0px"
  field: "2px"
  sample-frame: "6px"
  orb: "50%"
spacing:
  gutter: "clamp(1.4rem, 0.8rem + 3vw, 3.4rem)"
  content-width: "1320px"
  section: "clamp(5rem, 11vh, 9.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.action-azure}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.sharp}"
    padding: "0.75rem 1.15rem"
    height: "48px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "var(--text)"
    rounded: "{rounded.sharp}"
    height: "44px"
  navigation-link:
    backgroundColor: "transparent"
    textColor: "var(--text-dim)"
    rounded: "{rounded.sharp}"
    height: "44px"
  navigation-contact:
    backgroundColor: "{colors.action-azure}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.sharp}"
    padding: "0 0.85rem"
    height: "42px"
  text-field:
    backgroundColor: "transparent"
    textColor: "var(--text)"
    rounded: "{rounded.field}"
    padding: "0.7rem 0.8rem"
  route-stop:
    backgroundColor: "transparent"
    textColor: "var(--text)"
    rounded: "{rounded.sharp}"
    padding: "0 clamp(1rem, 2.4vw, 2.5rem) 0 0"
  faq-summary:
    backgroundColor: "transparent"
    textColor: "var(--text)"
    rounded: "{rounded.sharp}"
    padding: "1.1rem 0"
---

# Design System: Client Optimal

## Overview

**Creative North Star: "The Call Route"**

An assured, experimental system built from one visible path. Editorial display type sets the pace, a bright route line marks the next move, and compact mono labels make the operating logic feel legible. The interface stays text-led, precise, and open rather than framing each idea in a card.

Light and dark themes share the same hierarchy and accent logic. The surface changes between icy blue-white and midnight navy while the route signal remains vivid. Use motion sparingly to reveal sequence or confirm an interaction.

**Key Characteristics:**
- Large Archivo statements balanced by calm Inter paragraphs.
- One continuous call route, with a visible human handoff.
- Square controls, fine dividers, and small uppercase route labels.
- Light and dark themes use the existing paired color values.

## Colors

The system pairs two blue-tinted fields with a single azure action fill. Small accent text adapts for each theme so it remains readable on its current surface.

### Primary
- **Azure action:** the shared primary action and route emphasis. The filled control uses white text in both themes.
- **Theme signal:** deep azure carries labels in light mode; electric cyan carries them in dark mode.

### Neutral
- **Ice field and midnight field:** the two page grounds. Their lighter band and panel values separate sections and sample surfaces without a new accent.
- **Navy ink and ice ink:** primary text swap with the field so headlines stay crisp.
- **Hairlines and muted copy:** use the translucent theme-specific values from the frontmatter for dividers, secondary text, and annotations.

**The Theme Pair Rule.** Keep both existing theme palettes intact. Do not substitute a third brand accent or use the action fill as small text.

## Typography

Archivo Variable is the display face, Inter Variable carries readable copy, and IBM Plex Mono marks actual metadata and route annotations. The headline scale ranges from responsive editorial statements to compact page titles. Body copy remains comfortably readable, with long lines limited to a measured column.

**The Label Rule.** Reserve mono and wide tracking for labels that identify a route step, mode, or status. Use Inter for sentences.

## Layout

The main content is centered in a 1320px container with a responsive gutter. Section rhythm is generous, while the first view compresses the full call route into one continuous reading sequence. At tablet widths, multi-column headers stack. On mobile, the route becomes a vertical rail, with disclosure, intake, and handoff visible together before scrolling.

The header stays sticky. Page actions remain easy to reach, content columns collapse to one column, and footer route stages use a two-column grid on small screens. The main responsive cuts are 980px and 580px in navigation, 800px and 600px in the home route, 780px and 560px in the shared page system, and 480px for the desktop voice launcher.

**The Route-First Rule.** Let the path organize the explanation. Use cards only where a sample or discrete reference needs its own surface.

## Elevation & Depth

The site is mostly flat. Fine borders and shifts between the page field, secondary band, and panel carry structure. Reserve the soft panel shadow for the interactive voice sample and a restrained blue glow for an active control. The route itself stays clear of glow and blur.

**The Signal Rule.** Use light and shadow to distinguish an interactive sample or action, not to decorate every section.

## Shapes

Primary route controls and dividers use square corners. Text fields have a near-square edge, the recorded sample has a small radius, and the voice orb is circular. Keep the form language exact and use borders to define edges rather than heavy card backgrounds.

## Components

- **Primary action:** a filled azure rectangle with a short verb-led label and a small directional arrow. Keep a 48px minimum height and a clear keyboard focus outline.
- **Quiet link:** readable body text with a thin accent underline or arrow. It should feel secondary without becoming faint.
- **Navigation:** the brand mark anchors the left, section links stay centered, and the filled contact action sits at the right. The header remains sticky and uses a translucent field.
- **Route step:** a mono number and verb sit above a strong short heading, followed by one spoken example. A thin rail links the stops. The last stop labels a person as the handoff.
- **Text field:** transparent fill, a fine theme hairline, a small corner, and a visible accent focus ring.
- **FAQ row:** disclosure text is left aligned, separated by rules, with a simple accent toggle. Expanded copy keeps a readable measure.
- **Voice orb:** the original supernova-like wave, with flowing arctic ice clouds over electric blue. The shared shader moves at idle and responds to call activity; under reduced-motion it slows instead of freezing. Keep it paused when hidden, and show the same field before audio consent.

## Do's and Don'ts

### Do
- Do preserve the paired light and dark palette values.
- Do label illustrative routes and samples clearly.
- Do keep AI disclosure, approved intake, and human handoff distinct in route examples.
- Do make focus and active states visible on interactive controls.

### Don't
- Don't add a new accent color or replace the current type family roles.
- Don't turn every content group into an equal card grid.
- Don't make mono the default for long copy.
- Don't use decorative glows on the route rail or body text.
