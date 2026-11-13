import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { CountUp, Mark, RoutePulse, useInViewOnce } from "./motion"
import {
  ArrowUpRight,
  CtaCornerPluses,
  EMAIL,
  FOCUS,
  GeistMono,
  GridPlus,
  LINE,
  MAILTO,
  Reveal,
  SPLIT,
} from "./primitives"
import CaseDocument from "./CaseDocument"
import type { Case } from "../data/cases"

/** Same framed page as the hero: left and right borders only, same inset. */
export function Band({
  id,
  children,
  className,
  fade = true,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  fade?: boolean
}) {
  const [ref, on] = useInViewOnce<HTMLElement>(0.04)
  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative mx-3 border-x bg-white sm:mx-6 lg:mx-10", fade && (on ? "co-fade" : "opacity-0"), className)}
      style={{ borderColor: LINE }}
    >
      {children}
    </section>
  )
}

/** A bordered row with plus marks on its left and right edges (and on the centre divider on lg+). */
export function Row({
  children,
  className,
  split = false,
  top = false,
}: {
  children: React.ReactNode
  className?: string
  split?: boolean
  top?: boolean
}) {
  return (
    <div className={cn("relative border-b", split && `grid grid-cols-1 ${SPLIT}`, className)} style={{ borderColor: LINE }}>
      <GridPlus edge="left" className="left-0 top-full" />
      <GridPlus edge="right" className="left-full top-full" />
      {top && (
        <>
          <GridPlus edge="left" className="left-0 top-0" />
          <GridPlus edge="right" className="left-full top-0" />
        </>
      )}
      {split && <GridPlus className="left-[46%] top-full hidden lg:block" />}
      {children}
    </div>
  )
}

export function Label({ n, children, onDark = false }: { n: string; children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em]", onDark ? "text-white/60" : "text-[#6E6E6E]")}>
      <span className={onDark ? "text-white" : "text-[#0000FF]"}>{n}</span> / {children}
    </p>
  )
}

/** Section headline. `wide` lets it run longer for big marketing statements. */
export function H2({ children, wide = false, className }: { children: React.ReactNode; wide?: boolean; className?: string }) {
  return (
    <h2
      className={cn(
        "mt-4 text-[1.7rem] font-medium uppercase leading-[1.05] tracking-[-0.035em] sm:text-[2.1rem] lg:text-[clamp(1.9rem,2.7vw,2.9rem)] lg:leading-[1.03]",
        wide ? "max-w-[24ch]" : "max-w-[18ch]",
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function Lead({ children, onDark = false, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p className={cn("mt-4 max-w-[46ch] text-[13.5px] leading-[1.6] sm:text-[14.5px] lg:text-[15px]", onDark ? "text-white/65" : "text-[#6E6E6E]", className)}>
      {children}
    </p>
  )
}

export const PAD = "px-4 py-9 sm:px-6 sm:py-11 lg:px-10 lg:py-14"

/** Buttons used across pages. Links use the router. */
export function PrimaryLink({
  to,
  children,
  onDark = false,
  external = false,
  className,
}: {
  to: string
  children: React.ReactNode
  onDark?: boolean
  external?: boolean
  className?: string
}) {
  const cls = cn(
    "group relative inline-flex h-11 w-full items-center justify-center gap-2 px-5 text-[13px] font-normal transition-colors duration-150 sm:w-auto",
    onDark ? "bg-white text-black hover:bg-[#EDEDED]" : "bg-black text-white hover:bg-[#0000FF]",
    FOCUS,
    className,
  )
  const inner = (
    <>
      <CtaCornerPluses onBlue={!onDark} />
      {children}
      <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
    </>
  )
  return external ? (
    <a href={to} className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  )
}

export function GhostLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative inline-flex h-11 w-full items-center justify-center bg-[#E8E8E8] px-5 text-[13px] font-normal text-black transition-colors duration-150 hover:bg-[#E0E0E0] sm:w-auto",
        FOCUS,
        className,
      )}
    >
      <CtaCornerPluses />
      {children}
    </Link>
  )
}

/** Inline text link with the underline that draws in. */
export function TextLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        GeistMono.className,
        "co-ul inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.14em] text-[#0000FF]",
        FOCUS,
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-3" />
    </Link>
  )
}

/** Page opener used on every inner page: label, big headline, lead, and a quiet animated route. */
export function PageHeader({
  n,
  label,
  title,
  accent,
  lead,
}: {
  n: string
  label: string
  title: string
  accent: string
  lead: string
}) {
  return (
    <Band>
      <Row split>
        <div className={cn(PAD, "lg:border-r lg:py-16")} style={{ borderColor: LINE }}>
          <Reveal>
            <Label n={n}>{label}</Label>
            <h1 className="mt-5 max-w-[16ch] text-[2rem] font-medium uppercase leading-[1.03] tracking-[-0.04em] sm:text-[2.6rem] lg:text-[clamp(2.2rem,3.4vw,3.5rem)]">
              {title} <Mark delayMs={500}>{accent}</Mark>
            </h1>
            <Lead>{lead}</Lead>
          </Reveal>
        </div>
        <div className="co-hatch relative hidden min-h-[220px] items-center justify-center lg:flex" aria-hidden>
          <div className="border bg-white px-8 py-6" style={{ borderColor: LINE }}>
            <RoutePulse className="h-14 w-[260px]" />
            <p className={cn(GeistMono.className, "mt-1 flex justify-between text-[9px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>
              <span>Signal</span>
              <span className="text-[#0000FF]">Introduction</span>
            </p>
          </div>
        </div>
      </Row>
    </Band>
  )
}

/** Black closing band: the loudest block on the page. */
export function CtaBand({
  title = "Your next customer may already be looking.",
  accent = "Get introduced.",
  lead = "Tell us what you sell or what you need. We reply by email with what we can do.",
}: {
  title?: string
  accent?: string
  lead?: string
}) {
  return (
    <Band>
      <div className="relative overflow-hidden border-b bg-black text-white" style={{ borderColor: LINE }}>
        <div className="co-hatch-dark pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] lg:block" aria-hidden />
        <div className="relative px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
          <Reveal>
            <Label n="Next" onDark>
              Start here
            </Label>
            <h2 className="mt-5 max-w-[20ch] text-[2rem] font-medium uppercase leading-[1.02] tracking-[-0.04em] sm:text-[2.8rem] lg:text-[clamp(2.4rem,4vw,4.2rem)]">
              {title} <Mark onDark delayMs={400}>{accent}</Mark>
            </h2>
            <Lead onDark className="mt-6">{lead}</Lead>
            <div className="mt-8 -m-[7px] flex flex-col gap-2.5 p-[7px] sm:flex-row sm:items-center sm:gap-3">
              <PrimaryLink to="/contact" onDark>
                Request an Introduction
              </PrimaryLink>
              <Link
                to="/how-it-works"
                className={cn(
                  GeistMono.className,
                  "co-ul inline-flex h-11 items-center justify-center px-2 text-[10.5px] uppercase tracking-[0.14em] text-white/80 hover:text-white",
                  FOCUS,
                )}
              >
                See how it works
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Band>
  )
}

/* Case cards ────────────────────────────────────────────────────────────── */

/** The full case study opens over the page and scrolls: facts and the whole write-up, names covered. */
function CaseModal({ c, onClose }: { c: Case; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${c.tag} case study`}
      className="co-fade fixed inset-0 z-[100] overflow-y-auto bg-black/80"
      onClick={onClose}
    >
      <div className="co-in relative mx-auto my-3 w-[calc(100%-1.5rem)] max-w-[1100px] bg-white sm:my-8" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-3 sm:px-8 lg:px-12" style={{ borderColor: LINE }}>
          <span className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>
            {c.tag} <span className="text-black/30">/</span> {c.outcome}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={cn(GeistMono.className, "co-ul border border-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors hover:bg-black hover:text-white", FOCUS)}
          >
            Close
          </button>
        </div>
        <CaseDocument c={c} />
      </div>
    </div>,
    document.body,
  )
}

export function CaseCard({ c, delayMs = 0 }: { c: Case; delayMs?: number }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="co-lift group flex h-full flex-col bg-white p-5 sm:p-6 lg:p-8">
      <Reveal delayMs={delayMs} className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <p className={cn(GeistMono.className, "text-[9.5px] uppercase leading-snug tracking-[0.12em] text-[#6E6E6E]")}>{c.tag}</p>
          <span
            className={cn(
              GeistMono.className,
              "inline-flex h-6 shrink-0 items-center gap-1.5 border border-black/10 bg-[#F4F4F4] px-2 text-[9px] uppercase leading-none tracking-[0.12em] text-[#505050]",
            )}
          >
            <span className="size-1.5 shrink-0 bg-[#0000FF]" aria-hidden />
            <span className="translate-y-[0.5px]">{c.outcome}</span>
          </span>
        </div>
        <p className={cn(GeistMono.className, "mt-6 text-[2.4rem] font-normal leading-none tracking-[-0.05em] sm:text-[2.8rem]")}>
          <CountUp value={c.stat} />
        </p>
        <p className={cn(GeistMono.className, "mt-2 text-[9.5px] uppercase leading-snug tracking-[0.1em] text-[#6E6E6E]")}>{c.statLabel}</p>
        <p className="mt-4 text-[13.5px] leading-[1.6] text-[#505050]">{c.summary}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open the full ${c.tag} case study`}
          className={cn(
            GeistMono.className,
            "co-ul mt-auto inline-flex w-fit items-center gap-1.5 pt-7 text-[10.5px] uppercase tracking-[0.14em] text-[#0000FF] hover:text-[#0000C4] group-hover:[background-size:100%_1px]",
            FOCUS,
          )}
        >
          Read the full case study
          <ArrowUpRight className="size-3" />
        </button>
      </Reveal>
      {open && <CaseModal c={c} onClose={() => setOpen(false)} />}
    </article>
  )
}

/** Last cell of the case-study grid: an open invitation in the same quiet style. */
export function NextEntryCard({ n }: { n: number }) {
  return (
    <article className="co-lift flex h-full min-h-[340px] flex-col justify-between bg-white p-5 sm:p-6 lg:p-8">
      <Reveal className="flex h-full flex-col justify-between gap-10">
        <div className={cn(GeistMono.className, "flex items-center justify-between text-[9.5px] uppercase tracking-[0.14em]")}>
          <span className="text-[#6E6E6E]">
            <span className="text-[#0000FF]">No. {String(n).padStart(2, "0")}</span>
          </span>
          <span className="text-black">Yours</span>
        </div>
        <div>
          <h3 className="text-[1.9rem] font-medium uppercase leading-[1.02] tracking-[-0.035em] sm:text-[2.2rem]">
            Your <span className="co-mk on">turn.</span>
          </h3>
          <p className="mt-4 max-w-[34ch] text-[13.5px] leading-[1.6] text-[#505050]">
            Tell us what you are looking for. More customers, a supplier, a distributor or a business partner. We reply
            with whether we see a relevant opportunity.
          </p>
        </div>
        <div className={cn(GeistMono.className, "flex items-center justify-between gap-4 text-[10.5px] uppercase tracking-[0.12em]")}>
          <a href={MAILTO} className={cn("co-ul normal-case tracking-[-0.01em] text-black hover:text-[#0000FF] text-[12.5px]", FOCUS)}>
            {EMAIL}
          </a>
          <Link to="/contact" className={cn("co-ul inline-flex items-center gap-1.5 text-[#0000FF]", FOCUS)}>
            Write
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </Reveal>
    </article>
  )
}
