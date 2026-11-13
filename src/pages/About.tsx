import { Band, CtaBand, H2, Label, Lead, PAD, Row } from "../components/blocks"
import { Mark } from "../components/motion"
import { ArrowUpRight, CheckSquare, EMAIL, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

/** Mert's personal LinkedIn profile. Paste the full URL here (https://www.linkedin.com/in/...) and the link appears. */
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/mert-ozcetin/"

const PRINCIPLES = [
  { name: "One person, on the thread", text: "You deal with the person who reads your email, finds the match and writes the introduction." },
  { name: "Confirm first", text: "We work to confirm a need is real, and who decides, before we mention anyone to anyone." },
  { name: "Fixed fee, in writing", text: "The fee per introduction is agreed in writing before any work starts. No retainers, no surprises." },
  { name: "Plain answers", text: "If we cannot help, we say so early. A short, honest no is better than a long maybe." },
]

const STANDARDS = [
  "We introduce only where a supplier's capacity and a buyer's need can be checked.",
  "Past results are shown as NDA-signed, licensed case studies. Results vary.",
  "Every introduction starts with one email, not a pitch deck.",
]

/** Photo in a framed card: the cut-out portrait on the site's light grey, with a name plate. */
function Portrait() {
  return (
    <figure className="w-full max-w-[420px]">
      <div className="border bg-white p-2" style={{ borderColor: LINE }}>
        <div className="aspect-[4/5] w-full overflow-hidden bg-[#E6E6E8]">
          <img
            src="/about/mert.jpg"
            alt="Mert Ozcetin, founder of Client Optimal"
            width={1251}
            height={2000}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 50%" }}
          />
        </div>
        <figcaption
          className={cn(GeistMono.className, "flex items-center justify-between gap-3 px-1 pb-1 pt-3 text-[10px] uppercase tracking-[0.14em]")}
        >
          <span className="flex items-center gap-2 text-black">
            <span className="size-1.5 bg-[#0000FF]" aria-hidden />
            Mert Ozcetin
          </span>
          <span className="text-[#6E6E6E]">Founder</span>
        </figcaption>
      </div>
    </figure>
  )
}

export default function About() {
  return (
    <>
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r lg:py-16")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="04">About</Label>
              <h1 className="mt-5 max-w-[16ch] text-[2rem] font-medium uppercase leading-[1.03] tracking-[-0.04em] sm:text-[2.6rem] lg:text-[clamp(2.2rem,3.4vw,3.5rem)]">
                One person, one <Mark delayMs={500}>introduction.</Mark>
              </h1>
              <Lead>
                Client Optimal is run by Mert Ozcetin. When you write to us, he reads it, looks for the right match and makes the introduction himself.
              </Lead>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className={cn(GeistMono.className, "co-ul inline-block text-[11px] uppercase tracking-[0.14em] text-[#0000FF]")}
                >
                  {EMAIL}
                </a>
                {LINKEDIN_PROFILE && (
                  <a
                    href={LINKEDIN_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(GeistMono.className, "co-ul inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#0000FF]")}
                  >
                    LinkedIn
                    <ArrowUpRight className="size-3" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
          <div className="co-hatch relative flex items-center justify-center px-4 py-9 sm:px-6 lg:px-10 lg:py-14">
            <Reveal delayMs={120} className="flex w-full justify-center">
              <Portrait />
            </Reveal>
          </div>
        </Row>
      </Band>

      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="01">Why Client Optimal</Label>
              <H2>Good introductions are hard to find.</H2>
            </Reveal>
          </div>
          <div className={PAD}>
            <Reveal delayMs={100}>
              <p className="max-w-[52ch] text-[14.5px] leading-[1.7] text-[#303030]">
                Suppliers often struggle to reach the companies that need them. Buyers often struggle to find a supplier they can trust. Both sides lose time
                and money to the gap.
              </p>
              <p className="mt-4 max-w-[52ch] text-[14.5px] leading-[1.7] text-[#303030]">
                Client Optimal exists to close it, one careful introduction at a time. We read public signals to see who may need a supplier next, we work to
                confirm the need, and we put the two sides in touch for a fixed fee.
              </p>
            </Reveal>
          </div>
        </Row>
      </Band>

      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="02">How we work</Label>
              <H2>Small on purpose.</H2>
              <Lead>No account managers, no hand-offs. The person who scopes your request is the person who does the work.</Lead>
            </Reveal>
          </div>
          <div className="hidden lg:block co-hatch" aria-hidden />
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.name} className="co-lift bg-white p-5 sm:p-6 lg:p-8">
                <Reveal delayMs={i * 80}>
                  <p className={cn(GeistMono.className, "text-[10px] tracking-[0.12em] text-[#0000FF]")}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-[1.05rem] font-medium uppercase leading-[1.15] tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-3 text-[13px] leading-[1.6] text-[#6E6E6E]">{p.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </Row>
      </Band>

      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="03">Standards</Label>
              <H2>What you can expect.</H2>
            </Reveal>
          </div>
          <div className={PAD}>
            <ul className="space-y-4">
              {STANDARDS.map((s, i) => (
                <li key={s}>
                  <Reveal delayMs={i * 80} className="flex gap-3 text-[14px] leading-[1.65] text-[#303030]">
                    <CheckSquare className="mt-[0.4em] size-3 shrink-0 text-[#0000FF]" />
                    <span className="co-li">{s}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Row>
      </Band>

      <CtaBand title="Talk to the person who does the work." accent="Write to us." lead="One email is enough to start. We reply with what is possible and what it would cost." />
    </>
  )
}
