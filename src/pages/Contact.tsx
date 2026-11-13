import { useState } from "react"
import { Band, Label, PAD, PageHeader, Row } from "../components/blocks"
import { CountUp } from "../components/motion"
import { ArrowUpRight, CtaCornerPluses, EMAIL, FOCUS, GeistMono, LINE, MAILTO, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

const NEXT = [
  { t: "We read it", d: "A person reads your email, not a form queue." },
  { t: "We reply", d: "By email, with what is possible and what it would cost." },
  { t: "We agree the fee", d: "A fixed fee per introduction, in writing, before work starts." },
]

const field =
  "mt-2 w-full border bg-white px-3 py-2.5 text-[14px] text-black outline-none transition-colors placeholder:text-black/30 focus:border-[#0000FF] focus:ring-1 focus:ring-[#0000FF]"

export default function Contact() {
  const [side, setSide] = useState<"supplier" | "buyer">("supplier")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const lines = [`I am a ${side}.`]
    if (name) lines.push(`Name: ${name}`)
    if (company) lines.push(`Company: ${company}`)
    lines.push("", message)
    const body = lines.join("\n")
    const subject = side === "supplier" ? "Introduction request (supplier)" : "Introduction request (buyer)"
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHeader
        n="05"
        label="Contact"
        title="Start with"
        accent="an email."
        lead="Tell us what you sell, or what you need. We reply by email. A call only happens when a deal needs one."
      />

      <Band>
        <Row split>
          <form onSubmit={submit} className={cn(PAD, "lg:border-r lg:py-14")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="01">Your request</Label>
              <fieldset className="mt-6">
                <legend className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>I am a</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["supplier", "buyer"] as const).map((s) => (
                    <label
                      key={s}
                      className={cn(
                        GeistMono.className,
                        "flex cursor-pointer items-center justify-center border px-3 py-2.5 text-[10.5px] uppercase tracking-[0.14em] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#0000FF]",
                        side === s ? "border-[#0000FF] bg-[#0000FF] text-white" : "border-black/15 text-[#505050] hover:border-black/40",
                      )}
                    >
                      <input type="radio" name="side" value={s} checked={side === s} onChange={() => setSide(s)} className="sr-only" />
                      {s}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className={cn(GeistMono.className, "block text-[9.5px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>
                  Name
                  <input className={cn(field, "font-sans normal-case tracking-normal")} style={{ borderColor: LINE }} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </label>
                <label className={cn(GeistMono.className, "block text-[9.5px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>
                  Company
                  <input className={cn(field, "font-sans normal-case tracking-normal")} style={{ borderColor: LINE }} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
                </label>
              </div>
              <label className={cn(GeistMono.className, "mt-5 block text-[9.5px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>
                {side === "supplier" ? "What you sell and who it suits" : "What you are buying, where and by when"}
                <textarea
                  required
                  rows={5}
                  className={cn(field, "resize-y font-sans normal-case tracking-normal")}
                  style={{ borderColor: LINE }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              <div className="mt-6 -m-[7px] p-[7px]">
                <button
                  type="submit"
                  className={cn(
                    "group relative inline-flex h-11 w-full items-center justify-center gap-2 bg-black px-5 text-[13px] font-normal text-white transition-colors duration-150 hover:bg-[#0000FF] sm:w-auto",
                    FOCUS,
                  )}
                >
                  <CtaCornerPluses onBlue />
                  Open my email
                  <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                </button>
              </div>
              <p className="mt-4 max-w-[48ch] text-[12px] leading-[1.6] text-[#6E6E6E]">
                This opens your email app with the message filled in. Nothing is stored on this site.
              </p>
            </Reveal>
          </form>

          <div className="flex flex-col">
            <div className="border-b px-4 py-9 sm:px-6 lg:px-10 lg:py-14" style={{ borderColor: LINE }}>
              <Reveal delayMs={100}>
                <Label n="02">Or write directly</Label>
                <a
                  href={MAILTO}
                  className={cn(GeistMono.className, "co-ul mt-4 inline-block break-all text-[1.1rem] tracking-[-0.02em] text-black hover:text-[#0000FF] sm:text-[1.5rem]", FOCUS)}
                >
                  {EMAIL}
                </a>
              </Reveal>
            </div>
            <ol className="flex-1 divide-y" style={{ borderColor: LINE }}>
              {NEXT.map((n, i) => (
                <li key={n.t} style={{ borderColor: LINE }}>
                  <Reveal delayMs={i * 100} className="grid grid-cols-[56px_1fr] gap-x-3 px-4 py-6 sm:px-6 lg:px-10 lg:py-7">
                    <span className={cn(GeistMono.className, "text-[1.6rem] leading-none tracking-[-0.05em] text-[#0000FF]")}>
                      <CountUp value={String(i + 1).padStart(2, "0")} durationMs={900} delayMs={i * 150} />
                    </span>
                    <div>
                      <h3 className="text-[14px] font-medium uppercase tracking-[-0.01em]">{n.t}</h3>
                      <p className="mt-1.5 text-[13px] leading-[1.6] text-[#6E6E6E]">{n.d}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Row>
      </Band>
    </>
  )
}
