import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "../lib/utils"
import { EMAIL, MAILTO } from "./primitives"
import { LogoMark } from "./SiteHeader"

/**
 * Footer ported from the supplied "otto-footer" design: same card, staggered reveals,
 * fitted wordmark and social buttons. Changes: text, colour tokens (blue on white and black),
 * Geist (the site font) instead of Inter, and plain links in place of the shadcn Button.
 */

export interface FooterLink {
  label: string
  to?: string
  href?: string
}
export interface FooterColumn {
  title: string
  links: FooterLink[]
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Case studies", to: "/work" },
      { label: "Who we serve", to: "/who-we-serve" },
      { label: "About", to: "/about" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Request an introduction", to: "/contact" },
      { label: "Email us", href: MAILTO },
    ],
  },
  {
    title: "Good to know",
    links: [
      { label: "Fixed fee, in writing", to: "/how-it-works#fee" },
      { label: "Case studies", to: "/work#disclosure" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
]

const FOOTER_TOKENS = {
  "--footer-card-bg": "#ffffff",
  "--footer-card-border": "rgba(0, 0, 0, 0.12)",
  "--footer-card-shadow": "0 20px 40px -15px rgba(0, 0, 0, 0.06)",
  "--footer-glow-from": "rgba(150, 170, 255, 0.18)",
  "--footer-glow-to": "rgba(70, 90, 255, 0.22)",
  "--footer-heading": "#000000",
  "--footer-text": "#6E6E6E",
  "--footer-text-hover": "#000000",
  "--footer-muted": "rgba(0, 0, 0, 0.4)",
  "--footer-watermark-from": "rgba(0, 0, 0, 1)",
  "--footer-watermark-mid": "rgba(0, 0, 0, 0.9)",
  "--footer-watermark-to": "rgba(0, 0, 0, 0.7)",
  "--footer-social-from": "rgba(255, 255, 255, 1)",
  "--footer-social-to": "rgba(250, 250, 255, 1)",
  "--footer-social-border": "rgba(0, 0, 0, 0.16)",
  "--footer-social-icon": "rgba(0, 0, 0, 1)",
  "--footer-social-hover-bg": "rgba(0, 0, 255, 1)",
  "--footer-social-icon-on-hover": "#ffffff",
  "--footer-social-hover-shadow": "0 8px 16px -4px rgba(0, 0, 255, 0.3)",
  "--footer-fog-opacity": "1",
} as React.CSSProperties

/* Social marks: single-colour 24px so hover can flip them to white */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[21px] shrink-0" fill="none" aria-hidden="true">
      <path
        d="M4.5 9.2h3.3V20H4.5V9.2Zm1.65-5.2a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM10 9.2h3.15v1.5h.05c.45-.85 1.55-1.75 3.2-1.75 3.4 0 4.05 2.2 4.05 5.1V20h-3.3v-5.3c0-1.25-.02-2.9-1.8-2.9-1.8 0-2.1 1.4-2.1 2.8V20H10V9.2Z"
        className="fill-[var(--footer-social-icon)]"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] shrink-0" fill="none" aria-hidden="true">
      <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.5" className="stroke-[var(--footer-social-icon)]" strokeWidth="1.9" />
      <path d="m4 7.5 8 6 8-6" className="stroke-[var(--footer-social-icon)]" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const SOCIAL_ITEMS = [
  { label: "Client Optimal on LinkedIn", href: "https://www.linkedin.com/company/client-optimal", icon: LinkedInIcon, external: true },
  { label: `Email ${EMAIL}`, href: MAILTO, icon: MailIcon, external: false },
]

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const rise: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE_OUT } },
}

const stack = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 20 } },
}

const letter: Variants = {
  hidden: { opacity: 0, y: "38%", filter: "blur(12px)" },
  show: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { duration: 1.1, ease: EASE_OUT } },
}

const HEAD = "otto-shadow font-mono text-[12px] font-normal uppercase leading-none tracking-[0.16em] sm:text-[13px]"
const LINK = "otto-shadow text-[15px] font-normal leading-[1.4] tracking-[-0.01em] sm:text-[18px] lg:text-[20px]"
const FOCUS_RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FF]"

export default function SiteFooter({
  tagline = "Client Optimal is a done-for-you introduction brokerage. We look for who may need a supplier next, confirm the need, and make the introduction.",
  watermarkText = "Client Optimal",
  copyrightText = "© 2026 Client Optimal. All rights reserved.",
  columns = COLUMNS,
}: {
  tagline?: string
  watermarkText?: string
  copyrightText?: string
  columns?: FooterColumn[]
}) {
  const reduce = false // motion always on, by request
  const cardRef = React.useRef<HTMLDivElement>(null)
  const markRef = React.useRef<HTMLDivElement>(null)
  const navInView = useInView(cardRef, { once: true, amount: 0.15 })
  const markInView = useInView(markRef, { once: true, amount: 0.3 })

  // Wordmark always fills the card's inner width exactly (measured, not guessed in vw)
  const markBoxRef = React.useRef<HTMLHeadingElement>(null)
  const markTextRef = React.useRef<HTMLSpanElement>(null)
  React.useLayoutEffect(() => {
    const box = markBoxRef.current
    const text = markTextRef.current
    if (!box || !text) return
    const fit = () => {
      box.style.fontSize = "100px"
      const natural = text.scrollWidth
      if (!natural) return
      box.style.fontSize = `${Math.min(460, (100 * box.clientWidth) / natural) * 0.995}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    document.fonts?.ready.then(fit).catch(() => {})
    return () => ro.disconnect()
  }, [watermarkText])

  const reveal = (inView: boolean, variants: Variants) =>
    reduce ? {} : { variants, initial: "hidden" as const, animate: inView ? ("show" as const) : ("hidden" as const) }

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{ ...FOOTER_TOKENS, fontFamily: '"Geist Variable", ui-sans-serif, system-ui, sans-serif' }}
      className="flex w-full flex-col items-center gap-[20px] bg-transparent px-3 py-3 antialiased sm:px-6 sm:py-6 lg:px-10 lg:py-10"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .otto-shadow { text-shadow: 0 1px 14px rgba(0, 0, 40, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05); }
            .otto-link { background-image: linear-gradient(currentColor, currentColor); background-size: 0% 1px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size 0.35s cubic-bezier(0.16,1,0.3,1), color 0.15s; }
            .otto-link:hover, .otto-link:focus-visible { background-size: 100% 1px; }
            .otto-letter { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
            @media (hover: hover) { .otto-letter:hover { transform: translateY(-5%); } }
            .otto-social { background: linear-gradient(135deg, var(--footer-social-from) 9.52%, var(--footer-social-to) 100%), var(--footer-card-bg); box-shadow: inset 0 0 0 1px var(--footer-social-border); transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s, background-color 0.2s; }
            .otto-social:hover { background: var(--footer-social-hover-bg); --footer-social-icon: var(--footer-social-icon-on-hover); box-shadow: inset 0 0 0 1.5px var(--footer-social-border), var(--footer-social-hover-shadow); transform: translateY(-2px); }
            .otto-social:active { transform: scale(0.96); }
          `,
        }}
      />
      <motion.div
        ref={cardRef}
        className="relative flex min-h-[640px] w-full flex-col justify-between overflow-hidden rounded-[24px] border p-[28px_20px_20px] sm:min-h-[720px] sm:rounded-[30px] sm:p-[40px_32px_24px] lg:min-h-[780px] lg:p-[44px_48px_28px]"
        style={{ background: "var(--footer-card-bg)", borderColor: "var(--footer-card-border)", boxShadow: "var(--footer-card-shadow)" }}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={navInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        {/* Soft static glow along the bottom edge: a plain gradient, no canvas and no blur filter, so it costs nothing */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(22%,120px)]"
          style={{
            opacity: "var(--footer-fog-opacity)",
            background:
              "linear-gradient(to top, var(--footer-glow-to) 0%, var(--footer-glow-from) 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top navigation row */}
        <div className="relative z-10 flex w-full flex-col items-start justify-between gap-[40px] pt-[4px] lg:flex-row lg:gap-[64px] lg:pt-[8px]">
          {/* Brand and value proposition */}
          <motion.div className="flex w-full shrink-0 flex-col items-start gap-[20px] lg:w-[340px] xl:w-[400px]" {...reveal(navInView, stack(0.08, 0.15))}>
            <div className="flex w-full flex-col items-start gap-[12px]">
              <motion.div variants={rise}>
                <Link
                  to="/"
                  aria-label="Client Optimal home"
                  className={cn("inline-flex items-center gap-3 rounded-md", FOCUS_RING)}
                >
                  <LogoMark className="size-10" />
                  <span className="text-[16px] font-medium uppercase tracking-[0.08em] text-[var(--footer-heading)]">Client Optimal</span>
                </Link>
              </motion.div>
              <motion.p
                variants={rise}
                className="otto-shadow w-full max-w-[400px] whitespace-pre-line text-[17px] font-[400] leading-[1.55] text-[color:var(--footer-text)] sm:text-[18px] lg:text-[20px]"
              >
                {tagline}
              </motion.p>
            </div>
          </motion.div>

          {/* Navigation columns and socials */}
          <div className="grid w-full grid-cols-2 items-start gap-x-[24px] gap-y-[36px] sm:grid-cols-4 lg:max-w-[1000px] lg:flex-1 lg:flex-row lg:justify-between lg:gap-[24px] lg:p-[20px] lg:flex">
            {columns.map((column, colIdx) => (
              <motion.div
                key={column.title}
                className="flex min-w-0 flex-col items-start gap-[22px] lg:gap-[30px]"
                {...reveal(navInView, stack(0.06, 0.25 + colIdx * 0.08))}
              >
                <motion.span variants={rise} className={cn(HEAD, "select-none text-[color:var(--footer-heading)]")}>
                  {column.title}
                </motion.span>
                <ul className="flex flex-col items-start gap-[18px] lg:gap-[24px]">
                  {column.links.map((link) => {
                    const cls = cn(
                      LINK,
                      "otto-link rounded-sm pb-0.5 text-[color:var(--footer-text)] hover:text-[color:var(--footer-text-hover)] active:opacity-65",
                      FOCUS_RING,
                    )
                    return (
                      <motion.li key={link.label} variants={rise}>
                        {link.to ? (
                          <Link to={link.to} className={cls}>
                            {link.label}
                          </Link>
                        ) : (
                          <a href={link.href} className={cls}>
                            {link.label}
                          </a>
                        )}
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}

            {/* Find us */}
            <motion.div
              className="col-span-2 flex w-full flex-col items-start gap-[18px] sm:col-span-1 lg:w-auto lg:gap-[20px]"
              {...reveal(navInView, stack(0.06, 0.25 + columns.length * 0.08))}
            >
              <motion.span variants={rise} className={cn(HEAD, "select-none whitespace-nowrap text-[color:var(--footer-heading)]")}>
                Find us
              </motion.span>
              <motion.div className="flex h-[52px] w-auto flex-row items-center gap-[10px]" variants={stack(0.07, 0.1)}>
                {SOCIAL_ITEMS.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.span key={social.label} variants={pop} className="inline-flex">
                      <a
                        href={social.href}
                        {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        aria-label={social.label}
                        className={cn(
                          "otto-social box-border flex h-[52px] w-[52px] min-w-[52px] max-w-[52px] shrink-0 cursor-pointer items-center justify-center rounded-[17px] p-0",
                          FOCUS_RING,
                        )}
                      >
                        <Icon />
                      </a>
                    </motion.span>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom watermark */}
        <div ref={markRef} className="relative z-10 mt-14 flex w-full flex-col items-center justify-end sm:mt-20 lg:mt-24">
          <h2
            ref={markBoxRef}
            aria-label={watermarkText}
            className="w-full select-none whitespace-nowrap text-center text-[clamp(56px,21vw,440px)] font-[500] uppercase leading-[1] tracking-[-0.035em]"
          >
            <motion.span ref={markTextRef} aria-hidden className="inline-flex" {...reveal(markInView, stack(0.055, 0.1))}>
              {Array.from(watermarkText).map((ch, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  whileHover={{ y: "-5%", transition: { duration: 0.5, ease: EASE_OUT } }}
                  className="otto-letter inline-block bg-gradient-to-b from-[color:var(--footer-watermark-from)] from-[75%] via-[color:var(--footer-watermark-mid)] via-[90%] to-[color:var(--footer-watermark-to)] to-[100%] bg-clip-text pb-[0.06em] text-transparent"
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </motion.span>
          </h2>
          <motion.p
            className="otto-shadow mt-2 select-none text-center font-mono text-[10px] uppercase leading-[1.6] tracking-[0.14em] text-[color:var(--footer-muted)] sm:mt-3 sm:text-[10.5px]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={markInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 + watermarkText.length * 0.055 + 0.3 }}
          >
            {copyrightText}
          </motion.p>
        </div>
      </motion.div>
    </footer>
  )
}
