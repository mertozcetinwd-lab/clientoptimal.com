import { Link } from "react-router-dom"
import ClientOptimalHero from "../components/ClientOptimalHero"
import { Band, CtaBand, H2, Label, Lead, PAD, PrimaryLink, Row, TextLink } from "../components/blocks"
import { CountUp, Mark, Rule, Ticker } from "../components/motion"
import { CheckSquare, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"
import { CASES } from "../data/cases"

const TICKER = [
  "Forecast",
  "Confirm",
  "Introduce",
  "Industrial",
  "Logistics",
  "Healthcare",
  "Construction",
  "Fixed fee",
  "Email first",
  "Agreed in writing",
]

const MOVES = [
  {
    title: "Forecast",
    text: "Our systems read public signals, such as new filings, purchase listings and project announcements, to help spot who may need a supplier next.",
  },
  {
    title: "Confirm",
    text: "We reach the buyer first and work to confirm the need, the timing and who decides before making an introduction.",
  },
  {
    title: "Introduce",
    text: "A suitable supplier and the buyer meet on one email thread, with context. One fixed fee, agreed in writing.",
  },
]

/** Big figures taken from the selected work below (NDA-signed, licensed case studies). */
const PROOF = [
  { value: "6", label: "introductions around one plastic-conversion facility, over 120 days", tag: "Industrial" },
  { value: "5", label: "new clients in 48 days for an education company", tag: "Education technology" },
  { value: "$85K", label: "added revenue in a quarter for an automation firm", tag: "Industrial automation" },
  { value: "22", label: "placements in 55 days for a recruiter", tag: "Recruitment" },
]

export default function Home() {
  return (
    <>
      <ClientOptimalHero />

      {/* Ticker */}
      <Band>
        <Row>
          <Ticker
            items={TICKER}
            className={cn(GeistMono.className, "py-4 text-[10px] uppercase tracking-[0.16em] text-[#6E6E6E] sm:py-5 sm:text-[10.5px]")}
          />
        </Row>
      </Band>

      {/* The idea */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r lg:py-20")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="01">The idea</Label>
              <H2 wide>
                Good introductions take <Mark delayMs={350}>research.</Mark>
              </H2>
              <Lead>
                Many companies have a supplier they have not met yet, and many suppliers have buyers who may soon need
                them. We look for both, confirm the need, and connect them. You never log in to anything.
              </Lead>
              <div className="mt-8 -m-[7px] p-[7px]">
                <PrimaryLink to="/how-it-works">See how it works</PrimaryLink>
              </div>
            </Reveal>
          </div>
          <ul className="divide-y" style={{ borderColor: LINE }}>
            {MOVES.map((m, i) => (
              <li key={m.title} style={{ borderColor: LINE }}>
                <Reveal
                  delayMs={i * 100}
                  className="group grid grid-cols-[44px_1fr] gap-x-3 px-4 py-7 transition-colors hover:bg-[#FAFAFA] sm:grid-cols-[56px_1fr] sm:px-6 lg:px-9 lg:py-9"
                >
                  <span className={cn(GeistMono.className, "pt-1 text-[11px] tracking-[0.1em] text-[#0000FF]")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="co-ul inline text-[1.1rem] font-medium uppercase tracking-[-0.02em] group-hover:[background-size:100%_1px] sm:text-[1.25rem]">
                      {m.title}
                    </h3>
                    <p className="mt-3 max-w-[50ch] text-[13.5px] leading-[1.6] text-[#6E6E6E]">{m.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Row>
      </Band>

      {/* Numbers */}
      <Band>
        <Row>
          <div className="px-4 pt-9 sm:px-6 lg:px-10 lg:pt-12">
            <Reveal>
              <Label n="02">What an introduction can do</Label>
            </Reveal>
          </div>
          <div className="mt-6 grid grid-cols-2 border-t lg:grid-cols-4" style={{ borderColor: LINE }}>
            {PROOF.map((p, i) => (
              <div
                key={p.value}
                className={cn(
                  "px-4 py-8 sm:px-6 lg:px-8 lg:py-12",
                  i % 2 === 0 && "border-r",
                  i < 2 && "border-b lg:border-b-0",
                  i === 1 && "lg:border-r",
                  i === 2 && "lg:border-r",
                )}
                style={{ borderColor: LINE }}
              >
                <Reveal delayMs={i * 90}>
                  <p className={cn(GeistMono.className, "text-[2.1rem] font-normal leading-none tracking-[-0.05em] sm:text-[2.8rem] lg:text-[3.6rem]")}>
                    <CountUp value={p.value} delayMs={i * 120} durationMs={1700} />
                  </p>
                  <Rule className="my-4 max-w-[64px]" delayMs={300 + i * 90} />
                  <p className="max-w-[26ch] text-[12.5px] leading-[1.55] text-[#505050] sm:text-[13px]">{p.label}</p>
                  <p className={cn(GeistMono.className, "mt-3 text-[9px] uppercase tracking-[0.14em] text-[#0000FF]")}>{p.tag}</p>
                </Reveal>
              </div>
            ))}
          </div>
          <p
            className={cn(GeistMono.className, "border-t px-4 py-4 text-[9.5px] uppercase leading-[1.7] tracking-[0.1em] text-[#6E6E6E] sm:px-6 lg:px-10")}
            style={{ borderColor: LINE }}
          >
            From our case studies. NDA-signed, licensed case studies. They show how the introduction process performs.{" "}
            <Link to="/work#disclosure" className="co-ul text-[#0000FF]">
              Read the disclosure
            </Link>
          </p>
        </Row>
      </Band>

      {/* Work preview */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="03">Case studies</Label>
              <H2>Real introductions. <Mark delayMs={300}>Real details.</Mark></H2>
              <Lead>Names are covered. Everything else is on the page: the need, the signal and what happened.</Lead>
            </Reveal>
          </div>
          <div className="flex items-end px-4 pb-9 sm:px-6 lg:px-10 lg:pb-14">
            <Reveal delayMs={120}>
              <TextLink to="/work">All eight case studies</TextLink>
            </Reveal>
          </div>
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-black/15 lg:grid-cols-3">
            {[CASES[0], CASES[1], CASES[4]].map((c, i) => (
              <Link key={c.tag} to="/work" className="co-lift group flex flex-col bg-white p-5 sm:p-6 lg:p-8">
                <Reveal delayMs={i * 90} className="flex h-full flex-col">
                  <p className={cn(GeistMono.className, "text-[9.5px] uppercase leading-snug tracking-[0.12em] text-[#6E6E6E]")}>{c.tag}</p>
                  <p className={cn(GeistMono.className, "mt-6 text-[2.6rem] font-normal leading-none tracking-[-0.05em]")}>
                    <CountUp value={c.stat} />
                  </p>
                  <p className={cn(GeistMono.className, "mt-2 text-[9.5px] uppercase leading-snug tracking-[0.1em] text-[#6E6E6E]")}>{c.statLabel}</p>
                  <p className="mt-4 text-[13.5px] leading-[1.6] text-[#505050]">{c.summary}</p>
                  <span
                    className={cn(
                      GeistMono.className,
                      "co-ul mt-auto inline-flex w-fit items-center gap-1.5 pt-6 text-[10.5px] uppercase tracking-[0.14em] text-[#0000FF] group-hover:[background-size:100%_1px]",
                    )}
                  >
                    Read the case
                  </span>
                </Reveal>
              </Link>
            ))}
          </div>
        </Row>
      </Band>

      {/* Two sides */}
      <Band>
        <Row split>
          {[
            {
              n: "04.1",
              label: "For suppliers",
              title: "Meet buyers who may need you.",
              points: ["We look for a live need that matches what you do.", "We work to confirm it before we mention you.", "One fixed fee per introduction, agreed first."],
              cta: "Sell to your next customer",
            },
            {
              n: "04.2",
              label: "For buyers",
              title: "Skip the search. Meet a suitable supplier.",
              points: ["Tell us what you are buying, where, and by when.", "We check capacity, past work and fit first.", "A fixed fee, agreed in writing, before work starts."],
              cta: "Find a supplier",
            },
          ].map((col, i) => (
            <div
              key={col.n}
              className={cn(PAD, "lg:py-16", i === 0 && "border-b lg:border-b-0 lg:border-r")}
              style={{ borderColor: LINE }}
            >
              <Reveal delayMs={i * 100}>
                <Label n={col.n}>{col.label}</Label>
                <h3 className="mt-4 max-w-[18ch] text-[1.5rem] font-medium uppercase leading-[1.05] tracking-[-0.03em] sm:text-[1.9rem]">
                  {col.title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {col.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[13.5px] leading-[1.6] text-[#505050]">
                      <CheckSquare className="mt-[0.35em] size-3 shrink-0 text-[#0000FF]" />
                      <span className="co-li">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <TextLink to="/who-we-serve">{col.cta}</TextLink>
                </div>
              </Reveal>
            </div>
          ))}
        </Row>
      </Band>

      <CtaBand />
    </>
  )
}
