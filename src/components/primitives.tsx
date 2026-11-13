import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

export const BLUE = "#0000FF"
export const LINE = "rgba(0, 0, 0, 0.15)"
export const MUTED = "#6E6E6E"

export const EMAIL = "mert@clientoptimal.com"
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Introduction request")}`

/** Same fonts as the reference hero: Geist Sans (body) and Geist Mono (labels). */
export const GeistSans = { className: "font-sans" }
export const GeistMono = {
  className: "font-mono",
  style: { fontFamily: '"Geist Mono Variable", ui-monospace, SFMono-Regular, monospace' },
}

/** Entrance delay for `.co-in` / `.co-fade` / `.co-word`. */
export const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as React.CSSProperties

export const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#0000FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"

/** Shared column split: center divider sits at about 46%. */
export const SPLIT = "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"

/** Fade-rise on first scroll into view (sections below the hero). */
export function Reveal({
  children,
  delayMs = 0,
  className,
}: {
  children: React.ReactNode
  delayMs?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      setOn(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={cn(on ? "co-in" : "opacity-0", className)} style={delay(delayMs)}>
      {children}
    </div>
  )
}

/** Thin plus mark on grid intersections. Omits wings that have no border to align with. */
type PlusEdge = "left" | "right" | "top" | "bottom"

export function GridPlus({
  className,
  edge,
  markClassName = "bg-black/20",
}: {
  className?: string
  /** Wing(s) to drop (outward sides with no line). */
  edge?: PlusEdge | PlusEdge[]
  markClassName?: string
}) {
  const omit = new Set(Array.isArray(edge) ? edge : edge ? [edge] : [])
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute z-30 size-[11px] -translate-x-1/2 -translate-y-1/2", className)}
    >
      {!omit.has("top") && (
        <span className={cn("absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 rounded-full", markClassName)} />
      )}
      {!omit.has("bottom") && (
        <span className={cn("absolute left-1/2 bottom-0 h-1/2 w-px -translate-x-1/2 rounded-full", markClassName)} />
      )}
      {!omit.has("left") && (
        <span className={cn("absolute top-1/2 left-0 h-px w-1/2 -translate-y-1/2 rounded-full", markClassName)} />
      )}
      {!omit.has("right") && (
        <span className={cn("absolute top-1/2 right-0 h-px w-1/2 -translate-y-1/2 rounded-full", markClassName)} />
      )}
    </span>
  )
}

/**
 * Corner dots for buttons: a small square dot centred exactly on each corner,
 * layered above the button. Black on blue buttons, blue on grey.
 */
export function CtaCornerPluses({ onBlue = false }: { onBlue?: boolean }) {
  const dot = onBlue ? "bg-black" : "bg-[#0000FF]"
  const corners = ["left-0 top-0", "left-full top-0", "left-0 top-full", "left-full top-full"]
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-50">
      {corners.map((pos) => (
        <span
          key={pos}
          className={cn(
            "absolute size-[5px] -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
            dot,
            pos,
          )}
        />
      ))}
    </span>
  )
}

/** Client Optimal mark: an outlined square overlapping a solid blue square, like two linked parties. */
export function ClientMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden className={className}>
      <rect x="1.5" y="1.5" width="9" height="9" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7.5" y="7.5" width="9" height="9" fill="currentColor" />
    </svg>
  )
}

export function CheckSquare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <rect x="0.5" y="0.5" width="11" height="11" stroke="currentColor" />
      <path d="M3.2 6.2 5.1 8l3.7-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  )
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
