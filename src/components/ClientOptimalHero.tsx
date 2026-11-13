"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { CountUp, Mark } from "./motion"
import SiteHeader from "./SiteHeader"
import {
  ArrowUpRight,
  BLUE,
  CheckSquare,
  CtaCornerPluses,
  delay,
  EMAIL,
  FOCUS,
  GeistMono,
  GeistSans,
  GridPlus,
  LINE,
} from "./primitives"

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]

/** Figures taken from the selected work (NDA-signed, licensed case studies). */
const STATS = [
  { value: "$105K", label: "ADDED REVENUE IN ONE QUARTER" },
  { value: "1,510", label: "ACCESS POINTS IN ONE PURCHASE" },
  { value: "$35K", label: "FROM TWO PARTNERSHIPS IN 60 DAYS" },
] as const

const PROOF_POINTS = ["FIXED FEE PER INTRODUCTION.", "AGREED IN WRITING.", "EMAIL FIRST."] as const

const HEADLINE = [
  { w: "Introductions" },
  { w: "that" },
  { w: "connect" },
  { w: "supply" },
  { w: "to" },
  { w: "demand", accent: true },
] as const

/**
 * Client Optimal hero: blueprint grid landing with a code-built, dithered
 * isometric supply network on the right. Layout, type, colour and motion follow
 * the reference hero; only the copy and the figures are ours.
 */
export default function ClientOptimalHero({ className }: { className?: string }) {
  return (
    <section
      id="top"
      className={cn(
        GeistSans.className,
        "relative min-h-dvh w-full overflow-x-clip bg-white text-black antialiased lg:h-[max(100dvh,740px)]",
        className,
      )}
    >
      <div
        className="co-fade relative mx-3 flex min-h-dvh flex-col border-x bg-white sm:mx-6 lg:mx-10 lg:h-full lg:min-h-0"
        style={{ borderColor: LINE, ...delay(0) }}
      >
        {/* Outer frame corners */}
        <GridPlus edge="left" className="left-0 top-0" />
        <GridPlus edge="right" className="left-full top-0" />
        <GridPlus edge="left" className="left-0 top-full" />
        <GridPlus edge="right" className="left-full top-full" />

        {/* Nav: mobile = logo, contact, menu; md+ = logo | boxed links | contact */}
        <SiteHeader />

        {/* Hatch + stats */}
        <div
          className="relative grid shrink-0 grid-cols-1 border-b lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
          style={{ borderColor: LINE }}
        >
          <GridPlus edge="left" className="left-0 top-full" />
          <GridPlus edge="right" className="left-full top-full" />
          <GridPlus edge="top" className="left-[46%] top-0 hidden lg:block" />
          <GridPlus className="left-[46%] top-full hidden lg:block" />
          <div
            className="co-hatch co-fade hidden min-h-[72px] lg:block lg:border-r"
            style={{ borderColor: LINE, ...delay(200) }}
            aria-hidden
          />
          <dl className="grid grid-cols-3 divide-x px-0 sm:px-2 lg:px-4" style={{ borderColor: LINE }}>
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(GeistMono.className, "co-in flex min-w-0 flex-col justify-center px-3 py-3.5 sm:px-5 sm:py-4 lg:py-5")}
                style={{ borderColor: LINE, ...delay(260 + i * 70) }}
              >
                <dt className="order-2 mt-1.5 text-[8.5px] font-normal uppercase leading-snug tracking-[0.08em] text-[#6E6E6E] sm:text-[10px] sm:tracking-[0.1em]">
                  {stat.label}
                </dt>
                <dd className="order-1 text-[1.2rem] font-normal leading-none tracking-[-0.04em] sm:text-[1.45rem] lg:text-[1.75rem]">
                  <CountUp value={stat.value} delayMs={700 + i * 150} durationMs={1300} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero: equal-height columns; content stays inside (no overlap with the industries row) */}
        <div
          className="relative grid min-h-0 flex-1 grid-cols-1 border-b lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
          style={{ borderColor: LINE }}
        >
          <GridPlus className="left-[46%] top-full hidden lg:block" />
          <div
            className="flex min-h-0 items-center overflow-y-auto overflow-x-visible border-b px-4 py-8 sm:px-6 sm:py-10 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-10 lg:py-8"
            style={{ borderColor: LINE }}
          >
            <div className="my-auto flex w-full min-w-0 max-w-xl flex-col justify-center lg:max-w-none">
              <span
                className={cn(
                  GeistMono.className,
                  "co-in inline-flex w-fit max-w-full items-center gap-2 border border-black/10 bg-[#F4F4F4] px-2.5 py-1.5 text-[9.5px] font-normal uppercase leading-none tracking-[0.12em] text-[#505050] sm:text-[10.5px]",
                )}
                style={delay(380)}
              >
                <span className="size-1.5 shrink-0 bg-[#0000FF]" aria-hidden />
                Done-for-you introduction brokerage
              </span>

              <h1 className="mt-5 w-full max-w-[22ch] text-[1.75rem] font-medium uppercase leading-[1.06] tracking-[-0.035em] sm:mt-6 sm:max-w-[20ch] sm:text-[2.2rem] lg:max-w-[18ch] lg:text-[clamp(1.9rem,2.7vw,2.75rem)] lg:leading-[1.03]">
                {HEADLINE.map((word, i) => (
                  <span key={word.w}>
                    <span
                      className={cn("co-word", "accent" in word && "text-[#0000FF]")}
                      style={delay(460 + i * 55)}
                    >
                      {"accent" in word ? <Mark delayMs={1500}>{word.w}</Mark> : word.w}
                    </span>
                    {i < HEADLINE.length - 1 ? " " : null}
                  </span>
                ))}
              </h1>

              <p
                className="co-in mt-4 w-full max-w-[46ch] text-[13.5px] leading-[1.6] text-[#6E6E6E] sm:max-w-[44ch] sm:text-[14.5px] lg:text-[15px]"
                style={delay(800)}
              >
                Companies are often looking to buy from a supplier they may not know how to find. Our systems read public
                signals to help spot who may need one next, we work to confirm the need, and we put you on the thread. One
                fixed fee, no software to learn.
              </p>

              <div className="mt-7 -m-[7px] grid grid-cols-1 gap-2.5 p-[7px] sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <Link
                  to="/work"
                  className={cn(
                    "co-in order-2 sm:order-none group relative inline-flex h-11 w-full items-center justify-center bg-[#E8E8E8] px-4 text-[13px] font-normal text-black transition-colors duration-150 hover:bg-[#E0E0E0] sm:w-auto sm:px-5",
                    FOCUS,
                  )}
                  style={delay(960)}
                >
                  <CtaCornerPluses />
                  See Case Studies
                </Link>
                <Link
                  to="/contact"
                  className={cn(
                    "co-in group relative inline-flex h-11 w-full items-center justify-center gap-2 bg-[#0000FF] px-4 text-[13px] font-normal text-white transition-colors duration-150 hover:bg-[#0000C4] sm:w-auto sm:px-5",
                    FOCUS,
                  )}
                  style={delay(900)}
                >
                  <CtaCornerPluses onBlue />
                  Request an Introduction
                  <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                </Link>
              </div>

              <ul
                className={cn(
                  GeistMono.className,
                  "mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[9.5px] uppercase tracking-[0.12em] text-[#6E6E6E] sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:text-[10px]",
                )}
                aria-label="Highlights"
              >
                {PROOF_POINTS.map((point, i) => (
                  <li key={point} className="co-in inline-flex items-center gap-2" style={delay(1080 + i * 70)}>
                    <CheckSquare className="size-3 shrink-0 text-[#0000FF]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative flex flex-col overflow-hidden sm:min-h-[460px] lg:h-full lg:min-h-0">
            {/* Phones: canvas sized to the scene (no dead space). sm+: fills the column. */}
            <div className="relative aspect-[25/16] w-full sm:aspect-auto sm:min-h-0 sm:flex-1">
              <SupplyNetworkIllustration />
              <SignalCard />
              <ProcessCard />
            </div>
            <MobileNetworkKey />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Overlay cards on the illustration                                          */
/* ────────────────────────────────────────────────────────────────────────── */

/** Phones only: the three steps the corner cards show on larger screens. */
function MobileNetworkKey() {
  const steps = [
    { label: "Signal", value: "Step 1" },
    { label: "Confirm", value: "Step 2" },
    { label: "Introduce", value: "Step 3" },
  ]
  return (
    <div className={cn(GeistMono.className, "co-in border-t sm:hidden")} style={{ borderColor: LINE, ...delay(1500) }}>
      <dl className="grid grid-cols-3 divide-x" style={{ borderColor: LINE }}>
        {steps.map((m) => (
          <div key={m.label} className="flex flex-col gap-1 px-4 py-3" style={{ borderColor: LINE }}>
            <dt className="text-[9px] uppercase tracking-[0.1em] text-[#6E6E6E]">{m.label}</dt>
            <dd className="text-[15px] leading-none tracking-[-0.03em] text-black tabular-nums">{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Hairline card with the hero's corner-dot motif. */
function OverlayCard({ className, children, enter = 0 }: { className?: string; children: React.ReactNode; enter?: number }) {
  return (
    <div
      className={cn(
        GeistMono.className,
        "co-in pointer-events-none absolute z-10 hidden w-[176px] border bg-white/90 backdrop-blur-[2px] sm:block",
        className,
      )}
      style={{ borderColor: LINE, ...delay(enter) }}
      aria-hidden
    >
      {["left-0 top-0", "left-full top-0", "left-0 top-full", "left-full top-full"].map((pos) => (
        <span key={pos} className={cn("absolute size-[4px] -translate-x-1/2 -translate-y-1/2 bg-[#0000FF]", pos)} />
      ))}
      {children}
    </div>
  )
}

/** Top-left: a sparkline that turns from a past signal into an expected need. Labelled illustrative: no figures. */
function SignalCard() {
  return (
    <OverlayCard className="left-4 top-4 lg:left-6 lg:top-6" enter={1500}>
      <div className="flex items-center justify-between px-3 pt-2.5 text-[9px] uppercase leading-none tracking-[0.14em] text-[#6E6E6E]">
        <span>Signal</span>
        <span className="text-[#0000FF]">Illustrative</span>
      </div>
      <div className="flex items-baseline gap-1.5 px-3 pt-2">
        <span className="text-[16px] leading-none tracking-[-0.03em] text-black">Need forecast</span>
      </div>
      <svg viewBox="0 0 152 34" className="mt-2 block h-[34px] w-full" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="co-fc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0000FF" stopOpacity="0.14" />
            <stop offset="1" stopColor="#0000FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="co-fc-g">
          <path d="M84 16 L98 12 L112 13 L126 7 L140 8 L152 3 L152 34 L84 34 Z" fill="url(#co-fc-fill)" />
          <path d="M84 4 V34" stroke="#0000FF" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M0 28 L14 24 L28 26 L42 20 L56 22 L70 17 L84 16"
            stroke="#000"
            strokeWidth="1.2"
            strokeLinejoin="round"
            pathLength={1}
            className="co-fc-line"
          />
          <path d="M84 16 L98 12 L112 13 L126 7 L140 8 L152 3" stroke="#0000FF" strokeWidth="1.2" strokeDasharray="3 2" strokeLinejoin="round" />
          {/* wipes away to reveal the forecast half, then the loop restarts */}
          <rect x="83" y="0" width="70" height="34" className="co-fc-cover" />
          <rect x="82" y="14" width="4" height="4" fill="#0000FF" />
          <rect x="82" y="14" width="4" height="4" fill="#0000FF" className="co-fc-pulse" />
        </g>
      </svg>
      <div className="flex justify-between border-t px-3 py-1.5 text-[8.5px] uppercase leading-none tracking-[0.1em]" style={{ borderColor: LINE }}>
        <span className="text-[#6E6E6E]">Signal</span>
        <span className="text-[#0000FF]">Intro →</span>
      </div>
    </OverlayCard>
  )
}

/** Bottom-right: the three working steps, each over a hairline track. No metrics. */
function ProcessCard() {
  const rows = [
    { label: "Find the signal", value: "01", d: 0 },
    { label: "Confirm the need", value: "02", d: 1100 },
    { label: "Make the intro", value: "03", d: 2200 },
  ]
  return (
    <OverlayCard className="bottom-4 right-4 lg:bottom-6 lg:right-6" enter={1620}>
      <div className="flex items-center justify-between px-3 pt-2.5 text-[9px] uppercase leading-none tracking-[0.14em] text-[#6E6E6E]">
        <span className="flex items-center gap-1.5">
          <span className="co-blink size-[5px] bg-[#0000FF]" />
          Process
        </span>
        <span>Fixed fee</span>
      </div>
      <dl className="space-y-2 px-3 pb-3 pt-2.5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between text-[9.5px] uppercase leading-none tracking-[0.06em]">
              <dt className="text-[#6E6E6E]">{row.label}</dt>
              <dd className="co-lit tabular-nums" style={delay(2000 + row.d)}>{row.value}</dd>
            </div>
            <div className="mt-1.5 h-px w-full bg-black/10">
              <div className="co-fill h-px w-full bg-[#0000FF]" style={delay(2000 + row.d)} />
            </div>
          </div>
        ))}
      </dl>
    </OverlayCard>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Supply network illustration: built in code, dithered on a canvas          */
/* ────────────────────────────────────────────────────────────────────────── */

type Pt = { x: number; y: number }
type Iso = (x: number, y: number, z?: number) => Pt

/** Ground routes (iso units, z = 0). Goods flow in point order. */
const ROUTES: { pts: [number, number][]; packets: number; speed: number }[] = [
  // Supplier port to hub
  { pts: [[3.6, 6.6], [5.0, 6.6]], packets: 2, speed: 0.11 },
  // Factory to hub
  { pts: [[6.6, 3.1], [6.6, 5.0]], packets: 2, speed: 0.09 },
  // Hub to store
  { pts: [[8.1, 6.6], [10.2, 6.6], [10.2, 8.9]], packets: 3, speed: 0.07 },
]

/**
 * Labelled nodes, in flow order. `at` = anchor on the building (iso units),
 * `off` = where the tag sits relative to the anchor (in scene units, screen space).
 */
const NODES = [
  { id: "supply", label: "01 SUPPLY", sub: "PORT", at: [1.3, 7.3, 1.9], off: [-1.4, -2.2], signal: [2.0, 6.5, 1.9] },
  { id: "make", label: "02 MAKE", sub: "PLANT", at: [8.4, 1.7, 1.3], off: [1.6, -1.6], signal: [6.7, 1.8, 2.3] },
  { id: "store", label: "03 STORE", sub: "HUB", at: [8.1, 7.6, 0.9], off: [2.4, 0.4], signal: null },
  { id: "sell", label: "04 SELL", sub: "RETAIL", at: [9.6, 11.0, 0.6], off: [-2.6, 0.9], signal: [10.2, 10.0, 1.3] },
] as const

const CORE_AT: [number, number, number] = [6.5, 6.5, 5.6]

/** Selectable blocks. Order = id in the hit-test mask (red channel = (index + 1) x 40). */
const GROUPS = ["supply", "make", "store", "sell", "core"] as const
type GroupId = (typeof GROUPS)[number]

/** What each block means for us, shown in its tag when selected. Plain words, no metrics. */
const GROUP_INFO: Record<GroupId, string> = {
  supply: "SUPPLIERS WE INTRODUCE",
  make: "PRODUCERS NEEDING BUYERS",
  store: "WE CHECK THE FIT",
  sell: "BUYERS WHO MAY NEED YOU",
  core: "READS PUBLIC SIGNALS",
}

/** Floor footprint (x, y, w, d in iso units) outlined by the selection frame. */
const GROUP_FOOTPRINT: Partial<Record<GroupId, [number, number, number, number]>> = {
  supply: [0.2, 4.6, 3.6, 4.0],
  make: [4.8, 0.4, 3.8, 2.6],
  store: [4.8, 4.8, 3.5, 3.75],
  sell: [9.0, 8.8, 2.85, 2.85],
}

/** When set, `poly` fills flat with this colour and seams / grid are skipped (hit-test mask pass). */
let maskFill: string | null = null
/** When true, `poly` / `box` draw nothing (used to paint the floor alone for the intro). */
let skipPaint = false

/** Fill a polygon in grey (0 = black ink, 1 = paper). */
function poly(ctx: CanvasRenderingContext2D, pts: Pt[], lum: number) {
  if (skipPaint) return
  const v = Math.round(lum * 255)
  ctx.fillStyle = maskFill ?? `rgb(${v},${v},${v})`
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.closePath()
  ctx.fill()
}

/** Isometric box: draws the two front faces then the top. */
function box(
  ctx: CanvasRenderingContext2D,
  iso: Iso,
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
  shade: [number, number, number] = [0.5, 0.22, 0.04],
) {
  const [top, left, right] = shade
  // Left-front face (y + d)
  poly(ctx, [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)], left)
  // Right-front face (x + w)
  poly(ctx, [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)], right)
  // Top
  const t0 = iso(x, y, z + h)
  const t1 = iso(x + w, y, z + h)
  const t2 = iso(x + w, y + d, z + h)
  const t3 = iso(x, y + d, z + h)
  poly(ctx, [t0, t1, t2, t3], top)
  if (maskFill || skipPaint) return
  // Seams: top outline + the front vertical edge, in paper white
  const corner = iso(x + w, y + d, z)
  ctx.strokeStyle = "rgba(255,255,255,0.85)"
  ctx.lineWidth = 1
  ctx.lineJoin = "round"
  ctx.beginPath()
  ctx.moveTo(t3.x, t3.y)
  ctx.lineTo(t2.x, t2.y)
  ctx.lineTo(t1.x, t1.y)
  ctx.moveTo(t2.x, t2.y)
  ctx.lineTo(corner.x, corner.y)
  ctx.stroke()
}

/**
 * Paints the static scene in greyscale; the dither pass turns it into blue dots.
 * `group` is called before each selectable block (and with `null` for floor / roads),
 * which lets the same painter produce the hit-test mask.
 */
function paintScene(ctx: CanvasRenderingContext2D, iso: Iso, group: (id: GroupId | null) => void = () => {}) {
  const N = 12
  group(null)
  // Platform slab
  box(ctx, iso, 0, 0, -0.35, N, N, 0.35, [0.935, 0.4, 0.15])
  // Blueprint grid on the floor
  ctx.lineWidth = 1.2
  ctx.strokeStyle = "rgb(140,140,140)"
  for (let i = 0; i <= N && !maskFill; i += 2) {
    const a = iso(i, 0, 0)
    const b = iso(i, N, 0)
    const c = iso(0, i, 0)
    const e = iso(N, i, 0)
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.moveTo(c.x, c.y)
    ctx.lineTo(e.x, e.y)
    ctx.stroke()
  }

  // Roads (flat strips)
  const road = (x0: number, y0: number, x1: number, y1: number) => {
    const hw = 0.38
    const minX = Math.min(x0, x1) - (x0 === x1 ? hw : 0)
    const maxX = Math.max(x0, x1) + (x0 === x1 ? hw : 0)
    const minY = Math.min(y0, y1) - (y0 === y1 ? hw : 0)
    const maxY = Math.max(y0, y1) + (y0 === y1 ? hw : 0)
    poly(ctx, [iso(minX, minY, 0.01), iso(maxX, minY, 0.01), iso(maxX, maxY, 0.01), iso(minX, maxY, 0.01)], 0.98)
  }
  for (const r of ROUTES) for (let i = 0; i < r.pts.length - 1; i++) road(r.pts[i][0], r.pts[i][1], r.pts[i + 1][0], r.pts[i + 1][1])

  group("make")
  // 02 MAKE: factory with main hall, saw-tooth roof and two stacks (back, drawn first)
  box(ctx, iso, 5.0, 0.6, 0, 3.4, 2.2, 1.5)
  for (let i = 0; i < 3; i++) box(ctx, iso, 5.0 + i * 1.13, 0.6, 1.5, 1.13, 2.2, 0.32 + (i % 2) * 0.14, [0.42, 0.2, 0.04])
  box(ctx, iso, 5.35, 0.85, 1.6, 0.42, 0.42, 1.8, [0.3, 0.12, 0])
  box(ctx, iso, 6.05, 0.85, 1.6, 0.42, 0.42, 1.35, [0.3, 0.12, 0])

  group("supply")
  // 01 SUPPLY: port with quay and container stacks
  box(ctx, iso, 0.4, 4.8, 0, 3.2, 3.6, 0.18, [0.8, 0.45, 0.25])
  const containers: [number, number, number, [number, number, number]][] = [
    [0.7, 5.1, 0, [0.42, 0.18, 0.02]],
    [0.7, 5.1, 0.55, [0.6, 0.3, 0.08]],
    [0.7, 6.0, 0, [0.6, 0.3, 0.08]],
    [0.7, 6.9, 0, [0.42, 0.18, 0.02]],
    [0.7, 6.9, 0.55, [0.36, 0.16, 0]],
    [0.7, 6.9, 1.1, [0.6, 0.3, 0.08]],
    [2.0, 5.1, 0, [0.36, 0.16, 0]],
    [2.0, 6.0, 0, [0.42, 0.18, 0.02]],
    [2.0, 6.0, 0.55, [0.6, 0.3, 0.08]],
  ]
  for (const [x, y, z, s] of containers) box(ctx, iso, x, y, z + 0.18, 1.15, 0.8, 0.55, s)

  group("store")
  // 03 STORE: distribution hub (centre) with loading docks
  box(ctx, iso, 5.0, 5.0, 0, 3.1, 3.1, 1.85, [0.46, 0.2, 0.02])
  for (let i = 0; i < 3; i++) box(ctx, iso, 5.35 + i * 0.95, 8.1, 0, 0.6, 0.25, 0.75, [0.9, 0.85, 0.75])
  box(ctx, iso, 5.8, 5.8, 1.85, 1.5, 1.5, 0.2, [0.85, 0.5, 0.3])

  group("sell")
  // 04 SELL: retail store with awning
  box(ctx, iso, 9.2, 9.0, 0, 2.0, 2.0, 1.1, [0.5, 0.24, 0.05])
  box(ctx, iso, 9.2, 10.95, 0.85, 2.0, 0.45, 0.12, [0.15, 0.04, 0])
  box(ctx, iso, 11.15, 9.0, 0.85, 0.45, 2.0, 0.12, [0.15, 0.04, 0])

  group("core")
  // Forecast engine: floating cube above the hub
  const [cx, cy, cz] = CORE_AT
  box(ctx, iso, cx - 0.6, cy - 0.6, cz - 0.6, 1.2, 1.2, 1.2, [0.35, 0.1, 0])
}

/** Point at distance `t` (0..1) along a polyline. */
function along(pts: Pt[], t: number): Pt {
  const lens: number[] = []
  let total = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y)
    lens.push(l)
    total += l
  }
  let d = t * total
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const k = lens[i] ? d / lens[i] : 0
      return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * k, y: pts[i].y + (pts[i + 1].y - pts[i].y) * k }
    }
    d -= lens[i]
  }
  return pts[pts.length - 1]
}

/**
 * Isometric supply network: port, plant, hub and retail, with the forecast engine
 * above the hub. The scene is painted in grey, Bayer-dithered into blue dots
 * (dots bend away from the pointer), then crisp live layers are drawn on top:
 * goods moving along the roads, forecast signals from the engine to every node,
 * and labelled tags.
 */
function SupplyNetworkIllustration({ cell = 3, dot = 1.7 }: { cell?: number; dot?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduced = false // motion always on, by request
    const mono = getComputedStyle(wrap).getPropertyValue("--co-mono").trim() || "ui-monospace, monospace"

    let raf = 0
    let running = true
    let visible = true
    let dpr = 1
    let width = 0
    let height = 0
    let pointerX = -9999
    let pointerY = -9999
    let targetX = -9999
    let targetY = -9999
    let hasPointer = false
    let lastManual = -1e9 // last time a real pointer or tap steered the scene
    let disturb = false // dots bend around the (real or virtual) pointer
    let pixels: Uint8ClampedArray | null = null
    let mask: Uint8ClampedArray | null = null
    /** Each block's ink, cropped to its bounds (device px), for drawing it at full strength. */
    let groupInk: Partial<Record<GroupId, { c: HTMLCanvasElement; x: number; y: number }>> = {}
    /** Tag boxes from the last frame (css px), for hover hit-testing. */
    let tagRects: { id: GroupId; x: number; y: number; w: number; h: number }[] = []
    let selected: GroupId | null = null // block shown as selected (kept while fading out)
    let sticky: GroupId | null = null // touch selection
    let hp = 0 // selection progress 0..1
    let iso: Iso = () => ({ x: 0, y: 0 })
    let unit = 1
    const start = performance.now()

    const shade = document.createElement("canvas")
    const shadeCtx = shade.getContext("2d", { willReadFrequently: true })
    if (!shadeCtx) return
    // Blue ink version of the scene, drawn under the dots (dense like the original art)
    const ink = document.createElement("canvas")
    const inkCtx = ink.getContext("2d")
    if (!inkCtx) return
    // Intro helpers: floor-only ink, and an offscreen layer for the live overlays
    const floorInk = document.createElement("canvas")
    const floorCtx = floorInk.getContext("2d")
    const live = document.createElement("canvas")
    const liveCtx = live.getContext("2d")
    if (!floorCtx || !liveCtx) return
    let shadeW = 1

    const layout = () => {
      // Scene spans x-y in [-12, 12] (x0.866) and height from z~7 above to the slab below.
      // Leaves room for the corner cards (signal top-left, process bottom-right).
      const compact = width < 560
      // Phones: no corner cards, so fit the scene's true extent and centre it.
      unit = compact
        ? Math.max(8, Math.min((width - 20) / 21.6, (height - 16) / 13.6))
        : Math.max(8, Math.min((width - 28) / 24, (height - 28) / 22))
      const ox = width / 2
      const oy = compact ? height / 2 - 5.75 * unit : height / 2 - 3.1 * unit
      iso = (x, y, z = 0) => ({ x: ox + (x - y) * unit * 0.866, y: oy + (x + y) * unit * 0.5 - z * unit })
    }

    /** Group index from a mask red value (anti-aliased edges are ignored). */
    function maskIndex(r: number) {
      const g = Math.round(r / 40) - 1
      return g >= 0 && g < GROUPS.length && Math.abs(r - (g + 1) * 40) <= 10 ? g : -1
    }

    const paintShade = () => {
      shadeW = Math.max(1, Math.round(width * dpr))
      const shadeH = Math.max(1, Math.round(height * dpr))
      shade.width = shadeW
      shade.height = shadeH
      shadeCtx.setTransform(1, 0, 0, 1, 0, 0)
      shadeCtx.fillStyle = "#ffffff"
      shadeCtx.fillRect(0, 0, shadeW, shadeH)
      shadeCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintScene(shadeCtx, iso)
      try {
        pixels = shadeCtx.getImageData(0, 0, shadeW, shadeH).data
      } catch {
        pixels = null
        return
      }
      // Ink: pure #0000FF with alpha from darkness: solid on shadow faces, tinted on lit ones
      ink.width = shadeW
      ink.height = shadeH
      const out = inkCtx.createImageData(shadeW, shadeH)
      const o = out.data
      for (let i = 0; i < pixels.length; i += 4) {
        const dark = 1 - pixels[i] / 255
        o[i] = 0
        o[i + 1] = 0
        o[i + 2] = 255
        o[i + 3] = dark < 0.05 ? 0 : Math.min(255, Math.round(dark * 1.12 * 255))
      }
      inkCtx.putImageData(out, 0, 0)

      // Hit-test mask: same painter, each block in a flat id colour on black
      shadeCtx.setTransform(1, 0, 0, 1, 0, 0)
      shadeCtx.fillStyle = "#000000"
      shadeCtx.fillRect(0, 0, shadeW, shadeH)
      shadeCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintScene(shadeCtx, iso, (id) => {
        maskFill = id ? `rgb(${(GROUPS.indexOf(id) + 1) * 40},0,0)` : "#000000"
      })
      maskFill = null
      try {
        mask = shadeCtx.getImageData(0, 0, shadeW, shadeH).data
      } catch {
        mask = null
      }

      // Per-block ink crops (+ floor-only ink for the build-in intro)
      groupInk = {}
      if (!mask) return
      // Floor alone (blocks skipped), so the ground is complete before the blocks rise onto it
      shadeCtx.setTransform(1, 0, 0, 1, 0, 0)
      shadeCtx.fillStyle = "#ffffff"
      shadeCtx.fillRect(0, 0, shadeW, shadeH)
      shadeCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paintScene(shadeCtx, iso, (id) => {
        skipPaint = id !== null
      })
      skipPaint = false
      floorInk.width = shadeW
      floorInk.height = shadeH
      try {
        const floorShade = shadeCtx.getImageData(0, 0, shadeW, shadeH).data
        const floorImg = floorCtx.createImageData(shadeW, shadeH)
        for (let i = 0; i < floorShade.length; i += 4) {
          const dark = 1 - floorShade[i] / 255
          if (dark < 0.05) continue
          floorImg.data[i + 2] = 255
          floorImg.data[i + 3] = Math.min(255, Math.round(dark * 1.12 * 255))
        }
        floorCtx.putImageData(floorImg, 0, 0)
      } catch {
        /* intro just shows blocks */
      }
      const bounds = GROUPS.map(() => ({ x0: shadeW, y0: shadeH, x1: -1, y1: -1 }))
      for (let y = 0; y < shadeH; y++) {
        for (let x = 0; x < shadeW; x++) {
          const g = maskIndex(mask[(y * shadeW + x) * 4])
          if (g < 0) continue
          const b = bounds[g]
          if (x < b.x0) b.x0 = x
          if (y < b.y0) b.y0 = y
          if (x > b.x1) b.x1 = x
          if (y > b.y1) b.y1 = y
        }
      }
      GROUPS.forEach((id, g) => {
        const b = bounds[g]
        if (b.x1 < 0) return
        const w = b.x1 - b.x0 + 1
        const h = b.y1 - b.y0 + 1
        const c = document.createElement("canvas")
        c.width = w
        c.height = h
        const cctx = c.getContext("2d")
        if (!cctx) return
        const img = cctx.createImageData(w, h)
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const src = ((b.y0 + y) * shadeW + (b.x0 + x)) * 4
            if (maskIndex(mask![src]) !== g) continue
            const dst = (y * w + x) * 4
            img.data[dst + 2] = 255
            img.data[dst + 3] = o[src + 3]
          }
        }
        cctx.putImageData(img, 0, 0)
        groupInk[id] = { c, x: b.x0, y: b.y0 }
      })
    }

    /** Block under a css-px point: tags first, then the painted block itself. */
    const hitTest = (px: number, py: number): GroupId | null => {
      for (const r of tagRects) if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) return r.id
      if (!mask) return null
      const ix = Math.round(px * dpr)
      const iy = Math.round(py * dpr)
      if (ix < 0 || iy < 0 || ix >= shadeW || iy >= Math.round(height * dpr)) return null
      const g = maskIndex(mask[(iy * shadeW + ix) * 4])
      return g >= 0 ? GROUPS[g] : null
    }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      live.width = canvas.width
      live.height = canvas.height
      layout()
      paintShade()
      if (reduced) draw(0)
    }

    /** Build-in state for the dots: each block's dots fade and rise with that block, floor dots with the floor. */
    type DotIntro = { ga: number[]; go: number[]; fa: number; fo: number }
    const drawDither = (dim: number, intro?: DotIntro) => {
      if (!pixels) return
      const data = pixels
      const selIndex = selected && hp > 0.01 ? GROUPS.indexOf(selected) : -1
      const keep: number[] = []
      ctx.fillStyle = BLUE
      ctx.globalAlpha = dim
      const disturbR = Math.min(width, height) * 0.28
      const disturbR2 = disturbR * disturbR
      const amp = disturbR * 0.24
      const half = dot * 0.5

      for (let y = cell * 0.5; y < height; y += cell) {
        for (let x = cell * 0.5; x < width; x += cell) {
          let sx = x
          let sy = y
          if (disturb) {
            const pdx = x - pointerX
            const pdy = y - pointerY
            const d2 = pdx * pdx + pdy * pdy
            if (d2 < disturbR2 && d2 > 0.001) {
              const t = 1 - d2 / disturbR2
              const inv = (amp * t * t) / Math.sqrt(d2)
              sx = x + pdx * inv * 0.4
              sy = y + pdy * inv * 0.4
            }
          }
          const ix = Math.max(0, Math.min(shadeW - 1, Math.round(sx * dpr)))
          const iy = Math.max(0, Math.min(Math.round(height * dpr) - 1, Math.round(sy * dpr)))
          const lum = data[(iy * shadeW + ix) * 4] / 255
          const density = Math.min(1, (1 - lum) * 1.25)
          if (density < 0.04) continue
          const threshold = ((BAYER4[(Math.floor(y / cell) & 3) * 4 + (Math.floor(x / cell) & 3)] ?? 0) + 0.5) / 16
          if (density < threshold * 0.92) continue
          if (intro) {
            const g = mask ? maskIndex(mask[(iy * shadeW + ix) * 4]) : -1
            const a = g >= 0 ? intro.ga[g] : intro.fa
            if (a <= 0.01) continue
            ctx.globalAlpha = a
            ctx.fillRect(x - half, y - half + (g >= 0 ? intro.go[g] : intro.fo), dot, dot)
            continue
          }
          if (selIndex >= 0 && mask && maskIndex(mask[(iy * shadeW + ix) * 4]) === selIndex) {
            keep.push(x, y)
            continue
          }
          ctx.fillRect(x - half, y - half, dot, dot)
        }
      }
      ctx.globalAlpha = 1
      for (let i = 0; i < keep.length; i += 2) ctx.fillRect(keep[i] - half, keep[i + 1] - half, dot, dot)
    }

    const drawLive = (lc: CanvasRenderingContext2D, time: number, dim: number) => {
      const t = time / 1000
      const compact = width < 560
      const sel = hp > 0.01 ? selected : null
      const coreOn = sel === "core"
      tagRects = []

      // Selection frame: marching dashed footprint with corner squares
      const foot = sel ? GROUP_FOOTPRINT[sel] : undefined
      if (foot) {
        const [fx, fy, fw, fd] = foot
        const pts = [iso(fx, fy, 0.02), iso(fx + fw, fy, 0.02), iso(fx + fw, fy + fd, 0.02), iso(fx, fy + fd, 0.02)]
        lc.save()
        lc.globalAlpha = hp
        lc.strokeStyle = BLUE
        lc.lineWidth = 1.25
        lc.setLineDash([4, 3])
        lc.lineDashOffset = -t * 12
        lc.beginPath()
        pts.forEach((pt, i) => (i ? lc.lineTo(pt.x, pt.y) : lc.moveTo(pt.x, pt.y)))
        lc.closePath()
        lc.stroke()
        lc.setLineDash([])
        lc.fillStyle = BLUE
        for (const pt of pts) lc.fillRect(pt.x - 2.5, pt.y - 2.5, 5, 5)
        lc.restore()
      }
      const [cx, cy, cz] = CORE_AT
      const core = iso(cx, cy, cz)

      // Engine: two dotted orbit rings (iso circles) turning in opposite directions
      for (const [r, dir, count] of (compact
        ? [[1.6, 1, 30]]
        : [
            [1.35, 1, 28],
            [1.9, -1, 40],
          ]) as [number, number, number][]) {
        const rx = r * unit * 1.2247
        const ry = r * unit * 0.7071
        lc.fillStyle = BLUE
        lc.globalAlpha = coreOn ? 1 : dim
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + t * 0.35 * dir
          if ((i + Math.floor(t * 2)) % 7 === 0) continue
          lc.fillRect(core.x + Math.cos(a) * rx - 1, core.y + unit * 0.6 + Math.sin(a) * ry - 1, 2, 2)
        }
      }

      lc.globalAlpha = 1
      // Beam: data rising from the hub roof into the engine
      const roof = iso(cx, cy, 2.05)
      const beamTop = core.y + unit * 0.6
      lc.fillStyle = BLUE
      for (let i = 0; i < 6; i++) {
        const k = (t * 0.6 + i / 6) % 1
        const y = roof.y - (roof.y - beamTop) * k
        lc.globalAlpha = (0.25 + 0.75 * Math.sin(k * Math.PI)) * (coreOn || sel === "store" ? 1 : dim)
        lc.fillRect(roof.x - 1.5, y - 1.5, 3, 3)
      }
      lc.globalAlpha = 1

      // Forecast signals: dashed arcs from the engine to each other node
      lc.save()
      lc.strokeStyle = BLUE
      lc.lineWidth = 1
      lc.setLineDash([2, 4])
      lc.lineDashOffset = -t * 14
      for (const node of NODES) {
        if (!node.signal) continue
        const p = iso(node.signal[0], node.signal[1], node.signal[2])
        const c = { x: (core.x + p.x) / 2, y: Math.min(core.y, p.y) - unit * 1.6 }
        const lit = coreOn || sel === node.id
        lc.globalAlpha = lit ? 0.55 + 0.45 * hp : 0.55 * dim
        lc.lineWidth = lit ? 1 + 0.6 * hp : 1
        lc.beginPath()
        lc.moveTo(core.x, core.y)
        lc.quadraticCurveTo(c.x, c.y, p.x, p.y)
        lc.stroke()
        // Travelling pulse
        const k = (t * 0.45 + node.signal[0] * 0.13) % 1
        const qx = (1 - k) * (1 - k) * core.x + 2 * (1 - k) * k * c.x + k * k * p.x
        const qy = (1 - k) * (1 - k) * core.y + 2 * (1 - k) * k * c.y + k * k * p.y
        lc.globalAlpha = lit ? 1 : dim
        lc.fillStyle = BLUE
        const ps = lit ? 2 + hp * 1.5 : 2
        lc.fillRect(qx - ps, qy - ps, ps * 2, ps * 2)
      }
      lc.restore()

      // Goods: iso parcels moving along the roads
      lc.globalAlpha = sel ? Math.max(dim, 0.45) : 1
      for (const route of ROUTES) {
        const pts = route.pts.map(([x, y]) => iso(x, y, 0.12))
        for (let i = 0; i < route.packets; i++) {
          const k = (t * route.speed + i / route.packets) % 1
          const p = along(pts, k)
          const s = Math.max(3, unit * 0.2)
          lc.fillStyle = "#FFFFFF"
          lc.beginPath()
          lc.moveTo(p.x, p.y - s * 0.75)
          lc.lineTo(p.x + s * 1.3, p.y)
          lc.lineTo(p.x, p.y + s * 0.75)
          lc.lineTo(p.x - s * 1.3, p.y)
          lc.closePath()
          lc.fill()
          lc.fillStyle = BLUE
          lc.beginPath()
          lc.moveTo(p.x, p.y - s * 0.5)
          lc.lineTo(p.x + s, p.y)
          lc.lineTo(p.x, p.y + s * 0.5)
          lc.lineTo(p.x - s, p.y)
          lc.closePath()
          lc.fill()
        }
      }

      lc.globalAlpha = 1
      // Tags: leader line + boxed mono label for each node, and the engine label.
      // Same labels at every size, just set smaller on phones.
      const fontSize = compact ? 7.5 : unit < 18 ? 8.5 : 9.5
      lc.font = `500 ${fontSize}px ${mono}`
      lc.textBaseline = "middle"
      /**
       * Leader line from the anchor to (dx, dy), then a boxed label on the far side of it.
       * The selected block's tag inverts to solid blue and grows a second row with its description.
       */
      const tag = (id: GroupId, anchor: Pt, dx: number, dy: number, title: string, sub: string, accent = false) => {
        const on = sel === id
        const fade = sel && !on ? Math.max(dim, 0.4) : 1
        const end = { x: anchor.x + dx, y: anchor.y + dy }
        lc.setLineDash([])
        lc.strokeStyle = BLUE
        lc.globalAlpha = (on ? 0.65 + 0.35 * hp : 0.65) * fade
        lc.lineWidth = on ? 1 + 0.5 * hp : 1
        lc.beginPath()
        lc.moveTo(anchor.x, anchor.y)
        lc.lineTo(end.x, end.y)
        lc.stroke()
        lc.lineWidth = 1
        lc.globalAlpha = fade
        lc.fillStyle = "#FFFFFF"
        lc.fillRect(anchor.x - 3, anchor.y - 3, 6, 6)
        lc.fillStyle = BLUE
        lc.fillRect(anchor.x - 2, anchor.y - 2, 4, 4)

        const pad = compact ? 5 : 7
        const label = `${title} · ${sub}`
        const info = GROUP_INFO[id]
        const expanded = on && hp > 0.35
        const smallFont = fontSize - 1
        let w = Math.ceil(lc.measureText(label).width) + pad * 2
        if (expanded) {
          lc.font = `500 ${smallFont}px ${mono}`
          w = Math.max(w, Math.ceil(lc.measureText(info).width) + pad * 2)
          lc.font = `500 ${fontSize}px ${mono}`
        }
        const rowH = fontSize + (compact ? 8 : 10)
        const h = expanded ? rowH + smallFont + (compact ? 4 : 6) : rowH
        // Box sits beyond the leader end: left of it, right of it, or centred above.
        const rawX = dx < -1 ? end.x - w : dx > 1 ? end.x : end.x - w / 2
        // Keep every tag inside the panel on narrow screens.
        const x = Math.round(Math.max(4, Math.min(width - w - 4, rawX)))
        const rawY = Math.abs(dx) > 1 ? end.y - rowH / 2 : end.y - h
        const y = Math.round(Math.max(3, Math.min(height - h - 3, rawY)))
        const solid = accent || expanded
        lc.fillStyle = solid ? BLUE : "#FFFFFF"
        lc.fillRect(x, y, w, h)
        lc.strokeStyle = BLUE
        lc.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1)
        lc.fillStyle = solid ? "#FFFFFF" : BLUE
        lc.fillText(label, x + pad, y + rowH / 2 + 0.5)
        if (expanded) {
          lc.globalAlpha = fade * Math.min(1, (hp - 0.35) / 0.4)
          lc.font = `500 ${smallFont}px ${mono}`
          lc.fillStyle = "rgba(255,255,255,0.78)"
          lc.fillText(info, x + pad, y + rowH + smallFont / 2 - 1)
          lc.font = `500 ${fontSize}px ${mono}`
        }
        lc.globalAlpha = 1
        tagRects.push({ id, x, y, w, h })
      }
      for (const node of NODES) {
        const a = iso(node.at[0], node.at[1], node.at[2])
        const k = compact ? 0.6 : 1
        tag(node.id, a, node.off[0] * unit * k, node.off[1] * unit * k, node.label, node.sub)
      }
      tag("core", { x: core.x, y: core.y - unit * 0.62 }, 0, -unit * (compact ? 0.6 : 0.9), "SIGNALS", "FORECAST ENGINE", true)
    }

    const easeOut = (v: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, v)), 3)

    const drawIntro = (ts: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, width, height)
      canvas.style.cursor = "default"
      if (!pixels) return

      const fp = easeOut((ts - 0.3) / 0.7)
      if (fp > 0) {
        ctx.globalAlpha = fp
        ctx.drawImage(floorInk, 0, (1 - fp) * 10, width, height)
      }
      const gps = GROUPS.map((_, i) => easeOut((ts - (0.6 + i * 0.16)) / 0.6))
      GROUPS.forEach((id, i) => {
        const gp = gps[i]
        const gi = groupInk[id]
        if (!gi || gp <= 0) return
        ctx.globalAlpha = gp
        ctx.drawImage(gi.c, gi.x / dpr, gi.y / dpr + (1 - gp) * 22, gi.c.width / dpr, gi.c.height / dpr)
      })
      ctx.globalAlpha = 1

      // Dots arrive with the artifact: the floor's dots with the floor, each block's dots rising with that block
      if (width >= 560) drawDither(1, { ga: gps, go: gps.map((g) => (1 - g) * 22), fa: fp, fo: (1 - fp) * 10 })

      const lp = easeOut((ts - 1.6) / 0.8)
      if (lp > 0) {
        liveCtx.setTransform(1, 0, 0, 1, 0, 0)
        liveCtx.clearRect(0, 0, live.width, live.height)
        liveCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
        drawLive(liveCtx, ts * 1000, 1)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.globalAlpha = lp
        ctx.drawImage(live, 0, 0)
        ctx.globalAlpha = 1
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    const draw = (time: number) => {
      // With no visitor steering, a virtual pointer drifts over the scene and the blocks
      // take turns being selected, so the figure is alive without the cursor.
      const ts0 = time / 1000
      const manual = hasPointer || sticky !== null || performance.now() - lastManual < 1600
      const auto = !reduced && !manual && ts0 >= 2.4
      let tx = targetX
      let ty = targetY
      if (auto) {
        tx = width * (0.5 + 0.3 * Math.sin(ts0 * 0.45))
        ty = height * (0.52 + 0.22 * Math.sin(ts0 * 0.31 + 1.3))
      }
      if (pointerX < -1000 && tx > -1000) {
        pointerX = tx
        pointerY = ty
      }
      pointerX += (tx - pointerX) * 0.18
      pointerY += (ty - pointerY) * 0.18
      disturb = hasPointer || auto

      // Build-in intro: floor settles, blocks rise in one by one, then dots and live layers fade in
      const ts = time / 1000
      const introDone = reduced || ts >= 2.4
      if (!introDone) {
        drawIntro(ts)
        return
      }

      // Selection: hover (mouse) or tap (touch); eases in and out
      let target = sticky ?? (hasPointer ? hitTest(targetX, targetY) : null)
      if (auto && !target) {
        const cycle = 3.1
        const k = Math.floor((ts0 - 2.4) / cycle)
        const phase = ((ts0 - 2.4) % cycle) / cycle
        if (phase < 0.78) target = GROUPS[k % GROUPS.length]
      }
      if (target) selected = target
      const goal = target ? 1 : 0
      hp = reduced ? goal : hp + (goal - hp) * 0.16
      if (!target && hp < 0.01) selected = null
      canvas.style.cursor = target && (hasPointer || sticky) ? "pointer" : "default"
      const dim = 1 - 0.68 * hp

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, width, height)
      if (pixels) {
        ctx.globalAlpha = dim
        ctx.drawImage(ink, 0, 0, width, height)
        ctx.globalAlpha = 1
        const gi = selected && hp > 0.01 ? groupInk[selected] : undefined
        if (gi) {
          ctx.globalAlpha = hp
          ctx.drawImage(gi.c, gi.x / dpr, gi.y / dpr, gi.c.width / dpr, gi.c.height / dpr)
          ctx.globalAlpha = 1
        }
      }
      if (width >= 560) drawDither(dim)
      drawLive(ctx, time, dim)
    }

    const loop = (now: number) => {
      if (!running) return
      if (visible) draw(reduced ? 0 : now - start)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
      if (!hasPointer) {
        pointerX = targetX
        pointerY = targetY
      }
      hasPointer = true
      lastManual = performance.now()
    }
    const onLeave = () => {
      lastManual = performance.now()
      hasPointer = false
      targetX = -9999
      targetY = -9999
    }
    const onDown = (event: PointerEvent) => {
      onMove(event)
      if (event.pointerType === "mouse") return
      const hit = hitTest(targetX, targetY)
      sticky = hit && hit !== sticky ? hit : null
      lastManual = performance.now()
    }

    resize()
    raf = requestAnimationFrame(loop)
    void document.fonts?.ready.then(() => draw(0))

    const ro = new ResizeObserver(() => resize())
    ro.observe(wrap)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
    })
    io.observe(wrap)
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerleave", onLeave)
    canvas.addEventListener("pointerdown", onDown)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerleave", onLeave)
      canvas.removeEventListener("pointerdown", onDown)
    }
  }, [cell, dot])

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0"
      style={{ ["--co-mono" as string]: GeistMono.style.fontFamily }}
      role="img"
      aria-label={`Supply network: port, plant, distribution hub and retail store connected by roads, with a forecast engine above the hub sending signals to every node. Contact ${EMAIL}.`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-default" />
    </div>
  )
}
