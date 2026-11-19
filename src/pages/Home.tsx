import { Link } from "react-router-dom"
import { HeroVisual } from "../components/ClientOptimalHero"
import { Band, H2, Label, Lead, PAD, PrimaryLink, Row } from "../components/blocks"
import { CheckSquare, EMAIL, GeistMono, LINE, MAILTO, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

/*
 * Home page, rebuilt 2026-11-15 (Mert). Most visitors arrive from a single cold email and want to know, fast,
 * who we are and whether the email was real. Structure follows the brokerage model's advice for a broker's site:
 * who you connect and what you bring, a three-step "how it works", who you work with, proof, one clear CTA.
 * Copy rules: no em dashes, never "luck"/"chance", no outcome promises, and no claim about which side pays.
 * General on purpose (Mert, 2026-11-15): name no niche or industry anywhere on this page, proof included.
 */

const STEPS = [
  {
    title: "We identify a fit",
    text: "We read public signals, such as new filings, projects and job posts, to find a buyer and a supplier that look like a match.",
  },
  {
    title: "We confirm both sides want it",
    text: "We ask each side first. Nobody is introduced unless both have said they want the conversation.",
  },
  {
    title: "We make the introduction",
    text: "One email thread with the context both of you need. One fixed fee, agreed in writing before the introduction.",
  },
]

/** Who sits on each side, described by situation, never by industry. */
const SIDES = [
  {
    side: "Suppliers",
    title: "You have room for more work.",
    items: [
      "Companies that sell to other businesses",
      "Have room to take on more work",
      "Would rather meet a buyer with a need than run a campaign",
    ],
  },
  {
    side: "Buyers",
    title: "You have a need to fill.",
    items: [
      "Companies with a live need: a new site, a new contract or a gap in suppliers",
      "Want a suitable option without running a search",
      "Decide whether to talk before anyone is introduced",
    ],
  },
]

/** Taken from the case studies on /work (NDA-signed, licensed case studies; the disclosure is on that page). */
const PROOF = [
  { value: "6", label: "introductions made around one buyer, over 120 days" },
  { value: "5", label: "new clients in 48 days for one supplier" },
  { value: "22", label: "placements in 55 days for one supplier" },
]

const UL = "nda-link text-black"

export default function Home() {
  return (
    <>
      {/* 1. Who we connect, with the animated supply network on the right */}
      <Band fade={false}>
        <Row split top>
          <div className="flex items-center border-b px-4 pb-12 pt-14 sm:px-6 sm:pt-20 lg:border-b-0 lg:border-r lg:px-10 lg:py-20" style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="CO">Introduction brokerage</Label>
              <h1 className="mt-5 max-w-[20ch] text-[2.2rem] font-medium uppercase leading-[1.02] tracking-[-0.04em] sm:text-[3rem] lg:text-[clamp(2.4rem,3.6vw,3.8rem)]">
                We introduce companies to the buyer or supplier they need next.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.65] text-[#505050] sm:text-[16px]">
                Client Optimal connects two businesses on either side of a live commercial need: a buyer looking for a
                supplier, and a supplier with room to take on the work. See{" "}
                <Link to="/how-it-works" className={UL}>how it works</Link>. If you got an email from us, this is who we
                are, and replying to it is the quickest way to reach us.
              </p>
              <div className="mt-9 -m-[7px] flex flex-wrap items-center gap-y-4 p-[7px]">
                <PrimaryLink to={MAILTO} external>
                  Reply by email
                </PrimaryLink>
              
                <Link to="/work" className={cn(UL, "ml-6 text-[14px]")}>See client case studies</Link>
              </div>
            </Reveal>
          </div>
          <HeroVisual />
        </Row>
      </Band>

      {/* 2. How it works */}
      <Band>
        <Row>
          <div className={PAD}>
            <Reveal>
              <Label n="01">How it works</Label>
              <H2 wide>Three steps. Nothing to log in to.</H2>
            </Reveal>
          </div>
          <ol className="grid grid-cols-1 border-t lg:grid-cols-3" style={{ borderColor: LINE }}>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={cn("px-4 py-8 sm:px-6 lg:px-10 lg:py-12", i < 2 && "border-b lg:border-b-0 lg:border-r")}
                style={{ borderColor: LINE }}
              >
                <Reveal delayMs={i * 100}>
                  <span className={cn(GeistMono.className, "text-[11px] tracking-[0.1em] text-[#0000FF]")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[1.15rem] font-medium uppercase tracking-[-0.02em] sm:text-[1.3rem]">{s.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-[14px] leading-[1.6] text-[#505050]">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="border-t px-4 py-5 text-[13.5px] text-[#505050] sm:px-6 lg:px-10" style={{ borderColor: LINE }}>
            The full process, step by step, is on{" "}
            <Link to="/how-it-works" className={UL}>how it works</Link>.
          </p>
        </Row>
      </Band>

      {/* 3. Who we connect: by situation, not industry */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="02">Who we connect</Label>
              <H2>Two sides of the same need.</H2>
              <Lead>
                A supplier with capacity and a buyer with a need, across industries. More on{" "}
                <Link to="/who-we-serve" className={UL}>who we serve</Link>.
              </Lead>
            </Reveal>
          </div>
          {/* 2026-11-19 (Mert): this block read as a loose list with dead space under it. Now each side has a
              numbered label, a one-line heading and check marks, with a top rule when the columns stack. */}
          <div className="grid grid-cols-1 border-t sm:grid-cols-2 lg:border-t-0" style={{ borderColor: LINE }}>
            {SIDES.map((s, i) => (
              <div key={s.side} className={cn("flex flex-col px-4 py-8 sm:px-6 lg:px-9 lg:py-12", i === 0 && "border-b sm:border-b-0 sm:border-r")} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 90}>
                  <p className={cn(GeistMono.className, "text-[11px] uppercase tracking-[0.12em] text-[#0000FF]")}>
                    {String(i + 1).padStart(2, "0")} / {s.side}
                  </p>
                  <h3 className="mt-4 max-w-[18ch] text-[1.15rem] font-medium uppercase leading-[1.1] tracking-[-0.02em] text-black">{s.title}</h3>
                  <ul className="mt-6 space-y-3.5">
                    {s.items.map((t) => (
                      <li key={t} className="flex gap-3 text-[14px] leading-[1.55] text-[#505050]">
                        <CheckSquare className="mt-[0.4em] size-3 shrink-0 text-[#0000FF]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </Row>
      </Band>

      {/* 4. Proof */}
      <Band>
        <Row>
          <div className={PAD}>
            <Reveal>
              <Label n="03">Proof</Label>
              <H2 wide>What an introduction has led to.</H2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 border-t sm:grid-cols-3" style={{ borderColor: LINE }}>
            {PROOF.map((p, i) => (
              <div
                key={p.value}
                className={cn("px-4 py-8 sm:px-6 lg:px-10 lg:py-12", i < 2 && "border-b sm:border-b-0 sm:border-r")}
                style={{ borderColor: LINE }}
              >
                <Reveal delayMs={i * 90}>
                  <p className={cn(GeistMono.className, "text-[2.6rem] leading-none tracking-[-0.05em] lg:text-[3.4rem]")}>{p.value}</p>
                  <p className="mt-4 max-w-[28ch] text-[13.5px] leading-[1.55] text-[#505050]">{p.label}</p>
                </Reveal>
              </div>
            ))}
          </div>
          <p className="border-t px-4 py-5 text-[13.5px] text-[#505050] sm:px-6 lg:px-10" style={{ borderColor: LINE }}>
            From NDA-signed, licensed case studies, so names are covered. Read them, and the disclosure, on{" "}
            <Link to="/work" className={UL}>client case studies</Link>.
          </p>
        </Row>
      </Band>

      {/* 5. One clear CTA */}
      <Band>
        <div className="border-b bg-black text-white" style={{ borderColor: LINE }}>
          <div className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
            <Reveal>
              <Label n="Next" onDark>
                Get in touch
              </Label>
              <h2 className="mt-5 max-w-[22ch] text-[2rem] font-medium uppercase leading-[1.02] tracking-[-0.04em] sm:text-[2.8rem] lg:text-[clamp(2.4rem,4vw,4rem)]">
                Got an email from us? Reply to it.
              </h2>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.6] text-white/70">
                Or write to{" "}
                <a href={MAILTO} className="nda-link text-white">
                  {EMAIL}
                </a>{" "}
                and say what you sell or what you need. We answer every email ourselves.
              </p>
              <div className="mt-8 -m-[7px] p-[7px]">
                <PrimaryLink to={MAILTO} external onDark>
                  Email Mert
                </PrimaryLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>
    </>
  )
}
