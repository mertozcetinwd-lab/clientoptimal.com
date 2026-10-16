# clientoptimal.com

The Client Optimal business site. Astro, static, zero runtime dependencies.

Sibling to [mertozcetin.com](https://github.com/mertozcetinwd-lab/mertozcetin.com), which is the personal portfolio. **This site is the business; that one is the person.** They share an architecture and deliberately do not share a look.

## Stack

Astro 7 with hand-authored CSS and React 19 islands for the interactive browser voice sample and floating sample launcher. The demo uses Retell's browser SDK and a Three.js visualizer. Astro emits static pages; the interactive demo and launcher add client JavaScript. Theme preference is stored in local storage. No first-party analytics are currently installed. Third-party YouTube and Retell services load only with their respective sample features.

Production hosting uses Cloudflare Workers Static Assets. The Worker handles `/api/demo/create-web-call` and serves the static Astro build for other paths. Retell credentials are Worker secrets named `RETELL_API_KEY` and `RETELL_AGENT_ID`; never put them in Wrangler config or client-side code. Build and deploy with `npm run cf:deploy`, or use `npm run cf:dev` for a local Worker preview.

The root `api/demo/create-web-call.ts` remains the Vercel rollback endpoint. It shares the same response contract as the Worker handler in `src/worker.ts`.

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

`/privacy` and `/terms` describe the website's actual collection and service scope. `/privacy` also documents the LinkedIn publishing workflow and the Retell browser sample. Confirm current provider settings before representing audio retention, recording, or model use as settled.

**If a change to a workflow would break one of those statements, update the workflow or the page in the same change.**

## Licence

None. Default all rights reserved. Public to read, not a template to clone.
