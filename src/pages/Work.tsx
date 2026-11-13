import { useMemo, useState } from "react"
import { Band, CaseCard, CtaBand, NextEntryCard, PageHeader, Row } from "../components/blocks"
import { CountUp, Rule } from "../components/motion"
import { FOCUS, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"
import { CASES, OUTCOME_TYPES, type Case } from "../data/cases"

const FILTERS = ["All", ...OUTCOME_TYPES] as const
const norm = (c: Case) => (c.outcome === "Introductions" ? "Introduction" : c.outcome)

export default function Work() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const shown = useMemo(() => CASES.filter((c) => filter === "All" || norm(c) === filter), [filter])

  return (
    <>
      <PageHeader
        n="02"
        label="Case studies"
        title="Documented introductions and"
        accent="outcomes."
        lead="Eight case studies, shown as the documents themselves. Company names are covered. Everything else is on the page."
      />

      {/* Disclosure + counters */}
      <Band id="disclosure">
        <Row>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="border-b px-4 py-8 sm:px-6 lg:border-b-0 lg:border-r lg:px-10 lg:py-10" style={{ borderColor: LINE }}>
              <Reveal>
                <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-[#6E6E6E]")}>Read this first</p>
                <p className="mt-3 max-w-[56ch] text-[13.5px] leading-[1.65] text-[#505050]">
                  NDA-signed, licensed case studies. They show how the introduction process performs.
                </p>
              </Reveal>
            </div>
            <dl className="grid grid-cols-2 divide-x" style={{ borderColor: LINE }}>
              {[
                { v: "8", l: "Case studies" },
                { v: "5", l: "Outcome types" },
              ].map((s, i) => (
                <div key={s.l} className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8" style={{ borderColor: LINE }}>
                  <dd className={cn(GeistMono.className, "text-[2rem] leading-none tracking-[-0.05em] sm:text-[2.6rem] lg:text-[3rem]")}>
                    <CountUp value={s.v} delayMs={i * 140} />
                  </dd>
                  <Rule className="my-3 max-w-[48px]" delayMs={300 + i * 100} />
                  <dt className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.12em] text-[#6E6E6E]")}>{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Row>
      </Band>

      {/* Why NDA */}
      <Band>
        <Row split>
          <div className="px-4 py-8 sm:px-6 lg:border-r lg:px-10 lg:py-10" style={{ borderColor: LINE }}>
            <Reveal>
              <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-[#6E6E6E]")}>
                <span className="text-[#0000FF]">Why</span> / NDA-signed
              </p>
              <h2 className="mt-4 max-w-[18ch] text-[1.4rem] font-medium uppercase leading-[1.05] tracking-[-0.03em] sm:text-[1.7rem]">
                Private names. <span className="co-mk on whitespace-nowrap">Visible results.</span>
              </h2>
            </Reveal>
          </div>
          <div className="px-4 pb-8 sm:px-6 sm:pt-8 lg:px-10 lg:py-10">
            <Reveal delayMs={100}>
              <p className="max-w-[60ch] text-[13.5px] leading-[1.65] text-[#505050]">
                The companies in these case studies shared their results under NDA terms. Their names are covered to
                protect their privacy, while the numbers and the process stay visible, so you can see how the
                methodology and the systems behind our introductions perform.
              </p>
              <p className="mt-3 max-w-[60ch] text-[13.5px] leading-[1.65] text-[#505050]">
                Results vary. These examples are not a promise of any particular outcome.
              </p>
            </Reveal>
          </div>
        </Row>
      </Band>

      {/* Filter + documents */}
      <Band>
        <Row>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-4 py-4 sm:px-6 lg:px-10" role="group" aria-label="Filter by outcome type">
            <span className={cn(GeistMono.className, "mr-2 text-[9.5px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>Show</span>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  GeistMono.className,
                  "border px-3 py-1.5 text-[9.5px] uppercase tracking-[0.12em] transition-colors",
                  filter === f ? "border-black bg-black text-white" : "border-black/15 text-[#505050] hover:border-black/40",
                  FOCUS,
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-black/15 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c, i) => (
              <CaseCard key={c.slug} c={c} delayMs={(i % 3) * 80} />
            ))}
            <NextEntryCard n={shown.length + 1} />
          </div>
        </Row>
      </Band>

      <CtaBand title="Want an introduction in your industry?" accent="Write to us." lead="Tell us what you sell or what you need. We reply by email with what is possible." />
    </>
  )
}
