import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { ArrowUpRight, CtaCornerPluses, delay, FOCUS, GeistMono, GridPlus, LINE } from "./primitives"

export const NAV = [
  { label: "HOW IT WORKS", to: "/how-it-works" },
  { label: "CASE STUDIES", to: "/work" },
  { label: "WHO WE SERVE", to: "/who-we-serve" },
  { label: "ABOUT", to: "/about" },
  { label: "CONTACT", to: "/contact" },
] as const

/** The Client Optimal C and dot, redrawn: white tile, black C (secondary), blue dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className={cn("shrink-0 select-none", className)}>
      <rect x="8" y="8" width="496" height="496" fill="#fff" stroke="#0a0a0a" strokeOpacity="0.22" strokeWidth="16" />
      <path d="M390 168A164 164 0 1 0 390 347L350 312A110 110 0 1 1 350 203Z" fill="#0a0a0a" />
      <circle cx="376" cy="256" r="40" fill="#0000FF" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-7" />
      <span className="whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.08em] sm:text-[14px]">Client Optimal</span>
    </span>
  )
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <header className="relative z-40 shrink-0 border-b bg-white" style={{ borderColor: LINE }}>
      <GridPlus edge="left" className="left-0 top-full" />
      <GridPlus edge="right" className="left-full top-full" />

      <div className="grid h-14 grid-cols-[1fr_auto] items-center gap-3 px-4 sm:h-16 sm:px-5 md:h-[72px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
        <Link to="/" className={cn("co-in w-fit min-w-0", FOCUS)} style={delay(60)} aria-label="Client Optimal home">
          <Logo />
        </Link>

        <nav
          className="co-in hidden h-11 items-center gap-x-3 border px-3 lg:flex lg:gap-x-9 lg:px-8"
          style={{ borderColor: LINE, ...delay(130) }}
          aria-label="Primary"
        >
          {NAV.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  GeistMono.className,
                  "co-ul whitespace-nowrap text-[10.5px] font-normal uppercase tracking-[0.06em] transition-colors lg:text-[11px] lg:tracking-[0.18em]",
                  isActive ? "text-[#0000FF]" : "text-[#6E6E6E] hover:text-black",
                  FOCUS,
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="co-in flex items-center justify-end gap-2" style={delay(200)}>
          <Link
            to="/contact"
            className={cn(
              "group relative inline-flex h-9 items-center justify-center gap-2 bg-black px-4 text-[12px] font-normal text-white transition-colors duration-150 hover:bg-[#0000FF] sm:h-10 sm:px-5 sm:text-[13px] md:h-11 md:min-w-32",
              FOCUS,
            )}
          >
            <CtaCornerPluses onBlue />
            Get in touch
            <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="co-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "relative flex size-9 items-center justify-center border bg-white text-black transition-colors hover:bg-[#F4F4F4] sm:size-10 lg:hidden",
              FOCUS,
            )}
            style={{ borderColor: LINE }}
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={cn("absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200", open && "translate-y-[5.5px] rotate-45")} />
              <span className={cn("absolute left-0 top-[5.5px] h-px w-4 bg-current transition-opacity duration-150", open && "opacity-0")} />
              <span className={cn("absolute left-0 top-[11px] h-px w-4 bg-current transition-transform duration-200", open && "-translate-y-[5.5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: blueprint rows that drop under the header */}
      <div
        id="co-mobile-nav"
        className={cn(
          "grid border-t transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] border-t-0 opacity-0",
        )}
        style={{ borderColor: LINE }}
        aria-hidden={!open}
      >
        <nav className="overflow-hidden" aria-label="Mobile">
          <ul className="divide-y" style={{ borderColor: LINE }}>
            {NAV.map(({ label, to }, i) => (
              <li key={to} style={{ borderColor: LINE }}>
                <NavLink
                  to={to}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cn(
                      GeistMono.className,
                      "group flex items-center justify-between px-4 py-3.5 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[#F7F7F7] hover:text-[#0000FF] sm:px-5",
                      isActive ? "text-[#0000FF]" : "text-[#6E6E6E]",
                      FOCUS,
                    )
                  }
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[#0000FF]/60">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </span>
                  <ArrowUpRight className="size-3.5 opacity-40 transition-opacity group-hover:opacity-100" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
