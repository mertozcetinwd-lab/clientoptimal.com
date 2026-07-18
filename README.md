# clientoptimal.com

The Client Optimal business site. Astro, static, zero runtime dependencies.

Sibling to [mertozcetin.com](https://github.com/mertozcetinwd-lab/mertozcetin.com), which is the personal portfolio. **This site is the business; that one is the person.** They share an architecture and deliberately do not share a look.

## Stack

Astro 7, hand-authored scoped CSS, three self-hosted typefaces. No framework, no CSS library, no analytics, no cookies, no tracking. Total client JS is about **1.1KB**, inlined, and it does two things: swaps the theme and fires scroll reveals.

```
npm install
npm run dev      # localhost:4321
npm run build    # -> dist/
npm run preview
```

## Design system

Three tones, and only three. The field carries the colour.

| | Dark | Light |
|---|---|---|
| Field | petrol `#0a2f45` | bone `#e8e4d9` |
| Paper | bone `#e8e4d9` | petrol `#0a2f45` |
| Signal | amber `#f5a623` | amber `#8a5200` |

The two themes swap field and paper, so they are one system rather than two designs.

**`--accent` differs per theme on purpose.** `#f5a623` as *text* on bone is 1.90:1 and fails WCAG AA, so the light theme uses `#8a5200` at 5.03:1. Unifying those two values silently breaks the light theme.

**`--accent-fill` does not differ**, and that is also on purpose. The AA problem is amber as text, not amber as a ground. Petrol type on bright amber clears AA at 6.88:1 in both themes, and darkening the fill produced a compliant, dead-looking brown button.

Type is a three-way split: Archivo carries display, Inter carries body, IBM Plex Mono is reserved for small labels and nothing else.

## Things that will bite you

**Reveals use `animation`, never `transition`.** Astro compiles a component's `.foo` to `.foo[data-astro-cid-xxx]`, specificity (0,2,0), identical to `.reveal.in`. Any component that sets `transition:` on a revealed element silently replaces the whole list and kills the fade. Corollary: never hover-transform a `.reveal` element, because the animation's `both` fill outranks it. Put the transform on a child.

**No component takes a `class` prop.** A class passed in from a parent lands on an element carrying the child's scope hash, so the parent's rule compiles to a selector that can never match and gets treeshaken as unused. Parents own the block element and its styling; children own their internals.

**`Plate.astro` is seeded.** Its PRNG is deterministic so a given plate is byte-identical on every build. An unseeded generator would churn the diff on every deploy.

**Every plate animation loops.** A finite animation on content two screens down is invisible by definition, because it finishes long before anyone scrolls to it.

## The legal pages are not boilerplate

`/privacy` and `/terms` were written from what this site actually does, and they are load-bearing. `/privacy` doubles as the published spec for the LinkedIn posting workflow: it commits to publishing only to its own founder's account, to reading no other member's data, to never scraping, and to taking no automated action on anyone else's posts.

**If a change to that workflow would break one of those statements, the workflow changes, not the page.** If this site ever gains a form, analytics, or cookies, `/privacy` changes in the same commit.

## Licence

None. Default all rights reserved. Public to read, not a template to clone.
